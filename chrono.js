// ChronoTrack: stopwatch, saved sessions, productivity dashboard, and focus countdown.

// ---------- Shared saved data ----------
// localStorage can only save strings, so we convert our session array to/from JSON.
const STORAGE_KEY = "chronotrack-sessions-v1";
const display = document.getElementById("display");
const sessionNameInput = document.getElementById("sessionName");
const stopwatchMessage = document.getElementById("stopwatchMessage");
const focusMessage = document.getElementById("focusMessage");

let sessions = loadSessions();

function loadSessions() {
    // A try/catch prevents malformed saved data from stopping the whole app.
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        const parsedData = savedData ? JSON.parse(savedData) : [];
        return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
        console.error("Could not load saved sessions:", error);
        return [];
    }
}

function saveSessionsToStorage() {
    // JSON.stringify turns the array of session objects into a string for storage.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function makeSession(name, durationMs, type) {
    // Each session has the same shape, which makes summaries easier to calculate.
    return {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: name.trim() || (type === "focus" ? "Focus session" : "Stopwatch session"),
        durationMs: Math.max(0, Math.round(durationMs)),
        type,
        createdAt: new Date().toISOString()
    };
}

function addSession(session) {
    sessions.unshift(session); // Put the newest session at the top of the history.
    saveSessionsToStorage();
    renderDashboard();
}

// ---------- Stopwatch ----------
let stopwatchInterval = null;
let stopwatchStartTime = 0;
let elapsedTime = 0;
let isStopwatchRunning = false;

function startStopwatch() {
    if (isStopwatchRunning) return; // Prevent starting multiple intervals.

    stopwatchStartTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10);
    isStopwatchRunning = true;
    stopwatchMessage.textContent = "Stopwatch running.";
}

function stopStopwatch() {
    if (!isStopwatchRunning) return;

    clearInterval(stopwatchInterval);
    elapsedTime = Date.now() - stopwatchStartTime;
    isStopwatchRunning = false;
    updateStopwatch();
    stopwatchMessage.textContent = "Stopped. Save the session to add it to your history.";
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchStartTime = 0;
    elapsedTime = 0;
    isStopwatchRunning = false;
    display.textContent = "00:00:00.00";
    stopwatchMessage.textContent = "Stopwatch reset.";
}

function getStopwatchElapsed() {
    // While running, calculate from the real clock rather than counting interval calls.
    return isStopwatchRunning ? Date.now() - stopwatchStartTime : elapsedTime;
}

function updateStopwatch() {
    elapsedTime = getStopwatchElapsed();
    display.textContent = formatStopwatchTime(elapsedTime);
}

