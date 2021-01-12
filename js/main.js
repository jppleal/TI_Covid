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
        "url": "https://api.covid19api.com/",
        "method": "GET",
        "timeout": 0,
    };

    //função que lê a response
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    //função que executa ao mudar de opção
    $(document).on('change', 'select', function () {
        console.log($(this).val());
        $.ajax(settings).done(function (response) {
            console.log(response);
        });

        $("#nome_pais").text($(this).val());
        $("#total_confirmados").text($(this).val());
        $("#novos_confirmados").text($(this).val());
        $("#total_recuperados").text($(this).val());
        $("#novos_recuperados").text($(this).val());
        $("#total_mortos").text($(this).val());
        $("#novos_mortos").text($(this).val());
    });

    $(".submit").on("click", function () {

    })

});