$(document).ready(function () {
    $("#BackToTop").click(function() {
        $("html, body").animate({scrollTop:0}, 550); 
    });
    $(".main").click(function() {
        $("html, body").animate({
            scrollTop: $("#main").offset().top
        }, 550);
    });
    $(".matter").click(function() {
        $("html, body").animate({
            scrollTop: $("#matter").offset().top
        }, 550);
    });
    $(".atom").click(function() {
        $("html, body").animate({
            scrollTop: $("#atom").offset().top
        }, 550);
    });
    $(".quark").click(function() {
        $("html, body").animate({
            scrollTop: $("#quark").offset().top
        }, 550);
    });
    $(".lepton").click(function() {
        $("html, body").animate({
            scrollTop: $("#lepton").offset().top
        }, 550);
    });
    $(".antiparticle").click(function() {
        $("html, body").animate({
            scrollTop: $("#antiparticle").offset().top
        }, 550);
    });
});