function formatStopwatchTime(milliseconds) {
    const totalCentiseconds = Math.floor(milliseconds / 10);
    const hours = Math.floor(totalCentiseconds / 360000);
    const minutes = Math.floor(totalCentiseconds / 6000) % 60;
    const seconds = Math.floor(totalCentiseconds / 100) % 60;
    const centiseconds = totalCentiseconds % 100;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

document.getElementById("startBtn").addEventListener("click", startStopwatch);
document.getElementById("stopBtn").addEventListener("click", stopStopwatch);
document.getElementById("resetBtn").addEventListener("click", resetStopwatch);

document.getElementById("saveSessionBtn").addEventListener("click", () => {
    const duration = getStopwatchElapsed();

    if (duration < 1000) {
        stopwatchMessage.textContent = "Run the stopwatch for at least one second before saving.";
        return;
    }

    // Saving ends the current stopwatch session so it cannot be accidentally saved twice.
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    isStopwatchRunning = false;

    addSession(makeSession(sessionNameInput.value, duration, "stopwatch"));
    resetStopwatch();
    stopwatchMessage.textContent = "Session saved to your history.";
    sessionNameInput.value = "";
});

// ---------- Focus countdown ----------
const focusDisplay = document.getElementById("focusDisplay");
const focusMinutesInput = document.getElementById("focusMinutes");
const focusNameInput = document.getElementById("focusName");
const focusStartBtn = document.getElementById("focusStartBtn");

let focusInterval = null;
let focusRemainingMs = 25 * 60 * 1000;
let focusEndTime = 0;
let isFocusRunning = false;
let selectedFocusMinutes = 25;

function formatCountdown(milliseconds) {
    const totalSeconds = Math.ceil(Math.max(0, milliseconds) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateFocusDisplay() {
    focusDisplay.textContent = formatCountdown(focusRemainingMs);
}

function setFocusDuration(minutes) {
    if (isFocusRunning) return; // Do not change the target halfway through a running countdown.

    const safeMinutes = Math.min(180, Math.max(1, Number(minutes) || 25));
    selectedFocusMinutes = safeMinutes;
    focusMinutesInput.value = String(safeMinutes);
    focusRemainingMs = safeMinutes * 60 * 1000;
    updateFocusDisplay();
    focusMessage.textContent = "";
}

function startOrPauseFocus() {
    if (isFocusRunning) {
        // Pause by storing the remaining time, then stop the interval.
        focusRemainingMs = Math.max(0, focusEndTime - Date.now());
        clearInterval(focusInterval);
        focusInterval = null;
        isFocusRunning = false;
        focusStartBtn.textContent = "Resume focus";
        updateFocusDisplay();
        focusMessage.textContent = "Focus timer paused.";
        return;
    }

    if (focusRemainingMs <= 0) {
        setFocusDuration(focusMinutesInput.value);
    }

    focusEndTime = Date.now() + focusRemainingMs;
    isFocusRunning = true;
    focusStartBtn.textContent = "Pause focus";
    focusMessage.textContent = "Focus session in progress.";
    focusInterval = setInterval(tickFocusTimer, 200);
    tickFocusTimer();
}

function tickFocusTimer() {
    focusRemainingMs = Math.max(0, focusEndTime - Date.now());
    updateFocusDisplay();

    if (focusRemainingMs <= 0) {
        completeFocusSession();
    }
}

function completeFocusSession() {
    clearInterval(focusInterval);
    focusInterval = null;
    isFocusRunning = false;
    focusStartBtn.textContent = "Start focus";

    const duration = selectedFocusMinutes * 60 * 1000;
    addSession(makeSession(focusNameInput.value, duration, "focus"));
    focusMessage.textContent = "Focus complete! Your session was saved automatically.";
    focusNameInput.value = "";
    focusRemainingMs = 0;
    updateFocusDisplay();

    // Alert is a simple completion reminder; it does not require an extra library.
    window.alert("Focus session complete! Take a short break.");
}

function resetFocusTimer() {
    clearInterval(focusInterval);
    focusInterval = null;
    isFocusRunning = false;
    focusStartBtn.textContent = "Start focus";
    focusRemainingMs = selectedFocusMinutes * 60 * 1000;
    updateFocusDisplay();
    focusMessage.textContent = "Focus timer reset.";
}

focusStartBtn.addEventListener("click", startOrPauseFocus);
document.getElementById("focusResetBtn").addEventListener("click", resetFocusTimer);
focusMinutesInput.addEventListener("change", () => {
    if (isFocusRunning) return;
    setFocusDuration(focusMinutesInput.value);
    document.querySelectorAll(".preset-button").forEach(button => button.classList.remove("active"));
});

document.querySelectorAll(".preset-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".preset-button").forEach(preset => preset.classList.remove("active"));
        button.classList.add("active");
        setFocusDuration(button.dataset.minutes);
    });
});

// ---------- Productivity dashboard and session history ----------
const totalFocusTime = document.getElementById("totalFocusTime");
const totalSessions = document.getElementById("totalSessions");
const todayFocusTime = document.getElementById("todayFocusTime");
const weeklyChart = document.getElementById("weeklyChart");
const sessionHistory = document.getElementById("sessionHistory");
const historyMessage = document.getElementById("historyMessage");

function formatDuration(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
}

function sameLocalDay(dateA, dateB) {
    return dateA.getFullYear() === dateB.getFullYear()
        && dateA.getMonth() === dateB.getMonth()
        && dateA.getDate() === dateB.getDate();
}

