$(document).ready(function() {
    $.getJSON('https://aguilaazulcrema.github.io/json/data.json', function(data) {
        let eventBody = $('#event-body');

        data.events.forEach(event => {
            let eventRow = `
                <tr class="cell-color">
                    <td class="cell-color time-cell">${event.time}</td>
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
    });
});
