$(document).ready(function() {
    $(".table_card").css("display", "none");

    //Variável que armazena a response 
    var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
    };

    //Preenche a select list
    $.ajax(settings).done(function(response) {
        var content = response.Countries;
        for (var i = 0; i < content.length; i++) {
            var row = content[i];
            $('#pais_id').append('<option value="' + row.Slug + '">' + row.Country + '</option>')
        }
    });

    //função que executa ao mudar de país
    $(document).on('change', 'select', function() {
        var dd = $(this).val(); //obtém o valor da opção selecionada

        //Verifica se um país foi selecionado para mostrar ou não os dados do país
        if (dd == "default") {
            $(".table_card").css("display", "none");
        } else {
            $(".table_card").css("display", "");
        }

        //Preenche os campos pelo id
        $.ajax(settings).done(function(response) {
            var content = response.Countries;
            for (var i = 0; i < content.length; i++) {
                var row = content[i];
                if (row.Slug == dd) {
                    $("#nome_pais").text(row.Country);
                    $("#total_confirmados").text(row.TotalConfirmed);
                    $("#novos_confirmados").text('(+' + row.NewConfirmed + ')');
                    $("#total_recuperados").text(row.TotalRecovered);
                    $("#novos_recuperados").text('(+' + row.NewRecovered + ')');
                    $("#total_mortos").text(row.TotalDeaths);
                    $("#novos_mortos").text('(+' + row.NewDeaths + ')');
                }
            }
        });
    });
});