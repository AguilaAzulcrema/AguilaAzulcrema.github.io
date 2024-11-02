// Obtener el año actual y el mes actual
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDay = today.getDate();
const selectedDays = JSON.parse(localStorage.getItem("selectedDays")) || {};

// Función para eliminar eventos que hayan pasado hace más de dos días
function removeOldEvents() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    for (let dateKey in selectedDays) {
        const [year, month, day] = dateKey.split("-").map(Number);
        const eventDate = new Date(year, month - 1, day);

        if (eventDate < twoDaysAgo) {
            delete selectedDays[dateKey];
        }
    }

    // Actualiza localStorage si hubo cambios
    localStorage.setItem("selectedDays", JSON.stringify(selectedDays));
}

// Llamar a la función para eliminar eventos antiguos al cargar la página
removeOldEvents();

// Crear los nombres de los meses y días de la semana
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Variables para el manejo de los popups de creación y eliminación de eventos
let selectedDateKey;
let deleteDateKey;

// Función para mostrar el popup del evento de hoy
function showPopup(message) {
    const eventPopup = document.getElementById("eventPopup");
    const eventMessage = document.getElementById("eventMessage");

    eventMessage.textContent = message;
    eventPopup.style.display = "flex";

    // Asigna el evento para detectar teclas Enter y Escape
    document.addEventListener("keydown", handleEventPopupKeys);
}

// Función para cerrar el popup de evento del día
function closePopup() {
    document.getElementById("eventPopup").style.display = "none";
    document.removeEventListener("keydown", handleEventPopupKeys);
}

// Función para manejar teclas en el popup del evento de hoy
function handleEventPopupKeys(event) {
    if (event.key === "Enter") {
        closePopup();
    } else if (event.key === "Escape") {
        closePopup();
    }
}

// Función para mostrar el popup de creación de evento
function showCreateEventPopup(dateKey) {
    selectedDateKey = dateKey;
    document.getElementById("eventInput").value = ""; // Limpiar el campo de entrada
    document.getElementById("createEventPopup").style.display = "flex"; 

    // Asigna el evento para detectar teclas Enter y Escape
    document.addEventListener("keydown", handleCreateEventPopupKeys);
}

// Función para cerrar el popup de creación de evento
function closeCreateEventPopup() {
    document.getElementById("createEventPopup").style.display = "none";
    document.removeEventListener("keydown", handleCreateEventPopupKeys);
}

// Función para manejar teclas en el popup de creación de evento
function handleCreateEventPopupKeys(event) {
    if (event.key === "Enter") {
        addEvent();
    } else if (event.key === "Escape") {
        closeCreateEventPopup();
    }
}

// Función para agregar el evento
function addEvent() {
    const eventDescription = document.getElementById("eventInput").value;
    if (eventDescription) {
        selectedDays[selectedDateKey] = eventDescription;
        localStorage.setItem("selectedDays", JSON.stringify(selectedDays));
        closeCreateEventPopup();
        createCalendar(currentYear); // Actualizar el calendario para reflejar el evento
    }
}

// Función para mostrar el popup de confirmación de eliminación de evento
function showDeleteEventPopup(dateKey) {
    deleteDateKey = dateKey;
    document.getElementById("deleteEventPopup").style.display = "flex"; // Mostrar el popup

    // Asigna el evento para detectar teclas Enter y Escape
    document.addEventListener("keydown", handleDeleteEventPopupKeys);
}

// Función para cerrar el popup de confirmación de eliminación
function closeDeleteEventPopup() {
    document.getElementById("deleteEventPopup").style.display = "none";
    document.removeEventListener("keydown", handleDeleteEventPopupKeys);
}

// Función para manejar teclas en el popup de eliminación de evento
function handleDeleteEventPopupKeys(event) {
    if (event.key === "Enter") {
        deleteEvent();
    } else if (event.key === "Escape") {
        closeDeleteEventPopup();
    }
}

// Función para eliminar el evento
function deleteEvent() {
    if (deleteDateKey) {
        delete selectedDays[deleteDateKey];
        localStorage.setItem("selectedDays", JSON.stringify(selectedDays));
        createCalendar(currentYear); // Actualizar el calendario
        closeDeleteEventPopup(); // Cerrar el popup
    }
}

// Función para mostrar el popup de fecha pasada
function showPastDatePopup() {
    const pastDatePopup = document.getElementById("pastDatePopup");
    pastDatePopup.style.display = "flex";

    // Asigna el evento para detectar teclas Enter y Escape
    document.addEventListener("keydown", handlePastDatePopupKeys);
}

// Función para cerrar el popup de fecha pasada
function closePastDatePopup() {
    document.getElementById("pastDatePopup").style.display = "none";
    document.removeEventListener("keydown", handlePastDatePopupKeys);
}

// Función para manejar teclas en el popup de fecha pasada
function handlePastDatePopupKeys(event) {
    if (event.key === "Enter" || event.key === "Escape") {
        closePastDatePopup();
    }
}

// Crear el calendario completo para el año
function createCalendar(year) {
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.innerHTML = ""; // Limpiar el calendario

    for (let month = 0; month < 12; month++) {
        const monthDiv = document.createElement("div");
        monthDiv.classList.add("month");
        if (month === currentMonth) {
            monthDiv.classList.add("current-month");
        }

        const monthTitle = document.createElement("h2");
        monthTitle.textContent = monthNames[month];
        monthDiv.appendChild(monthTitle);

        const daysDiv = document.createElement("div");
        daysDiv.classList.add("days");

        dayNames.forEach(dayName => {
            const dayHeader = document.createElement("div");
            dayHeader.classList.add("day-names");
            dayHeader.textContent = dayName;
            daysDiv.appendChild(dayHeader);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("day");
            daysDiv.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = day;

            const dateKey = `${year}-${month + 1}-${day}`;
            const isPastDate = new Date(year, month, day) < today;

            if (selectedDays[dateKey]) {
                dayDiv.classList.add("event-day");
                dayDiv.addEventListener("click", () => showDeleteEventPopup(dateKey));
            } else if (!isPastDate) {
                dayDiv.addEventListener("click", () => showCreateEventPopup(dateKey));
            } else {
                // Si es una fecha pasada, muestra el popup de fecha pasada
                dayDiv.addEventListener("click", showPastDatePopup);
            }

            if (year === currentYear && month === currentMonth && day === currentDay) {
                dayDiv.classList.add("today");
            }

            daysDiv.appendChild(dayDiv);
        }

        monthDiv.appendChild(daysDiv);
        calendarDiv.appendChild(monthDiv);
    }
}


// Verificar eventos del día actual al cargar la página
function checkForTodayEvents() {
    const todayKey = `${currentYear}-${currentMonth + 1}-${currentDay}`;
    if (selectedDays[todayKey]) {
        showPopup(`¡LLEGO EL DIA!: ${selectedDays[todayKey]}`);
    }
}

createCalendar(currentYear);
checkForTodayEvents();
