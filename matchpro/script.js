const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// Inicializar variables globales
let jsonData; // Para los datos de equipos cargados del JSON
let ligaSeleccionada = 'todos'; // Liga por defecto para modo imagen
let modoActual = 'imagen'; // Modo por defecto (imagen o colores)

// Obtener referencias a elementos DOM
const fondoImagenContainer = document.getElementById('fondoImagenContainer');
const fondoColoresContainer = document.getElementById('fondoColoresContainer');

// Función para cargar el archivo JSON
function cargarDatosJSON() {
    fetch('equipos.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            cargarLigasEnSelectores();
            filtrarLogosPorLiga(); // Cargar los equipos iniciales en modo imagen
            cargarEquiposPorLiga(); // Cargar los equipos iniciales en modo colores
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

// Función para cargar las ligas en ambos selectores
function cargarLigasEnSelectores() {
    const ligaSelector = document.getElementById('ligaSelector');
    const ligaModoColores = document.getElementById('liga');
    
    // Limpiar selectores
    ligaSelector.innerHTML = '<option value="todos">Todos</option>';
    ligaModoColores.innerHTML = '<option value="todos">Todos</option>';
    
    // Array de ligas a excluir en el modo imagen
    const ligasExcluidas = ['amistoso', 'mundialdeclubes', 'copaoro', 'leaguescup', 'facup'];
    
    // Llenar selectores con las ligas del JSON
    for (const liga in jsonData.ligas) {
        // Para el selector del modo imagen, excluir las ligas en el array de exclusiones
        if (!ligasExcluidas.includes(liga)) {
            const optionImagen = document.createElement('option');
            optionImagen.value = liga;
            optionImagen.textContent = jsonData.ligas[liga].nombre;
            ligaSelector.appendChild(optionImagen);
        }
        
        // Para el selector del modo colores, incluir todas las ligas
        const optionColores = document.createElement('option');
        optionColores.value = liga;
        optionColores.textContent = jsonData.ligas[liga].nombre;
        ligaModoColores.appendChild(optionColores);
    }
}

// Función para cambiar entre los modos de fondo
function cambiarModoFondo() {
    modoActual = document.querySelector('input[name="fondoTipo"]:checked').value;
    
    if (modoActual === 'imagen') {
        fondoImagenContainer.style.display = 'flex';
        fondoColoresContainer.style.display = 'none';
        cargarImagenes(); // Actualizar canvas con fondos de imagen
    } else {
        fondoImagenContainer.style.display = 'none';
        fondoColoresContainer.style.display = 'flex';
        cargarEquiposPorLiga(); // Forzar la carga de equipos al cambiar al modo colores
    }
}

// FUNCIONES PARA MODO IMAGEN //

// Función para cargar imágenes en modo fondo de imagen
function cargarImagenes() {
    if (modoActual !== 'imagen') return;
    
    const fondoSeleccionado = document.getElementById('fondoSelector').value;
    
    // Cargar el fondo seleccionado
    const fondo = new Image();
    fondo.src = 'img/fondos/' + fondoSeleccionado + '.jpeg';
    
    fondo.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);  // Dibujar el fondo de imagen

        // Cargar los logos
        cargarLogos();
    };
    
    // Si la imagen no carga, intentar con extensión PNG
    fondo.onerror = () => {
        fondo.src = 'img/fondos/' + fondoSeleccionado + '.png';
    };
}

