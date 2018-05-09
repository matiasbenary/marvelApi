$(document).ready(function(){

	// Efecto menu
	$('.page').each(function(index,elemento){
		$(this).css({
			'top': '-200px'
		});

		$(this).animate({
			top: '0'
		},500+(index*250));
	});

	//Manejo Api


});












