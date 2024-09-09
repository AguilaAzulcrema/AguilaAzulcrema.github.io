const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

let ligaSeleccionada = 'ligamx'; // Liga por defecto

// Lista de fondos y logos agrupados por liga
const imagenes = {
    fondos: {
        fondo1: 'img/fondos/azul.jpeg',  
        fondo2: 'img/fondos/black.png',
        fondo3: 'img/fondos/ligamx.jpeg',
        fondo4: 'img/fondos/ligamxf.jpeg',
        fondo5: 'img/fondos/championscup.jpeg',
        fondo6: 'img/fondos/verde.jpeg', 
        fondo7: 'img/fondos/leaguescup.jpeg',
        fondo8: 'img/fondos/red.jpeg',
        fondo9: 'img/fondos/champions.jpeg',
        fondo10: 'img/fondos/europaleague.jpeg',
        fondo11: 'img/fondos/conferenceleague.jpeg',
        fondo12: 'img/fondos/uefanationsleague.jpeg',
        fondo13: 'img/fondos/conmebol.jpeg',
        // Agrega más fondos
    },

    logos: {
        ligamx: {
            _equipo: '#',
            america: 'img/ligamx/america.png',  
            atlas: 'img/ligamx/atlas.png',
            chivas: 'img/ligamx/chivas.png', 
            cruz_azul: 'img/ligamx/cruzazul.png', 
            juarez: 'img/ligamx/juarez.png',
            leon: 'img/ligamx/leon.png',
            mazatlan: 'img/ligamx/mazatlan.png',
            monterrey: 'img/ligamx/monterrey.png',
            necaxa: 'img/ligamx/necaxa.png',
            pachuca: 'img/ligamx/pachuca.png',
            puebla: 'img/ligamx/puebla.png',
            pumas: 'img/ligamx/pumas.png',
            queretaro: 'img/ligamx/queretaro.png',
            san_luis: 'img/ligamx/sanluis.png',
            santos: 'img/ligamx/santos.png',
            tigres: 'img/ligamx/tigres.png',
            tijuana: 'img/ligamx/tijuana.png',
            toluca: 'img/ligamx/toluca.png',
            // Agrega más logos
        },

        ligamxf: {
            _equipo: '#',
            america: 'img/ligamxfemenil/america.png',  
            atlas: 'img/ligamxfemenil/atlas.png',
            chivas: 'img/ligamxfemenil/chivas.png', 
            cruz_azul: 'img/ligamxfemenil/cruzazul.png', 
            juarez: 'img/ligamxfemenil/juarez.png',
            leon: 'img/ligamxfemenil/leon.png',
            mazatlan: 'img/ligamxfemenil/mazatlan.png',
            necaxa: 'img/ligamxfemenil/necaxa.png',
            pachuca: 'img/ligamxfemenil/pachuca.png',
            puebla: 'img/ligamxfemenil/puebla.png',
            pumas: 'img/ligamxfemenil/pumas.png',
            queretaro: 'img/ligamxfemenil/queretaro.png',
            rayadas: 'img/ligamxfemenil/rayadas.png',
            san_luis: 'img/ligamxfemenil/sanluis.png',
            santos: 'img/ligamxfemenil/santos.png',
            tigres: 'img/ligamxfemenil/tigres.png',
            tijuana: 'img/ligamxfemenil/tijuana.png',
            toluca: 'img/ligamxfemenil/toluca.png',
        },

        expansionmx: {
            _equipo: '#',
            alebrijes: 'img/expansionmx/alebrijes.png',
            atlante: 'img/expansionmx/atlante.png',
            cancun: 'img/expansionmx/cancun.png',
            celaya: 'img/expansionmx/celaya.png',
            correcaminos: 'img/expansionmx/correcaminos.png',
            dorados: 'img/expansionmx/dorados.png',
            la_paz: 'img/expansionmx/lapaz.png',
            mineros: 'img/expansionmx/mineros.png',
            morelia: 'img/expansionmx/morelia.png',
            tampico: 'img/expansionmx/tampico.png',
            tapatio: 'img/expansionmx/tapatio.png',
            tepatitlan: 'img/expansionmx/tepatitlan.png',
            tlaxcala: 'img/expansionmx/tlaxcala.png',
            udg: 'img/expansionmx/udg.png',
            venados: 'img/expansionmx/venados.png',
            // Otros logos de la Liga de Expansión MX
        },

        selecciones: {
            _equipo: '#',
            mexico: 'img/selecciones/mexico.png',
            canada: 'img/selecciones/canada.png',
            nueva_zelanda: 'img/selecciones/nuevazelanda.png',
            nueva_zelanda2: 'img/selecciones/nuevazelanda2.png',
          // Otros logos de Selecciones
        },

        mls: {
            _equipo: '#',
            atlanta_united: 'img/mls/atlantaunited.png',  
            austin: 'img/mls/austin.png',
            charlotte: 'img/mls/charlotte.png', 
            chicago_fire: 'img/mls/chicagofire.png', 
            cincinnati: 'img/mls/cincinnati.png',
            colorado_rapids: 'img/mls/coloradorapids.png',
            columbus_crew: 'img/mls/columbuscrew.png',
            dc_united: 'img/mls/dcunited.png',
            fc_dallas: 'img/mls/fcdallas.png',
            houston_dynamo: 'img/mls/houstondynamo.png',
            inter_miami: 'img/mls/intermiami.png',
            lafc: 'img/mls/losangelesfc.png',
            la_galaxy: 'img/mls/losangelesgalaxy.png',
            minnesota_united: 'img/mls/minnesotaunited.png',
            montreal: 'img/mls/montreal.png',
            nashville: 'img/mls/nashville.png',
            new_england_revolution: 'img/mls/newenglandrevolution.png',
            new_york_city: 'img/mls/newyorkcity.png',
            new_york_red_bulls: 'img/mls/newyorkredbulls.png',
            orlando_city: 'img/mls/orlandocity.png',
            philadelphia_union: 'img/mls/philadelphiaunion.png',
            portland_timbers: 'img/mls/portlandtimbers.png',
            real_salt_lake: 'img/mls/realsaltlake.png',
            san_diego: 'img/mls/sandiegofc.png',
            san_jose_earthquakes: 'img/mls/sanjoseearthquakes.png',
            seattle_sounders: 'img/mls/seattlesounders.png',
            sporting_kansas_city: 'img/mls/sportingkansascity.png',
            st_louis_city: 'img/mls/Stlouiscity.png',
            toronto: 'img/mls/toronto.png',
            vancouver_whitecaps: 'img/mls/vancouverwhitecaps.png',
        },

        nwls: {
            _equipo: '#',
            angel_city: 'img/nwsl/angelcity.png',  
            bay_fc: 'img/nwsl/bayfc.png',
            chicago_red_stars: 'img/nwsl/chicagoredstars.png', 
            houston_dash: 'img/nwsl/houstondash.png', 
            kansas_city_current: 'img/nwsl/kansascitycurrent.png',
            nj_ny_gotham: 'img/nwsl/njnygotham.png',
            north_carolina_courage: 'img/nwsl/northcarolinacourage.png',
            orlando_pride: 'img/nwsl/orlandopride.png',
            portland_thorns: 'img/nwsl/portlandthorns.png',
            racing_louisville: 'img/nwsl/racinglouisville.png',
            san_diego_wave: 'img/nwsl/sandiegowave.png',
            seattle_reign: 'img/nwsl/seattlereign.png',
            utah_royals: 'img/nwsl/utahroyals.png',
            washintong_spirit: 'img/nwsl/washingtonspirit.png',
        },
        // Agrega más ligas y logos
    }
};

