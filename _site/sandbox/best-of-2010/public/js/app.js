$(document).ready(function() {

	var things = $('.best-things li');
	
	$(window).scroll(function() {		
		var offset = window.pageYOffset;

		$('.thing-one').css({
			"background-position" : "40% "+ (200 - (offset / 4))+"px"
		});
		$('.thing-two').css({
			"background-position" : "40% "+ (300 -(offset / 4))+"px"
		});
		$('.thing-three').css({
			"background-position" : "40% "+ (750 - (offset / 4))+"px"
		});
		$('.thing-four').css({
			"background-position" : "40% "+ (1000 -(offset / 4))+"px"
		});
		$('.thing-five').css({
			"background-position" : "40% "+ (1200 - (offset / 4))+"px"
		});
		$('.thing-six').css({
			"background-position" : "40% "+ (1500 -(offset / 4))+"px"
		});
		
		
	/* Intro */
		$('.intro .best-seven').css({
			"top" : (15+(offset/20))+"%"
		});
	
	
	/* Graph */
		$('.thing-two .graph').css({
			"background-position" : "820px "+ (1200-(offset / 2))+"px"
		});
		
		
	/* Photos */
		$('.thing-three .photo-one').css({
			"background-position" : "100px "+ (1200-(offset / 3))+"px"
		});
		$('.thing-three .photo-two').css({
			"background-position" : "140px "+ (2300-(offset / 1.5))+"px"
		});
		
	/* Sketches */
		$('#sketches').css({
			"top" : (-135+(offset/40))+"%"
		});
	
	/* Me Bubble */
		$('.thing-seven .content').css({
			"top" : (-159+(offset/40))+"%"
		});
		
	});
});


$(window).load(function() {
	$('#sketches').orbit({
		'bullets': false,
		'timer' : false,
		'animation' : 'fade',
		'captions' : false
	});
	$('.loading').animate({"left" : "100%"});
});


