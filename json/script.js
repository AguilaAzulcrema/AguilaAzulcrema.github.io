$(document).ready(function() {
    $.getJSON('https://aguilaazulcrema.github.io/json/data.json', function(data) {
        let eventBody = $('#event-body');
        let mi_array = [];
        let globalhuso = new Date().getTimezoneOffset() * (-1);

        function toDate(dStr) {
            var now = new Date();
            now.setHours(dStr.substr(0, dStr.indexOf(":")));
            now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
            now.setSeconds(0);
            return now;
        }

        function formato24h(dia) {
            var hours = dia.getHours();
            var minutes = dia.getMinutes();
            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            return hours + ":" + minutes;
        }

        data.events.forEach((event, index) => {
            let eventTime = toDate(event.time);
            mi_array[index] = eventTime;

            let eventRow = `
                <tr class="cell-color">
                    <td class="cell-color time-cell">${formato24h(eventTime)}</td>
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
            var videoUrl = 'https://mexitv.webcindario.com/su/ch3.html?r=' + streamUrl;
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

        // Adjust time zone
        for (let i = 0; i < mi_array.length; i++) {
            let eventTime = mi_array[i];
            eventTime.setMinutes(eventTime.getMinutes() + globalhuso);
            mi_array[i] = eventTime;
        }

        $('#event-body .time-cell').each(function(index) {
            $(this).text(formato24h(mi_array[index]));
        });
    });
});
