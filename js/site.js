$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 700);
        return false;
    });
    $(".home").click(function() {
        $("*").removeClass("active"), $(".home").parent().addClass("active"), $("html, body").animate({
            scrollTop: $("#home").offset().top
        }, 500)
    }), $(".periodic").click(function() {
        $("*").removeClass("active"), $(".periodic").parent().addClass("active"), $("html, body").animate({
            scrollTop: $("#periodic").offset().top
        }, 500)
    }), $(".mendeleev").click(function() {
        $("*").removeClass("active"), $(".mendeleev").parent().parent().parent().addClass("active"), $(".asthmaTick").parent().addClass("active"), $("html, body").animate({
            scrollTop: $("#mendeleev").offset().top
        }, 500)
    }), $(".modern").click(function() {
        $("*").removeClass("active"), $(".modern").parent().parent().parent().addClass("active"), $(".asthmaTick").parent().addClass("active"), $("html, body").animate({
            scrollTop: $("#modern").offset().top
        }, 500)
    }), $(".moseley").click(function() {
        $("*").removeClass("active"), $(".moseley").parent().parent().parent().addClass("active"), $(".asthmaTick").parent().addClass("active"), $("html, body").animate({
            scrollTop: $("#moseley").offset().top
        }, 500)
    })
});