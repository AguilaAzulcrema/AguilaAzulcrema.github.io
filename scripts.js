$(document).ready(function() {
    $(".cell-color").click(function() {
        var nextRow = $(this).next(".stream-options");
        $(".stream-options").not(nextRow).slideUp(); // Oculta otras opciones abiertas
        nextRow.slideToggle(); // Alterna la visibilidad de las opciones de transmisión para esta fila
    });

    $(".btn-stream").click(function(event) {
        event.stopPropagation(); // Evita que el clic se propague al tr y cierre las opciones

        var streamUrl = $(this).data("stream");
        var videoUrl = 'https://mexitv.webcindario.com/su/ch3.html?r=' + streamUrl;
        var eventTitle = $(this).closest("tr").prev(".cell-color").find(".event-title").text();
        var eventTime = $(this).closest("tr").prev(".cell-color").find("td:first-child").text();
        
        $("#event-info").text(eventTitle + " | " + eventTime);
        
        var iframeHtml = '<iframe src="' + videoUrl + '" width="100%" height="500" frameborder="0" allowfullscreen></iframe>';
        $("#video-player-container").html(iframeHtml);
        
        $("#iframe-code").val(iframeHtml);

        $(".event-info-player").show(); // Muestra el contenedor del reproductor
    });

    $("#copy-button").click(function() {
        var copyText = $("#iframe-code");
        copyText.select();
        document.execCommand("copy");
        alert("Copied the iframe code: " + copyText.val());
    });

    // Quita el cursor de punto de inserción en los textos
    $(".cell-color, .event-title").css("cursor", "default");
});
