function formatoAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // la hora '0' debe ser '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

function formato24h(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}

function ajustarHorarios() {
    const timeCells = document.querySelectorAll('.jam.jam1, .wak');

    timeCells.forEach(cell => {
        const originalTime = cell.classList.contains('jam1') 
            ? cell.getAttribute('data-target-time') 
            : cell.textContent.trim();

        const [hours, minutes] = originalTime.split(':').map(Number);

        // Crear un objeto Date asumiendo que la hora original está en UTC-6
        const eventDate = new Date();
        eventDate.setHours(hours + 6);  // Ajuste manual para convertir la hora desde UTC-6 a UTC
        eventDate.setMinutes(minutes);
        eventDate.setSeconds(0);

        // Convertir la hora UTC a la hora local del usuario
        const localTime = new Date(eventDate.getTime() - eventDate.getTimezoneOffset() * 60000);

        // Determinar el formato a mostrar (24H o AMPM)
        const userFormat = '24H'; // Asumimos formato 24 horas

        cell.textContent = userFormat === 'AMPM' ? formatoAMPM(localTime) : formato24h(localTime);
    });
}

document.addEventListener('DOMContentLoaded', ajustarHorarios);
