(function() {
  $(function() {

    /*  Globals
    -------------------------------------------------- */
    var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'scale'],
        $window =                  $(window),
        $body =                    $('body'),
        wrappers =                 [],
        currentWrapper =           null,
        scrollTimeoutID =          0,
        bodyHeight =               0,
        windowHeight =             0,
        windowWidth =              0,
        prevKeyframesDurations =   0,
        scrollTop =                0,
        relativeScrollTop =        0,
        currentKeyframe =          0,
        keyframes = [
          {
            'wrapper' : '#intro',
            'duration' : '150%',
            'animations' :  [
              {
                'selector'    : '.name',
                'translateY'  : -120,
                'opacity'     : 0
              } , {
                'selector'    : '.byline',
                'translateY'  : -100,
                'opacity'     : 0
              }
            ]
          } , {
            'wrapper' : '#medium',
            'duration' : '300%',
            'animations' :  [
              {
                'selector'    : '.medium-byline',
                'translateY'  : '-25%'
              } , {
                'selector'    : '.medium-byline-1',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '.raw-page',
                'translateY'  : '-90%'
              }
            ]
          } , {
            'wrapper' : '#medium',
            'duration' : '80%',
            'animations' :  []
          } , {
            'wrapper' : '#medium',
            'duration' : '250%',
            'animations' :  [
              {
                'selector'    : '.medium-byline-2',
                'opacity'     : [0, 1]
              } , {
                'selector'    : '.medium-byline-1',
                'opacity'     : [1, .3]
              } , {
                'selector'    : '.iphone',
                'translateY'  : '-66%'
              }
            ]
          } , {
            'wrapper' : '#medium',
            'duration' : '80%',
            'animations' :  []
          } , {
            'wrapper' : '#medium',
            'duration' : '250%',
            'animations' :  [
              {
                'selector'    : '.medium-byline-3',
                'opacity'     : [0, 1]
              } , {
                'selector'    : '.medium-byline-2',
                'opacity'     : [1, .3]
              }
            ]
          } , {
            'wrapper' : '#medium',
            'duration' : '80%',
            'animations' :  []
          } , {
            'wrapper' : '#medium',
            'duration' : '300%',
            'animations' :  [
              {
                'selector'    : '.iphone',
                'translateY'  : ['-66%', '-66%'],
                'translateX'  : '-5%'
              } , {
                'selector'    : '.raw-page',
                'translateY'  : ['-90%', '-90%'],
                'translateX'  : '-45%'
              } , {
                'selector'    : '.medium-byline',
                'opacity'     : 0,
                'translateY'  : ['-25%','-25%'],
                'translateX'  : '-5%'
              }
            ]
          } , {
            'wrapper' : '#medium',
            'duration' : '100%',
            'animations' :  []
          } , 
        ]

    /*  Construction
    -------------------------------------------------- */
    init = function() {
      scrollIntervalID = setInterval(updatePage, 10);
      scrollTop = $window.scrollTop();
      windowHeight = $window.height();
      windowWidth = $window.width();
      convertAllPropsToPx();
      buildPage();
    }

    buildPage = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
          bodyHeight += keyframes[i].duration;
          if($.inArray(keyframes[i].wrapper, wrappers) == -1) {
            wrappers.push(keyframes[i].wrapper);
          }
          for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
            Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
              value = keyframes[i].animations[j][key];
              if(key !== 'selector' && value instanceof Array === false) {
                var valueSet = [];
                valueSet.push(getDefaultPropertyValue(key), value);
                value = valueSet;
              }
              keyframes[i].animations[j][key] = value;
            });
          }
      }
      $body.height(bodyHeight);
      $window.scroll(0);
      currentWrapper = wrappers[0];
      $(currentWrapper).show();
    }

    convertAllPropsToPx = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
        keyframes[i].duration = convertPercentToPx(keyframes[i].duration, 'y');
        for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
          Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
            value = keyframes[i].animations[j][key];
            if(key !== 'selector') {
              if(value instanceof Array) { // if its an array
                for(k=0;k<value.length;k++) { // if value in array is %
                  if(typeof value[k] === "string") {
                    if(key === 'translateY') {
                      value[k] = convertPercentToPx(value[k], 'y');
                    } else {
                      value[k] = convertPercentToPx(value[k], 'x');
                    }
                  }
                } 
              } else {
                if(typeof value === "string") { // if single value is a %
                  if(key === 'translateY') {
                    value = convertPercentToPx(value, 'y');
                  } else {
                    value = convertPercentToPx(value, 'x');
                  }
                }
              }
              keyframes[i].animations[j][key] = value;
            }
          });
        }
      }
    }

    getDefaultPropertyValue = function(property) {
      switch (property) {
        case 'translateX':
          return 0;
        case 'translateY':
          return 0;
        case 'scale':
          return 1;
        case 'opacity':
          return 1;
        default:
          return null;
      }
    }

    /*  Animation/Scrolling
    -------------------------------------------------- */
    updatePage = function() {
      // console.log(Math.abs(scrollTop - $window.scrollTop()) < 100);
      // if(Math.abs(scrollTop - $window.scrollTop()) < 100) {
      window.requestAnimationFrame(function() {
          setScrollTops();
          if(scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {
            animateElements();
            setKeyframe();
          }
        });
      // }
    }

    setScrollTops = function() {
      scrollTop = $window.scrollTop();
      relativeScrollTop = scrollTop - prevKeyframesDurations;
    }

    animateElements = function() {
      var animation, translateY, translateX, scale, opacity;
      for(var i=0;i<keyframes[currentKeyframe].animations.length;i++) {
        animation   = keyframes[currentKeyframe].animations[i];
        translateY  = calcPropValue(animation, 'translateY', 'easeOut');
        translateX  = calcPropValue(animation, 'translateX', 'easeOut');
        scale       = calcPropValue(animation, 'scale', 'easeOut');
        opacity     = calcPropValue(animation, 'opacity', 'easeOut');

        $(animation.selector).css({
          'transform':    'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +')',
          'opacity' : opacity
        })
      }
    }

    calcPropValue = function(animation, property) {
      var value = animation[property];
      if(value) {
        value = easeInOutQuad(relativeScrollTop, value[0], (value[1]-value[0]), keyframes[currentKeyframe].duration);
      } else {
        value = getDefaultPropertyValue(property);
      }
      value = +value.toFixed(2)
      return value;
    }

    easeInOutQuad = function (t, b, c, d) {
      // linear
      // return c*t/d + b;

      //quad out
      // t /= d;
      // return -c * t*(t-2) + b;

      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;

      // quadinout
      // t /= d/2;
      // if (t < 1) return c/2*t*t + b;
      // t--;
      // return -c/2 * (t*(t-2) - 1) + b;
    };

    setKeyframe = function() {
      if(scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {
          prevKeyframesDurations += keyframes[currentKeyframe].duration;
          currentKeyframe++;
          showCurrentWrappers();
      } else if(scrollTop < prevKeyframesDurations) {
          currentKeyframe--;
          prevKeyframesDurations -= keyframes[currentKeyframe].duration;
          showCurrentWrappers();
      }
    }

    showCurrentWrappers = function() {
      var i;
      console.log("showCurrentWrappers called")
      if(keyframes[currentKeyframe].wrapper != currentWrapper) {
        $(currentWrapper).hide();
        $(keyframes[currentKeyframe].wrapper).show();
        currentWrapper = keyframes[currentKeyframe].wrapper;
        console.log($(keyframes[currentKeyframe].wrapper));
      }
    }

    /*  Helpers
    -------------------------------------------------- */

    convertPercentToPx = function(value, axis) {
      if(typeof value === "string" && value.match(/%/g)) {
        if(axis === 'y') value = (parseFloat(value) / 100) * windowHeight;
        if(axis === 'x') value = (parseFloat(value) / 100) * windowWidth;
      }
      return value;
    }

    init();

  })
}).call(this);


/*

Thanks for http://www.gizma.com/easing/ for providing the easing 
To http://www.kirupa.com/forum/showthread.php?378287-Robert-Penner-s-Easing-Equations-in-Pure-JS-(no-jQuery) for helping me understand easing
To Dropbox Team for not obfuscating their JS which made this project much easier to complete


*/