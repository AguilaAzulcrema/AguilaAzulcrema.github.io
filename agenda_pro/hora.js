// Función para mostrar la hora en formato AM/PM
function formatoAMPM(date) { 
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

// Función para mostrar la hora en formato 24 horas
function formato24h(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}

// Función para ajustar las horas a la zona horaria local del usuario
function ajustarHorarios() {
    const timeCells = document.querySelectorAll('.t'); // Selecciona los elementos con clase "t"
    
    timeCells.forEach(cell => {
        const originalTime = cell.textContent.trim(); // Obtiene el texto con la hora original del JSON
        const [hours, minutes] = originalTime.split(':').map(Number); // Divide la hora y los minutos

        // Crear una fecha en UTC-6 (México)
        const eventDate = new Date();
        eventDate.setUTCHours(hours + 6); // Ajustamos las horas para reflejar UTC-6
        eventDate.setUTCMinutes(minutes);
        eventDate.setUTCSeconds(0);

        // Convertir automáticamente a la hora local del usuario
        const localTime = new Date(eventDate.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));

        // Verifica si el usuario prefiere el formato de 24 horas o AM/PM
        const userFormat = '24H'; // Cambia a 'AMPM' si prefieres el formato AM/PM

        // Actualiza el contenido con la hora convertida
        cell.textContent = userFormat === 'AMPM' ? formatoAMPM(localTime) : formato24h(localTime);
    });
}

// Ejecuta la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', ajustarHorarios);
