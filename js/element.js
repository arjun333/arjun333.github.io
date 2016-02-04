$(document).ready(function () {
    $("#BackToTop").click(function() {
        $("html, body").animate({scrollTop:0}, 550); 
    });
    $('a[href^="#"]').bind('click.smoothscroll',function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);
        $('html, body').stop().animate( {
            'scrollTop': $target.offset().top-40
        }, 1000, 'swing', function () {
            window.location.hash = target;
        });
    });
});