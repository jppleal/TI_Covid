$(document).ready(function() {

    //variável que armazena a response
    var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
    };

    dadosMundo(); // executa logo a função dadosMundo

    //cria uma variável para guardar e excutar um setInterval da função dadosVariosPaises() de 3 em 3 segundos
    var interval = setInterval(function() {
        dadosVariosPaises();
    }, 3000);;


    //preenche os campos dos números do covid a nível mundial
    function dadosMundo() {
        $.ajax(settings).done(function(response) {
            var content_mundo = response.Global;
            document.getElementById('total_confirmados').innerHTML = content_mundo.TotalConfirmed + '<span id="novos_confirmados"> (+ ' + content_mundo.NewConfirmed + ') </span>';
            document.getElementById('total_recuperados').innerHTML = content_mundo.NewConfirmed + '<span id="novos_recuperados"> (+ ' + content_mundo.NewRecovered + ') </span>';
            document.getElementById('total_mortos').innerHTML = content_mundo.NewDeaths + '<span id="novos_mortos"> (+ ' + content_mundo.NewDeaths + ') </span>';
        });
    };

    //obter o país consoante a pesquisa a ser feita no <input>
    $('#nome_search_pais').on('input', function() {
        $.ajax(settings).done(function(response) {
            var content_pais = response.Countries; //vai buscar a array "Countries" à resposta do pedido na variável settings
            var input_text = $('#nome_search_pais').val().toUpperCase(); //guarda o valor no <input> em maísculas

            for (var i = 0; i < content_pais.length; i++) { //um ciclo que passa por todas as linhas da array
                var row = content_pais[i]; //na linha do array
                if (row.Country.toUpperCase().startsWith(input_text)) { //transforma o nome do país em maisculas e compara o começo com o valor do <input>
                    $("#nome_pais").text(row.Country); //o nome do país
                    $("#lista_total_confirmados").text(row.TotalConfirmed); //total de casos confirmados
                    $("#lista_novos_confirmados").text('(+' + row.NewConfirmed + ')'); //total de novos casos confirmados
                    $("#lista_total_recuperados").text(row.TotalRecovered); //total de casos recuperados
                    $("#lista_novos_recuperados").text('(+' + row.NewRecovered + ')'); //total de novos casos recuperados
                    $("#lista_total_mortos").text(row.TotalDeaths); //total de mortes confirmadas
                    $("#lista_novos_mortos").text('(+' + row.NewDeaths + ')'); //total de novas mortes confirmadas

                    clearInterval(interval); // uma vez que existe valor no <input> e existe um resultado, ele para o setInterval para impedir que o resultado da pesquisa desapareça
                }
                if (input_text == "") { //quando se apaga o que está dentro do <input>

                    interval = setInterval(function() { //executa novamente a função dadosVariosPaises() de 3 em 3 segundos
                        dadosVariosPaises();
                    }, 3000);
                    return false;
                }
            }
        });
    });

    function dadosVariosPaises() { //vai buscar um país aleatorio para preencher os campos por baixo do <input>, quando não existe resultado de pesquisa
        $.ajax(settings).done(function(response) {
            var content_pais = response.Countries;
            var i = Math.floor(Math.random() * 188); //calcula um valor aleatório
            var row = content_pais[i];
            $("#nome_pais").text(row.Country);
            $("#lista_total_confirmados").text(row.TotalConfirmed);
            $("#lista_novos_confirmados").text('(+' + row.NewConfirmed + ')');
            $("#lista_total_recuperados").text(row.TotalRecovered);
            $("#lista_novos_recuperados").text('(+' + row.NewRecovered + ')');
            $("#lista_total_mortos").text(row.TotalDeaths);
            $("#lista_novos_mortos").text('(+' + row.NewDeaths + ')');

        })
    }
});