// Función para cargar las imágenes seleccionadas
function cargarImagenes() {
    const fondoSeleccionado = document.getElementById('fondoSelector').value;
    const logo1Seleccionado = document.getElementById('logo1Selector').value;
    const logo2Seleccionado = document.getElementById('logo2Selector').value;

    const fondo = new Image();
    const logo1 = new Image();
    const logo2 = new Image();

    fondo.src = imagenes.fondos[fondoSeleccionado];

    // Verificar si la opción "Todos los equipos" está seleccionada
    if (ligaSeleccionada === 'todos') {
        // Buscar logo en todas las ligas
        logo1.src = buscarLogoEnTodasLasLigas(logo1Seleccionado);
        logo2.src = buscarLogoEnTodasLasLigas(logo2Seleccionado);
    } else {
        // Cargar logo según la liga seleccionada
        logo1.src = imagenes.logos[ligaSeleccionada][logo1Seleccionado];
        logo2.src = imagenes.logos[ligaSeleccionada][logo2Seleccionado];
    }

    fondo.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

        logo1.onload = () => {
            const logo1Size = ajustarTamañoProporcional(logo1, 392, 420);  // Tamaño deseado para el logo 1
            const logo1X = 162 + (392 - logo1Size.width) / 2;  // Centrar el logo 1
            const logo1Y = 103 + (420 - logo1Size.height) / 2;
            ctx.drawImage(logo1, logo1X, logo1Y, logo1Size.width, logo1Size.height);

            logo2.onload = () => {
                const logo2Size = ajustarTamañoProporcional(logo2, 392, 420);  // Tamaño deseado para el logo 2
                const logo2X = 646 + (392 - logo2Size.width) / 2;  // Centrar el logo 2
                const logo2Y = 103 + (420 - logo2Size.height) / 2;
                ctx.drawImage(logo2, logo2X, logo2Y, logo2Size.width, logo2Size.height);
            };
        };
    };
}

