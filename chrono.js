:root {
    color-scheme: light;
    --page: #f3f6fa;
    --surface: #ffffff;
    --text: #182230;
    --text-strong: #263548;
    --label: #344255;
    --muted: #657386;
    --border: #e2e8f0;
    --divider: #edf1f5;
    --primary: #176b54;
    --primary-hover: #115441;
    --primary-text: #176b54;
    --danger: #b83c4a;
    --danger-hover: #982e3a;
    --danger-text: #b83c4a;
    --accent: #e9f5f0;
    --soft-green: #e8f4ed;
    --soft-green-hover: #d7ecdf;
    --soft-green-text: #176b54;
    --chip-text: #475569;
    --chip-active-border: #b5d8c8;
    --input-bg: #fbfcfe;
    --input-border: #d7e0e9;
    --neutral-bg: #f7f9fc;
    --neutral-hover: #edf1f6;
    --track: #edf2f6;
    --bar: #32856c;
    --ring: rgba(23, 107, 84, 0.28);
    --ring-soft: rgba(23, 107, 84, 0.12);
    --shadow: 0 12px 35px rgba(28, 45, 66, 0.07);
}

:root[data-theme="dark"] {
    color-scheme: dark;
    --page: #0d131a;
    --surface: #161e29;
    --text: #e6edf4;
    --text-strong: #f1f5f9;
    --label: #c5d0dc;
    --muted: #93a2b5;
    --border: #263241;
    --divider: #212c3a;
    --primary: #1b7f63;
    --primary-hover: #166b53;
    --primary-text: #4fc9a5;
    --danger: #c9485a;
    --danger-hover: #ad3b4c;
    --danger-text: #f08794;
    --accent: #16372f;
    --soft-green: #17372f;
    --soft-green-hover: #1e473c;
    --soft-green-text: #6fdcba;
    --chip-text: #b4c0ce;
    --chip-active-border: #2f6b59;
    --input-bg: #0f1720;
    --input-border: #2b3a4c;
    --neutral-bg: #1c2633;
    --neutral-hover: #243142;
    --track: #212d3b;
    --bar: #3fb391;
    --ring: rgba(79, 201, 165, 0.45);
    --ring-soft: rgba(79, 201, 165, 0.18);
    --shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    min-height: 100vh;
    background: var(--page);
    color: var(--text);
    transition: background-color 200ms ease, color 200ms ease;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button,
input {
    font: inherit;
}

button {
    -webkit-tap-highlight-color: transparent;
}

.site-header {
    transition: background-color 200ms ease, border-color 200ms ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px max(24px, calc((100% - 1160px) / 2));
    background: var(--surface);
    border-bottom: 1px solid var(--border);
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--text);
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-decoration: none;
}

.brand-icon {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 11px;
    background: var(--primary);
    color: white;
    font-size: 1.5rem;
}

.header-note {
    margin: 0;
    color: var(--muted);
    font-size: 0.9rem;
}

.page-shell {
    width: min(1160px, calc(100% - 40px));
    margin: 0 auto;
}

.intro {
    padding: 42px 0 28px;
}

.eyebrow {
    margin: 0 0 8px;
    color: var(--primary-text);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.13em;
}

.intro h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3rem);
    letter-spacing: -0.055em;
    line-height: 1.1;
}

.intro-copy {
    margin: 12px 0 0;
    color: var(--muted);
    font-size: 1.02rem;
    line-height: 1.6;
}

.timer-grid,
.stats-grid,
.dashboard-grid {
    display: grid;
    gap: 20px;
}

.timer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.panel,
.stat-card {
    min-width: 0;
    transition: background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
    border: 1px solid var(--border);
    border-radius: 20px;
    background: var(--surface);
    box-shadow: var(--shadow);
}

.panel {
    padding: 25px;
}

.panel-heading,
.section-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
}

.panel-heading h2,
.section-heading h2 {
    margin: 0;
    font-size: 1.35rem;
    letter-spacing: -0.035em;
}

.panel-icon {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 13px;
    background: var(--accent);
    color: var(--primary-text);
    font-size: 1.35rem;
}

.field-label {
    display: block;
    margin: 22px 0 8px;
    color: var(--label);
    font-size: 0.86rem;
    font-weight: 700;
}

.text-input {
    display: block;
    width: 100%;
    min-height: 44px;
    padding: 10px 13px;
    border: 1px solid var(--input-border);
    border-radius: 10px;
    outline: none;
    background: var(--input-bg);
    color: var(--text);
    transition: border-color 150ms ease, box-shadow 150ms ease;
}

