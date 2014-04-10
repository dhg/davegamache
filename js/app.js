var dg = {

  // Variables
  $window:                  $(window),
  $intro:                   $('.intro'),
  $name:                    $('.name'),
  $medium:                  $('.medium'),
  currentScrollTop:         0,
  windowHeight:             0,
  keyframeHeights:          ['100%', 700, 800],
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
    }
    dg.$intro.height(dg.keyframeHeights[0]);
    dg.$medium.height(dg.keyframeHeights[1] + dg.keyframeHeights[2]);
  },

  onScroll: function() {

    dg.currentScrollTop = dg.$window.scrollTop();

    if(dg.currentKeyframe == 0) {
        dg.scrawler(".intro-background", 200, 0, 0);
        dg.scrawler(".name", '65%', 0, 0);
        dg.scrawler(".intro", '-101%', 0, 0);
    }

    dg.whichKeyframe();

    // console.log(dg.currentKeyframe + " , " + (dg.keyframeHeights[dg.currentKeyframe] + dg.prevKeyframesHeights));
    // console.log(dg.currentScrollTop + " vs. " + dg.prevKeyframesHeights);
    // console.log(dg.$window.scrollTop())
    // console.log(dg.keyframeHeights[dg.currentKeyframe]);
    // console.log(dg.currentKeyframe);

  },

  whichKeyframe: function() {
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
