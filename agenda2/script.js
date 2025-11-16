// Actualizar hora y fecha
function updateDateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    // Formato de hora: HH:MM
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
    
    // Formato de fecha: Mes DD,YYYY
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('es-ES', options);
}

// Actualizar cada minuto
updateDateTime();
setInterval(updateDateTime, 60000);

// Referencias DOM
const eventsContainer = document.getElementById('events');
const playerFrame = document.getElementById('stream-frame');
const searchBar = document.getElementById('search-bar');
const headerTitle = document.getElementById('header-title');

// Variable para guardar el evento abierto
let currentOpenEvent = null;
let eventCounter = 0;

// El prefijo para las URLs de transmisión
const streamUrlPrefix = "https://azulcremastv.blogspot.com/p/emb.html?r=";

// Función para generar el HTML de un evento
function generateEventHTML(event, index) {
    const listItem = document.createElement('li');
    listItem.className = 'event-item';
    
    const eventLink = document.createElement('a');
    eventLink.className = 'event-link';
    eventLink.href = "#";
    
    // Número de evento (similar a los canales en la imagen)
    const eventNumber = document.createElement('span');
    eventNumber.className = 'event-number';
    eventNumber.textContent = index;
    
    // Logo del torneo - ahora configurado para usar la clase del torneo
    const eventLogo = document.createElement('div');
    eventLogo.className = 'event-logo';
    
    // Detalles del evento
    const eventDetails = document.createElement('div');
    eventDetails.className = 'event-details';
    
    const eventTitle = document.createElement('div');
    eventTitle.className = 'event-title';
    eventTitle.textContent = event.eventTitle;
    
    const eventInfo = document.createElement('div');
    eventInfo.className = 'event-info';
    eventInfo.textContent = `${event.time} | ${event.tournament}`;
    
    // Ensamblar la estructura del evento
    eventDetails.appendChild(eventTitle);
    eventDetails.appendChild(eventInfo);
    
    eventLink.appendChild(eventNumber);
    eventLink.appendChild(eventLogo);
    eventLink.appendChild(eventDetails);
    
    // Lista de transmisiones
    const streamList = document.createElement('ul');
    streamList.className = 'stream-list';
    
    // Asignar clase para mostrar el logo (basado en el nombre del torneo)
    // Ahora lo aplicamos al elemento li principal para que funcione con nuestro CSS
    const tournamentClass = event.tournament.toUpperCase().replace(/\s+/g, '');
    listItem.classList.add(tournamentClass);
    
    // Evento para mostrar/ocultar la sublista al hacer clic en el evento
    eventLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Si hay un evento abierto, cerrarlo
        if (currentOpenEvent && currentOpenEvent !== listItem) {
            const openStreamList = currentOpenEvent.querySelector('.stream-list');
            openStreamList.classList.remove('open');
            currentOpenEvent.classList.remove('active');
        }
        
        // Alternar la visibilidad de la sublista del evento actual
        streamList.classList.toggle('open');
        listItem.classList.toggle('active');
        
        // Actualizar el evento abierto
        currentOpenEvent = listItem.classList.contains('active') ? listItem : null;
    });
    
    // Decodificar las transmisiones y generar la sublista
    event.streams.forEach(stream => {
        const streamItem = document.createElement('li');
        streamItem.className = 'stream-item';
        
        const streamLink = document.createElement('a');
        streamLink.className = 'stream-link';
        streamLink.href = "#";
        
        const playIcon = document.createElement('span');
        playIcon.className = 'play-icon';
        playIcon.innerHTML = '▶';
        
        streamLink.appendChild(playIcon);
        streamLink.appendChild(document.createTextNode(stream.optionText));
        
        // Usar el URL codificado con el prefijo
        const streamURL = streamUrlPrefix + stream.url;
        
        // Evento para cambiar el reproductor al hacer clic
        streamLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cambiar el título en la cabecera al nombre del evento
            headerTitle.textContent = event.eventTitle;
            
            // Actualizar el iframe con la URL del stream
            playerFrame.src = streamURL;
        });
        
        streamItem.appendChild(streamLink);
        streamList.appendChild(streamItem);
    });
    
    listItem.appendChild(eventLink);
    listItem.appendChild(streamList);
    return listItem;
}

// Función para filtrar los eventos en base a la búsqueda
function filterEvents(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    const events = document.querySelectorAll('.event-item');
    
    events.forEach(event => {
        const eventInfo = event.querySelector('.event-details').textContent.toLowerCase();
        if (eventInfo.includes(searchTerm)) {
            event.style.display = '';
        } else {
            event.style.display = 'none';
        }
    });
}

// Escuchar cuando el usuario escribe en el campo de búsqueda
searchBar.addEventListener('input', function() {
    const searchTerm = this.value;
    filterEvents(searchTerm);
    
    // Si el campo está vacío, mostrar todos los eventos
    if (searchTerm === '') {
        const events = document.querySelectorAll('.event-item');
        events.forEach(event => {
            event.style.display = '';
        });
    }
});

// Modificar el comportamiento del focus para que no limpie el campo
searchBar.addEventListener('focus', function() {
    // No limpiamos el valor aquí para mantener la búsqueda actual
});

// Cargar y renderizar los eventos desde eventos.json
fetch('https://aguilaazulcrema.github.io/json/eventos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
        }
        return response.json();
    })
    .then(events => {
        events.forEach((event, index) => {
            eventCounter++;
            const eventHTML = generateEventHTML(event, eventCounter);
            eventsContainer.appendChild(eventHTML);
        });
    })
    .catch(error => {
        console.error('Error al cargar los eventos:', error);
    });
    
// Funcionamiento de los botones de navegación
document.querySelector('.nav-button.prev').addEventListener('click', function() {
    document.querySelector('.events-list').scrollBy({
        top: -300,
        behavior: 'smooth'
    });
});

document.querySelector('.nav-button.next').addEventListener('click', function() {
    document.querySelector('.events-list').scrollBy({
        top: 300,
        behavior: 'smooth'
    });
});


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
    const timeCells = document.querySelectorAll('.event-info');
    
    timeCells.forEach(cell => {
        const text = cell.textContent;
        if (text.includes('|')) {
            const parts = text.split('|');
            const originalTime = parts[0].trim();
            const tournament = parts[1].trim();
            
            const [hours, minutes] = originalTime.split(':').map(Number);

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
            const adjustedTime = userFormat === 'AMPM' ? formatoAMPM(localTime) : formato24h(localTime);
            cell.textContent = `${adjustedTime} | ${tournament}`;
        }
    });
}

// Ejecuta la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Damos tiempo para que los eventos se carguen del JSON
    setTimeout(ajustarHorarios, 1000);
});