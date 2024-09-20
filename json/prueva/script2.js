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

    $.getJSON('eventos.json', function(data) {
        let eventBody = $('#event-body');
        let mi_array = [];

        data.events.forEach((event, index) => {
            let eventTime = toDate(event.time);
            // Convertir a la zona horaria deseada
            let localEventTime = new Date(eventTime.getTime() + timezoneOffset * 60000);
            mi_array[index] = localEventTime;

            let eventRow = `
                <tr class="cell-color">
                    <td class="cell-color time-cell">${formato24h(localEventTime)}</td>
                    <td class="cell-color">
                        <img aria-label="Liga" class="${event.tournament}" />
                    </td>
                    <td class="event-title cell-color">${event.eventTitle}</td>
                </tr>
                <tr class="stream-options">
                    <td colspan="5">`;

            event.streams.forEach(stream => {
                eventRow += `<a class='btn btn-stream btn-cell-color' data-stream='${stream.url}'>${stream.optionText}</a>`;
            });

            eventRow += `
                    </td>
                </tr>`;
            eventBody.append(eventRow);
        });

        $(".cell-color").click(function() {
            var nextRow = $(this).next(".stream-options");
            $(".stream-options").not(nextRow).slideUp();
            nextRow.slideToggle();
        });

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

        $("#copy-button").click(function() {
            var copyText = $("#iframe-code");
            copyText.select();
            document.execCommand("copy");
            alert("Copied the iframe code: " + copyText.val());
        });

        $(".cell-color, .event-title").css("cursor", "default");
    });
});