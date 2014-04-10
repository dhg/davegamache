(function() {
  $(function() {

    // Variables
    var SCROLL_SPEED_MULTIPLIER =  1, 
        $window =                  $(window),
        $body =                    $('body'),
        $intro =                   $('.intro'),
        $name =                    $('.name'),
        $medium =                  $('.medium'),
        bodyHeight =               0,
        currentScrollTop =         0,
        windowHeight =             0,
        prevKeyframesHeights =     0,
        currentKeyframe =          0,
        keyframes = [
          {
            'start' : 0,// the keyframe at which you want the animations to start
            'duration' : '250%',
            'animations' :  [
              {
                'selector'    : '.intro',
                'translateY'  : -400
              } , {
                'selector'    : '.intro-background',
                'translateY'  : 200
              } , {
                'selector'    : '.name',
                'translateY'  : 0
              } , {
                'selector'    : '.medium',
                'translateY'  : '-100%'
              }
            ]
          } , {
            'start' : 0,// the keyframe at which you want the animations to start
            'duration' : '500%',
            'animations' :  [
              {
                'selector'    : '.medium-background',
                'translateY'  : -50
              } , {
                'selector'    : '.other-name',
                'translateY'  : '-20%'
              } , {
                'selector'    : '.phone',
                'translateX'  : -670
              } , {
                'selector'    : '.phone-2',
                'translateX'  : -750
              } , {
                'selector'    : '.phone-3',
                'translateX'  : -830
              }
            ]
          } , {
            'start' : 0,// the keyframe at which you want the animations to start
            'duration' : '100%',
            'animations' :  []
          }
        ]

    init = function() {
      $window.on('scroll', onScroll);
      buildPage();
    }

    buildPage = function() {
      currentScrollTop = $window.scrollTop();
      windowHeight = $window.height();
      for(i=0;i<keyframes.length;i++) {
          keyframes[i].duration = convertPercentToPx(keyframes[i].duration);
          bodyHeight += keyframes[i].duration;
          for(j=0;j<keyframes[i].animations.length;j++) {
            Object.keys(keyframes[i].animations[j]).forEach(function(key) {
                keyframes[i].animations[j][key] = convertPercentToPx(keyframes[i].animations[j][key]);
            });
          }
      }
      $body.height(bodyHeight);
      $window.scroll(0);
    }

    onScroll = function() {
      var animation, transform, translateY;
      currentScrollTop = $window.scrollTop();
      for(i=0;i<keyframes[currentKeyframe].animations.length;i++) {
        animation = keyframes[currentKeyframe].animations[i];
        if(animation.translateY) {
          animation.translateY = convertPercentToPx(animation.translateY);
          translateY = (currentScrollTop - prevKeyframesHeights) * (animation.translateY / keyframes[currentKeyframe].duration);
        } else {
          translateY = 0;
        }
        if(animation.translateX) {
          animation.translateX = convertPercentToPx(animation.translateX);
          translateX = (currentScrollTop - prevKeyframesHeights) * (animation.translateX / keyframes[currentKeyframe].duration);
        } else {
          translateX = 0;
        }
        $(animation.selector).css({
          '-webkit-transform': 'translate3d(' + translateX +'px, ' + translateY + 'px, 0)',
        })
      }
      setKeyframe();
    }

    setKeyframe = function() {
      // console.log(currentKeyframe + ': ' + currentScrollTop + ' needs to be greater than ' + (keyframes[currentKeyframe].duration + prevKeyframesHeights) + ' and lower than ' + (bodyHeight - windowHeight) + ' to advance to next keyframe');
      if(currentScrollTop > (keyframes[currentKeyframe].duration + prevKeyframesHeights) && currentScrollTop <= (bodyHeight - windowHeight)) {
          prevKeyframesHeights += keyframes[currentKeyframe].duration;
          currentKeyframe++;
      } else if(currentScrollTop < prevKeyframesHeights && currentScrollTop >= 0) {
          currentKeyframe--;
          prevKeyframesHeights -= keyframes[currentKeyframe].duration;
      }
    }

    convertPercentToPx = function(value) {
      if(typeof value === "string" && value.match(/%/g)) {
          value = (parseFloat(value) / 100) * windowHeight;
      }
      return value;
    }

    init();

  })
}).call(this);