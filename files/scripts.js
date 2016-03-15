
$(document).ready(function(){

    "use strict";


/*new Vivus('avatar', {
  file: 'avatar strokes final.svg',
  onReady: function (myVivus) {
    // `el` property is the SVG element
    myVivus.el.setAttribute('height', 'auto');
  }
});*/
function fadeItIn(){
    $("#avatar").fadeOut();
    $("#avatar-filled").fadeIn();
}
//new Vivus('avatar', {duration: 200}, null);
    new Vivus('avatar', {
                    type: 'scenario',
                    duration: 100
                }, fadeItIn);
    


 
  $("#owl-demo").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400
      
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
 
  });
 


});






















