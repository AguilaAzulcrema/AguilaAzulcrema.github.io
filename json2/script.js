document.addEventListener('DOMContentLoaded', function() {
    fetch('events.json') // Asegúrate de que la ruta al archivo JSON sea correcta
        .then(response => response.json())
        .then(data => {
            const events = data.events;
            const container = document.querySelector('.container'); // Asegúrate de que este selector sea correcto
            
            events.forEach(event => {
                // Crear HTML para cada evento
                const eventHTML = `
                    <div class="event">
                        <div class="event2">
                            <p class="pais">Premier League</p>
                        </div>
                        <div class="kotak">
                            <div class="left">
                                <div class="logo ${event.team1.logo}"></div>
                                <div class="team">${event.team1.name}</div>
                            </div>
                            <div class="center">
                                <div class="date1" data-target-date="${event.date}">${event.date}</div>
                                <div class="wak">${event.time}</div>
                                <div class="jam jam1" data-target-time="${event.time}"></div>
                            </div>
                            <div class="right">
                                <div class="logo ${event.team2.logo}"></div>
                                <div class="team">${event.team2.name}</div>
                            </div>
                        </div>
                        <div class="buttons-container">
                            <div class="buttons-row">
                                ${event.streams.map(stream => `<a class="button" data-stream="${stream}">CH ${event.streams.indexOf(stream) + 1}</a>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += eventHTML;
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
