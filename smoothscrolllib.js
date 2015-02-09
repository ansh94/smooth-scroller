// Smooth Scroller Library. 

/* This is an IIFE - this function gets executed as soon this file is loaded. 
** After which smoothScroller becomes a global variable which only has one function init into it which is not called yet. 
** You can call the init method whenever you want to. 
**I am only REGISTERING the function at bottom of the file to onload event of window */
var smoothScroller = (function () {
    'use strict';
    function smoothScrollTo(e) {
        // Prevent default action of href action
        e.preventDefault();
        
        // Find topY of element this link is linked to by extracting the href attribute
        var topY = document.getElementById(this.getAttribute('href').substr(1)).offsetTop;
        
        // Decide if you need to go up or down
        var diff = window.pageYOffset > topY ? -30 : 30;
        
        // This would also adjust if you have fixed header. 
        // All you need is to add class 'fixed-top-header' to fixed header element.
        var fixed_header = document.getElementsByClassName('fixed-top-header')[0];
        var header_height = fixed_header ? fixed_header.offsetHeight : 0;
        
        // Create Interval to move the window position
        var z = setInterval( function() {
            if ((window.pageYOffset + header_height) < topY && (topY - (window.pageYOffset+header_height))< 30) {
                clearInterval(z);
            }
            console.log(diff);
            window.scrollTo(0, window.pageYOffset + diff);
        }, 10);
    }
    return {
        init: function() {
                  // get all links from the page
                  var a = document.getElementsByTagName('a');
                  for(var i = 0; i < a.length; i++){
                     // Check Ids if they are in page links
                     var href = a[i].getAttribute('href');
                     if (href[0] == '#') {
                         // add listener to only internal links
                         a[i].addEventListener('click', smoothScrollTo.bind(a[i]), false);
                     }
                  }
        }
    }
})();

// We shouldn't use this as this overwrites all other listners
// window.onload = smoothScroller.init;
// We should use addEventListner instead as we can add multiple listners on same event
window.addEventListener('load', smoothScroller.init, false)