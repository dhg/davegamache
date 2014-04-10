var dg = {

  // Variables
  $window:                  $(window),
  $body:                    $('body'),
  $intro:                   $('.intro'),
  $name:                    $('.name'),
  $medium:                  $('.medium'),
  bodyHeight:               0,
  currentScrollTop:         0,
  windowHeight:             0,
  keyframeHeights:          ['100%', '100%', '50%', '100%'],
  prevKeyframesHeights:     0,
  currentKeyframe:          0,


  init: function() {
    dg.$window.on('scroll', dg.onScroll);
    dg.buildPage();
  },

  buildPage: function() {
    dg.currentScrollTop = dg.$window.scrollTop();
    dg.windowHeight = dg.$window.height();
        // Change all of the keyframe heights to px
    for(i=0;i<dg.keyframeHeights.length;i++) {
        dg.keyframeHeights[i] = dg.convertPercentToPx(dg.keyframeHeights[i]);
        dg.bodyHeight += dg.keyframeHeights[i];
        console.log(dg.keyframeHeights[i]);
    }
    dg.$intro.height(dg.keyframeHeights[0]);
    dg.$medium.height(dg.keyframeHeights[1] + dg.keyframeHeights[2]);
    dg.$body.height(dg.bodyHeight);
  },

  onScroll: function() {

    dg.currentScrollTop = dg.$window.scrollTop();

    if(dg.currentKeyframe == 0) {
        dg.scrawler(".intro", '-100%', 0, 0);
        dg.scrawler(".intro-background", 200, 0, 0);
        dg.scrawler(".name", '55%', 0, 0);
        dg.scrawler(".medium", '-100%', 0, 0);
        // dg.scrawler(".other-name", '20%', 0, 0);
    }
    if(dg.currentKeyframe == 1) {
        dg.scrawler(".medium-background", "-5%", 0, 0);
        dg.scrawler(".other-name", '-20%', 0, 0);
        dg.scrawler(".phone", 0, -670, 0);
        dg.scrawler(".phone-2", 0, -750, 0);
        dg.scrawler(".phone-3", 0, -830, 0);
    }
    // if(dg.currentKeyframe == 2) { 
    //     dg.scrawler(".phone", 0, -500, 0);
    // }

    dg.setKeyframe();

    // console.log(dg.currentKeyframe + " , " + (dg.keyframeHeights[dg.currentKeyframe] + dg.prevKeyframesHeights));
    // console.log(dg.currentScrollTop + " vs. " + dg.prevKeyframesHeights);
    // console.log(dg.$window.scrollTop())
    // console.log(dg.keyframeHeights[dg.currentKeyframe]);
    // console.log(dg.currentScrollTop);
    console.log(dg.currentKeyframe);

  },

  setKeyframe: function() {
    // console.log(dg.currentKeyframe)
    if(dg.currentScrollTop > (dg.keyframeHeights[dg.currentKeyframe] + dg.prevKeyframesHeights)) {
        dg.prevKeyframesHeights += dg.keyframeHeights[dg.currentKeyframe];
        dg.currentKeyframe++;
    } else if(dg.currentScrollTop < dg.prevKeyframesHeights && dg.currentScrollTop >= 0) {
        dg.currentKeyframe--;
        dg.prevKeyframesHeights -= dg.keyframeHeights[dg.currentKeyframe];
    }
  },

  convertPercentToPx: function(value) {
    if(typeof value === "string" && value.match(/%/g)) {
        value = (parseFloat(value) / 100) * dg.windowHeight;
    }
    return value;
  },

  scrawler: function(selector, moveY, moveX, opacity) {
    moveY = dg.convertPercentToPx(moveY);
    moveX = dg.convertPercentToPx(moveX);
    if(moveY && moveX) {
        var scrollRateY = moveY / dg.keyframeHeights[dg.currentKeyframe];
        var scrollRateX = moveX / dg.keyframeHeights[dg.currentKeyframe];
        var distanceToMoveY = (dg.currentScrollTop - dg.prevKeyframesHeights) * scrollRateY
        var distanceToMoveX = (dg.currentScrollTop - dg.prevKeyframesHeights) * scrollRateX
        $(selector).css({
          '-webkit-transform': 'translate3d('+ distanceToMoveX + 'px, ' + distanceToMoveY + 'px, 0)',
        });
    } else if(moveY) {
        var scrollRate = moveY / dg.keyframeHeights[dg.currentKeyframe];
        var distanceToMove = (dg.currentScrollTop - dg.prevKeyframesHeights) * scrollRate
        $(selector).css({
          '-webkit-transform': 'translate3d(0,' + distanceToMove + 'px, 0)',
        });
    } else if(moveX) {
        var scrollRate = moveX / dg.keyframeHeights[dg.currentKeyframe];
        var distanceToMove = (dg.currentScrollTop - dg.prevKeyframesHeights) * scrollRate
        $(selector).css({
          '-webkit-transform': 'translate3d(' + distanceToMove + 'px, 0, 0)',
        });
    }
    if(opacity) {
      //dummy fade to 0 right now

    }
  }

}

$(function() {
  dg.init();
})
