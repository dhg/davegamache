// To make images retina, add a class "2x" to the img element
// and add a <image-name>@2x.png image. Assumes jquery is loaded.
 
// function isRetina() {
// 	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
// 					  (min--moz-device-pixel-ratio: 1.5),\
// 					  (-o-min-device-pixel-ratio: 3/2),\
// 					  (min-resolution: 1.5dppx)";
 
// 	if (window.devicePixelRatio > 1)
// 		return true;
 
// 	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
// 		return true;
 
// 	return false;
// };
 
 
// function retina() {
	
// 	if (!isRetina())
// 		return;
	
// 	$("img.2x").map(function(i, image) {
		
// 		var path = $(image).attr("src");
		
// 		path = path.replace(".png", "@2x.png");
// 		path = path.replace(".jpg", "@2x.jpg");
		
// 		$(image).attr("src", path);
// 	});
// };
 
$(document).ready(function() {

	var $iphone 		 = $('.js-homepageIphone')
	var $apps        = $('.js-appSplatter-app')
	var $window      = $(window)
  var $body             = $('body')
  var scrollIntervalID  = null
  var scrollTop  = null

  function init() {
  	scrollIntervalID = setInterval(updatePage, 10);
  }

  function updatePage() {
    window.requestAnimationFrame(function() {
      scrollTop = $window.scrollTop();
      if(scrollTop > 0 && scrollTop < 250) {
        animateElements();
      }
    });
  }

  function animateElements() {
  	// value = scrollTop;
  	value = easeOutQuad(scrollTop-50, 0, -30, 200)
   	 $apps.eq(0).css({'transform':    'translate3d(' + 5.8*value + 'px, ' +    2.4*value + 'px, 0)'})
   	 $apps.eq(1).css({'transform':    'translate3d(' + 9.5*value + 'px, ' +    2*value + 'px, 0)'})
   	 $apps.eq(2).css({'transform':    'translate3d(' + 5*value + 'px, ' +    value/100 + 'px, 0)'})
   	 $apps.eq(3).css({'transform':    'translate3d(' + 8*value + 'px, ' +    (-1*value/3) + 'px, 0)'})
   	 $apps.eq(4).css({'transform':    'translate3d(' + 9.5*value + 'px, ' +    -2.4*value + 'px, 0)'})
   	 $apps.eq(5).css({'transform':    'translate3d(' + 6*value + 'px, ' +      -6*value + 'px, 0)'})
   	 $apps.eq(6).css({'transform':    'translate3d(' + -value/3 + 'px, ' + -value/2 + 'px, 0)'})
   	 $apps.eq(7).css({'transform':    'translate3d(' + -value/3 + 'px, ' + -value/2 + 'px, 0)'})
   	 $apps.eq(8).css({'transform':    'translate3d(' + -value/3 + 'px, ' + -value/2 + 'px, 0)'})
   	 $apps.eq(9).css({'transform':    'translate3d(' + -value/3 + 'px, ' + -value/2 + 'px, 0)'})
  	$apps.eq(10).css({'transform':    'translate3d(' + -value/3 + 'px, ' + -value/2 + 'px, 0)'})
   	$apps.eq(11).css({'transform':    'translate3d(' + -value/3 + 'px, ' + -value/2 + 'px, 0)'})
  }

  easeInOutQuad = function (t, b, c, d) {
    //sinusoadial in and out
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  };
  easeOutQuad = function (t, b, c, d) {
		t /= d;
		return -c * t*(t-2) + b;
	};

  // init();

});