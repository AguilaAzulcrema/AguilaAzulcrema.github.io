// Función para generar el HTML de cada evento
function generateEventHTML(event) {
    const className = event.tournament.replace(/\s+/g, '').toUpperCase();
    const eventInfo = `${event.tournament}: ${event.eventTitle}`;
    const time = event.time;
    const streamsList = event.streams.map(stream => {
        const finalUrl = `https://leaguemx-tv.blogspot.com/p/evento.html?r=${stream.url}`; // Usar el enlace codificado del JSON
        return `
            <li class="subitem1">
                <a href="${finalUrl}" target="_blank">${stream.optionText}<span>Calidad 1080p</span></a>
            </li>
        `;
    }).join('');

    return `
        <li class="${className}">
            <a href="#">${eventInfo}<span class="t">${time}</span></a>
            <ul>
                ${streamsList}
            </ul>
        </li>
    `;
}

// Función para renderizar todos los eventos
function renderEvents(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = events.map(event => generateEventHTML(event)).join('');
}

// Función para añadir la funcionalidad de desplegable
function addClickEvent() {
    var menu_ul = $(".menu > li > ul"),
        menu_a = $(".menu > li > a");
    menu_ul.hide();
    menu_a.click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass("active")) {
            menu_a.removeClass("active");
            menu_ul.filter(":visible").slideUp("fast");
            $(this).addClass("active").next().stop(true, true).slideDown("fast");
        } else {
            $(this).removeClass("active");
            $(this).next().stop(true, true).slideUp("fast");
        }
    });
}

// Cargar el archivo JSON
fetch('json/eventos.json')
    .then(response => response.json())
    .then(events => {
        renderEvents(events);
        addClickEvent();
    })
    .catch(error => console.error('Error cargando el archivo JSON:', error));
