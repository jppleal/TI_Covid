$(document).ready(function (){
    $(".icon").on("click", function (){
        if( $(".navbar").css("display") == "none"){
            $(".navbar").css("display", "block");
            $(".icon i").removeClass("");
            $(".icon i").addClass("fas fa-times");
            $(".icon").css("font-size","30px");
        }else{
            $(".navbar").css("display", "none");
            $(".icon i").removeClass("fas fa-times");
            $(".icon i").addClass("fas fa-bars");
        }
    });

    $(window).on("resize", function(){
        if( $(window).width() >= 720){
            $(".navbar").css("display","flex");
        } else{
            $(".navbar").css("display","none"); 
        }
    })
});