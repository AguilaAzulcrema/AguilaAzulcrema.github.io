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
            america: 'img/concacaf/ligamx/america.png',  
            atlas: 'img/concacaf/ligamx/atlas.png',
            chivas: 'img/concacaf/ligamx/chivas.png', 
            cruz_azul: 'img/concacaf/ligamx/cruzazul.png', 
            juarez: 'img/concacaf/ligamx/juarez.png',
            leon: 'img/concacaf/ligamx/leon.png',
            mazatlan: 'img/concacaf/ligamx/mazatlan.png',
            monterrey: 'img/concacaf/ligamx/monterrey.png',
            necaxa: 'img/concacaf/ligamx/necaxa.png',
            pachuca: 'img/concacaf/ligamx/pachuca.png',
            puebla: 'img/concacaf/ligamx/puebla.png',
            pumas: 'img/concacaf/ligamx/pumas.png',
            queretaro: 'img/concacaf/ligamx/queretaro.png',
            san_luis: 'img/concacaf/ligamx/sanluis.png',
            santos: 'img/concacaf/ligamx/santos.png',
            tigres: 'img/concacaf/ligamx/tigres.png',
            tijuana: 'img/concacaf/ligamx/tijuana.png',
            toluca: 'img/concacaf/ligamx/toluca.png',
            // Agrega más logos
        },

        ligamxf: {
            _equipo: '#',
            america: 'img/concacaf/ligamxfemenil/america.png',  
            atlas: 'img/concacaf/ligamxfemenil/atlas.png',
            chivas: 'img/concacaf/ligamxfemenil/chivas.png', 
            cruz_azul: 'img/concacaf/ligamxfemenil/cruzazul.png', 
            juarez: 'img/concacaf/ligamxfemenil/juarez.png',
            leon: 'img/concacaf/ligamxfemenil/leon.png',
            mazatlan: 'img/concacaf/ligamxfemenil/mazatlan.png',
            necaxa: 'img/concacaf/ligamxfemenil/necaxa.png',
            pachuca: 'img/concacaf/ligamxfemenil/pachuca.png',
            puebla: 'img/concacaf/ligamxfemenil/puebla.png',
            pumas: 'img/concacaf/ligamxfemenil/pumas.png',
            queretaro: 'img/concacaf/ligamxfemenil/queretaro.png',
            rayadas: 'img/concacaf/ligamxfemenil/rayadas.png',
            san_luis: 'img/concacaf/ligamxfemenil/sanluis.png',
            santos: 'img/concacaf/ligamxfemenil/santos.png',
            tigres: 'img/concacaf/ligamxfemenil/tigres.png',
            tijuana: 'img/concacaf/ligamxfemenil/tijuana.png',
            toluca: 'img/concacaf/ligamxfemenil/toluca.png',
        },

        expansionmx: {
            _equipo: '#',
            alebrijes: 'img/concacaf/expansionmx/alebrijes.png',
            atlante: 'img/concacaf/expansionmx/atlante.png',
            cancun: 'img/concacaf/expansionmx/cancun.png',
            celaya: 'img/concacaf/expansionmx/celaya.png',
            correcaminos: 'img/concacaf/expansionmx/correcaminos.png',
            dorados: 'img/concacaf/expansionmx/dorados.png',
            la_paz: 'img/concacaf/expansionmx/lapaz.png',
            mineros: 'img/concacaf/expansionmx/mineros.png',
            morelia: 'img/concacaf/expansionmx/morelia.png',
            tampico: 'img/concacaf/expansionmx/tampico.png',
            tapatio: 'img/concacaf/expansionmx/tapatio.png',
            tepatitlan: 'img/concacaf/expansionmx/tepatitlan.png',
            tlaxcala: 'img/concacaf/expansionmx/tlaxcala.png',
            udg: 'img/concacaf/expansionmx/udg.png',
            venados: 'img/concacaf/expansionmx/venados.png',
            // Otros logos de la Liga de Expansión MX
        },

        mls: {
            _equipo: '#',
            atlanta_united: 'img/concacaf/mls/atlantaunited.png',  
            austin: 'img/concacaf/mls/austin.png',
            charlotte: 'img/concacaf/mls/charlotte.png', 
            chicago_fire: 'img/concacaf/mls/chicagofire.png', 
            cincinnati: 'img/concacaf/mls/cincinnati.png',
            colorado_rapids: 'img/concacaf/mls/coloradorapids.png',
            columbus_crew: 'img/concacaf/mls/columbuscrew.png',
            dc_united: 'img/concacaf/mls/dcunited.png',
            fc_dallas: 'img/concacaf/mls/fcdallas.png',
            houston_dynamo: 'img/concacaf/mls/houstondynamo.png',
            inter_miami: 'img/concacaf/mls/intermiami.png',
            lafc: 'img/concacaf/mls/losangelesfc.png',
            la_galaxy: 'img/concacaf/mls/losangelesgalaxy.png',
            minnesota_united: 'img/concacaf/mls/minnesotaunited.png',
            montreal: 'img/concacaf/mls/montreal.png',
            nashville: 'img/concacaf/mls/nashville.png',
            new_england_revolution: 'img/concacaf/mls/newenglandrevolution.png',
            new_york_city: 'img/concacaf/mls/newyorkcity.png',
            new_york_red_bulls: 'img/concacaf/mls/newyorkredbulls.png',
            orlando_city: 'img/concacaf/mls/orlandocity.png',
            philadelphia_union: 'img/concacaf/mls/philadelphiaunion.png',
            portland_timbers: 'img/concacaf/mls/portlandtimbers.png',
            real_salt_lake: 'img/concacaf/mls/realsaltlake.png',
            san_diego: 'img/concacaf/mls/sandiegofc.png',
            san_jose_earthquakes: 'img/concacaf/mls/sanjoseearthquakes.png',
            seattle_sounders: 'img/concacaf/mls/seattlesounders.png',
            sporting_kansas_city: 'img/concacaf/mls/sportingkansascity.png',
            st_louis_city: 'img/concacaf/mls/Stlouiscity.png',
            toronto: 'img/concacaf/mls/toronto.png',
            vancouver_whitecaps: 'img/concacaf/mls/vancouverwhitecaps.png',
        },

        nwls: {
            _equipo: '#',
            angel_city: 'img/concacaf/nwsl/angelcity.png',  
            bay_fc: 'img/concacaf/nwsl/bayfc.png',
            chicago_red_stars: 'img/concacaf/nwsl/chicagoredstars.png', 
            houston_dash: 'img/concacaf/nwsl/houstondash.png', 
            kansas_city_current: 'img/concacaf/nwsl/kansascitycurrent.png',
            nj_ny_gotham: 'img/concacaf/nwsl/njnygotham.png',
            north_carolina_courage: 'img/concacaf/nwsl/northcarolinacourage.png',
            orlando_pride: 'img/concacaf/nwsl/orlandopride.png',
            portland_thorns: 'img/concacaf/nwsl/portlandthorns.png',
            racing_louisville: 'img/concacaf/nwsl/racinglouisville.png',
            san_diego_wave: 'img/concacaf/nwsl/sandiegowave.png',
            seattle_reign: 'img/concacaf/nwsl/seattlereign.png',
            utah_royals: 'img/concacaf/nwsl/utahroyals.png',
            washintong_spirit: 'img/concacaf/nwsl/washingtonspirit.png',
        },

        concacaf: {
            _equipo: '#',
            anguila: 'img/concacaf/selecciones/anguila.png',  
            antigua_y_barbuda: 'img/concacaf/selecciones/antiguaybarbuda.png',
            aruba: 'img/concacaf/selecciones/aruba.png', 
            bahamas: 'img/concacaf/selecciones/bahamas.png', 
            barbados: 'img/concacaf/selecciones/barbados.png',
            belice: 'img/concacaf/selecciones/belice.png',
            bermudas: 'img/concacaf/selecciones/bermuda.png',
            bonaire: 'img/concacaf/selecciones/bonaire.png',
            canada: 'img/concacaf/selecciones/canada.png',
            costarica: 'img/concacaf/selecciones/costarica.png',
            cuba: 'img/concacaf/selecciones/cuba.png',
            curazao: 'img/concacaf/selecciones/curazao.png',
            dominica: 'img/concacaf/selecciones/dominica.png',
            el_salvador: 'img/concacaf/selecciones/elsalvador.png',
            estados_unidos: 'img/concacaf/selecciones/estadosunidos.png',
            granada: 'img/concacaf/selecciones/granada.png',
            guadalupe: 'img/concacaf/selecciones/guadalupe.png',
            guatemala: 'img/concacaf/selecciones/guatemala.png',
            guyana: 'img/concacaf/selecciones/guyana.png',
            guyana_francesa: 'img/concacaf/selecciones/guyanafrancesa.png',
            haiti: 'img/concacaf/selecciones/haiti.png',
            honduras: 'img/concacaf/selecciones/honduras.png',
            islas_caiman: 'img/concacaf/selecciones/islascaiman.png',
            islas_turcas_y_caicos: 'img/concacaf/selecciones/islasturcasycaicos.png',
            islas_virgenes_britanicas: 'img/concacaf/selecciones/islasvirgenesbritanicas.png',
            islas_virgenes_de_estados_unidos: 'img/concacaf/selecciones/islasvirgenesdeestadosunidos.png',
            jamaica: 'img/concacaf/selecciones/jamaica.png',
            martinica: 'img/concacaf/selecciones/martinica.png',
            mexico: 'img/concacaf/selecciones/mexico.png',
            montserrat: 'img/concacaf/selecciones/montserrat.png',
            nicaragua: 'img/concacaf/selecciones/nicaragua.png',
            panama: 'img/concacaf/selecciones/panama.png',
            puerto_rico: 'img/concacaf/selecciones/puertorico.png',
            republica_dominicana: 'img/concacaf/selecciones/republicadominicana.png',
            saint_martin: 'img/concacaf/selecciones/saintmartin.png',
            sint_maarten: 'img/concacaf/selecciones/sintmaarten.png',
            san_cristobal_y_nieves: 'img/concacaf/selecciones/sancristobalynieves.png',
            santa_lucia: 'img/concacaf/selecciones/santalucia.png',
            san_vicente: 'img/concacaf/selecciones/sanvicente.png',
            surinam: 'img/concacaf/selecciones/surinam.png',
            trinidad_y_tobago: 'img/concacaf/selecciones/trinidadytobago.png',
        },

        conmebol: {
            _equipo: '#',
            argentina: 'img/conmebol/selecciones/argentina.png',  
            bolivia: 'img/conmebol/selecciones/bolivia.png',
            brasil: 'img/conmebol/selecciones/brasil.png', 
            chile: 'img/conmebol/selecciones/chile.png', 
            colombia: 'img/conmebol/selecciones/colombia.png',
            ecuador: 'img/conmebol/selecciones/ecuador.png',
            paraguay: 'img/conmebol/selecciones/paraguay.png',
            peru: 'img/conmebol/selecciones/peru.png',
            uruguay: 'img/conmebol/selecciones/uruguay.png',
            venezuela: 'img/conmebol/selecciones/venezuela.png',
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