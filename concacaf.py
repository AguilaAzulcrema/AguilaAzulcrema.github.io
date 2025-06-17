import requests
from bs4 import BeautifulSoup
import json
import re

# URL de la página
url = "https://dp.mycraft.click/home.html?cat=soccer&time=-6"

# Lista de ligas que quieres extraer
ligas_permitidas = ["liga-mx", "mexico", "mexicof", "mexico-liga-de-expansion", "mls", "costa-rica-primera-division", "nwsl", "usl1", "usl", "guatemala", "el-salvador", "nisa", "canada", "mls-next-pro", "jamaica", "usl-super-league", "honduras", "concacaf-caribbean-cup", "concacaf-central-american-cup", "campeones-cup", "canada-championship", "canadian-championship", "us-open-cup", "concacaf-w-champions-cup", "concacaf-champions-cup", "costa-rica-liga-de-ascenso", "ncaa", "ncaa-tournament", "concacaf-nations-league-c", "concacaf-nations-league", "concacaf-nations-league-b", "concacaf-nations-league-a", "concacaf-nations-league-play-in", "copa-costa-rica", "liga-de-expansion-mx", "concacaf-championship", "concacaf-gold-cup-qualifier", "concacaf-gold-cup"]

def obtener_datos():
    # Hacer la solicitud a la página
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

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
            liga = columnas[2].find('a').text

            if liga == "Mexico" and "(f)" in columnas[3].text:
                liga = "mexicof"  # Nombre para la liga femenil
            else:
                liga = liga.replace(' ', '-').lower()

            # Verificar si la liga está en la lista de ligas permitidas
            if liga in ligas_permitidas:
                # Extraer los equipos y eliminar el texto entre corchetes
                equipos = columnas[3].text.strip()
                equipos = re.sub(r'\[.*?\]', '', equipos).strip()
                # Reemplazar el guion que separa los equipos por " vs "
                equipos = equipos.replace(' - ', ' vs. ')
                # Reemplazar todas las 'W' que están al final de cada equipo
                equipos = re.sub(r'\bW\b', '(f)', equipos)
                
                # Extraer el enlace de transmisión y agregar "ch3.html?r=" al inicio del enlace
                enlace = "emb2.html?r=" + columnas[4].find('input')['value']

                # Si los equipos ya están en el diccionario, agregar el nuevo enlace al arreglo de streams
                if equipos in eventos:
                    # Contar cuántas transmisiones ya hay y agregar una nueva opción
                    contador = len(eventos[equipos]['streams']) + 1
                    eventos[equipos]['streams'].append({
                        "url": enlace,
                        "optionText": f"Opcion {contador}"
                    })
                else:
                    # Si es un nuevo evento, agregarlo al diccionario con el primer enlace
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

    # Formatear los datos para que se guarden en la estructura con la clave "events"
    eventos_formateados = {
        "events": list(eventos.values())
    }

    # Guardar los datos en un archivo JSON
    with open('json/data.json', 'w') as archivo_json:
        json.dump(eventos_formateados, archivo_json, indent=4)

    print("Datos extraídos y guardados en data.json")

# Ejecutar el script manualmente
if __name__ == "__main__":
    obtener_datos()
