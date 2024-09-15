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

        usl: {
            _equipo: '#',
            birmingham_legion: 'img/concacaf/usl/birminghamlegion.png',  
            charleston_battery: 'img/concacaf/usl/charlestonbattery.png',
            detroitcity: 'img/concacaf/usl/detroitcity.png', 
            el_paso_locomotive: 'img/concacaf/usl/elpasolocomotive.png', 
            hartford_athletic: 'img/concacaf/usl/hartfordathletic.png',
            indy_eleven: 'img/concacaf/usl/indyeleven.png',
            las_vegas_lights: 'img/concacaf/usl/lasvegaslights.png',
            loudoun_united: 'img/concacaf/usl/loudoununited.png',
            louisville_city: 'img/concacaf/usl/louisvillecity.png',
            memphis_901: 'img/concacaf/usl/memphis901.png',
            miami: 'img/concacaf/usl/miami.png',
            monterey_bay: 'img/concacaf/usl/montereybay.png',
            new_mexico_united: 'img/concacaf/usl/newmexicounited.png',
            north_carolina: 'img/concacaf/usl/northcarolina.png',
            oakland_roots: 'img/concacaf/usl/oaklandroots.png',
            orange_county: 'img/concacaf/usl/orangecounty.png',
            phoenix_rising: 'img/concacaf/usl/phoenixrising.png',
            pittsburgh_riverhounds: 'img/concacaf/usl/pittsburghriverhounds.png',
            rhode_island: 'img/concacaf/usl/rhodeisland.png',
            sacramento_republic: 'img/concacaf/usl/sacramentorepublic.png',
            san_antonio: 'img/concacaf/usl/sanantonio.png',
            switchbacks: 'img/concacaf/usl/switchbacks.png',
            tampa_bay_rowdies: 'img/concacaf/usl/tampabayrowdies.png',
            tulsa: 'img/concacaf/usl/tulsa.png',
        },

        nwsl: {
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

        cpl: {
            _equipo: '#',
            atletico_ottawa: 'img/concacaf/canadianpremierleague/atleticoottawa.png',  
            cavalry: 'img/concacaf/canadianpremierleague/cavalry.png',
            forge: 'img/concacaf/canadianpremierleague/forge.png', 
            hfx_wanderers: 'img/concacaf/canadianpremierleague/hfxwanderers.png', 
            pacific: 'img/concacaf/canadianpremierleague/pacific.png',
            valour: 'img/concacaf/canadianpremierleague/valour.png',
            vancouver: 'img/concacaf/canadianpremierleague/vancouver.png',
            york_united: 'img/concacaf/canadianpremierleague/yorkunited.png',
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

        uefa: {
            _equipo: '#',
            albania: 'img/uefa/selecciones/albania.png',  
            alemania: 'img/uefa/selecciones/alemania.png',
            andorra: 'img/uefa/selecciones/andorra.png', 
            armenia: 'img/uefa/selecciones/armenia.png', 
            austria: 'img/uefa/selecciones/austria.png',
            austria_2: 'img/uefa/selecciones/austria2.png',
            azerbaiyan: 'img/uefa/selecciones/azerbaiyan.png',
            belgica: 'img/uefa/selecciones/belgica.png',
            bielorrusia: 'img/uefa/selecciones/bielorrusia.png',
            bosnia_y_herzegovina: 'img/uefa/selecciones/bosniayherzegovina.png',
            bulgaria: 'img/uefa/selecciones/bulgaria.png',
            chipre: 'img/uefa/selecciones/chipre.png',
            croacia: 'img/uefa/selecciones/croacia.png',
            dinamarca: 'img/uefa/selecciones/dinamarca.png',
            escocia: 'img/uefa/selecciones/escocia.png',
            eslovaquia: 'img/uefa/selecciones/eslovaquia.png',
            eslovenia: 'img/uefa/selecciones/eslovenia.png',
            espana: 'img/uefa/selecciones/espana.png',
            estonia: 'img/uefa/selecciones/estonia.png',
            finlandia: 'img/uefa/selecciones/finlandia.png',
            francia: 'img/uefa/selecciones/francia.png',
            francia_2: 'img/uefa/selecciones/francia2.png',
            gales: 'img/uefa/selecciones/gales.png',
            georgia: 'img/uefa/selecciones/georgia.png',
            gibraltar: 'img/uefa/selecciones/gibraltar.png',
            grecia: 'img/uefa/selecciones/grecia.png',
            hungria: 'img/uefa/selecciones/hungria.png',
            inglaterra: 'img/uefa/selecciones/inglaterra.png',
            irlanda: 'img/uefa/selecciones/irlanda.png',
            irlanda_del_norte: 'img/uefa/selecciones/irlandadelnorte.png',
            islandia: 'img/uefa/selecciones/islandia.png',
            islandia_2: 'img/uefa/selecciones/islandia2.png',
            islas_feroe: 'img/uefa/selecciones/islasferoe.png',
            israel: 'img/uefa/selecciones/israel.png',
            italia: 'img/uefa/selecciones/italia.png',
            kazajistan: 'img/uefa/selecciones/kazajistan.png',
            kosovo: 'img/uefa/selecciones/kosovo.png',
            letonia: 'img/uefa/selecciones/letonia.png',
            liechtenstein: 'img/uefa/selecciones/liechtenstein.png',
            lituania: 'img/uefa/selecciones/lituania.png',
            luxemburgo: 'img/uefa/selecciones/luxemburgo.png',
            malta: 'img/uefa/selecciones/malta.png',
            moldavia: 'img/uefa/selecciones/moldavia.png',
            montenegro: 'img/uefa/selecciones/montenegro.png',
            noruega: 'img/uefa/selecciones/noruega.png',
            paises_bajos: 'img/uefa/selecciones/paisesbajos.png',
            paises_bajos_2: 'img/uefa/selecciones/paisesbajos2.png',
            polonia: 'img/uefa/selecciones/polonia.png',
            portugal: 'img/uefa/selecciones/portugal.png',
            republica_checa: 'img/uefa/selecciones/republicacheca.png',
            republica_de_macedonia: 'img/uefa/selecciones/republicadmacedonia.png',
            rumania: 'img/uefa/selecciones/rumania.png',
            rusia: 'img/uefa/selecciones/rusia.png',
            sanmarino: 'img/uefa/selecciones/sanmarino.png',
            serbia: 'img/uefa/selecciones/serbia.png',
            suecia: 'img/uefa/selecciones/suecia.png',
            suiza: 'img/uefa/selecciones/suiza.png',
            turquia: 'img/uefa/selecciones/turquia.png',
            ucrania: 'img/uefa/selecciones/ucrania.png',
        },

        ofc: {
            _equipo: '#',
            fiji: 'img/ofc/selecciones/fiji.png',  
            islas_cook: 'img/ofc/selecciones/islascook.png',
            islas_salomon: 'img/ofc/selecciones/islassalomon.png', 
            kiribati: 'img/ofc/selecciones/kiribati.png', 
            niue: 'img/ofc/selecciones/niue.png',
            nueva_caledonia: 'img/ofc/selecciones/nuevacaledonia.png',
            nueva_zelanda: 'img/ofc/selecciones/nuevazelanda.png',
            nueva_zelanda_2: 'img/ofc/selecciones/nuevazelanda2.png',
            papua_nueva_guinea: 'img/ofc/selecciones/papuanuevaguinea.png',
            samoa: 'img/ofc/selecciones/samoa.png',
            samoa_americana: 'img/ofc/selecciones/samoaamericana.png',
            tahiti: 'img/ofc/selecciones/tahiti.png',
            tonga: 'img/ofc/selecciones/tonga.png',
            tuvalu: 'img/ofc/selecciones/tuvalu.png',
            vanatu: 'img/ofc/selecciones/vanatu.png',
        },
        // Agrega más ligas y logos
    }
};

