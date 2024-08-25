// script.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            const eventosDiv = document.querySelector('.eventos');
            data.events.forEach(event => {
                const eventHTML = `
                <div class='event'>
                    <div class='event2'>
                        <p class="pais">${event.competition}</p>
                    </div>
                    <div class='kotak'>
                        <div class='left'>
                            <img class='logo1' src='${event.teamLeft.logo}'/>
                            <div class='team'>${event.teamLeft.name}</div>
                        </div>
                        <div class='center'>
                            <div class='date1' data-target-date='${event.date}'>${new Date(event.date).toLocaleDateString('es-ES')}</div>
                            <div class='wak'>${event.time}</div>
                            <div class='jam jam1' data-target-time='${event.time}'></div>
                        </div>
                        <div class='right'>
                            <img class='logo1' src='${event.teamRight.logo}'/>
                            <div class='team'>${event.teamRight.name}</div>
                        </div>
                    </div>
                    <div class='buttons-container'>
                        <div class='buttons-row'>
                            ${event.streamOptions.map(option => `<a class='button' data-stream='${option}'>Opcion</a>`).join('')}
                        </div>
                    </div>
                </div>`;
                
                eventosDiv.insertAdjacentHTML('beforeend', eventHTML);
            });
            
            // Aquí puedes llamar a tu función de ajuste de horario si es necesario
            ajustarHorarios();
        })
        .catch(error => console.error('Error cargando el JSON:', error));
});
