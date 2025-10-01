# concacaf.py
import cloudscraper
from bs4 import BeautifulSoup
import json
import re
import os

# URL de la página
url = "https://dp.mycraft.click/home.html?time=-6&cat=soccer"

# Lista de ligas que quieres extraer
ligas_permitidas = [
    "liga-mx", "mexico", "mexicof", "mexico-liga-de-expansion", "mls", "costa-rica-primera-division",
    "nwsl", "usl1", "usl", "guatemala", "el-salvador", "nisa", "canada", "mls-next-pro",
    "jamaica", "usl-super-league", "honduras", "concacaf-caribbean-cup", "concacaf-central-american-cup",
    "campeones-cup", "canada-championship", "canadian-championship", "us-open-cup",
    "concacaf-w-champions-cup", "concacaf-champions-cup", "costa-rica-liga-de-ascenso",
    "ncaa", "ncaa-tournament", "concacaf-nations-league-c", "concacaf-nations-league",
    "concacaf-nations-league-b", "concacaf-nations-league-a", "concacaf-nations-league-play-in",
    "copa-costa-rica", "liga-de-expansion-mx", "concacaf-championship",
    "concacaf-gold-cup-qualifier", "concacaf-gold-cup", "campeon-de-campeones", "leagues-cup"
]

# Crear scraper que pueda pasar Cloudflare
scraper = cloudscraper.create_scraper()

def obtener_datos():
    # Hacer la solicitud con cloudscraper
    response = scraper.get(url, timeout=15)
    response.encoding = "utf-8"
    html = response.text

    soup = BeautifulSoup(html, 'html.parser')

    # Diccionario para almacenar los eventos únicos por equipos
    eventos = {}

    # Encontrar todas las filas (tr) en la tabla
    filas = soup.find_all('tr')

    # Iterar sobre cada fila y extraer los datos
    for fila in filas:
        columnas = fila.find_all('td')
        if len(columnas) >= 5:
            # Extraer la hora (solo la parte de la hora, sin UTC -6)
            hora = columnas[0].text.split(' ')[0]

            # Extraer el nombre de la liga
            liga = columnas[2].find('a').text.strip()

            if liga == "Mexico" and "(f)" in columnas[3].text:
                liga = "mexicof"  # Nombre para la liga femenil
            else:
                liga = liga.replace(' ', '-').lower()

            # Verificar si la liga está en la lista de ligas permitidas
            if liga in ligas_permitidas:
                # Extraer los equipos y limpiar texto
                equipos = columnas[3].text.strip()
                equipos = re.sub(r'\[.*?\]', '', equipos).strip()
                equipos = equipos.replace(' - ', ' vs. ')
                equipos = re.sub(r'\bW\b', '(f)', equipos)

                # Extraer el enlace de transmisión
                enlace = "emb2.html?r=" + columnas[4].find('input')['value']

                if equipos in eventos:
                    contador = len(eventos[equipos]['streams']) + 1
                    eventos[equipos]['streams'].append({
                        "url": enlace,
                        "optionText": f"Opcion {contador}"
                    })
                else:
                    eventos[equipos] = {
                        "time": hora,
                        "tournament": liga,
                        "eventTitle": equipos,
                        "streams": [
                            {
                                "url": enlace,
                                "optionText": "Opcion 1"
                            }
                        ]
                    }

    # Formatear los datos en estructura con clave "events"
    eventos_formateados = {
        "events": list(eventos.values())
    }

    # Crear carpeta json si no existe
    os.makedirs("json", exist_ok=True)

    # Guardar los datos en un archivo JSON
    with open('json/data.json', 'w', encoding='utf-8') as archivo_json:
        json.dump(eventos_formateados, archivo_json, indent=4, ensure_ascii=False)

    print(f"[OK] Datos extraídos y guardados en data.json ({len(eventos_formateados['events'])} eventos)")

# Ejecutar el script manualmente
if __name__ == "__main__":
    obtener_datos()