// Función para cargar imágenes o colores de fondo
function cargarImagenes() {
    const tipoFondoSeleccionado = document.querySelector('input[name="fondoTipo"]:checked').value;

    if (tipoFondoSeleccionado === 'imagen') {
        const fondoSeleccionado = document.getElementById('fondoSelector').value;
        const fondo = new Image();
        fondo.src = imagenes.fondos[fondoSeleccionado];
        
        fondo.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas
            ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);  // Dibujar el fondo de imagen

            // Cargar los logos
            cargarLogos();
        };
    } else {
        // Si se seleccionan colores, cargar el fondo con colores
        const color1 = document.getElementById('color1').value;
        const color2 = document.getElementById('color2').value;

        // Limpiar el canvas antes de dibujar
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calcular la diagonal del canvas para asegurar que cubra completamente al rotar
        const diagonal = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));

        // Guardar el estado actual del contexto
        ctx.save();

        // Mover el punto de origen al centro del canvas para rotar alrededor de él
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Rotar el contexto en -63 grados (convertidos a radianes)
        ctx.rotate(26 * Math.PI / 180);

        // Dibujar la mitad izquierda del canvas con el primer color
        ctx.fillStyle = color1;  // Primer color seleccionado
        ctx.fillRect(-diagonal / 2, -diagonal / 2, diagonal / 2, diagonal);  // Dibujar desde el inicio hasta la mitad

        // Dibujar la mitad derecha del canvas con el segundo color
        ctx.fillStyle = color2;  // Segundo color seleccionado
        ctx.fillRect(0, -diagonal / 2, diagonal / 2, diagonal);  // Dibujar desde la mitad hasta el final

        // Restaurar el estado del contexto
        ctx.restore();

        // Cargar los logos
        cargarLogos();
    }
}

