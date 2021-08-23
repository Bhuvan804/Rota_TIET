var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
  forEach(hamburgers, function(hamburger) {
    hamburger.addEventListener("click", function() {
      this.classList.toggle("is-active");
    }, false);
  });
}


$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});


// FOR SCROLL UP BUTTON
// ===== Scroll to Top ==== 
// NOTICE: May not work on mobile devices.
// used to avoid using 255, thus generating white-ish backgrounds that make text unreadable
const colorMax = 192;

// gets the breakpoint at which the scroll-to-top button should appear
const scrollBreakpoint = window.innerHeight * 0.2;

document.addEventListener('DOMContentLoaded', () => {
  randomizeBackgrounds();
  setupScrollListener();
  setupScrollEvent();  
});

// scrolls window to top
function setupScrollEvent() {
  const scrollButton = document.querySelector('.scroll-top');
  
  scrollButton.addEventListener('click', (e) => {
    // not the best solution until Safari/Edge support scroll behavior
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Thanks to Geroge Daniel https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari
    smoothVerticalScrolling(scrollButton.parentElement, 250, "top");
  });
}

// prepares the window for a scroll event to show the scroll button
function setupScrollListener() {  
   window.addEventListener('scroll', (e) => {
     const scrollButton = document.querySelector('.scroll-top');
     
     // const scrollOffset = document.scrollingElement.scrollTop;
     const scrollOffset = window.scrollY;
    
     if (scrollOffset >= scrollBreakpoint) {
       scrollButton.classList.add('visible');
     } else if (scrollOffset <= 0) {
       scrollButton.classList.remove('visible');
     }    
  });
}

function randomizeBackgrounds() {
  // get all the content containers
  const contentContainers = document.querySelectorAll('.content-container');
  
  [].forEach.call(contentContainers, container => {
    // assign random background
    container.style.background = `rgb(${randVal(colorMax)},${randVal(colorMax)},${randVal(colorMax)})`;
  });
}

// random between 0 to max
function randVal(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// uses a timeout to scroll to top
function smoothVerticalScrolling(e, time, where) {
  // gets the element's top position relative to the viewport
  const eTop = e.getBoundingClientRect().top;
  
  // divides the top offset into 100 steps to be ellapsed
  const eAmt = eTop / 100;
  
  // starting time
  let curTime = 0;
  
  // not to exceed the desired duration
  while (curTime <= time) {
    // call a function to execute at one hundreth of the desired scroll time
    window.setTimeout(SVS_B, curTime, eAmt, where);
    // increase by one hundreth of the desired time to execute exactly 100 times
    curTime += time / 100;
  }
}

function SVS_B(eAmt, where) {
  // scroll by half the hundredth of the top offset if destination is not top (since to center only involves scrolling either in the top or bottom half of the window)
  if(where == "center" || where == "") {
    window.scrollBy(0, eAmt / 2); 
  }
  // otherwise scroll the full amount
  if (where == "top") {
    window.scrollBy(0, eAmt);
  }    
}



// COUNTER UP
// number count for stats, using jQuery animate

$('.counting').each(function() {
  var $this = $(this),
      countTo = $this.attr('data-count');
  
  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },

  {

    duration: 3900,
    easing:'linear',
    step: function() {
      $this.text(Math.floor(this.countNum));
    },
    complete: function() {
      $this.text(this.countNum);
      //alert('finished');
    }

  });  
  

});