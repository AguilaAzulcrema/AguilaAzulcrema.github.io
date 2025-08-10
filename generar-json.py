import requests
from bs4 import BeautifulSoup
import re
import base64
import os
import json

def generar_transmisiones_json():
    # URL de la página (definida dentro de la función)
    url = "https://dp.mycraft.click/home.html?cat=soccer&time=-6"
    
    # Hacer scraping directamente
    response = requests.get(url)
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
        "MLS": "usa",
        "USL": "usa2-",
        "MLS Next Pro": "usa3-",
        "NWSL": "usa-f",
        "NSL": "usa4-",
        "Canada": "can",
        "Costa Rica Primera Division": "cr",
        "Costa Rica Liga de Ascenso": "cr2-",
        "Guatemala": "gua",
        "El Salvador": "slv",
        "Campeon de Campeones": "mx-",
        "Leagues Cup": "lc",
        
        # === SUDAMÉRICA ===
        "Copa Libertadores": "lib",
        "Copa Sudamericana": "sud",
        "Brazil Serie A": "bra",
        "Brazil Serie B": "bra2-",
        "Brazil Serie C": "bra3-",
        "Brasileiro U20": "br20-",
        "Copa do Brasil": "bra",
        "Copa Paulista": "bra",
        "Argentina Primera Division": "ar",
        "Argentina Primera B": "ar2-",
        "Ecuador": "ecu",
        "Ecuador Serie B": "ecu2-",
        "Colombia Primera A": "col",
        "Colombia Primera B": "col2-",
        "Chile Primera A": "chl",
        "Paraguay": "py",
        "Liga AUF Uruguaya": "uy",
        "Venezuela": "ven",
        "Bolivia": "bol",
        "Copa Bolivia": "bol",
        "Peru": "bol",
        "South American Championship": "sud_u17-",
        
        # === EUROPA ===
        "UEFA Champions League": "cl",
        "UEFA Europa League": "eur",
        "UEFA Conference League": "conf",
        "UEFA Nations League": "nat",
        "EPL": "en",
        "FA Community Shield": "en",
        "England Championship": "en2-",
        "English Premier League 2": "en_u20-", 
        "Women's Super League": "en-f",
        "LaLiga": "es",
        "Copa del Rey": "es",
        "LaLiga2": "es2-",
        "Spain Liga F": "es-f",
        "Serie A": "it",
        "Serie B": "it2-",
        "Italy Serie C": "it3-",
        "Serie A Women": "it-f",
        "Coppa Italia": "it",
        "Bundesliga": "ger",
        "Bundesliga 2": "ger2-",
        "Bundesliga 3": "ger3-",
        "Bundesliga Women": "ger-f",
        "DFB Pokal": "ger-f",
        "Ligue 1": "fr",
        "Ligue 2": "fr2-",
        "France Premiere Ligue": "fr-f",
        "Liga Portugal": "por",
        "Liga Portugal 2": "por2-",
        "Taca de Portugal": "por",
        "Eredivisie": "ned",
        "Eerste Divisie": "ned2-",
        "UEFA Youth League": "yl",
        "Belgium 1A": "bel",
        "Scotland": "sco",
        "Ireland": "irl",
        "Austria": "aut",
        "Romania": "rom",
        "Romanian Cup": "rom",
        "Switzerland Super League": "sui",
        "Swiss Super League": "sui",
        "Swiss Challenge League": "sui2-",
        "Ekstraklasa": "pol",
        "Poland Div 1": "pol2-",
        "Poland Div 2": "pol3-",
        "Turkey Super Lig": "tur",
        "Greece Super League": "grc",
        "Croatia HNL": "hr",
        "Denmark": "dnk",
        "Denmark 1st Division": "dnk2-",
        "Russia": "rus",
        "Allsvenskan": "swe",
        "Sweden Div 1": "swe3-",
        "Toppserien Women": "nor-f",
        "Iceland": "isl",
        "Slovakia": "svk",
        "Slovak Cup": "svk",
        "Czech Republic": "cz",
        "MOL Cup": "cz",
        "Serbia": "rs",
        "Bulgaria": "bul",
        "Liga BiH": "bih",
        "Albania Superliga": "al",
        "Albanian Cup": "al",
        "Latvia Virsliga": "lva",
        "Lithuania A Lyga": "ltu",
        "Cyprus": "cyp",
        "Eliteserien": "nor",
        "OBOS-ligaen": "nor",
        "Faroe Islands": "far",
        "Landspokal Cup": "dnk",
        
        # === ASIA Y PACÍFICO ===
        "AFC Champions League": "afc",
        "Saudi Professional League": "sa",
        "A-League": "aus",
        "J1-League": "jpn",
        "J2-League": "jpn2-",
        "J3-League": "jpn3-",
        "K League": "kr",
        "K League 2": "kr2-",
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
            
            # Extraer nombre del torneo
            torneo_element = columnas[2].find('a')
            torneo = torneo_element.text.strip() if torneo_element else "Desconocido"
            
            # Limpiar nombre del torneo
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
                prefijo = "tv"  # Valor por defecto si no se encuentra el torneo

            # Procesar enlaces
            for enlace in columnas[4].find_all('input'):
                url_base64 = base64.b64encode(
                    enlace['value'].encode('utf-8')
                ).decode('utf-8')
                
                evento_completo = f"{hora}|{torneo}|{equipos}"
                clave_unica = f"{url_base64}|{evento_completo}"
                
                # Si es un evento nuevo, lo añadimos
                if clave_unica not in eventos_unicos:
                    eventos_unicos[clave_unica] = {
                        "url": url_base64,
                        "hora": hora,
                        "torneo": torneo,
                        "evento": equipos,
                        "prefijo": prefijo,
                        "tipo": "normal"  # <-- Aquí agregamos el tipo normal por defecto
                    }
        except Exception as e:
            print(f"Error procesando fila: {e}")
            continue

    # Organizar por prefijo
    transmisiones_json = {}
    for evento in eventos_unicos.values():
        prefijo = evento["prefijo"]
        
        # Encontrar el próximo número disponible para este prefijo
        i = 1
        while f"{prefijo}{i}" in transmisiones_json:
            i += 1
            
        transmisiones_json[f"{prefijo}{i}"] = {
            "v": evento["url"],
            "hora": evento["hora"],
            "torneo": evento["torneo"],
            "evento": evento["evento"],
            "tipo": evento["tipo"]  # <-- Incluimos el tipo en el JSON final
        }

    # Crear carpeta si no existe
    os.makedirs('json', exist_ok=True)
    
    # Guardar como JSON
    with open('json/transmisiones.json', 'w', encoding='utf-8') as f:
        json.dump(transmisiones_json, f, indent=2, ensure_ascii=False)
    
    print("Archivo JSON generado exitosamente!")

if __name__ == "__main__":
    generar_transmisiones_json()