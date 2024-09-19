// Abrir una nueva ventana para el marcador
let scoreboardWindow = window.open('scoreboard.html', 'Marcador', 'width=800,height=600');

// Verifica que la ventana del marcador esté abierta
if (!scoreboardWindow) {
    alert('Por favor, habilita las ventanas emergentes en tu navegador');
}

// Funciones de control
document.getElementById("team1-input").addEventListener("input", () => {
    scoreboardWindow.postMessage({ action: 'updateTeam1', value: document.getElementById("team1-input").value }, "*");
});

document.getElementById("team2-input").addEventListener("input", () => {
    scoreboardWindow.postMessage({ action: 'updateTeam2', value: document.getElementById("team2-input").value }, "*");
});

document.getElementById("score1-plus").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'updateScore', team: 'score1', value: 1 }, "*");
});

document.getElementById("score1-minus").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'updateScore', team: 'score1', value: -1 }, "*");
});

document.getElementById("score2-plus").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'updateScore', team: 'score2', value: 1 }, "*");
});

document.getElementById("score2-minus").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'updateScore', team: 'score2', value: -1 }, "*");
});

document.getElementById("start").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'startTimer' }, "*");
});

document.getElementById("pause").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'pauseTimer' }, "*");
});

document.getElementById("reset").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'resetTimer' }, "*");
});

document.getElementById("first-half").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'startFirstHalf' }, "*");
});

document.getElementById("second-half").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'startSecondHalf' }, "*");
});

document.getElementById("show-add-time").addEventListener("click", () => {
    let addedTime = document.getElementById("add-time-input").value;
    scoreboardWindow.postMessage({ action: 'showAddTime', value: addedTime }, "*");
});

document.getElementById("hide-add-time").addEventListener("click", () => {
    scoreboardWindow.postMessage({ action: 'hideAddTime' }, "*");
});

document.getElementById("set-custom-time").addEventListener("click", () => {
    let customMinutes = parseInt(document.getElementById("custom-minutes").value) || 0;
    let customSeconds = parseInt(document.getElementById("custom-seconds").value) || 0;
    scoreboardWindow.postMessage({ action: 'setCustomTime', minutes: customMinutes, seconds: customSeconds }, "*");
});
