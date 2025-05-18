<?php
// Leer el archivo JSON donde están los canales
$channels = json_decode(file_get_contents('chnls.json'), true);

// Obtener el canal desde el parámetro de la URL
$channel = $_GET['channel'] ?? null;

if ($channel && isset($channels[$channel])) {
    // Detectar el tipo
    $info = $channels[$channel];

    header('Content-Type: application/json');

    if ($info['type'] === 'mpd') {
        echo json_encode([
            "type" => "mpd",
            "url" => $info['url'],
            "drm" => [
                "clearkey" => [
                    "keyId" => $info['k1'],
                    "key" => $info['k2']
                ]
            ]
        ]);
    } elseif ($info['type'] === 'm3u8') {
        echo json_encode([
            "type" => "m3u8",
            "url" => $info['url']
        ]);
    } elseif ($info['type'] === 'embed') {
        echo json_encode([
            "type" => "embed",
            "url" => $info['url']
        ]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Canal no encontrado."]);
}
?>