// Función para cargar los logos en modo imagen
function cargarLogos() {
    if (!jsonData) return; // Verificar que el JSON esté cargado
    
    const logo1Selector = document.getElementById('logo1Selector');
    const logo2Selector = document.getElementById('logo2Selector');
    const fondoSeleccionado = document.getElementById('fondoSelector').value;
    
    if (logo1Selector.options.length === 0 || logo2Selector.options.length === 0) return;
    
    const logo1Seleccionado = logo1Selector.value;
    const logo2Seleccionado = logo2Selector.value;
    
    const logo1 = new Image();
    const logo2 = new Image();
    
    // Lista de fondos que usarán medidas especiales
    const fondosConMedidasEspeciales = ['fondo5'];
    
    // Buscar las rutas de los logos
    if (ligaSeleccionada === 'todos') {
        logo1.src = buscarLogoEnTodasLasLigas(logo1Seleccionado);
        logo2.src = buscarLogoEnTodasLasLigas(logo2Seleccionado);
    } else {
        // Buscar en el equipo específico en la liga seleccionada
        const equipos1 = jsonData.ligas[ligaSeleccionada].equipos;
        const equipos2 = jsonData.ligas[ligaSeleccionada].equipos;
        
        const equipo1 = equipos1.find(eq => eq.id === logo1Seleccionado);
        const equipo2 = equipos2.find(eq => eq.id === logo2Seleccionado);
        
        if (equipo1) logo1.src = equipo1.logo;
        if (equipo2) logo2.src = equipo2.logo;
    }
    
    logo1.onload = () => {
        let logo1Size, logo1X, logo1Y;
        
        // Verificar si el fondo seleccionado está en la lista de fondos con medidas especiales
        if (fondosConMedidasEspeciales.includes(fondoSeleccionado)) {
            // Usar las medidas especiales para fondo5
            logo1Size = ajustarTamañoProporcional(logo1, 370, 398);
            logo1X = 100 + (392 - logo1Size.width) / 2;
            logo1Y = 103 + (420 - logo1Size.height) / 2;
        } else {
            // Usar las medidas estándar para otros fondos
            logo1Size = ajustarTamañoProporcional(logo1, 392, 420);
            logo1X = 162 + (392 - logo1Size.width) / 2;
            logo1Y = 103 + (420 - logo1Size.height) / 2;
        }
        
        ctx.drawImage(logo1, logo1X, logo1Y, logo1Size.width, logo1Size.height);
    };
    
    logo2.onload = () => {
        let logo2Size, logo2X, logo2Y;
        
        // Verificar si el fondo seleccionado está en la lista de fondos con medidas especiales
        if (fondosConMedidasEspeciales.includes(fondoSeleccionado)) {
            // Usar las medidas especiales para fondo5
            logo2Size = ajustarTamañoProporcional(logo2, 370, 398);
            logo2X = 708 + (392 - logo2Size.width) / 2;
            logo2Y = 103 + (420 - logo2Size.height) / 2;
        } else {
            // Usar las medidas estándar para otros fondos
            logo2Size = ajustarTamañoProporcional(logo2, 392, 420);
            logo2X = 646 + (392 - logo2Size.width) / 2;
            logo2Y = 103 + (420 - logo2Size.height) / 2;
        }
        
        ctx.drawImage(logo2, logo2X, logo2Y, logo2Size.width, logo2Size.height);
    };
}

// Función para ajustar tamaño manteniendo proporción
function ajustarTamañoProporcional(img, targetWidth, targetHeight) {
    const aspectRatio = img.width / img.height;
    let newWidth = targetWidth;
    let newHeight = targetHeight;

    if (img.width > img.height) {
        newHeight = targetWidth / aspectRatio;
    } else {
        newWidth = targetHeight * aspectRatio;
    }

    return { width: newWidth, height: newHeight };
}

// Función para buscar un logo en todas las ligas
function buscarLogoEnTodasLasLigas(equipoId) {
    if (!jsonData) return '';
    
    for (const liga in jsonData.ligas) {
        const equipoEncontrado = jsonData.ligas[liga].equipos.find(eq => eq.id === equipoId);
        if (equipoEncontrado) {
            return equipoEncontrado.logo;
        }
    }
    return ''; // Si no se encuentra el logo
}

// Función para filtrar logos según la liga seleccionada (modo imagen)
function filtrarLogosPorLiga() {
    if (!jsonData) return;
    
    ligaSeleccionada = document.getElementById('ligaSelector').value;
    const logo1Selector = document.getElementById('logo1Selector');
    const logo2Selector = document.getElementById('logo2Selector');

    // Limpiar los selectores de logos
    logo1Selector.innerHTML = '';
    logo2Selector.innerHTML = '';

    let equipos = [];

    if (ligaSeleccionada === 'todos') {
        // Obtener todos los equipos de todas las ligas
        for (const liga in jsonData.ligas) {
            jsonData.ligas[liga].equipos.forEach(equipo => {
                // Verificar si el equipo ya está en la lista para evitar duplicados
                if (!equipos.some(e => e.id === equipo.id)) {
                    equipos.push(equipo);
                }
            });
        }
    } else {
        // Obtener solo los equipos de la liga seleccionada
        equipos = jsonData.ligas[ligaSeleccionada].equipos;
    }

    // Ordenar alfabéticamente
    equipos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Agregar opciones a los selectores
    equipos.forEach(equipo => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        
        option1.value = equipo.id;
        option1.textContent = equipo.nombre;
        
        option2.value = equipo.id;
        option2.textContent = equipo.nombre;
        
        logo1Selector.appendChild(option1);
        logo2Selector.appendChild(option2);
    });

    // Establecer diferentes equipos por defecto
    if (logo2Selector.options.length > 1) {
        logo2Selector.selectedIndex = 1;
    }

    // Cargar imágenes con los logos filtrados
    cargarImagenes();
}

// FUNCIONES PARA MODO COLORES //

