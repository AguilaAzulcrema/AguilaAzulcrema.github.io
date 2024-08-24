function updateCountdown(targetDate, timeElement, container) {
    var countdown = setInterval(function () {
        var now = new Date().getTime();

        // Si el evento ya ha terminado
        if (now >= targetDate.getTime() + 9000000) { // 2 horas y 30 minutos después de la hora de inicio
            clearInterval(countdown);
            timeElement.innerHTML = "LIVE END";
            moveContainerToLast(container);
            sortEvents();
        } 
        // Si el evento está en vivo
        else if (now >= targetDate.getTime()) {
            clearInterval(countdown);
            timeElement.innerHTML = "LIVE NOW";
            setTimeout(function () {
                timeElement.innerHTML = "LIVE END";
                moveContainerToLast(container);
                sortEvents();
            }, 9000000 - (now - targetDate.getTime())); // Cambiar a "LIVE END" después de 2 horas y 30 minutos
        } 
        // Si el evento aún no ha comenzado
        else {
            var distance = targetDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            timeElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
        }
    }, 1000); // Actualiza cada segundo
}

function initCountdownForEvents() {
    const containers = document.querySelectorAll('.event-container');
    containers.forEach(container => {
        const timeCell = container.querySelector('.time-cell');
        const timeText = timeCell.textContent.trim();
        
        // Asume que el formato de tiempo es HH:MM
        const [hours, minutes] = timeText.split(':').map(Number);
        const today = new Date();
        const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);

        // Verifica si la fecha es válida antes de iniciar la cuenta regresiva
        if (!isNaN(targetDate)) {
            updateCountdown(targetDate, timeCell, container);
        }
    });
}

document.addEventListener('DOMContentLoaded', initCountdownForEvents);
