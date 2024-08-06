function formatoAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formato24h(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}

function ajustarHorarios() {
    const timeCells = document.querySelectorAll('.time-cell');

    // Establece manualmente el offset de la zona horaria en minutos (por ejemplo, UTC-3 sería -180)
    const manualTimezoneOffset = -180; // Cambia este valor según la zona horaria deseada

    timeCells.forEach(cell => {
        const originalTime = cell.textContent.trim();
        const [hours, minutes] = originalTime.split(':').map(Number);

        const date = new Date();
        date.setUTCHours(hours);
        date.setUTCMinutes(minutes);
        date.setUTCSeconds(0);

        // Ajuste manual de la hora
        const localTime = new Date(date.getTime() + manualTimezoneOffset * 60000);

        // Check if the user prefers 24-hour or AM/PM format
        const userFormat = '24H'; // Assuming 24-hour format, modify if needed

        cell.textContent = userFormat === 'AMPM' ? formatoAMPM(localTime) : formato24h(localTime);
    });
}

document.addEventListener('DOMContentLoaded', ajustarHorarios);
