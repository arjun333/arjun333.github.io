function onload (){
	function physics (){
		$("#physics").mouseenter(function() {
			$(this).find("img.physics").attr("src", "res/physics.gif");
	  		$(this).fadeTo(250, 0.95);
	  		$(this).css({
	  			"box-shadow": "5px 8px 5px black",
	  			"background-color": "#5b5b5b"
	  		});
	  		$("#chemistry").fadeTo(250, 0.35);
		});
		$("#physics").mouseleave(function() {
			$(this).find("img.physics").attr("src", "res/staticphysics.gif");
	  		$(this).fadeTo(250, 0.65);
	  		$(this).css({
	  			"box-shadow": "2px 5px 5px black",
	  			"background-color": "#cccccc"
	  		});
	  		$("#chemistry").fadeTo(250, 0.65);
		});
	}
	function chemistry (){
		$("#chemistry").mouseenter(function() {
			$(this).find("img.chemistry").attr("src", "res/chemistry.gif");
	  		$(this).fadeTo(250, 0.95);
	  		$(this).css({
	  			"box-shadow": "5px 8px 5px black",
	  			"background-color": "#003cb3"
	  		});
	  		$("#physics").fadeTo(250, 0.35);
		});
		$("#chemistry").mouseleave(function() {
			$(this).find("img.chemistry").attr("src", "res/staticchemistry.gif");
	  		$(this).fadeTo(250, 0.65);
	  		$(this).css({
	  			"box-shadow": "2px 5px 5px black",
	  			"background-color": "#cccccc"
	  		});
	  		$("#physics").fadeTo(250, 0.65);
		});
	}
	physics();
	chemistry();
}