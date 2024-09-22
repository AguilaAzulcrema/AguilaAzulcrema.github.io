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
    
    # Verificar si la solicitud fue exitosa
    if response.status_code != 200:
        print(f"Error al acceder a la página, código de estado: {response.status_code}")
        return
    
    # Parsear el contenido con BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Imprimir parte del contenido para verificar si la página se descargó correctamente
    print(soup.prettify()[:1000])  # Muestra los primeros 1000 caracteres del HTML
    
    # Diccionario para almacenar los eventos únicos por equipos
    eventos = {}

    # Encontrar todas las filas (tr) en la tabla
    filas = soup.find_all('tr')
    
    # Verificar si se encontraron filas
    if not filas:
        print("No se encontraron filas en la tabla.")
        return

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
                # Contar cuántas transmisiones ya hay y agregar una nueva opción
                contador = len(eventos[equipos]['streams']) + 1
                eventos[equipos]['streams'].append({
                    "url": enlace_base64,  # Usar el enlace codificado
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
                            "url": enlace_base64,  # Usar el enlace codificado
                            "optionText": "Opcion 1"
                        }
                    ]
                }

    # Formatear los datos para que se guarden en el archivo JSON
    eventos_formateados = list(eventos.values())

    # Guardar los datos en un archivo JSON
    with open('eventos.json', 'w') as archivo_json:
        json.dump(eventos_formateados, archivo_json, indent=4)

    print("Datos extraídos y guardados en eventos.json")

# Ejecutar el script manualmente
if __name__ == "__main__":
    obtener_datos()
