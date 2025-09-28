import requests
from bs4 import BeautifulSoup
import re
import base64
import os
import json

def generar_transmisiones_json():
    # URL de la página
    url = "https://dp.mycraft.click/home.html?time=-6"
    
    # Hacer scraping directamente
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
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
            hora = hora_completa.split(' ')[0]  # Solo la hora (sin UTC)
            
            # Extraer categoría (ejemplo: SOCCER)
            categoria = columnas[1].text.strip() if len(columnas) > 1 else "Desconocido"
            
            # Extraer nombre del torneo
            torneo_element = columnas[2].find('a')
            torneo = torneo_element.text.strip() if torneo_element else "Desconocido"
            
            # Limpiar nombre del torneo
            torneo = torneo.replace('.', '').replace("'", "")
            torneo = torneo.replace('3 Liga', 'Bundesliga 3')
            torneo = torneo.replace('2 Bundesliga', 'Bundesliga 2')
            
            # Equipos
            equipos = re.sub(r'\[.*?\]', '', columnas[3].text.strip())
            equipos = equipos.replace(' - ', ' vs. ')
            
            # Prefijo fijo en "tv"
            prefijo = "tv"

            # Procesar enlaces
            for enlace in columnas[4].find_all('input'):
                url_base64 = base64.b64encode(
                    enlace['value'].encode('utf-8')
                ).decode('utf-8')
                
                evento_completo = f"{hora}|{torneo}|{equipos}|{categoria}"
                clave_unica = f"{url_base64}|{evento_completo}"
                
                # Si es un evento nuevo, lo añadimos
                if clave_unica not in eventos_unicos:
                    eventos_unicos[clave_unica] = {
                        "url": url_base64,
                        "hora": hora,
                        "categoria": categoria,
                        "torneo": torneo,
                        "evento": equipos,
                        "prefijo": prefijo,
                        "tipo": "normal"
                    }
        except Exception as e:
            print(f"Error procesando fila: {e}")
            continue

    # Organizar siempre como tv1, tv2, tv3...
    transmisiones_json = {}
    i = 1
    for evento in eventos_unicos.values():
        transmisiones_json[f"tv{i}"] = {
            "v": evento["url"],
            "hora": evento["hora"],
            "categoria": evento["categoria"],
            "torneo": evento["torneo"],
            "evento": evento["evento"],
            "tipo": evento["tipo"]
        }
        i += 1

    # Crear carpeta si no existe
    os.makedirs('json', exist_ok=True)
    
    # Guardar como JSON
    with open('json/todos.json', 'w', encoding='utf-8') as f:
        json.dump(transmisiones_json, f, indent=2, ensure_ascii=False)
    
    print("Archivo JSON generado exitosamente con 'categoria' incluida!")

if __name__ == "__main__":
    generar_transmisiones_json()
