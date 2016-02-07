$(document).ready(function () {
    $("#BackToTop").click(function() {
        $("html, body").animate({
        	scrollTop:0
        }, 1250);
    });
    $(".periodic").click(function() {
    	$("html, body").animate({
    		scrollTop: $("#periodic").offset().top
    	}, 1250);
    });
    $(".mendeleev").click(function() {
    	$("html, body").animate({
    		scrollTop: $("#mendeleev").offset().top
    	}, 1250);
    });
    $(".modern").click(function() {
    	$("html, body").animate({
    		scrollTop: $("#modern").offset().top
    	}, 1250);
    });
    $(".moseley").click(function() {
    	$("html, body").animate({
    		scrollTop: $("#moseley").offset().top
    	}, 1250);
    });
});