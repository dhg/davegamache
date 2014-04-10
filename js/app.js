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
  keyframeHeights:          ['100%', '100%', 800],
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
        dg.keyframeHeights[i] = dg.convertPercentToDecimal(dg.keyframeHeights[i]);
        dg.bodyHeight += dg.keyframeHeights[i];
    }
    dg.$intro.height(dg.keyframeHeights[0]);
    dg.$medium.height(dg.keyframeHeights[1] + dg.keyframeHeights[2]);
    dg.$body.height(dg.bodyHeight);
  },

  onScroll: function() {

    dg.currentScrollTop = dg.$window.scrollTop();

    if(dg.currentKeyframe == 0) {
        dg.scrawler(".intro-background", 200, 0, 0);
        dg.scrawler(".name", '65%', 0, 0);
        dg.scrawler(".intro", '-101%', 0, 0);
        dg.scrawler(".medium", '-101%', 0, 0);
        dg.scrawler(".test-item-1", '-10%', 400, 0);
        dg.scrawler(".test-item-2", 45, -20, 0);
        dg.scrawler(".test-item-3", '37%', 700, 0);
        dg.scrawler(".test-item-4", '-11%', 200, 0);
        dg.scrawler(".test-item-5", 900, 40, 0);
        dg.scrawler(".test-item-6", '-101%', 393, 0);
        dg.scrawler(".test-item-7", '50%', 200, 0);
    }


    dg.setKeyframe();

    // console.log(dg.currentKeyframe + " , " + (dg.keyframeHeights[dg.currentKeyframe] + dg.prevKeyframesHeights));
    // console.log(dg.currentScrollTop + " vs. " + dg.prevKeyframesHeights);
    // console.log(dg.$window.scrollTop())
    // console.log(dg.keyframeHeights[dg.currentKeyframe]);
    // console.log(dg.currentKeyframe);

  },

  setKeyframe: function() {
    if(dg.currentScrollTop > (dg.keyframeHeights[dg.currentKeyframe] + dg.prevKeyframesHeights)) {
        dg.prevKeyframesHeights += dg.keyframeHeights[dg.currentKeyframe];
        dg.currentKeyframe++;
    } else if(dg.currentScrollTop < dg.prevKeyframesHeights && dg.currentScrollTop >= 0) {
        dg.currentKeyframe--;
        dg.prevKeyframesHeights -= dg.keyframeHeights[dg.currentKeyframe];
    }
  },

  convertPercentToDecimal: function(value) {
    if(typeof value === "string" && value.match(/%/g)) {
        value = (parseFloat(value) / 100) * dg.windowHeight;
    }
    return value;
  },

  scrawler: function(selector, moveY, moveX, opacity) {
    moveY = dg.convertPercentToDecimal(moveY);
    moveX = dg.convertPercentToDecimal(moveX);
    if(moveY) {
        var scrollRate = moveY / dg.keyframeHeights[dg.currentKeyframe];
        var distanceToMove = (dg.currentScrollTop - dg.prevKeyframesHeights) * scrollRate
        $(selector).css({
          '-webkit-transform': 'translate3d(0,' + distanceToMove + 'px, 0)',
        });
    }
    if(moveX) {
        var scrollRate = moveX / dg.keyframeHeights[dg.currentKeyframe];
        var distanceToMove = (dg.currentScrollTop - dg.prevKeyframesHeights) * scrollRate
        $(selector).css({
          '-webkit-transform': 'translate3d(' + distanceToMove + 'px, 0, 0)',
        });
    }
  }

}

$(function() {
  dg.init();
})