// Función para cargar equipos según la liga seleccionada (modo colores)
function cargarEquiposPorLiga() {
    if (!jsonData) return;
    
    const ligaSeleccionada = document.getElementById('liga').value;
    const selectEquipoLocal = document.getElementById('equipoLocal');
    const selectEquipoVisitante = document.getElementById('equipoVisitante');
    const selectLigaLogo = document.getElementById('ligaLogo');
    
    // Limpiar los selects de equipos
    selectEquipoLocal.innerHTML = '';
    selectEquipoVisitante.innerHTML = '';
    selectLigaLogo.innerHTML = '';

    let equipos = [];

    // Si se selecciona la opción "Todos", combinar equipos de todas las ligas
    if (ligaSeleccionada === "todos") {
        for (const liga in jsonData.ligas) {
            jsonData.ligas[liga].equipos.forEach(equipo => {
                // Verificar si el equipo ya está en la lista para evitar duplicados
                if (!equipos.some(e => e.id === equipo.id)) {
                    equipos.push(equipo);
                }
            });
        }
        
        // Agregar todos los logos de ligas
        for (const liga in jsonData.ligas) {
            if (jsonData.logos_ligas && jsonData.logos_ligas[liga]) {
                const option = document.createElement('option');
                option.value = jsonData.logos_ligas[liga];
                option.textContent = jsonData.ligas[liga].nombre;
                selectLigaLogo.appendChild(option);
            }
        }
    } else {
        // Si no es "Todos", cargar solo los equipos de la liga seleccionada
        equipos = jsonData.ligas[ligaSeleccionada].equipos;
        
        // Agregar solo el logo de la liga seleccionada
        if (jsonData.logos_ligas && jsonData.logos_ligas[ligaSeleccionada]) {
            const option = document.createElement('option');
            option.value = jsonData.logos_ligas[ligaSeleccionada];
            option.textContent = jsonData.ligas[ligaSeleccionada].nombre;
            selectLigaLogo.appendChild(option);
        }
    }

    // Ordenar los equipos por nombre alfabéticamente
    equipos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Llenar los selects de equipo local y visitante
    equipos.forEach((equipo, index) => {
        const optionLocal = document.createElement('option');
        const optionVisitante = document.createElement('option');

        optionLocal.value = equipo.logo;
        optionLocal.textContent = equipo.nombre;
        optionLocal.dataset.id = equipo.id;

        optionVisitante.value = equipo.logo;
        optionVisitante.textContent = equipo.nombre;
        optionVisitante.dataset.id = equipo.id;

        selectEquipoLocal.appendChild(optionLocal);
        selectEquipoVisitante.appendChild(optionVisitante);
    });

    // Seleccionar diferentes equipos por defecto
    if (selectEquipoVisitante.options.length > 1) {
        selectEquipoVisitante.selectedIndex = 1;
    }

    // Generar la imagen automáticamente
    generarImagenColores();
}

// Función para generar la imagen en el canvas (modo colores)
function generarImagenColores() {
    if (modoActual !== 'colores') return;
    
    const selectEquipoLocal = document.getElementById('equipoLocal');
    const selectEquipoVisitante = document.getElementById('equipoVisitante');
    const ligaLogoSelect = document.getElementById('ligaLogo');
    
    // Verificar que los selectores tengan opciones antes de continuar
    if (selectEquipoLocal.options.length === 0 || 
        selectEquipoVisitante.options.length === 0 || 
        ligaLogoSelect.options.length === 0) return;
    
    const colorLocal = document.getElementById('colorLocal').value;
    const colorVisitante = document.getElementById('colorVisitante').value;
    const logoLocal = selectEquipoLocal.value;
    const logoVisitante = selectEquipoVisitante.value;
    const logoLiga = ligaLogoSelect.value;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar los colores de fondo (local y visitante)
    ctx.fillStyle = colorLocal;
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

    ctx.fillStyle = colorVisitante;
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);

    // Cargar y dibujar los logos
    cargarImagenEquipo(logoLocal, 159, 176, 275, 275);  // Logo del equipo local
    cargarImagenEquipo(logoVisitante, 766, 176, 275, 275);  // Logo del equipo visitante
    cargarImagenEquipo(logoLiga, 500, 214, 200, 200);  // Logo de la liga en el centro
}

// Función para cargar las imágenes de los logos (modo colores)
function cargarImagenEquipo(src, x, y, maxWidth, maxHeight) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        // Obtener las dimensiones originales de la imagen
        const originalWidth = img.width;
        const originalHeight = img.height;

        // Calcular la relación de aspecto
        const aspectRatio = originalWidth / originalHeight;

        // Inicializar las nuevas dimensiones
        let width = maxWidth;
        let height = maxHeight;

        // Ajustar el tamaño según la relación de aspecto
        if (originalWidth > originalHeight) {
            // Si la imagen es más ancha que alta, ajusta el ancho al máximo permitido y escala la altura
            height = width / aspectRatio;
        } else {
            // Si la imagen es más alta que ancha, ajusta la altura al máximo permitido y escala el ancho
            width = height * aspectRatio;
        }

        // Dibujar la imagen en el canvas con el tamaño ajustado
        ctx.drawImage(img, x - width/2 + maxWidth/2, y - height/2 + maxHeight/2, width, height);
    };
}