// Función para cargar los logos seleccionados
function cargarLogos() {
    const logo1Seleccionado = document.getElementById('logo1Selector').value;
    const logo2Seleccionado = document.getElementById('logo2Selector').value;
    const tipoFondoSeleccionado = document.querySelector('input[name="fondoTipo"]:checked').value;  // Verificar si es imagen o colores

    const logo1 = new Image();
    const logo2 = new Image();

    // Verificar si la liga seleccionada es 'todos' o una liga específica
    if (ligaSeleccionada === 'todos') {
        logo1.src = buscarLogoEnTodasLasLigas(logo1Seleccionado);
        logo2.src = buscarLogoEnTodasLasLigas(logo2Seleccionado);
    } else {
        logo1.src = imagenes.logos[ligaSeleccionada][logo1Seleccionado];
        logo2.src = imagenes.logos[ligaSeleccionada][logo2Seleccionado];
    }

    // Dibujar logos basado en el fondo seleccionado
    logo1.onload = () => {
        let logo1Size, logo1X, logo1Y;
        
        if (tipoFondoSeleccionado === 'imagen') {
            // Usar medidas y posiciones para fondo de imagen
            logo1Size = ajustarTamañoProporcional(logo1, 392, 420);
            logo1X = 162 + (392 - logo1Size.width) / 2;
            logo1Y = 103 + (420 - logo1Size.height) / 2;
        } else {
            // Usar medidas y posiciones para fondo de colores
            logo1Size = ajustarTamañoProporcional(logo1, 370, 398);
            logo1X = 100 + (392 - logo1Size.width) / 2;
            logo1Y = 103 + (420 - logo1Size.height) / 2;
        }

        ctx.drawImage(logo1, logo1X, logo1Y, logo1Size.width, logo1Size.height);
    };

    logo2.onload = () => {
        let logo2Size, logo2X, logo2Y;
        
        if (tipoFondoSeleccionado === 'imagen') {
            // Usar medidas y posiciones para fondo de imagen
            logo2Size = ajustarTamañoProporcional(logo2, 392, 420);
            logo2X = 646 + (392 - logo2Size.width) / 2;
            logo2Y = 103 + (420 - logo2Size.height) / 2;
        } else {
            // Usar medidas y posiciones para fondo de colores
            logo2Size = ajustarTamañoProporcional(logo2, 370, 398);
            logo2X = 708 + (392 - logo2Size.width) / 2;
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
function buscarLogoEnTodasLasLigas(equipo) {
    for (const liga in imagenes.logos) {
        if (imagenes.logos[liga][equipo]) {
            return imagenes.logos[liga][equipo];
        }
    }
    return ''; // Si no se encuentra el logo
}

// Función para filtrar logos según la liga seleccionada
function filtrarLogosPorLiga() {
    ligaSeleccionada = document.getElementById('ligaSelector').value;
    const logo1Selector = document.getElementById('logo1Selector');
    const logo2Selector = document.getElementById('logo2Selector');

    // Limpiar los selectores de logos
    logo1Selector.innerHTML = '';
    logo2Selector.innerHTML = '';

    const logosAgregados = new Set();
    let equipos = [];

    if (ligaSeleccionada === 'todos') {
        for (const liga in imagenes.logos) {
            for (const equipo in imagenes.logos[liga]) {
                if (!logosAgregados.has(equipo)) {
                    logosAgregados.add(equipo);
                    equipos.push(equipo); // Agregar equipo a la lista
                }
            }
        }
    } else {
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

// Mostrar u ocultar los selectores según el tipo de fondo seleccionado
function mostrarOpcionesFondo() {
    const tipoFondoSeleccionado = document.querySelector('input[name="fondoTipo"]:checked').value;
    const fondoSelector = document.getElementById('fondoSelector');
    const colorInputsContainer = document.getElementById('colorInputsContainer');

    if (tipoFondoSeleccionado === 'imagen') {
        fondoSelector.style.display = 'block';
        colorInputsContainer.style.display = 'none';
    } else {
        fondoSelector.style.display = 'none';
        colorInputsContainer.style.display = 'block';
    }

    // Forzar la recarga del fondo cada vez que se cambie entre imagen y color
    cargarImagenes(); // Llamar a cargarImagenes para aplicar el cambio inmediatamente
}

// Event listener para cambiar entre imagen y color
document.querySelectorAll('input[name="fondoTipo"]').forEach(input => {
    input.addEventListener('change', mostrarOpcionesFondo);
});

// Event listeners para el cambio de liga y logos
document.getElementById('ligaSelector').addEventListener('change', filtrarLogosPorLiga);
document.getElementById('logo1Selector').addEventListener('change', cargarImagenes);
document.getElementById('logo2Selector').addEventListener('change', cargarImagenes);

// Event listeners para cambio de fondo o color
document.getElementById('fondoSelector').addEventListener('change', cargarImagenes);
document.querySelectorAll('#color1, #color2').forEach(inputColor => {
    inputColor.addEventListener('input', cargarImagenes);
});

// Ejecutar al cargar la página
window.addEventListener('load', () => {
    // Forzar el fondo azul por defecto al cargar la página
    document.getElementById('color1').value = '#0000FF';  // Azul por defecto
    cargarImagenes();

    // Filtrar logos por la liga seleccionada al inicio
    filtrarLogosPorLiga();
});