.text-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--ring-soft);
}

.time-display {
    margin: 26px 0 22px;
    color: var(--text-strong);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: clamp(2.25rem, 5vw, 3.65rem);
    font-weight: 750;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.075em;
    text-align: center;
    white-space: nowrap;
}

.focus-time {
    color: var(--primary-text);
    font-size: clamp(3rem, 6vw, 4.3rem);
    margin-top: 20px;
}

.button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
}

.button {
    min-height: 43px;
    padding: 10px 16px;
    border: 1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 750;
    transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
}

.button:hover,
.preset-button:hover,
.text-button:hover {
    transform: translateY(-1px);
}

.button:focus-visible,
.preset-button:focus-visible,
.text-button:focus-visible,
.delete-session:focus-visible {
    outline: 3px solid var(--ring);
    outline-offset: 2px;
}

.button-primary {
    background: var(--primary);
    color: #fff;
}

.button-primary:hover {
    background: var(--primary-hover);
}

.button-danger {
    background: var(--danger);
    color: #fff;
}

.button-danger:hover {
    background: var(--danger-hover);
}

.button-neutral {
    border-color: var(--border);
    background: var(--neutral-bg);
    color: var(--label);;
}

.button-neutral:hover {
    background: var(--neutral-hover);
}

.button-save {
    margin-top: 10px;
    background: var(--soft-green);
    color: var(--soft-green-text);
}

.button-save:hover {
   background: var(--soft-green-hover);
}

.full-width {
    width: 100%;
}

.helper-text,
.stat-footnote {
    color: var(--muted);
    font-size: 0.79rem;
    line-height: 1.5;
}

.helper-text {
    margin: 11px 0 0;
}

.status-message {
    min-height: 1.1em;
    margin: 9px 0 0;
    color: var(--primary-text);
    font-size: 0.82rem;
}

.preset-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
}

.preset-button {
    padding: 8px 11px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    color: var(--chip-text);
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 700;
}

.preset-button.active {
    border-color: var(--chip-active-border);
    background: var(--accent);
    color: var(--primary-text);
}

.custom-duration .field-label {
    margin-top: 17px;
}

.small-input {
    max-width: 180px;
}

.dashboard-section {
    padding-top: 48px;
}

.section-heading {
    align-items: center;
    margin-bottom: 20px;
}

.local-badge {
    display: inline-flex;
    align-items: center;
    padding: 7px 10px;
    border-radius: 999px;
    background: var(--soft-green);
    color: var(--soft-green-text);
    font-size: 0.75rem;
    font-weight: 700;
    white-space: nowrap;
}

.stats-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stat-card {
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 21px;
}

.stat-label {
    color: var(--muted);
    font-size: 0.85rem;
    font-weight: 650;
}

.stat-value {
    font-size: clamp(1.65rem, 3vw, 2.25rem);
    letter-spacing: -0.06em;
    line-height: 1.15;
    overflow-wrap: anywhere;
}

.stat-footnote {
    margin-top: auto;
}

.dashboard-grid {
    grid-template-columns: 0.9fr 1.1fr;
    margin-top: 20px;
    align-items: start;
}

.compact-heading {
    align-items: center;
}

.compact-heading h3 {
    margin: 0;
    font-size: 1.1rem;
    letter-spacing: -0.025em;
}

.text-button {
    padding: 7px 9px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--danger-text);
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 750;
}

.weekly-chart {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
    min-height: 185px;
    align-items: end;
    margin-top: 24px;
}

.chart-day {
    display: flex;
    min-width: 0;
    height: 170px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
}

.chart-bar-track {
    display: flex;
    width: 100%;
    max-width: 32px;
    height: 125px;
    align-items: flex-end;
    overflow: hidden;
    border-radius: 7px;
    background: var(--track);
}

.chart-bar {
    width: 100%;
    min-height: 3px;
    border-radius: 7px;
    background: var(--bar);
    transition: height 180ms ease;
}

.chart-minutes {
    color: #475569;
    font-size: 0.7rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
}

.chart-label {
    color: var(--muted);
    font-size: 0.72rem;
}

.session-history {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 15px;
}

.history-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #edf1f5;
}

.history-item:last-child {
    border-bottom: 0;
}

.history-main {
    min-width: 0;
}

.history-name {
    margin: 0;
    overflow-wrap: anywhere;
    font-size: 0.9rem;
    font-weight: 750;
}

