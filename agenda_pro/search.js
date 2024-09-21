// Función para filtrar los eventos en base a la búsqueda
function filterEvents(searchTerm) {
    searchTerm = searchTerm.toLowerCase(); // Convertir a minúsculas para que la búsqueda no sea sensible a mayúsculas
    const events = document.querySelectorAll('.menu > li');
    
    events.forEach(event => {
        const eventInfo = event.querySelector('a').textContent.toLowerCase(); // Tomar la información del evento (título y hora)
        if (eventInfo.includes(searchTerm)) {
            event.style.display = ''; // Mostrar el evento si coincide con la búsqueda
        } else {
            event.style.display = 'none'; // Ocultar el evento si no coincide
        }
    });
}

// Escuchar cuando el usuario escribe en el campo de búsqueda
document.getElementById('search-bar').addEventListener('input', function() {
    const searchTerm = this.value;
    filterEvents(searchTerm); // Filtrar eventos en base al término de búsqueda
});

const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('focus', function() {
    this.value = ''; // Limpia el campo al enfocar
});