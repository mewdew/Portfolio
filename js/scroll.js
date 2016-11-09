


//Main function module

!function($){

	var defaults = {
		sectionContainer: "section",
		updateURL: false,
		keyboard: true,
		beforeMove: null,
		afterMove: null,
		loop: true,
		responsiveFallback: false,
		direction: 'vertical'
	};

	/*------------------------------------------------*/
	/*    swipe event                                 */
	/*------------------------------------------------*/

    $.fn.scroll_page = function(options){
    	var settings = $.extend({}, defaults, options),
    	    elem = $(this),
    	    sections = $(settings.sectionContainer)
    	    total = sections.length,
    	    status = "off",
    	    topPos = 0,
    	    leftPos = 0,
    	    lastTime = 0,
    	    quietPeriod = 500;

        

    $.fn.movePage = function(settings, pos, index) {
    	console.log("movePage");
    	if(typeof settings.beforeMove == 'function') settings.beforeMove(index);
    	// Just a simple edit that makes use of modernizr to detect an IE8 browser and changes the transform method into
      // an top animate so IE8 users can also use this script.
      // if($('html').hasClass('ie8')){
      //   if (settings.direction == 'horizontal') {
      //     var toppos = (el.width()/100)*pos;
      //     $(this).animate({left: toppos+'px'},settings.animationTime);
      //   } else {
      //     var toppos = (el.height()/100)*pos;
      //     $(this).animate({top: toppos+'px'},settings.animationTime);
      //   }
      // } else{
      	$(this).css({
      		"webkit-transform": (settings.direction == 'horizontal') ? "translate3d:("+pos+"% , 0 , 0)" : "translate3d(0, " + pos + "%, 0)",
      		"-moz-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
      		"-ms-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
      		"transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)"
      	});

      	$(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        if (typeof settings.afterMove == 'function') settings.afterMove(index);
      });
    }



	$.fn.moveDown = function() {
      var elem = $(this)
      index = $(settings.sectionContainer +".active").data("index");
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
      console.log("inside moveDown");
      if(next.length < 1) {
        if (settings.loop == true) {
          pos = 0;
          next = $(settings.sectionContainer + "[data-index='1']");
        } else {
        	console.log("going to movePage");
          return
        }

      } else {
        pos = (index * 100) * -1;
      }
      
      if (typeof settings.beforeMove == 'function') settings.beforeMove( next.data("index"));
      current.removeClass("active")
      next.addClass("active")
      // if(settings.pagination == true) {
      //   $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
      //   $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
      // }
      
      $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $("body").addClass("viewing-page-"+next.data("index"))

      // if (history.replaceState && settings.updateURL == true) {
      //   var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index + 1);
      //   history.pushState( {}, document.title, href );
      // }
      console.log("going to movePage");
      elem.movePage(settings, pos, next.data("index"));
    }

    $.fn.moveUp = function() {
    	var elem = $(this)
    	index = $(settings.sectionContainer + ".active").data("index");
    	current = $(settings.sectionContainer + "[data-index='" + index + "']");
    	next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");
    	console.log("inside moveUp");
    	if(next.length < 1){
    		if(settings.loop == true){
    			pos = 0;
    			next = $(settings.sectionContainer + "[data-index='1'");
    		} else {
    		  return
    		}
    	} else {
    		pos = ((next.data("index") - 1) * 100) * -1;
        }

        if (typeof settings.beforeMove == 'function') settings.beforeMove( next.data("index"));
        current.removeClass("active")
        next.addClass("active")
        
        $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        $("body").addClass("viewing-page-"+next.data("index"))

        elem.movePage(settings, pos, next.data("index"));
    }

    $.fn.moveTo = function (pageIndex){
    	current = $(settings.sectionContainer + ".active")
    	next = $(settings.sectionContainer + "[data-index = '" + pageIndex + "']");
    	console.log("inside index");
    	if(next.length > 0) {
        if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
        current.removeClass("active")
        next.addClass("active")

        $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        $("body").addClass("viewing-page-"+next.data("index"))

        pos = ((pageIndex - 1) * 100) * -1;

        elem.movePage(settings, pos, pageIndex);
      }
    }	

   function init_scroll(event, delta) {
        deltaOfInterest = delta;
        var timeNow = new Date().getTime();
        // Cancel scroll if currently animating or within quiet period
        if(timeNow - lastTime < quietPeriod ) {
            event.preventDefault();
            return;
        }

        if (deltaOfInterest < 0) {
          elem.moveDown()
        } else {
          elem.moveUp()
        }
        lastTime = timeNow;
    } 

     // Prepare everything before binding wheel scroll

    // elem.addClass("onepage-wrapper").css("position","relative");
    // $.each( sections, function(i) {
    // 	console.log(i);
    //   $(this).css({
    //     position: "absolute",
    //     top: topPos + "%"
    //   }).addClass("section").attr("data-index", i+1);


    //   $(this).css({
    //     position: "absolute",
    //     left: ( settings.direction == 'horizontal' )
    //       ? leftPos + "%"
    //       : 0,
    //     top: ( settings.direction == 'vertical' || settings.direction != 'horizontal' )
    //       ? topPos + "%"
    //       : 0
    //   });

    //   if (settings.direction == 'horizontal')
    //     leftPos = leftPos + 100;
    //   else
    //     topPos = topPos + 100;
    // }); 

    // elem.swipeEvents().bind("swipeDown",  function(event){
    //   if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
    //   elem.moveUp();
    // }).bind("swipeUp", function(event){
    //   if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
    //   elem.moveDown();
    // });

    $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
      event.preventDefault();
      var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
      if(!$("body").hasClass("disabled-onepage-scroll")) init_scroll(event, delta);
    });

    if(settings.keyboard == true) {
      $(document).keydown(function(e) {
        var tag = e.target.tagName.toLowerCase();

        if (!$("body").hasClass("disabled-onepage-scroll")) {
          switch(e.which) {
            case 38:
              if (tag != 'input' && tag != 'textarea') elem.moveUp()
            break;
            case 40:
              if (tag != 'input' && tag != 'textarea') elem.moveDown()
            break;
            case 32: //spacebar
              if (tag != 'input' && tag != 'textarea') elem.moveDown()
            break;
            case 33: //pageg up
              if (tag != 'input' && tag != 'textarea') elem.moveUp()
            break;
            case 34: //page dwn
              if (tag != 'input' && tag != 'textarea') elem.moveDown()
            break;
            case 36: //home
              el.moveTo(1);
            break;
            case 35: //end
              el.moveTo(total);
            break;
            default: return;
          }
        }

      });
    }
    return false;
}
    





}(window.jQuery);

