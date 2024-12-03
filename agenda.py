import requests
from bs4 import BeautifulSoup
import json
import re
import base64  # Importar el módulo base64

# URL de la página
url = "https://dp.mycraft.click/home.html?cat=soccer&time=-6"

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
            liga = liga.replace('.', '')  # Eliminar los puntos del nombre de la liga
            # Eliminar apóstrofos en el nombre de la liga
            liga = liga.replace("'", "")
            liga = liga.replace('3 Liga', 'Bundesliga 3')
            liga = liga.replace('2 Bundesliga', 'Bundesliga 2')


            # Extraer los equipos y eliminar el texto entre corchetes
            equipos = columnas[3].text.strip()
            equipos = re.sub(r'\[.*?\]', '', equipos).strip()

            # Reemplazar el guion que separa los equipos por " vs "
            equipos = equipos.replace(' - ', ' vs. ')

            # Extraer el enlace de transmisión
            enlace = columnas[4].find('input')['value']
            
            # Codificar el enlace a Base64
            enlace_base64 = base64.b64encode(enlace.encode('utf-8')).decode('utf-8')

            # Si los equipos ya están en el diccionario, agregar el nuevo enlace al arreglo de streams
            if equipos in eventos:
                eventos[equipos]['streams'].append({
                    "url": enlace_base64,  # Usar el enlace codificado
                    "optionText": "TV"  # Asignar siempre el valor "TV"
                })
            else:
            # Si es un nuevo evento, agregarlo al diccionario con el primer enlace
                eventos[equipos] = {
                    "time": hora,
                    "tournament": liga,
                    "eventTitle": equipos,
                    "streams": [
                        {
                            "url": enlace_base64,  # Usar el enlace codificado
                            "optionText": "TV"  # Asignar siempre el valor "TV"
            }
        ]
    }

    # Formatear los datos para que se guarden en el archivo JSON
    eventos_formateados = list(eventos.values())

    # Guardar los datos en un archivo JSON
    with open('json/eventos.json', 'w') as archivo_json:
        json.dump(eventos_formateados, archivo_json, indent=4)

    print("Datos extraídos y guardados en eventos.json")

# Ejecutar el script manualmente
if __name__ == "__main__":
    obtener_datos()
