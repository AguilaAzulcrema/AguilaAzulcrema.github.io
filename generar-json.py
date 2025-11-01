import cloudscraper
from bs4 import BeautifulSoup
import re
import base64
import os
import json

def generar_transmisiones_json():
    # URL de la página (definida dentro de la función)
    url = "https://dp.mycraft.click/home.html?time=-6&cat=soccer"
    
    # Crear scraper para evitar Cloudflare
    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Mapeo completo de ligas a prefijos
    ligas_a_prefijos = {
        # === NORTE AMÉRICA ===
        "Mexico": {
            "default": "mx",
            "regex": r"\bW\b",
            "prefijo_femenil": "fem"
        },
        "Mexico Liga MX": "mx",
        "Liga de Expansion MX": "exp",
        "Mexico Liga de Expansion MX": "exp",
        "Liga de Expansion MX Super Final": "exp",
        "CONCACAF Gold Cup": "gc",
        "Gold Cup": "gc",
        "FIFA Club World Cup": "wc",
        "CONCACAF Champions Cup": "conca",
        "CONCACAF Central American Cup": "conca",
        "MLS": "usa",
        "US Open Cup": "usa",
        "USL": "usa",
        "MLS Next Pro": "usa",
        "NWSL": "usa",
        "NSL": "usa",
        "Canada": "can",
        "Canadian Championship": "can",
        "Northern Super League": "nsl",
        "Costa Rica Primera Division": "cr",
        "Costa Rica Liga de Ascenso": "cr",
        "Guatemala": "gua",
        "El Salvador": "slv",
        "Campeon de Campeones": "mx",
        "Leagues Cup": "lc",
        "Honduras": "hon",
        
        # === SUDAMÉRICA ===
        "Copa Libertadores": "lib",
        "Copa Sudamericana": "sud",
        "Brazil Serie A": "bra",
        "Brazil Serie B": "bra",
        "Brazil Serie C": "bra",
        "Brasileiro U20": "bra",
        "Brasileiro": "bra",
        "Copa do Brasil": "bra",
        "Copa Paulista": "bra",
        "Brazil Paulista": "bra",
        "Argentina Primera Division": "ar",
        "Argentina Primera Nacional": "ar",
        "Argentina Liga Profesional": "ar",
        "Argentina Primera B": "ar",
        "Copa Argentina": "ar",
        "Ecuador": "ecu",
        "Copa Ecuador": "ecu",
        "Ecuador Serie B": "ecu",
        "Colombia Primera A": "col",
        "Colombia Primera B": "col",
        "Chile Primera A": "chl",
        "Paraguay": "py",
        "Copa Paraguay": "py",
        "Liga AUF Uruguaya": "uy",
        "Uruguay Segunda Div": "uy",
        "Venezuela": "ven",
        "Bolivia": "bol",
        "Copa Bolivia": "bol",
        "Peru": "bol",
        "South American Championship": "sud",
        
        # === EUROPA ===
        "UEFA Champions League": "cl",
        "UEFA Europa League": "eur",
        "UEFA Conference League": "conf",
        "UEFA Nations League": "nat",
        "UEFA Super Cup": "sc",
        "EPL": "en",
        "EFL Cup": "en",
        "FA Community Shield": "en",
        "England Championship": "en",
        "English Premier League 2": "en", 
        "Women's Super League": "en",
        "LaLiga": "es",
        "Copa del Rey": "es",
        "LaLiga2": "es",
        "Spain Liga F": "es",
        "Serie A": "it",
        "Serie B": "it",
        "Italy Serie C": "it",
        "Serie A Women": "it",
        "Coppa Italia": "it",
        "Bundesliga": "ger",
        "Bundesliga 2": "ger",
        "Bundesliga 3": "ger",
        "Bundesliga Women": "ger",
        "DFB Pokal": "ger",
        "Ligue 1": "fr",
        "Ligue 2": "fr",
        "France Premiere Ligue": "fr",
        "Liga Portugal": "por",
        "Liga Portugal 2": "por",
        "Taca de Portugal": "por",
        "Eredivisie": "ned",
        "Eerste Divisie": "ned",
        "UEFA Youth League": "yl",
        "Belgium 1A": "bel",
        "Belgium 1B": "bel",
        "Scotland": "sco",
        "Scotland League Cup": "sco",
        "Ireland": "irl",
        "Ireland FAI Cup": "irl",
        "Austria": "aut",
        "Romania": "rom",
        "Romanian Cup": "rom",
        "Switzerland Super League": "sui",
        "Swiss Super League": "sui",
        "Swiss Cup": "sui",
        "Swiss Challenge League": "sui",
        "Ekstraklasa": "pol",
        "Poland Div 1": "pol",
        "Poland Div 2": "pol",
        "Turkey Super Lig": "tur",
        "Turkey 1 Lig": "tur",
        "Turkey 1. Lig": "tur",
        "Greece Super League": "grc",
        "Croatia HNL": "hr",
        "Croatia Prva NL": "hr",
        "Denmark": "dnk",
        "Denmark 1st Division": "dnk",
        "Russia": "rus",
        "Russian Cup": "rus",
        "Allsvenskan": "swe",
        "Sweden Div 1": "swe",
        "Toppserien Women": "nor",
        "Iceland": "isl",
        "Slovakia": "svk",
        "Slovak Cup": "svk",
        "Slovenia": "slo",
        "Czech Republic": "cz",
        "MOL Cup": "cz",
        "Moldova": "mol",
        "Montenegro": "mon",
        "Serbia": "rs",
        "Bulgaria": "bul",
        "Liga BiH": "bih",
        "Albania Superliga": "al",
        "Albanian Cup": "al",
        "Latvia Virsliga": "lva",
        "Lithuania A Lyga": "ltu",
        "Lithuanian Cup": "ltu",
        "Cyprus": "cyp",
        "Eliteserien": "nor",
        "OBOS-ligaen": "nor",
        "Faroe Islands": "far",
        "Landspokal Cup": "dnk",
        "Finland Veikkausliiga": "fin",
        "Finland Ykkosliiga": "fin",
        "Estonia": "est",
        "Superettan": "spe",
        
        # === ASIA Y PACÍFICO ===
        "AFC Champions League": "afc",
        "Saudi Professional League": "sa",
        "A-League": "aus",
        "J1-League": "jpn",
        "J2-League": "jpn",
        "J3-League": "jpn",
        "K League": "kr",
        "K League 2": "kr",
        "CSL": "chn",
        "Egypt": "egy",
        "OFB Cup": "aus",
        "UAE League": "eau",
        
        # === ÁFRICA ===
        "CAF Champions League": "caf",
        "Africa Cup of Nations": "acn",
        "African Nations Championship": "acn",
        
        # === OTROS ===
        "otros": "tv",
        "FIFA World Cup": "wc",
        "World Cup Qualifier": "wc",
        "CONCACAF Championship": "conca",
        "Friendly": "tv",
    }
    
    # Diccionario para almacenar eventos únicos
    eventos_unicos = {}

    # Procesar filas de la tabla
    for fila in soup.find_all('tr'):
        columnas = fila.find_all('td')
        if len(columnas) < 5:
            continue
        
        try:
            # Extraer datos
            hora_completa = columnas[0].text.strip()
            hora = hora_completa.split(' ')[0]  # Extraer solo la parte de la hora
            
            torneo_element = columnas[2].find('a')
            torneo = torneo_element.text.strip() if torneo_element else "Desconocido"
            
            torneo = torneo.replace('.', '').replace("'", "")
            torneo = torneo.replace('3 Liga', 'Bundesliga 3')
            torneo = torneo.replace('2 Bundesliga', 'Bundesliga 2')
            
            equipos = re.sub(r'\[.*?\]', '', columnas[3].text.strip())
            equipos = equipos.replace(' - ', ' vs. ')
            
            # Determinar categoría
            prefijo = None
            if torneo in ligas_a_prefijos:
                config = ligas_a_prefijos[torneo]
                if torneo == "Mexico":
                    if re.search(config["regex"], equipos, re.IGNORECASE):
                        prefijo = config["prefijo_femenil"]
                    else:
                        prefijo = config["default"]
                else:
                    prefijo = config
            else:
                prefijo = "tv"

            # Procesar enlaces
            for enlace in columnas[4].find_all('input'):
                url_base64 = base64.b64encode(enlace['value'].encode('utf-8')).decode('utf-8')
                
                evento_completo = f"{hora}|{torneo}|{equipos}"
                clave_unica = f"{url_base64}|{evento_completo}"
                
                if clave_unica not in eventos_unicos:
                    eventos_unicos[clave_unica] = {
                        "url": url_base64,
                        "hora": hora,
                        "torneo": torneo,
                        "evento": equipos,
                        "prefijo": prefijo,
                        "tipo": "normal"
                    }
        except Exception as e:
            print(f"Error procesando fila: {e}")
            continue

    # Organizar por prefijo
    transmisiones_json = {}
    for evento in eventos_unicos.values():
        prefijo = evento["prefijo"]
        i = 1
        while f"{prefijo}{i}" in transmisiones_json:
            i += 1
            
        transmisiones_json[f"{prefijo}{i}"] = {
            "v": evento["url"],
            "hora": evento["hora"],
            "torneo": evento["torneo"],
            "evento": evento["evento"],
            "tipo": evento["tipo"]
        }

    os.makedirs('json', exist_ok=True)
    
    with open('json/transmisiones.json', 'w', encoding='utf-8') as f:
        json.dump(transmisiones_json, f, indent=2, ensure_ascii=False)
    
    # ✅ Línea agregada:
    print(f"[OK] Archivo generado con {len(transmisiones_json)} transmisiones")

if __name__ == "__main__":
    generar_transmisiones_json()