// Función para descargar la imagen del canvas
function descargarImagen() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'partido.png';
    link.click();
}

// Función para leer parámetros de la URL
function obtenerParametroUrl(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

// Función para preseleccionar equipos desde parámetros de URL
function preseleccionarEquiposDesdeUrl() {
    // Obtener parámetros de la URL
    const ligaParam = obtenerParametroUrl('liga');
    const equipo1Param = obtenerParametroUrl('equipo1');
    const equipo2Param = obtenerParametroUrl('equipo2');
    const modoParam = obtenerParametroUrl('modo');
    
    // Si no hay parámetros, no hacer nada
    if (!ligaParam || !equipo1Param || !equipo2Param) {
        return;
    }
    
    // Esperar a que los datos JSON se carguen
    setTimeout(() => {
        if (modoParam === 'imagen') {
            // Modo imagen (código existente, sin cambios)
            const ligaSelector = document.getElementById('ligaSelector');
            if (ligaSelector) {
                for (let i = 0; i < ligaSelector.options.length; i++) {
                    if (ligaSelector.options[i].value === ligaParam) {
                        ligaSelector.selectedIndex = i;
                        const event = new Event('change');
                        ligaSelector.dispatchEvent(event);
                        break;
                    }
                }
            }
            
            setTimeout(() => {
                const logo1Selector = document.getElementById('logo1Selector');
                if (logo1Selector) {
                    for (let i = 0; i < logo1Selector.options.length; i++) {
                        if (logo1Selector.options[i].value === equipo1Param) {
                            logo1Selector.selectedIndex = i;
                            break;
                        }
                    }
                }
                
                const logo2Selector = document.getElementById('logo2Selector');
                if (logo2Selector) {
                    for (let i = 0; i < logo2Selector.options.length; i++) {
                        if (logo2Selector.options[i].value === equipo2Param) {
                            logo2Selector.selectedIndex = i;
                            break;
                        }
                    }
                }
                
                cargarImagenes();
            }, 300);
        } else {
            // Modo colores (código corregido)
            const ligaSelector = document.getElementById('liga');
            if (ligaSelector) {
                for (let i = 0; i < ligaSelector.options.length; i++) {
                    if (ligaSelector.options[i].value === ligaParam) {
                        ligaSelector.selectedIndex = i;
                        const event = new Event('change');
                        ligaSelector.dispatchEvent(event);
                        break;
                    }
                }
            }
            
            setTimeout(() => {
                const selectLocal = document.getElementById('equipoLocal');
                const selectVisitante = document.getElementById('equipoVisitante');
                
                if (selectLocal) {
                    for (let i = 0; i < selectLocal.options.length; i++) {
                        if (selectLocal.options[i].dataset.id === equipo1Param) {
                            selectLocal.selectedIndex = i;
                            break;
                        }
                    }
                }
                
                if (selectVisitante) {
                    for (let i = 0; i < selectVisitante.options.length; i++) {
                        if (selectVisitante.options[i].dataset.id === equipo2Param) {
                            selectVisitante.selectedIndex = i;
                            break;
                        }
                    }
                }
                
                generarImagenColores();
            }, 300);
        }
    }, 500);
}

// Event Listeners
document.getElementById('descargarImagen').addEventListener('click', descargarImagen);

// Evento para cambiar entre imagen y color
document.querySelectorAll('input[name="fondoTipo"]').forEach(input => {
    input.addEventListener('change', cambiarModoFondo);
});

// Modificar los selectores de color para que actualicen en tiempo real
const colorLocal = document.getElementById('colorLocal');
const colorVisitante = document.getElementById('colorVisitante');

// Añadir evento 'input' para actualización en tiempo real mientras se selecciona el color
colorLocal.addEventListener('input', generarImagenColores);
colorVisitante.addEventListener('input', generarImagenColores);

// Cargar JSON al iniciar la página
window.addEventListener('load', () => {
    cargarDatosJSON();
    
    // Leer el parámetro "modo" de la URL
    const modoParam = obtenerParametroUrl('modo');
    if (modoParam) {
        // Seleccionar el radio button correspondiente
        const radio = document.querySelector(`input[name="fondoTipo"][value="${modoParam}"]`);
        if (radio) {
            radio.checked = true;
        }
    }
    
    cambiarModoFondo(); // Establecer el modo inicial
    
    // Preseleccionar equipos desde parámetros de URL (añadir después de cargar el JSON)
    preseleccionarEquiposDesdeUrl();
});