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
        fondo14: 'img/fondos/expansion.jpeg',
        fondo15: 'img/fondos/fondo5.jpg',
        fondo16: 'img/fondos/champions2.jpeg',
        fondo17: 'img/fondos/libertadores.jpg',
        fondo18: 'img/fondos/sudamericana.jpg',
        fondo19: 'img/fondos/concacafnationsleague.jpeg',
        fondo20: 'img/fondos/ligamxliguilla.jpeg',
        fondo21: 'img/fondos/copaoro.jpeg',
        fondo22: 'img/fondos/campeondecampeones.jpeg',

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
            irapuato: 'img/concacaf/expansionmx/irapuato.png',
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

        ligapremiermx: {
            _equipo: '#',
            acatlan: 'img/concacaf/ligapremiermx/acatlan.png',  
            agricultores_de_guasave: 'img/concacaf/ligapremiermx/agricultoresdeguasave.png',
            aguacateros_de_periban: 'img/concacaf/ligapremiermx/aguacaterosdeperiban.png', 
            atletico_aragon: 'img/concacaf/ligapremiermx/atleticoaragon.png', 
            chilpancingo: 'img/concacaf/ligapremiermx/chilpancingo.png',
            cimarrones: 'img/concacaf/ligapremiermx/cimarrones.png',
            club_deportivo_uruapan: 'img/concacaf/ligapremiermx/clubdeportivouruapan.png',
            colima: 'img/concacaf/ligapremiermx/colima.png',
            correcaminos: 'img/concacaf/ligapremiermx/correcaminos2.png',
            deportiva_venados: 'img/concacaf/ligapremiermx/deportivavenados.png',
            durango: 'img/concacaf/ligapremiermx/durango.png',
            faraones_texcoco: 'img/concacaf/ligapremiermx/faraonestexcoco.png',
            gavilanes_matamoros: 'img/concacaf/ligapremiermx/gavilanesmatamoros.png',
            halcones: 'img/concacaf/ligapremiermx/halcones.png',
            interplaya_del_carmen: 'img/concacaf/ligapremiermx/interplayadelcarmen.png',
            jaguares: 'img/concacaf/ligapremiermx/jaguares.png',
            la_piedad: 'img/concacaf/ligapremiermx/lapiedad.png',
            leones_negros: 'img/concacaf/ligapremiermx/leonesnegros2.png',
            lobos_ulmx: 'img/concacaf/ligapremiermx/lobosulmx.png',
            los_cabos_united: 'img/concacaf/ligapremiermx/loscabosunited.png',
            mexicali: 'img/concacaf/ligapremiermx/mexicali.png',
            mineros_de_fresnillo: 'img/concacaf/ligapremiermx/minerosdefresnillo.png',
            montañeses: 'img/concacaf/ligapremiermx/montañeses.png',
            pioneros_cancun: 'img/concacaf/ligapremiermx/pioneroscancun.png',
            racing_de_veracruz: 'img/concacaf/ligapremiermx/racingdeveracruz.png',
            real_apodaca: 'img/concacaf/ligapremiermx/realapodaca.png',
            salamanca: 'img/concacaf/ligapremiermx/salamanca.png',
            sporting_canamy: 'img/concacaf/ligapremiermx/sportingcanamy.png',
            tapachula: 'img/concacaf/ligapremiermx/tapachula.png',
            tecos: 'img/concacaf/ligapremiermx/tecos.png',
            tigres_de_alica: 'img/concacaf/ligapremiermx/tigresdealica.png',
            tritones_vallarta: 'img/concacaf/ligapremiermx/tritonesvallarta.png',
            universidad_autonoma_de_zacatecas: 'img/concacaf/ligapremiermx/universidadautonomadezacatecas.png',
            zacatepec: 'img/concacaf/ligapremiermx/zacatepec.png',
            zitacuaro: 'img/concacaf/ligapremiermx/zitacuaro.png',
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
            san_antonio_us: 'img/concacaf/usl/sanantonio.png',
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

        costarica: {
            _equipo: '#',
            alajuelense: 'img/concacaf/costarica/alajuelense.png',  
            cartagines: 'img/concacaf/costarica/cartagines.png',
            guanacasteca: 'img/concacaf/costarica/guanacasteca.png', 
            herediano: 'img/concacaf/costarica/herediano.png', 
            liberia: 'img/concacaf/costarica/liberia.png',
            perez_zeledon: 'img/concacaf/costarica/perezzeledon.png',
            puntarenas: 'img/concacaf/costarica/puntarenas.png',
            san_carlos: 'img/concacaf/costarica/sancarlos.png',
            santa_ana: 'img/concacaf/costarica/santaana.png',
            santos_de_guapiles: 'img/concacaf/costarica/santosdeguapiles.png',
            saprissa: 'img/concacaf/costarica/saprissa.png',
            sporting_cr: 'img/concacaf/costarica/sporting.png',
        },

        honduras: {
            _equipo: '#',
            genesis: 'img/concacaf/honduras/genesis.png',  
            juticalpa: 'img/concacaf/honduras/juticalpa.png',
            lobos_ho: 'img/concacaf/honduras/lobos.png', 
            marathon: 'img/concacaf/honduras/marathon.png', 
            motagua: 'img/concacaf/honduras/motagua.png',
            olancho: 'img/concacaf/honduras/olancho.png',
            olimpia_ho: 'img/concacaf/honduras/olimpia.png',
            real_españa: 'img/concacaf/honduras/realespaña.png',
            real_sociedad_ho: 'img/concacaf/honduras/realsociedad.png',
            victoria: 'img/concacaf/honduras/victoria.png',
        },

        guatemala: {
            _equipo: '#',
            achuapa: 'img/concacaf/guatemala/achuapa.png',  
            antigua: 'img/concacaf/guatemala/antigua.png',
            coban_imperial: 'img/concacaf/guatemala/cobanimperial.png', 
            comunicaciones: 'img/concacaf/guatemala/comunicaciones.png', 
            guastatoya: 'img/concacaf/guatemala/guastatoya.png',
            malacateco: 'img/concacaf/guatemala/malacateco.png',
            marquense: 'img/concacaf/guatemala/marquense.png',
            mixco: 'img/concacaf/guatemala/mixco.png',
            municipal: 'img/concacaf/guatemala/municipal.png',
            xelaju: 'img/concacaf/guatemala/xelaju.png',
            xinabajul: 'img/concacaf/guatemala/xinabajul.png',
            zacapa: 'img/concacaf/guatemala/zacapa.png',
        },

        panama: {
            _equipo: '#',
            alianza_pa: 'img/concacaf/panama/alianza.png',  
            arabe_unido: 'img/concacaf/panama/arabeunido.png',
            herrera: 'img/concacaf/panama/herrera.png', 
            independiente_pa: 'img/concacaf/panama/independiente.png', 
            plaza_amador: 'img/concacaf/panama/plazaamador.png',
            potros_del_este: 'img/concacaf/panama/potrosdeleste.png',
            san_francisco: 'img/concacaf/panama/sanfrancisco.png',
            sporting_san_miguielito: 'img/concacaf/panama/sportingsanmiguielito.png',
            tauro: 'img/concacaf/panama/tauro.png',
            umecit: 'img/concacaf/panama/umecit.png',
            universitario_pa: 'img/concacaf/panama/universitario.png',
            veraguas: 'img/concacaf/panama/veraguas.png',
        },

        dominicana: {
            _equipo: '#',
            atlantico: 'img/concacaf/dominicana/atlantico.png',  
            atletico_pantoja: 'img/concacaf/dominicana/atleticopantoja.png',
            cibao: 'img/concacaf/dominicana/cibao.png', 
            delfines_del_este: 'img/concacaf/dominicana/delfinesdeleste.png', 
            moca: 'img/concacaf/dominicana/moca.png',
            san_cristobal: 'img/concacaf/dominicana/sancristobal.png',
            universidad_OM: 'img/concacaf/dominicana/universidadoym.png',
            vegareal: 'img/concacaf/dominicana/vegareal.png',
        },

        nicaragua: {
            _equipo: '#',
            diriangen: 'img/concacaf/nicaragua/diriangen.png',  
            jalapa: 'img/concacaf/nicaragua/jalapa.png',
            managua: 'img/concacaf/nicaragua/managua.png', 
            matagalpa: 'img/concacaf/nicaragua/matagalpa.png', 
            ocotal: 'img/concacaf/nicaragua/ocotal.png',
            rancho_santana: 'img/concacaf/nicaragua/ranchosantana.png',
            real_esteli: 'img/concacaf/nicaragua/realesteli.png',
            sebaco: 'img/concacaf/nicaragua/sebaco.png',
            unam_managua: 'img/concacaf/nicaragua/unammanagua.png',
            walter_ferretti: 'img/concacaf/nicaragua/walterferretti.png',
        },

        elsalvador: {
            _equipo: '#',
            aguila: 'img/concacaf/elsalvador/aguila.png',  
            alianza_sv: 'img/concacaf/elsalvador/alianza.png',
            cacahuatique: 'img/concacaf/elsalvador/cacahuatique.png', 
            dragon: 'img/concacaf/elsalvador/dragon.png', 
            fas: 'img/concacaf/elsalvador/fas.png',
            firpo: 'img/concacaf/elsalvador/firpo.png',
            fuerte: 'img/concacaf/elsalvador/fuerte.png',
            limeno: 'img/concacaf/elsalvador/limeno.png',
            metapan: 'img/concacaf/elsalvador/metapan.png',
            once_deportivo: 'img/concacaf/elsalvador/oncedeportivo.png',
            platense_sv: 'img/concacaf/elsalvador/platense.png',
        },

        jamaica: {
            _equipo: '#',
            arnett_gardens: 'img/concacaf/jamaica/arnettgardens.png',  
            cavalier: 'img/concacaf/jamaica/cavalier.png',
            chapelton: 'img/concacaf/jamaica/chapelton.png', 
            dunbeholden: 'img/concacaf/jamaica/dunbeholden.png', 
            harbour_view: 'img/concacaf/jamaica/harbourview.png',
            humble_lions: 'img/concacaf/jamaica/humblelions.png',
            molynes_united: 'img/concacaf/jamaica/molynesunited.png',
            montego_bay_united: 'img/concacaf/jamaica/montegobayunited.png',
            mount_pleasant: 'img/concacaf/jamaica/mountpleasant.png',
            portmore_united: 'img/concacaf/jamaica/portmoreunited.png',
            racing_united: 'img/concacaf/jamaica/racingunited.png',
            tivoli_gardens: 'img/concacaf/jamaica/tivoligardens.png',
            vere_united: 'img/concacaf/jamaica/vereunited.png',
            waterhouse: 'img/concacaf/jamaica/waterhouse.png',
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

        argentina: {
            _equipo: '#',
            argentinos_juniors: 'img/conmebol/argentina/argentinosjuniors.png',  
            banfield: 'img/conmebol/argentina/banfield.png',
            barracas_central: 'img/conmebol/argentina/barracascentral.png', 
            belgrano: 'img/conmebol/argentina/belgrano.png', 
            boca_juniors: 'img/conmebol/argentina/bocajuniors.png',
            central_cordoba: 'img/conmebol/argentina/centralcordoba.png',
            defensa_y_justicia: 'img/conmebol/argentina/defensayjusticia.png',
            estudiantes: 'img/conmebol/argentina/estudiantesdelaplata.png',
            gimnasia_y_esgrima: 'img/conmebol/argentina/gimnasiayesgrimalaplata.png',
            godoy_cruz: 'img/conmebol/argentina/godoycruz.png',
            huracan: 'img/conmebol/argentina/huracan.png',
            independiente: 'img/conmebol/argentina/independiente.png',
            independiente_rivadavia: 'img/conmebol/argentina/independienterivadavia.png',
            instituto_atletico_central_cordoba: 'img/conmebol/argentina/institutoatleticocentralcordoba.png',
            lanus: 'img/conmebol/argentina/lanus.png',
            newells_old_boys: 'img/conmebol/argentina/newellsoldboys.png',
            platense: 'img/conmebol/argentina/platense.png',
            racing: 'img/conmebol/argentina/racing.png',
            riestra: 'img/conmebol/argentina/riestra.png',
            river_plate: 'img/conmebol/argentina/riverplate.png',
            rosario_central: 'img/conmebol/argentina/rosariocentral.png',
            san_lorenzo: 'img/conmebol/argentina/sanlorenzo.png',
            sarmiento_junin: 'img/conmebol/argentina/sarmientodejunin.png',
            talleres_de_cordoba: 'img/conmebol/argentina/talleresdecordoba.png',
            tigre: 'img/conmebol/argentina/tigre.png',
            tucuman: 'img/conmebol/argentina/tucuman.png',
            union_santa_fe: 'img/conmebol/argentina/unionsantafe.png',
            velez_sarsfield: 'img/conmebol/argentina/velezsarsfield.png',
        },

        argentinab: {
            _equipo: '#',
            agropecuario: 'img/conmebol/argentinab/agropecuario.png',  
            aldosivi: 'img/conmebol/argentinab/aldosivi.png',
            all_boys: 'img/conmebol/argentinab/allboys.png', 
            almagro: 'img/conmebol/argentinab/almagro.png', 
            almirante_brown: 'img/conmebol/argentinab/almirantebrown.png',
            alvarado: 'img/conmebol/argentinab/alvarado.png',
            arsenal_ar: 'img/conmebol/argentinab/arsenal.png',
            atlanta: 'img/conmebol/argentinab/atlanta.png',
            atletico_rafaela: 'img/conmebol/argentinab/atleticorafaela.png',
            brown_de_adrogue: 'img/conmebol/argentinab/browndeadrogue.png',
            chacarita_juniors: 'img/conmebol/argentinab/chacaritajuniors.png',
            chaco_for_ever: 'img/conmebol/argentinab/chacoforever.png',
            colon: 'img/conmebol/argentinab/colon.png',
            defensores_de_belgrano: 'img/conmebol/argentinab/defensoresdebelgrano.png',
            defensores_unidos: 'img/conmebol/argentinab/defensoresunidos.png',
            deportivo_madryn: 'img/conmebol/argentinab/deportivomadryn.png',
            deportivo_maipu: 'img/conmebol/argentinab/deportivomaipu.png',
            deportivo_moron: 'img/conmebol/argentinab/deportivomoron.png',
            estudiantes_2: 'img/conmebol/argentinab/estudiantes.png',
            estudiantes_rc: 'img/conmebol/argentinab/estudiantesrc.png',
            ferro_carril: 'img/conmebol/argentinab/ferrocarril.png',
            gimnasia_de_jujuy: 'img/conmebol/argentinab/gimnasiadejujuy.png',
            gimnasia_de_mendoza: 'img/conmebol/argentinab/gimnasiademendoza.png',
            gimnasia_y_tiro: 'img/conmebol/argentinab/gimnasiaytiro.png',
            guemes: 'img/conmebol/argentinab/guemes.png',
            guillermo_brown: 'img/conmebol/argentinab/guillermobrown.png',
            mitre_sde: 'img/conmebol/argentinab/mitresde.png',
            nueva_chicago: 'img/conmebol/argentinab/nuevachicago.png',
            patronato: 'img/conmebol/argentinab/patronato.png',
            quilmes: 'img/conmebol/argentinab/quilmes.png',
            racing_de_cordoba: 'img/conmebol/argentinab/racingdecordoba.png',
            san_martin: 'img/conmebol/argentinab/sanmartin.png',
            san_martin_t: 'img/conmebol/argentinab/sanmartint.png',
            san_miguel: 'img/conmebol/argentinab/sanmiguel.png',
            san_telmo: 'img/conmebol/argentinab/santelmo.png',
            talleres_re: 'img/conmebol/argentinab/talleresre.png',
            temperley: 'img/conmebol/argentinab/temperley.png',
            tristan_suarez: 'img/conmebol/argentinab/tristansuarez.png',
        },

        tecno: {
            _equipo: '#',
            always_ready: 'img/conmebol/ligatecno/alwaysready.png',  
            aurora: 'img/conmebol/ligatecno/aurora.png',
            blooming: 'img/conmebol/ligatecno/blooming.png', 
            bolivar: 'img/conmebol/ligatecno/bolivar.png', 
            fc_universitario: 'img/conmebol/ligatecno/fcuniversitario.png',
            guabira: 'img/conmebol/ligatecno/guabira.png',
            gv_san_jose: 'img/conmebol/ligatecno/gvsanjose.png',
            independiente_petrolero: 'img/conmebol/ligatecno/independientepetrolero.png',
            jorge_wilstermann: 'img/conmebol/ligatecno/jorgewilstermann.png',
            nacional_potosi: 'img/conmebol/ligatecno/nacionalpotosi.png',
            oriente_petrolero: 'img/conmebol/ligatecno/orientepetrolero.png',
            real_santa_cruz: 'img/conmebol/ligatecno/realsantacruz.png',
            real_tomayapo: 'img/conmebol/ligatecno/realtomayapo.png',
            royal_pari: 'img/conmebol/ligatecno/royalpari.png',
            san_antonio: 'img/conmebol/ligatecno/sanantonio.png',
            the_strongest: 'img/conmebol/ligatecno/thestrongest.png',
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

        laliga: {
            _equipo: '#',
            athletic_club: 'img/uefa/laliga/athleticclub.png',  
            atletico_de_madrid: 'img/uefa/laliga/atleticodemadrid.png',
            barcelona: 'img/uefa/laliga/barcelona.png', 
            celta_de_vigo: 'img/uefa/laliga/celtadevigo.png', 
            deportivo_alaves: 'img/uefa/laliga/deportivoalaves.png',
            espanyol: 'img/uefa/laliga/espanyol.png',
            getafe: 'img/uefa/laliga/getafe.png',
            girona: 'img/uefa/laliga/girona.png',
            las_palmas: 'img/uefa/laliga/laspalmas.png',
            leganes: 'img/uefa/laliga/leganes.png',
            mallorca: 'img/uefa/laliga/mallorca.png',
            osasuna: 'img/uefa/laliga/osasuna.png',
            rayo_vallecano: 'img/uefa/laliga/rayovallecano.png',
            real_betis: 'img/uefa/laliga/realbetis.png',
            real_madrid: 'img/uefa/laliga/realmadrid.png',
            real_sociedad: 'img/uefa/laliga/realsociedad.png',
            real_valladolid: 'img/uefa/laliga/realvalladolid.png',
            sevilla: 'img/uefa/laliga/sevilla.png',
            valencia: 'img/uefa/laliga/valencia.png',
            villarreal: 'img/uefa/laliga/villarreal.png',
        },

        laliga2: {
            _equipo: '#',
            albacete: 'img/uefa/laliga2/albacete.png',  
            almeria: 'img/uefa/laliga2/almeria.png',
            burgos: 'img/uefa/laliga2/burgos.png', 
            cadiz: 'img/uefa/laliga2/cadiz.png', 
            cartagena: 'img/uefa/laliga2/cartagena.png',
            castellon: 'img/uefa/laliga2/castellon.png',
            cordoba: 'img/uefa/laliga2/cordoba.png',
            deportivo_la_coruna: 'img/uefa/laliga2/deportivodelacoruna.png',
            eibar: 'img/uefa/laliga2/eibar.png',
            elche: 'img/uefa/laliga2/elche.png',
            eldense: 'img/uefa/laliga2/eldense.png',
            ferrol: 'img/uefa/laliga2/ferrol.png',
            granada_es: 'img/uefa/laliga2/granada.png',
            huesca: 'img/uefa/laliga2/huesca.png',
            levante: 'img/uefa/laliga2/levante.png',
            malaga: 'img/uefa/laliga2/malaga.png',
            mirandes: 'img/uefa/laliga2/mirandes.png',
            racing_de_santander: 'img/uefa/laliga2/racingdesantander.png',
            real_oviedo: 'img/uefa/laliga2/realoviedo.png',
            real_zaragoza: 'img/uefa/laliga2/realzaragoza.png',
            sporting_de_gijon: 'img/uefa/laliga2/sportingdegijon.png',
            tenerife: 'img/uefa/laliga2/tenerife.png',
        },

        premierleague: {
            _equipo: '#',
            arsenal: 'img/uefa/premierleague/arsenal.png',  
            aston_villa: 'img/uefa/premierleague/astonvilla.png',
            bournemouth: 'img/uefa/premierleague/bournemouth.png', 
            brentford: 'img/uefa/premierleague/brentford.png', 
            brighton: 'img/uefa/premierleague/brighton.png',
            chelsea: 'img/uefa/premierleague/chelsea.png',
            crystal_palace: 'img/uefa/premierleague/crystalpalace.png',
            everton: 'img/uefa/premierleague/everton.png',
            fulham: 'img/uefa/premierleague/fulham.png',
            ipswich: 'img/uefa/premierleague/ipswich.png',
            leicester_city: 'img/uefa/premierleague/leicestercity.png',
            liverpool: 'img/uefa/premierleague/liverpool.png',
            manchester_city: 'img/uefa/premierleague/manchestercity.png',
            manchester_united: 'img/uefa/premierleague/manchesterunited.png',
            newcastle: 'img/uefa/premierleague/newcastle.png',
            nottingham_forest: 'img/uefa/premierleague/nottinghamforest.png',
            southampton: 'img/uefa/premierleague/southampton.png',
            tottenham: 'img/uefa/premierleague/tottenham.png',
            west_ham: 'img/uefa/premierleague/westham.png',
            wolverhampton: 'img/uefa/premierleague/wolverhampton.png',
        },

        championship: {
            _equipo: '#',
            blackburn: 'img/uefa/championship/blackburn.png',  
            bristol_city: 'img/uefa/championship/bristolcity.png',
            burnley: 'img/uefa/championship/burnley.png', 
            cardiff: 'img/uefa/championship/cardiff.png', 
            coventry: 'img/uefa/championship/coventry.png',
            derby_county: 'img/uefa/championship/derbycounty.png',
            hullcity: 'img/uefa/championship/hullcity.png',
            leeds_united: 'img/uefa/championship/leedsunited.png',
            luton_town: 'img/uefa/championship/lutontown.png',
            middlesbrough: 'img/uefa/championship/middlesbrough.png',
            millwall: 'img/uefa/championship/millwall.png',
            norwich: 'img/uefa/championship/norwich.png',
            oxford_united: 'img/uefa/championship/oxfordunited.png',
            plymouth: 'img/uefa/championship/plymouth.png',
            portsmouth: 'img/uefa/championship/portsmouth.png',
            preston: 'img/uefa/championship/preston.png',
            qpr: 'img/uefa/championship/qpr.png',
            sheffield_united: 'img/uefa/championship/sheffieldunited.png',
            sheffield_wednesday: 'img/uefa/championship/sheffieldwednesday.png',
            stoke_city: 'img/uefa/championship/stokecity.png',
            sunderland: 'img/uefa/championship/sunderland.png',
            swansea_city: 'img/uefa/championship/swanseacity.png',
            watford: 'img/uefa/championship/watford.png',
            west_bromwich: 'img/uefa/championship/westbromwich.png',
        },

        seriea: {
            _equipo: '#',
            ac_milan: 'img/uefa/seriea/acmilan.png',  
            atalanta: 'img/uefa/seriea/atalanta.png',
            bologna: 'img/uefa/seriea/bologna.png', 
            cagliari: 'img/uefa/seriea/cagliari.png', 
            como: 'img/uefa/seriea/como.png',
            empoli: 'img/uefa/seriea/empoli.png',
            fiorentina: 'img/uefa/seriea/fiorentina.png',
            genoa: 'img/uefa/seriea/genoa.png',
            hellas_verona: 'img/uefa/seriea/hellasverona.png',
            internazionale: 'img/uefa/seriea/internazionale.png',
            juventus: 'img/uefa/seriea/juventus.png',
            juventus_2: 'img/uefa/seriea/juventus2.png',
            lazio: 'img/uefa/seriea/lazio.png',
            lecce: 'img/uefa/seriea/lecce.png',
            monza: 'img/uefa/seriea/monza.png',
            napoli: 'img/uefa/seriea/napoli.png',
            parma: 'img/uefa/seriea/parma.png',
            roma: 'img/uefa/seriea/roma.png',
            torino: 'img/uefa/seriea/torino.png',
            udinese: 'img/uefa/seriea/udinese.png',
            venezia: 'img/uefa/seriea/venezia.png',
        },

        serieb: {
            _equipo: '#',
            bari: 'img/uefa/serieb/bari.png',  
            brescia: 'img/uefa/serieb/brescia.png',
            carrarese: 'img/uefa/serieb/carrarese.png', 
            catanzaro: 'img/uefa/serieb/catanzaro.png', 
            cesena: 'img/uefa/serieb/cesena.png',
            cittadella: 'img/uefa/serieb/cittadella.png',
            cosenza: 'img/uefa/serieb/cosenza.png',
            cremonese: 'img/uefa/serieb/cremonese.png',
            frosinone: 'img/uefa/serieb/frosinone.png',
            juve_stabia: 'img/uefa/serieb/juvestabia.png',
            mantova: 'img/uefa/serieb/mantova.png',
            modena: 'img/uefa/serieb/modena.png',
            palermo: 'img/uefa/serieb/palermo.png',
            pisa: 'img/uefa/serieb/pisa.png',
            reggiana: 'img/uefa/serieb/reggiana.png',
            salernitana: 'img/uefa/serieb/salernitana.png',
            sampdoria: 'img/uefa/serieb/sampdoria.png',
            sassuolo: 'img/uefa/serieb/sassuolo.png',
            spezia_calcio: 'img/uefa/serieb/speziacalcio.png',
            spezia_calcio_2: 'img/uefa/serieb/speziacalcio2.png',
            sudtirol: 'img/uefa/serieb/sudtirol.png',
        },

        bundesliga: {
            _equipo: '#',
            bayer_leverkusen: 'img/uefa/bundesliga/bayerleverkusen.png',  
            bayern_munchen: 'img/uefa/bundesliga/bayernmunchen.png',
            borussia_dortmund: 'img/uefa/bundesliga/borussiadortmund.png', 
            borussia_monchengladbach: 'img/uefa/bundesliga/borussiamonchengladbach.png', 
            eintracht_frankfurt: 'img/uefa/bundesliga/eintrachtfrankfurt.png',
            fc_augsburg: 'img/uefa/bundesliga/fcaugsburg.png',
            fc_heidenheim: 'img/uefa/bundesliga/fcheidenheim.png',
            friburgo: 'img/uefa/bundesliga/friburgo.png',
            hoffenheim: 'img/uefa/bundesliga/hoffenheim.png',
            holstein_kiel: 'img/uefa/bundesliga/holsteinkiel.png',
            mainz: 'img/uefa/bundesliga/mainz.png',
            rb_leipzig: 'img/uefa/bundesliga/rbleipzig.png',
            st_pauli: 'img/uefa/bundesliga/stpauli.png',
            stuttgart: 'img/uefa/bundesliga/stuttgart.png',
            union_berlin: 'img/uefa/bundesliga/unionberlin.png',
            vfl_bochum: 'img/uefa/bundesliga/vflbochum.png',
            werder_bremen: 'img/uefa/bundesliga/werderbremen.png',
            wolfsburg: 'img/uefa/bundesliga/wolfsburg.png',
        },

        bundesliga2: {
            _equipo: '#',
            braunschweig: 'img/uefa/bundesliga2/braunschweig.png',  
            darmstadt_98: 'img/uefa/bundesliga2/darmstadt98.png',
            fortuna_dusseldorf: 'img/uefa/bundesliga2/fortunadusseldorf.png', 
            greuther_furth: 'img/uefa/bundesliga2/greutherfurth.png', 
            hamburger_sv: 'img/uefa/bundesliga2/hamburgersv.png',
            hannover: 'img/uefa/bundesliga2/hannover.png',
            hertha_bsc: 'img/uefa/bundesliga2/herthabsc.png',
            kaiserslautern: 'img/uefa/bundesliga2/kaiserslautern.png',
            karlsruher: 'img/uefa/bundesliga2/karlsruher.png',
            koln: 'img/uefa/bundesliga2/koln.png',
            magdeburg: 'img/uefa/bundesliga2/magdeburg.png',
            nurnberg: 'img/uefa/bundesliga2/nurnberg.png',
            preuben_munster: 'img/uefa/bundesliga2/preubenmunster.png',
            regensburg: 'img/uefa/bundesliga2/regensburg.png',
            schalke_04: 'img/uefa/bundesliga2/schalke04.png',
            sc_paderborn: 'img/uefa/bundesliga2/scpaderborn.png',
            sv_elversberg: 'img/uefa/bundesliga2/svelversberg.png',
            ulm: 'img/uefa/bundesliga2/ulm.png',
        },

        ligue1: {
            _equipo: '#',
            angers: 'img/uefa/ligue1/angers.png',  
            as_monaco: 'img/uefa/ligue1/asonaco.png',
            auxerre: 'img/uefa/ligue1/auxerre.png', 
            brestois: 'img/uefa/ligue1/brestois.png', 
            clermont: 'img/uefa/ligue1/clermont.png',
            lens: 'img/uefa/ligue1/lens.png',
            lille: 'img/uefa/ligue1/lille.png',
            montpellier: 'img/uefa/ligue1/montpellier.png',
            nantes: 'img/uefa/ligue1/nantes.png',
            nantes2: 'img/uefa/ligue1/nantes2.png',
            nice: 'img/uefa/ligue1/nice.png',
            olympique_de_marsella: 'img/uefa/ligue1/olympiquedemarsella.png',
            olympique_lyonnais: 'img/uefa/ligue1/olympiquelyonnais.png',
            paris_saint_germain: 'img/uefa/ligue1/parissaintgermain.png',
            reims: 'img/uefa/ligue1/reims.png',
            rennais: 'img/uefa/ligue1/rennais.png',
            saint_etienne: 'img/uefa/ligue1/saintetienne.png',
            strasbourg: 'img/uefa/ligue1/strasbourg.png',
            toulouse: 'img/uefa/ligue1/toulouse.png',
        },

        ligue2: {
            _equipo: '#',
            ajaccio: 'img/uefa/ligue2/ajaccio.png',  
            amiens: 'img/uefa/ligue2/amiens.png',
            bastia: 'img/uefa/ligue2/bastia.png', 
            caen: 'img/uefa/ligue2/caen.png', 
            clermont_foot: 'img/uefa/ligue2/clermontfoot.png',
            dunkerque: 'img/uefa/ligue2/dunkerque.png',
            fc_annecy: 'img/uefa/ligue2/fcannecy.png',
            grenoble: 'img/uefa/ligue2/grenoble.png',
            guingamp: 'img/uefa/ligue2/guingamp.png',
            lorient: 'img/uefa/ligue2/lorient.png',
            martigues: 'img/uefa/ligue2/martigues.png',
            metz: 'img/uefa/ligue2/metz.png',
            metz2: 'img/uefa/ligue2/metz2.png',
            paris_fc: 'img/uefa/ligue2/parisfc.png',
            pau_fc: 'img/uefa/ligue2/paufc.png',
            red_star_fc: 'img/uefa/ligue2/redstarfc.png',
            rodez_af: 'img/uefa/ligue2/rodezaf.png',
            stade_lavallois: 'img/uefa/ligue2/stadelavallois.png',
            troyesac: 'img/uefa/ligue2/troyesac.png',
        },

        primeiraliga: {
            _equipo: '#',
            amadora: 'img/uefa/primeiraliga/amadora.png',  
            arouca: 'img/uefa/primeiraliga/arouca.png',
            avs: 'img/uefa/primeiraliga/avs.png', 
            benfica: 'img/uefa/primeiraliga/benfica.png', 
            boavista: 'img/uefa/primeiraliga/boavista.png',
            casa_pia: 'img/uefa/primeiraliga/casapia.png',
            estoril: 'img/uefa/primeiraliga/estoril.png',
            famalicao: 'img/uefa/primeiraliga/famalicao.png',
            farense: 'img/uefa/primeiraliga/farense.png',
            gil_vicente: 'img/uefa/primeiraliga/gilvicente.png',
            moreirense: 'img/uefa/primeiraliga/moreirense.png',
            nacional_madeira: 'img/uefa/primeiraliga/nacionalmadeira.png',
            porto: 'img/uefa/primeiraliga/porto.png',
            rio_ave: 'img/uefa/primeiraliga/rioave.png',
            santa_clara: 'img/uefa/primeiraliga/santaclara.png',
            sporting_braga: 'img/uefa/primeiraliga/sportingbraga.png',
            sporting_cp: 'img/uefa/primeiraliga/sportingcp.png',
            vitoria_guimaraes: 'img/uefa/primeiraliga/vitoriaguimaraes.png',
        },

        segundaliga: {
            _equipo: '#',
            alverca: 'img/uefa/segundaliga/alverca.png',  
            benfica: 'img/uefa/segundaliga/benfica.png',
            cd_feirense: 'img/uefa/segundaliga/cdfeirense.png', 
            desportivo_de_chaves: 'img/uefa/segundaliga/desportivodechaves.png', 
            fc_penafiel: 'img/uefa/segundaliga/fcpenafiel.png',
            felgueiras: 'img/uefa/segundaliga/felgueiras.png',
            leiria: 'img/uefa/segundaliga/leiria.png',
            leixoes: 'img/uefa/segundaliga/leixoes.png',
            mafra: 'img/uefa/segundaliga/mafra.png',
            maritimo: 'img/uefa/segundaliga/maritimo.png',
            oliveirense: 'img/uefa/segundaliga/oliveirense.png',
            pacos_de_ferreira: 'img/uefa/segundaliga/pacosdeferreira.png',
            portimonense: 'img/uefa/segundaliga/portimonense.png',
            porto: 'img/uefa/segundaliga/porto.png',
            tondela: 'img/uefa/segundaliga/tondela.png',
            torreense: 'img/uefa/segundaliga/torreense.png',
            viseu: 'img/uefa/segundaliga/viseu.png',
            vizela: 'img/uefa/segundaliga/vizela.png',
        },

        eredivisie: {
            _equipo: '#',
            ajax: 'img/uefa/eredivisie/ajax.png',  
            almere_city: 'img/uefa/eredivisie/almerecity.png',
            az_alkmaar: 'img/uefa/eredivisie/azalkmaar.png', 
            breda: 'img/uefa/eredivisie/breda.png', 
            feyenoord: 'img/uefa/eredivisie/feyenoord.png',
            fortuna_sittard: 'img/uefa/eredivisie/fortunasittard.png',
            go_ahead_eagles: 'img/uefa/eredivisie/goaheadeagles.png',
            groningen: 'img/uefa/eredivisie/groningen.png',
            heerenveen: 'img/uefa/eredivisie/heerenveen.png',
            heracles: 'img/uefa/eredivisie/heracles.png',
            nec: 'img/uefa/eredivisie/nec.png',
            pec_zwolle: 'img/uefa/eredivisie/peczwolle.png',
            psv: 'img/uefa/eredivisie/psv.png',
            rkc_waalwijk: 'img/uefa/eredivisie/rkcwaalwijk.png',
            sparta_rotterdam: 'img/uefa/eredivisie/spartarotterdam.png',
            twente: 'img/uefa/eredivisie/twente.png',
            utrecht: 'img/uefa/eredivisie/utrecht.png',
            willem_ii: 'img/uefa/eredivisie/willemiiI.png',
        },

        eerstedivisie: {
            _equipo: '#',
            ado_den_haag: 'img/uefa/eerstedivisie/adodenhaag.png',  
            de_graafschap: 'img/uefa/eerstedivisie/degraafschap.png',
            de_nbosch: 'img/uefa/eerstedivisie/denbosch.png', 
            emmen: 'img/uefa/eerstedivisie/emmen.png', 
            excelsior: 'img/uefa/eerstedivisie/excelsior.png',
            fc_dordrecht: 'img/uefa/eerstedivisie/fcdordrecht.png',
            fc_eindhoven: 'img/uefa/eerstedivisie/fceindhoven.png',
            helmond_sport: 'img/uefa/eerstedivisie/helmondsport.png',
            jong_ajax: 'img/uefa/eerstedivisie/jongajax.png',
            jong_az_alkmaar: 'img/uefa/eerstedivisie/jongazalkmaar.png',
            jong_psv: 'img/uefa/eerstedivisie/jongpsv.png',
            jong_utrecht: 'img/uefa/eerstedivisie/jongutrecht.png',
            mvv_maastricht: 'img/uefa/eerstedivisie/mvvmaastricht.png',
            roda: 'img/uefa/eerstedivisie/roda.png',
            telstar: 'img/uefa/eerstedivisie/telstar.png',
            top_oss: 'img/uefa/eerstedivisie/toposs.png',
            cambuur: 'img/uefa/eerstedivisie/cambuur.png',
            vitesse: 'img/uefa/eerstedivisie/vitesse.png',
            volendam: 'img/uefa/eerstedivisie/volendam.png',
            vvv_venlo: 'img/uefa/eerstedivisie/vvvvenlo.png',
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
        ctx.rotate(16 * Math.PI / 180);

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

function cargarLogos() {
    const logo1Seleccionado = document.getElementById('logo1Selector').value;
    const logo2Seleccionado = document.getElementById('logo2Selector').value;
    const tipoFondoSeleccionado = document.querySelector('input[name="fondoTipo"]:checked').value;
    const fondoSeleccionado = document.getElementById('fondoSelector').value;

    const logo1 = new Image();
    const logo2 = new Image();

    // Lista de fondos que usarán las medidas del fondo de colores
    const fondosConMedidasDeColores = ['fondo15'];  // Agrega más fondos aquí si es necesario

    if (ligaSeleccionada === 'todos') {
        logo1.src = buscarLogoEnTodasLasLigas(logo1Seleccionado);
        logo2.src = buscarLogoEnTodasLasLigas(logo2Seleccionado);
    } else {
        logo1.src = imagenes.logos[ligaSeleccionada][logo1Seleccionado];
        logo2.src = imagenes.logos[ligaSeleccionada][logo2Seleccionado];
    }

    logo1.onload = () => {
        let logo1Size, logo1X, logo1Y;

        // Verificar si el fondo seleccionado está en la lista de fondos con medidas de colores
        if (tipoFondoSeleccionado === 'imagen' && fondosConMedidasDeColores.includes(fondoSeleccionado)) {
            // Usar las medidas del fondo de colores
            logo1Size = ajustarTamañoProporcional(logo1, 370, 398);
            logo1X = 100 + (392 - logo1Size.width) / 2;
            logo1Y = 103 + (420 - logo1Size.height) / 2;
        } else if (tipoFondoSeleccionado === 'imagen') {
            // Usar las medidas estándar para otros fondos de imagen
            logo1Size = ajustarTamañoProporcional(logo1, 392, 420);
            logo1X = 162 + (392 - logo1Size.width) / 2;
            logo1Y = 103 + (420 - logo1Size.height) / 2;
        } else {
            // Usar las medidas para fondo de colores
            logo1Size = ajustarTamañoProporcional(logo1, 370, 398);
            logo1X = 100 + (392 - logo1Size.width) / 2;
            logo1Y = 103 + (420 - logo1Size.height) / 2;
        }

        ctx.drawImage(logo1, logo1X, logo1Y, logo1Size.width, logo1Size.height);
    };

    logo2.onload = () => {
        let logo2Size, logo2X, logo2Y;

        // Verificar si el fondo seleccionado está en la lista de fondos con medidas de colores
        if (tipoFondoSeleccionado === 'imagen' && fondosConMedidasDeColores.includes(fondoSeleccionado)) {
            // Usar las medidas del fondo de colores
            logo2Size = ajustarTamañoProporcional(logo2, 370, 398);
            logo2X = 708 + (392 - logo2Size.width) / 2;
            logo2Y = 103 + (420 - logo2Size.height) / 2;
        } else if (tipoFondoSeleccionado === 'imagen') {
            // Usar las medidas estándar para otros fondos de imagen
            logo2Size = ajustarTamañoProporcional(logo2, 392, 420);
            logo2X = 646 + (392 - logo2Size.width) / 2;
            logo2Y = 103 + (420 - logo2Size.height) / 2;
        } else {
            // Usar las medidas para fondo de colores
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