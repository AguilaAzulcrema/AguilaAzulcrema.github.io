# agenda.py
import cloudscraper
from bs4 import BeautifulSoup
import json
import re
import base64
import os

# URL de la página
url = "https://dp.mycraft.click/home.html?time=-6&cat=soccer"

# Crear scraper que pueda pasar Cloudflare
scraper = cloudscraper.create_scraper()

def obtener_datos():
    # Hacer la solicitud con cloudscraper
    response = scraper.get(url, timeout=15)
    response.encoding = "utf-8"
    html = response.text

    soup = BeautifulSoup(html, 'html.parser')

    # Diccionario para almacenar eventos
    eventos = {}

    # Encontrar todas las filas (tr) en la tabla
    filas = soup.find_all('tr')

    for fila in filas:
        columnas = fila.find_all('td')
        if len(columnas) >= 5:
            # Hora
            hora = columnas[0].get_text(strip=True).split(' ')[0]

            # Liga
            liga = columnas[2].get_text(strip=True)
            liga = liga.replace('.', '')
            liga = liga.replace("'", "")
            liga = liga.replace('3 Liga', 'Bundesliga 3')
            liga = liga.replace('2 Bundesliga', 'Bundesliga 2')

            # Equipos
            equipos = columnas[3].get_text(strip=True)
            equipos = re.sub(r'\[.*?\]', '', equipos).strip()
            equipos = equipos.replace(' - ', ' vs. ')

            # Enlace
            enlace = columnas[4].find('input')['value']
            enlace_base64 = base64.b64encode(enlace.encode('utf-8')).decode('utf-8')

            if equipos in eventos:
                eventos[equipos]['streams'].append({
                    "url": enlace_base64,
                    "optionText": "TV"
                })
            else:
                eventos[equipos] = {
                    "time": hora,
                    "tournament": liga,
                    "eventTitle": equipos,
                    "streams": [
                        {
                            "url": enlace_base64,
                            "optionText": "TV"
                        }
                    ]
                }

    # Convertir a lista
    eventos_formateados = list(eventos.values())

    # Crear carpeta json si no existe
    os.makedirs("json", exist_ok=True)

    # Guardar en JSON
    with open('json/eventos.json', 'w', encoding='utf-8') as archivo_json:
        json.dump(eventos_formateados, archivo_json, indent=4, ensure_ascii=False)

    print(f"[OK] Datos extraídos y guardados en eventos.json ({len(eventos_formateados)} eventos)")

if __name__ == "__main__":
    obtener_datos()