function renderDashboard() {
    // The dashboard is calculated from the saved sessions, so it stays in sync after changes.
    const totalMs = sessions.reduce((sum, session) => sum + session.durationMs, 0);
    const today = new Date();
    const todayMs = sessions.reduce((sum, session) => {
        return sameLocalDay(new Date(session.createdAt), today) ? sum + session.durationMs : sum;
    }, 0);

    totalFocusTime.textContent = formatLongDuration(totalMs);
    totalSessions.textContent = String(sessions.length);
    todayFocusTime.textContent = formatLongDuration(todayMs);
    renderWeeklyChart();
    renderSessionHistory();
}

function formatLongDuration(milliseconds) {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${totalMinutes} min`;
}

function getLastSevenDays() {
    // Build local calendar dates from six days ago through today.
    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - (6 - index));
        return date;
    });
}

function renderWeeklyChart() {
    const days = getLastSevenDays();
    const dailyTotals = days.map(day => {
        return sessions.reduce((sum, session) => {
            return sameLocalDay(new Date(session.createdAt), day) ? sum + session.durationMs : sum;
        }, 0);
    });
    const maxMinutes = Math.max(1, ...dailyTotals.map(total => total / 60000));

    weeklyChart.replaceChildren();

    days.forEach((day, index) => {
        const minutes = Math.round(dailyTotals[index] / 60000);
        const barHeight = minutes === 0 ? 3 : Math.max(5, (minutes / maxMinutes) * 100);
        const dayColumn = document.createElement("div");
        dayColumn.className = "chart-day";
        dayColumn.title = `${day.toLocaleDateString()} — ${minutes} minutes`;

        const minuteLabel = document.createElement("span");
        minuteLabel.className = "chart-minutes";
        minuteLabel.textContent = String(minutes);

        const track = document.createElement("div");
        track.className = "chart-bar-track";
        const bar = document.createElement("div");
        bar.className = "chart-bar";
        bar.style.height = `${barHeight}%`;
        track.append(bar);

        const dayLabel = document.createElement("span");
        dayLabel.className = "chart-label";
        dayLabel.textContent = day.toLocaleDateString(undefined, { weekday: "short" });

        dayColumn.append(minuteLabel, track, dayLabel);
        weeklyChart.append(dayColumn);
    });
}

function renderSessionHistory() {
    sessionHistory.replaceChildren();

    if (sessions.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-state";
        emptyMessage.textContent = "No sessions saved yet. Complete a session to get started.";
        sessionHistory.append(emptyMessage);
        return;
    }

    // Show the latest 20 sessions to keep the page manageable.
    sessions.slice(0, 20).forEach(session => {
        const item = document.createElement("div");
        item.className = "history-item";

        const main = document.createElement("div");
        main.className = "history-main";
        const name = document.createElement("p");
        name.className = "history-name";
        name.textContent = session.name; // textContent safely displays user-entered text.
        const meta = document.createElement("p");
        meta.className = "history-meta";
        const date = new Date(session.createdAt);
        meta.textContent = `${session.type === "focus" ? "Focus timer" : "Stopwatch"} · ${date.toLocaleString()}`;
        main.append(name, meta);

        const right = document.createElement("div");
        right.className = "history-right";
        const duration = document.createElement("span");
        duration.className = "history-duration";
        duration.textContent = formatDuration(session.durationMs);
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-session";
        deleteButton.type = "button";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("aria-label", `Delete session ${session.name}`);
        deleteButton.addEventListener("click", () => deleteSession(session.id));
        right.append(duration, deleteButton);

        item.append(main, right);
        sessionHistory.append(item);
    });
}

function deleteSession(sessionId) {
    sessions = sessions.filter(session => session.id !== sessionId);
    saveSessionsToStorage();
    renderDashboard();
    historyMessage.textContent = "Session deleted.";
}

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    if (sessions.length === 0) {
        historyMessage.textContent = "There is no history to clear.";
        return;
    }

    if (window.confirm("Delete all saved sessions? This cannot be undone.")) {
        sessions = [];
        saveSessionsToStorage();
        renderDashboard();
        historyMessage.textContent = "All session history cleared.";
    }
});

// Draw saved records as soon as the page opens.
renderDashboard();
updateStopwatch();
updateFocusDisplay();
