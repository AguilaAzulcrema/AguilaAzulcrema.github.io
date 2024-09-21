// Función para filtrar los eventos en base a la búsqueda y el deporte seleccionado
function filterEvents(searchTerm, selectedDeporte) {
    searchTerm = searchTerm.toLowerCase(); // Convertir a minúsculas para que la búsqueda no sea sensible a mayúsculas
    const events = document.querySelectorAll('.menu > li'); // Selecciona todos los eventos (elementos <li>)
    
    events.forEach(event => {
        const eventInfo = event.querySelector('a').textContent.toLowerCase(); // Información del evento
        const eventDeporteClass = event.classList.contains(selectedDeporte); // Verificar si el evento tiene la clase del deporte seleccionado
        
        // Filtrar por búsqueda y deporte seleccionado
        const matchesSearch = eventInfo.includes(searchTerm);
        const matchesDeporte = selectedDeporte === "TODOS" || eventDeporteClass;

        if (matchesSearch && matchesDeporte) {
            event.style.display = ''; // Mostrar el evento si coincide con la búsqueda y el deporte
        } else {
            event.style.display = 'none'; // Ocultar el evento si no coincide
        }
    });
}

// Escuchar cuando el usuario escribe en el campo de búsqueda
document.getElementById('search-bar').addEventListener('input', function() {
    const searchTerm = this.value;
    const selectedDeporte = document.getElementById('deporte-filter').value;
    filterEvents(searchTerm, selectedDeporte); // Filtrar eventos
});

// Escuchar cuando se cambia el select de deportes
document.getElementById('deporte-filter').addEventListener('change', function() {
    const selectedDeporte = this.value;
    const searchTerm = document.getElementById('search-bar').value;
    filterEvents(searchTerm, selectedDeporte); // Filtrar eventos
});
