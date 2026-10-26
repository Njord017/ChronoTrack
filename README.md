# ChronoTrack

A stopwatch and focus timer that saves your sessions and shows your progress. Built with plain HTML, CSS, and JavaScript, with no frameworks or packages.

## Features

- Stopwatch with start, stop, and reset. Name a session and save it to your history.
- Focus countdown with 25-minute, 5-minute, and 15-minute presets, or any custom length from 1 to 180 minutes.
- Pause and resume the focus countdown.
- Completed focus sessions are saved automatically.
- Dashboard with total tracked time, number of sessions, time tracked today, and a bar chart for the last 7 days.
- Session history showing the 20 most recent sessions, with delete for each one and a "Clear all" option.
- Layout works on phones and desktops.

## Running the project

1. Clone the repository or download it as a ZIP:
   ```
   git clone https://github.com/Njord017/chronotrack.git
   ```
2. Open `chrono.html` in a browser.

No install or build step is needed. The VS Code Live Server extension also works.

## Screenshots

<img width="1703" height="973" alt="image" src="https://github.com/user-attachments/assets/7c2bdd4b-e50e-4f59-9f17-392a0472ac7c" />

<img width="1594" height="804" alt="image" src="https://github.com/user-attachments/assets/83a1dce1-0aa7-4927-a9e0-9dde6750ce20" />



## How it works

Sessions are saved in `localStorage` under the key `chronotrack-sessions-v1`. Each session is stored as JSON with an `id`, `name`, `durationMs`, `type` (`stopwatch` or `focus`), and `createdAt` timestamp. The dashboard is recalculated from this list every time it changes.

Elapsed time is calculated from `Date.now()` instead of counting interval ticks, so the time stays accurate even when the browser delays a callback.

### Limitations

- Data is stored in one browser only. It doesn't sync between devices, and clearing the site's data deletes it.
- A running stopwatch or focus timer is not kept if you refresh the page. Only saved sessions persist.
- The history list shows the 20 most recent sessions, but every session counts toward the totals.
- Focus completion uses a browser alert.

## Project structure

```
chrono.html   page layout
chrono.css    styles and responsive layout
chrono.js     timers, saved data, and dashboard
```

## What I learned

- Calculating elapsed time from timestamps is more reliable than counting interval calls.
- `JSON.stringify` and `JSON.parse` let an array of objects be saved in `localStorage`, which only stores strings.
- `reduce` and `filter` can calculate totals and update the history from one list of sessions.
- Using `textContent` instead of `innerHTML` keeps user-typed names from being read as HTML.

## Possible improvements

- Keep the running timer after a page refresh.
- Export the history as a CSV file.
- Replace the alert with an in-page notification.
- Add a backend so sessions sync across devices.