.history-meta {
    margin: 5px 0 0;
    color: var(--muted);
    font-size: 0.74rem;
    line-height: 1.5;
}

.history-right {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 9px;
}

.history-duration {
    font-size: 0.85rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
}

.delete-session {
    display: grid;
    width: 29px;
    height: 29px;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--danger-text);
    cursor: pointer;
    font-size: 1rem;
}

.empty-state {
    grid-column: 1 / -1;
    margin: 0;
    padding: 18px 0;
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.6;
    text-align: center;
}

.site-footer {
    padding: 30px 0 38px;
    color: var(--muted);
    font-size: 0.78rem;
    text-align: center;
}

.site-footer p {
    margin: 0;
}

.text-input::placeholder {
    color: var(--muted);
    opacity: 0.75;
}
 
/* ---------- Theme toggle (lives in the header) ---------- */
.header-actions {
    display: flex;
    align-items: center;
    gap: 18px;
}
 
.theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    min-height: 40px;
    padding: 6px 8px 6px 12px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--neutral-bg);
    color: var(--label);
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 700;
    transition: background-color 200ms ease, border-color 200ms ease, color 200ms ease;
}
 
.theme-toggle:hover {
    background: var(--neutral-hover);
}
 
.theme-toggle:focus-visible {
    outline: 3px solid var(--ring);
    outline-offset: 2px;
}
 
.theme-icon {
    display: block;
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}
 
/* Light mode shows the moon (what you switch to); dark mode shows the sun. */
.theme-icon-sun {
    display: none;
}
 
:root[data-theme="dark"] .theme-icon-sun {
    display: block;
}
 
:root[data-theme="dark"] .theme-icon-moon {
    display: none;
}
 
.toggle-track {
    position: relative;
    width: 38px;
    height: 22px;
    flex: 0 0 auto;
    border-radius: 999px;
    background: #c3ced9;
    transition: background-color 200ms ease;
}
 
.toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 200ms ease;
}
 
.theme-toggle[aria-checked="true"] .toggle-track {
    background: var(--primary);
}
 
.theme-toggle[aria-checked="true"] .toggle-thumb {
    transform: translateX(16px);
}
 
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
}

/* ---------- Saved timers (focus panel) ---------- */
.saved-timers {
    margin-top: 6px;
}
 
.saved-timer-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
 
.saved-timer {
    display: inline-flex;
    max-width: 100%;
    align-items: stretch;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    transition: border-color 150ms ease, background-color 200ms ease;
}
 
.saved-timer:hover {
    border-color: var(--chip-active-border);
}
 
.saved-timer-load,
.saved-timer-delete {
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 700;
}
 
.saved-timer-load {
    min-width: 0;
    max-width: 200px;
    padding: 8px 6px 8px 13px;
    overflow: hidden;
    color: var(--chip-text);
    text-overflow: ellipsis;
    white-space: nowrap;
}
 
.saved-timer-load:hover {
    color: var(--primary-text);
}
 
.saved-timer-delete {
    padding: 8px 12px 8px 6px;
    color: var(--danger-text);
    font-size: 1rem;
    line-height: 1;
}
 
.saved-timer-load:focus-visible,
.saved-timer-delete:focus-visible {
    outline: 3px solid var(--ring);
    outline-offset: -3px;
}
 
.saved-empty {
    margin: 0;
    color: var(--muted);
    font-size: 0.79rem;
    line-height: 1.5;
}
 
@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
    }
}

@media (max-width: 850px) {
    .timer-grid,
    .dashboard-grid {
        grid-template-columns: 1fr;
    }

    .time-display {
        font-size: clamp(2.5rem, 9vw, 3.8rem);
    }
}

@media (max-width: 560px) {
    .site-header {
        padding: 15px 20px;
    }

    .header-note {
        display: none;
    }
 
    .theme-toggle {
        padding-left: 10px;
    }
    .page-shell {
        width: min(100% - 28px, 1160px);
    }

    .intro {
        padding-top: 32px;
    }

    .panel {
        padding: 19px;
        border-radius: 16px;
    }

    .stats-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .stat-card {
        padding: 17px;
    }

    .section-heading {
        align-items: flex-start;
        flex-direction: column;
    }

    .button-row .button {
        flex: 1;
        padding-inline: 11px;
    }

    .weekly-chart {
        gap: 6px;
    }

    .history-item {
        align-items: flex-start;
    }

    .history-right {
        gap: 5px;
    } 
}

