$(document).ready(function() {
    // Define la zona horaria deseada (offset en minutos desde UTC)
    let timezoneOffset = 6 * 60; // Cambia esto según la zona horaria deseada

    function toDate(dStr) {
        var now = new Date();
        now.setUTCHours(dStr.substr(0, dStr.indexOf(":")));
        now.setUTCMinutes(dStr.substr(dStr.indexOf(":") + 1));
        now.setUTCSeconds(0);
        return now;
    }

    function formato24h(dia) {
        var hours = dia.getHours();
        var minutes = dia.getMinutes();
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        return hours + ":" + minutes;
    }

    // Cargar el archivo JSON (sin la clave "events", accede directamente al array)
    $.getJSON('https://aguilaazulcrema.github.io//json/prueva/eventos.json', function(data) {
        let eventBody = $('#event-body');
        let mi_array = [];

        // Iterar directamente sobre el array de eventos
        data.forEach((event, index) => {
            let eventTime = toDate(event.hora);
            // Convertir a la zona horaria deseada
            let localEventTime = new Date(eventTime.getTime() + timezoneOffset * 60000);
            mi_array[index] = localEventTime;

            // Crear la fila del evento
            let eventRow = `
                <tr class="cell-color">
                    <td class="cell-color time-cell">${formato24h(localEventTime)}</td>
                    <td class="cell-color">
                        <img aria-label="Liga" class="${event.liga}" />
                    </td>
                    <td class="event-title cell-color">${event.equipos}</td>
                </tr>
                <tr class="stream-options">
                    <td colspan="5">`;

            // Iterar sobre los streams y añadir los botones correspondientes
            event.streams.forEach(stream => {
                eventRow += `<a class='btn btn-stream btn-cell-color' data-stream='${stream.url}'>${stream.optionText}</a>`;
            });

            eventRow += `
                    </td>
                </tr>`;
            eventBody.append(eventRow);
        });

        // Control del toggle para mostrar las opciones de transmisión
        $(".cell-color").click(function() {
            var nextRow = $(this).next(".stream-options");
            $(".stream-options").not(nextRow).slideUp();
            nextRow.slideToggle();
        });

        // Control del click en el botón de stream
        $(".btn-stream").click(function(event) {
            event.stopPropagation();
            var streamUrl = $(this).data("stream");
            var videoUrl = 'https://mexi-tv.blogspot.com/p/emb2.html?r=https://mexitv.webcindario.com/su/' + streamUrl;
            var eventTitle = $(this).closest("tr").prev(".cell-color").find(".event-title").text();
            var eventTime = $(this).closest("tr").prev(".cell-color").find("td:first-child").text();

            $("#event-info").text(eventTitle + " | " + eventTime);

            var iframeHtml = '<iframe src="' + videoUrl + '" width="100%" height="500" frameborder="0" allowfullscreen></iframe>';
            $("#video-player-container").html(iframeHtml);

            $("#iframe-code").val(iframeHtml);

            $(".event-info-player").show();
        });

        // Función para copiar el código del iframe
        $("#copy-button").click(function() {
            var copyText = $("#iframe-code");
            copyText.select();
            document.execCommand("copy");
            alert("Copied the iframe code: " + copyText.val());
        });

        // Ajustar estilos
        $(".cell-color, .event-title").css("cursor", "default");
    });
});
