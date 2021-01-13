$(document).ready(function () {

    //variável que armazena a response
    var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
    };

    dadosMundo();

    //preenche os campos dos números do covid a nível mundial
    function dadosMundo(){

        $.ajax(settings).done(function (response) {
            var content_mundo = response.Global;
            document.getElementById('total_confirmados').innerHTML = content_mundo.TotalConfirmed + '<span id="novos_confirmados"> (+ '+content_mundo.NewConfirmed + ') </span>';
            document.getElementById('total_recuperados').innerHTML = content_mundo.NewConfirmed + '<span id="novos_recuperados"> (+ '+content_mundo.NewRecovered + ') </span>';
            document.getElementById('total_mortos').innerHTML = content_mundo.NewDeaths + '<span id="novos_mortos"> (+ '+content_mundo.NewDeaths + ') </span>';
        });
    };


});
