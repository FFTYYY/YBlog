$(document).ready(
	function() { 
		$(".content-area .content").niceScroll({cursorborder:"",cursorcolor:"#657899",boxzoom:false});
		setInterval(function(){$(".content-area .content").getNiceScroll().resize()} , 500)
	}
);