// Función para buscar un logo en todas las ligas
function buscarLogoEnTodasLasLigas(equipo) {
    for (const liga in imagenes.logos) {
        if (imagenes.logos[liga][equipo]) {
            return imagenes.logos[liga][equipo]; // Retorna el logo si lo encuentra
        }
    }
    return ''; // Retorna una cadena vacía si no encuentra el logo
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

// Función para filtrar logos según la liga seleccionada
function filtrarLogosPorLiga() {
    ligaSeleccionada = document.getElementById('ligaSelector').value; // Actualizar la liga seleccionada
    const logo1Selector = document.getElementById('logo1Selector');
    const logo2Selector = document.getElementById('logo2Selector');

    // Limpiar los selectores de logos
    logo1Selector.innerHTML = '';
    logo2Selector.innerHTML = '';

    const logosAgregados = new Set();
    let equipos = [];

    if (ligaSeleccionada === 'todos') {
        // Recopilar todos los logos, sin repetir
        for (const liga in imagenes.logos) {
            for (const equipo in imagenes.logos[liga]) {
                if (!logosAgregados.has(equipo)) {
                    logosAgregados.add(equipo);
                    equipos.push(equipo); // Agregar equipo a la lista
                }
            }
        }
    } else {
        // Recopilar logos solo de la liga seleccionada
        for (const equipo in imagenes.logos[ligaSeleccionada]) {
            equipos.push(equipo);
        }
    }

    // Ordenar alfabéticamente y agregar al selector
    equipos.sort((a, b) => a.localeCompare(b));
    equipos.forEach(equipo => {
        agregarOpcionLogo(logo1Selector, equipo);
        agregarOpcionLogo(logo2Selector, equipo);
    });

    // Cargar imágenes con los logos filtrados
    cargarImagenes();
}

// Función para agregar una opción de logo a un selector
function agregarOpcionLogo(selector, equipo) {
    const option = document.createElement('option');
    option.value = equipo;
    // Eliminar guiones bajos y capitalizar correctamente
    option.textContent = equipo.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    selector.appendChild(option);
}

// Función para descargar la imagen del canvas
function descargarImagen() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');  // Convierte el contenido del canvas a una URL de imagen
    link.download = 'partido.png';  // Nombre predeterminado para el archivo
    link.click();  // Dispara la descarga
}

// Añadir el evento al botón de descarga
document.getElementById('descargarImagen').addEventListener('click', descargarImagen);

// Cargar imágenes iniciales
window.onload = function() {
    filtrarLogosPorLiga(); // Filtrar logos según la liga seleccionada por defecto
};