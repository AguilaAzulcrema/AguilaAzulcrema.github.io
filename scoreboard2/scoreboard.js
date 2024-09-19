window.addEventListener("message", (event) => {
    const data = event.data;

    switch(data.action) {
        case 'updateTeam1':
            document.getElementById("equipo1").textContent = data.value;
            break;
        case 'updateTeam2':
            document.getElementById("equipo2").textContent = data.value;
            break;
        case 'updateScore':
            let scoreElement = document.getElementById(data.team);
            let currentScore = parseInt(scoreElement.textContent);
            let newScore = currentScore + data.value;
            if (newScore >= 0) {
                scoreElement.textContent = newScore;
            }
            break;
        case 'startTimer':
            startTimer();
            break;
        case 'pauseTimer':
            pauseTimer();
            break;
        case 'resetTimer':
            resetTimer();
            break;
        case 'startFirstHalf':
            startFirstHalf();
            break;
        case 'startSecondHalf':
            startSecondHalf();
            break;
        case 'showAddTime':
            document.getElementById("add-time").textContent = `+${data.value}`;
            document.getElementById("add-time").style.display = "block";
            break;
        case 'hideAddTime':
            document.getElementById("add-time").style.display = "none";
            break;
        case 'setCustomTime':
            seconds = data.minutes * 60 + data.seconds;
            updateTimeDisplay();
            break;
    }
});

// Aquí irían las funciones del temporizador (startTimer, pauseTimer, resetTimer, etc.)
let timeDisplay = document.getElementById("time");
let seconds = 0;
let timerInterval = null;

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            updateTimeDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    updateTimeDisplay();
}

function startFirstHalf() {
    seconds = 0; // Empieza desde 00:00
    updateTimeDisplay();
}

function startSecondHalf() {
    seconds = 45 * 60; // Empieza desde 45:00 (en segundos)
    updateTimeDisplay();
}

function updateTimeDisplay() {
    let minutes = Math.floor(seconds / 60);
    let displaySeconds = seconds % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
}

function setCustomTime(minutes, seconds) {
    let totalSeconds = (minutes * 60) + seconds;
    if (!isNaN(totalSeconds) && totalSeconds >= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        seconds = totalSeconds;
        updateTimeDisplay();
    }
}
