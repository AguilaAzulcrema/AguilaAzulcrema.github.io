// Referencias DOM
const eventsContainer = document.getElementById('events');
const playerFrame = document.getElementById('stream-frame');

// Función para generar el HTML de un evento
function generateEventHTML(event) {
    const listItem = document.createElement('li');
    const eventLink = document.createElement('a');
    const subList = document.createElement('ul'); // Lista para transmisiones
    subList.style.display = 'none'; // Ocultar inicialmente

    // Decodificar las transmisiones y generar la sublista
    event.streams.forEach(stream => {
        const subListItem = document.createElement('li');
        const subListLink = document.createElement('a');

        const streamURL = atob(stream.url); // Decodificar la URL

        subListLink.textContent = stream.optionText;
        subListLink.href = "#";

        // Evento para cambiar el reproductor al hacer clic
        subListLink.addEventListener('click', function (e) {
            e.preventDefault();
            playerFrame.src = streamURL;
        });

        subListItem.appendChild(subListLink);
        subList.appendChild(subListItem);
    });

    // Configurar el enlace del evento
    eventLink.textContent = `${event.time} | ${event.tournament} - ${event.eventTitle}`;
    eventLink.href = "#";

    // Asignar clase para mostrar el logo (basado en el nombre del torneo)
    const tournamentClass = event.tournament.toUpperCase().replace(/\s+/g, ''); // Convertir a una clase válida
    listItem.classList.add(tournamentClass);

    // Evento para mostrar/ocultar la sublista al hacer clic en el evento
    eventLink.addEventListener('click', function (e) {
        e.preventDefault();
        subList.style.display = subList.style.display === 'none' ? 'block' : 'none';
    });

    listItem.appendChild(eventLink);
    listItem.appendChild(subList);
    return listItem;
}

// Cargar y renderizar los eventos desde eventos.json
fetch('https://aguilaazulcrema.github.io/json/eventos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
        }
        return response.json();
    })
    .then(events => {
        events.forEach(event => {
            const eventHTML = generateEventHTML(event);
            eventsContainer.appendChild(eventHTML);
        });
    })
    .catch(error => {
        console.error('Error al cargar los eventos:', error);
    });
