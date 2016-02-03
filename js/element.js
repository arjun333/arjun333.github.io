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
    $(".main").click(function() {
        $("*").removeClass("active"), $(".main").parent().addClass("active"), $("html, body").animate({
            scrollTop: $("#main").offset().top
        }, 500)
    }), $(".matter").click(function() {
        $("*").removeClass("active"), $(".matter").parent().addClass("active"), $("html, body").animate({
            scrollTop: $("#matter").offset().top
        }, 500)
    })
});