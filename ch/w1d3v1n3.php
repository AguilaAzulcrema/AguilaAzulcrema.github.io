<?php
// Leer el archivo JSON donde están las licencias
$licenses = json_decode(file_get_contents('licenses.json'), true);

// Obtener el canal desde el parámetro de la URL
$channel = $_GET['channel'] ?? null;

if ($channel && isset($licenses[$channel])) {
    // Si el canal existe, devolvemos solo las keys en el formato esperado
    header('Content-Type: application/json');
    echo json_encode([
        "k1" => $licenses[$channel]['k1'],
        "k2" => $licenses[$channel]['k2']
    ]);
} else {
    // Si no existe el canal, respondemos con un error
    http_response_code(404);
    echo json_encode(["error" => "Canal no encontrado."]);
}
?>
