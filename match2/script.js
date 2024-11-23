// Variables para los elementos HTML
const selectLigas = document.getElementById('liga');
const selectEquipoLocal = document.getElementById('equipoLocal');
const selectEquipoVisitante = document.getElementById('equipoVisitante');
const selectLigaLogo = document.getElementById('ligaLogo');
const colorLocalInput = document.getElementById('colorLocal');
const colorVisitanteInput = document.getElementById('colorVisitante');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let jsonData; // Definir jsonData

// Función para cargar el archivo JSON
function cargarDatosJSON() {
    fetch('equipos.json') // Asegúrate de que la ruta sea correcta
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Asignar los datos a jsonData
            cargarLigas(); // Cargar ligas después de haber obtenido el JSON
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

// Función para cargar las ligas al cargar la página
function cargarLigas() {
    // Agregar la opción "Todos" al inicio del select
    const optionTodos = document.createElement('option');
    optionTodos.value = "todos";
    optionTodos.textContent = "Todos";
    selectLigas.appendChild(optionTodos);

    // Luego, cargar el resto de las ligas
    for (const liga in jsonData.ligas) {
        const option = document.createElement('option');
        option.value = liga;
        option.textContent = jsonData.ligas[liga].nombre;
        selectLigas.appendChild(option);
    }
    cargarEquiposPorLiga(); // Cargar los equipos de la primera liga al inicio
}

// Función para cargar equipos según la liga seleccionada
function cargarEquiposPorLiga() {
    // Limpiar los selects de equipos
    selectEquipoLocal.innerHTML = '';
    selectEquipoVisitante.innerHTML = '';

    const ligaSeleccionada = selectLigas.value;
    let equipos = [];

    // Si se selecciona la opción "Todos", combinar equipos de todas las ligas
    if (ligaSeleccionada === "todos") {
        const equiposSet = new Set(); // Para evitar duplicados basados en el nombre del equipo

        for (const liga in jsonData.ligas) {
            jsonData.ligas[liga].equipos.forEach(equipo => {
                if (!equiposSet.has(equipo.nombre)) {
                    equiposSet.add(equipo.nombre); // Agregar solo nombres únicos
                    equipos.push(equipo); // Agregar el equipo a la lista final
                }
            });
        }
    } else {
        // Si no es "Todos", cargar solo los equipos de la liga seleccionada
        equipos = jsonData.ligas[ligaSeleccionada].equipos;
    }

    // Ordenar los equipos por nombre alfabéticamente
    equipos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Llenar los selects de equipo local y visitante
    equipos.forEach((equipo, index) => {
        const optionLocal = document.createElement('option');
        const optionVisitante = document.createElement('option');

        optionLocal.value = equipo.logo;
        optionLocal.textContent = equipo.nombre;

        optionVisitante.value = equipo.logo;
        optionVisitante.textContent = equipo.nombre;

        selectEquipoLocal.appendChild(optionLocal);
        selectEquipoVisitante.appendChild(optionVisitante);
    });

    // Seleccionar el primer equipo por defecto
    if (equipos.length > 0) {
        selectEquipoLocal.selectedIndex = 0;
        selectEquipoVisitante.selectedIndex = 1;
    }

    // Cargar los logos de la liga
    cargarLogoLiga();

    // Generar la imagen automáticamente
    generarImagen();
}


// Función para cargar los logos de la liga
function cargarLogoLiga() {
    selectLigaLogo.innerHTML = '';

    const ligaSeleccionada = selectLigas.value;

    if (ligaSeleccionada === "todos") {
        const logosSet = new Set(); // Para evitar duplicados de logos

        for (const liga in jsonData.logos_ligas) {
            if (!logosSet.has(jsonData.logos_ligas[liga])) {
                logosSet.add(jsonData.logos_ligas[liga]);

                const option = document.createElement('option');
                option.value = jsonData.logos_ligas[liga];
                option.textContent = jsonData.ligas[liga].nombre;
                selectLigaLogo.appendChild(option);
            }
        }
    } else {
        const option = document.createElement('option');
        option.value = jsonData.logos_ligas[ligaSeleccionada];
        option.textContent = jsonData.ligas[ligaSeleccionada].nombre;
        selectLigaLogo.appendChild(option);
    }
}


// Función para generar la imagen en el canvas
function generarImagen() {
    const colorLocal = colorLocalInput.value;
    const colorVisitante = colorVisitanteInput.value;
    const logoLocal = selectEquipoLocal.value;
    const logoVisitante = selectEquipoVisitante.value;
    const logoLiga = selectLigaLogo.value;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar los colores de fondo (local y visitante)
    ctx.fillStyle = colorLocal;
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

    ctx.fillStyle = colorVisitante;
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);

    // Cargar y dibujar los logos
    cargarImagen(logoLocal, 159, 176, 275, 275);  // Logo del equipo local
    cargarImagen(logoVisitante, 766, 176, 275, 275);  // Logo del equipo visitante
    cargarImagen(logoLiga, 500, 214, 200, 200);  // Logo de la liga en el centro
}

// Función para cargar las imágenes de los logos
function cargarImagen(src, x, y, maxWidth, maxHeight) {
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
        ctx.drawImage(img, x, y, width, height);
    };
}


// Función para descargar la imagen en formato PNG
function descargarImagen() {
    // Crear un enlace temporal
    const enlace = document.createElement('a');
    // Convertir el contenido del canvas a una imagen en formato PNG
    enlace.href = canvas.toDataURL('image/png');
    // Establecer el nombre del archivo a descargar
    enlace.download = 'imagen.png';
    // Simular un clic en el enlace para descargar la imagen
    enlace.click();
}

// Evento para actualizar la imagen en vivo
selectLigas.addEventListener('change', cargarEquiposPorLiga);
selectEquipoLocal.addEventListener('change', generarImagen);
selectEquipoVisitante.addEventListener('change', generarImagen);
selectLigaLogo.addEventListener('change', generarImagen);
colorLocalInput.addEventListener('input', generarImagen);
colorVisitanteInput.addEventListener('input', generarImagen);

// Cargar los datos JSON al inicio
cargarDatosJSON();
