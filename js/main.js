$(document).ready(function () {
    //função para mostrar ou não dependendo da dimensão horizontal do ecrã
    $(window).on("resize", function () {
        if ($(window).width() >= 720) {
            $(".navbar").css("display", "flex");
        } else {
            $(".navbar").css("display", "none");
        }
    });

    //função para aceder ao menu na versão para desktop
    $(".icon").on("click", function () {
        if ($(".navbar").css("display") == "none") {
            $(".navbar").css("display", "block");
            $(".icon i").removeClass("");
            $(".icon i").addClass("fas fa-times");
            $(".icon").css("font-size", "30px");
        } else {
            $(".navbar").css("display", "none");
            $(".icon i").removeClass("fas fa-times");
            $(".icon i").addClass("fas fa-bars");
        }
    });

    //Variável que armazena a response 
    var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
    };

    //Preenche a select list
    $.ajax(settings).done(function (response) {
        var content = response.Countries;

        for (var i = 0; i < content.length; i++) {
            var row = content[i];
            $('#pais_id').append('<option value="' + row.Slug + '">' + row.Country + '</option>')
        }
    });
    //função que executa ao mudar de país na página newsletter
    $(document).on('change', 'select', function () {
        var dd = $(this).val();
        //Preenche os campos pelo id
        $.ajax(settings).done(function (response) {
            var content = response.Countries;
            console.log(content[1].Country);
            for (var i = 0; i < content.length; i++) {
                var row = content[i]

                if (row.Slug == dd) {
                    $("#nome_pais").text(row.Country);
                    $("#total_confirmados").text(row.TotalConfirmed);
                    $("#novos_confirmados").text(row.NewConfirmed);
                    $("#total_recuperados").text(row.TotalRecovered);
                    $("#novos_recuperados").text(row.NewRecovered);
                    $("#total_mortos").text(row.TotalDeaths);
                    $("#novos_mortos").text(row.NewDeaths);
                }
            }
        });
    });
});