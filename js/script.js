
/* copy loaded thumbnails into carousel */
$('.row .thumbnail').on('load', function() {
  
}).each(function(i) {
  if(this.complete) {
    var item = $('<div class="item"></div>');
   
    var itemDiv = $(this).parent('div');
    var title = $(this).parent('a').attr("title");
    
    item.attr("title",title);
    $(itemDiv.html()).appendTo(item);
    item.appendTo('.carousel-inner'); 
    if (i==0){ // set first item active
     item.addClass('active');
    }
  }
});

/* activate the carousel */
$(function(){
    $('#mycarousel').carousel();
});

/* change modal title when slide changes */
$("#modal-carousel").on("slid.bs.carousel", function () {
  $(".modal-title").html($(this).find(".active img").attr("title"));
})

/* when clicking a thumbnail */
$(".row .thumbnail").click(function(){
    var content = $(".carousel-inner");
    var title = $(".modal-title");
  
    content.empty();  
    title.empty();
  
  	var id = this.id;  
    var repo = $("#img-repo .item");
    var repoCopy = repo.filter("#" + id).clone();
    var active = repoCopy.first();
  
    active.addClass("active");
    title.html(active.find("img").attr("title"));
  	content.append(repoCopy);

    // show the modal
   $("#modal-gallery").modal("show");
 

});


//  $(".main").scroll_page({
//     sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
//     easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
//                                      // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
//     //animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
//     //pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
//     updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
//     beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
//     afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
//     loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
//     keyboard: true,                  // You can activate the keyboard controls
//     responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
//                                      // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
//                                      // the browser's width is less than 600, the fallback will kick in.
//     direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
//  });

 $(".main").onepage_scroll({
   sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
   pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: true,                  // You can activate the keyboard controls
   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
});

