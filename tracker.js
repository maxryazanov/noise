let startTime = null;
let timerInterval = null;
let sessionDuration = 0;
let lastSavedTimestamp = null;
let lastSessionInterval = null;

const display = document.getElementById("time-display");
const lastSessionDisplay = document.getElementById("last-session");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const saveBtn = document.getElementById("save-btn");

startBtn.addEventListener("click", () => {
    if (!timerInterval) {
        startTime = Date.now() - sessionDuration;
        timerInterval = setInterval(updateTime, 1000);
    }
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = null;
    sessionDuration = 0;
    display.textContent = "00:00:00";
});

saveBtn.addEventListener("click", () => {
    const now = Date.now();
    const session = {
        timestamp: now,
        duration: sessionDuration
    };

    let saved = JSON.parse(localStorage.getItem("trackerSessions") || "[]");

    saved.unshift(session);
    if (saved.length > 2) saved = saved.slice(0, 2);

    localStorage.setItem("trackerSessions", JSON.stringify(saved));

    lastSavedTimestamp = now;
    startLastSessionTimer(); // Запустить реальное обновление
});

function updateTime() {
    sessionDuration = Date.now() - startTime;
    display.textContent = formatTime(sessionDuration);
}

function startLastSessionTimer() {
    if (lastSessionInterval) clearInterval(lastSessionInterval);

    function updateSinceText() {
        const since = Date.now() - lastSavedTimestamp;
        lastSessionDisplay.textContent = "З останньої сесії: " + formatTime(since);
    }

    updateSinceText(); // Сразу показать
    lastSessionInterval = setInterval(updateSinceText, 1000); // Обновлять каждую секунду
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

// При загрузке показать последнюю сессию и запустить таймер
(function initLastSession() {
    const saved = JSON.parse(localStorage.getItem("trackerSessions") || "[]");
    if (saved.length >= 1) {
        lastSavedTimestamp = saved[0].timestamp;
        startLastSessionTimer();
    } else {
        lastSessionDisplay.textContent = "З останньої сесії: 00:00:00";
    }
})();