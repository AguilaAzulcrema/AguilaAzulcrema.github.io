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
});
