$(document).ready(
	function() { 
		$("#inner_text").niceScroll({cursorborder:"",cursorcolor:"#657899",boxzoom:false});
		setInterval(function(){$("#inner_text").getNiceScroll().resize()} , 500)
	}
);
