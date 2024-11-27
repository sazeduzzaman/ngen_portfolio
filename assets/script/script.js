window.onscroll = function () {
  if (window.pageYOffset >= 50) {
    var navbar = document.getElementById("navbar");
    navbar.classList.remove("navbar-dark");
    navbar.classList.add("navbar-light");
    navbar.classList.add("navbar-blur");
  } else {
    var navbar = document.getElementById("navbar");
    navbar.classList.remove("navbar-light");
    navbar.classList.remove("navbar-blur");
    navbar.classList.add("navbar-dark");
  }
};

// Init slick slider + animation
$(".slider")
  .slick({
    autoplay: true,
    speed: 800,
    lazyLoad: "progressive",
    arrows: true,
    dots: false,
    prevArrow:
      '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
    nextArrow:
      '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
  })
  .slickAnimation();

$(".slick-nav").on("click touch", function (e) {
  e.preventDefault();

  var arrow = $(this);

  if (!arrow.hasClass("animate")) {
    arrow.addClass("animate");
    setTimeout(() => {
      arrow.removeClass("animate");
    }, 1600);
  }
});

// window.addEventListener('load', function() {
//   // Hide preloader and show main content
//   document.getElementById('preloader').style.display = 'none';
//   document.getElementById('main-content').style.display = 'block';
// });

var words = document.getElementsByClassName("word");
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw =
    currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = "letter behind";
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
  setTimeout(function () {
    cw[i].className = "letter out";
  }, i * 80);
}

function animateLetterIn(nw, i) {
  setTimeout(function () {
    nw[i].className = "letter in";
  }, 340 + i * 80);
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = "";
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement("span");
    letter.className = "letter";
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);

// Counter Script

$.fn.jQuerySimpleCounter = function (options) {
  var settings = $.extend(
    {
      start: 0,
      end: 100,
      easing: "swing",
      duration: 400,
      complete: "",
    },
    options
  );

  var thisElement = $(this);

  $({ count: settings.start }).animate(
    { count: settings.end },
    {
      duration: settings.duration,
      easing: settings.easing,
      step: function () {
        var mathCount = Math.ceil(this.count);
        thisElement.text(mathCount);
      },
      complete: settings.complete,
    }
  );
};

$("#number1").jQuerySimpleCounter({ end: 112, duration: 3000 });
$("#number2").jQuerySimpleCounter({ end: 155, duration: 3000 });
$("#number3").jQuerySimpleCounter({ end: 112, duration: 2000 });
$("#number4").jQuerySimpleCounter({ end: 16, duration: 2500 });

/* AUTHOR LINK */
$(".about-me-img").hover(
  function () {
    $(".authorWindowWrapper").stop().fadeIn("fast").find("p").addClass("trans");
  },
  function () {
    $(".authorWindowWrapper")
      .stop()
      .fadeOut("fast")
      .find("p")
      .removeClass("trans");
  }
);

gsap.registerPlugin(ScrollTrigger);

let horizontalSection = document.querySelector(".horizontal");

gsap.to(".horizontal", {
  x: () =>
    -horizontalSection.scrollWidth + document.documentElement.clientWidth,
  ease: "none",
  scrollTrigger: {
    trigger: "#horizontal-scroll",
    start: "center center",
    end: "+=2000px",
    pin: "#horizontal-scroll",
    scrub: true,
    invalidateOnRefresh: true,
  },
});
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// normalize scroll behavior
ScrollTrigger.normalizeScroll(true);

// create a ScrollSmoother instance
let smoother = ScrollSmoother.create({
  smooth: 3,
  effects: true,
  smoothTouch: 0.1,
});

// Mobile Image Show And Hide
document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll(".slideshow-image");
  let currentIndex = 0;

  function showNextImage() {
    // Hide the current image
    images[currentIndex].style.display = "none";

    // Move to the next image
    currentIndex = (currentIndex + 1) % images.length;

    // Show the next image
    images[currentIndex].style.display = "block";
  }

  // Set interval to change the image every 5 seconds
  setInterval(showNextImage, 5000);
});

$(document).ready(function () {
  $(".team-slider").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: true,
    infinite: true, // Enables infinite looping
  });
});
const iframe = document.querySelector("iframe");
iframe.onload = function () {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const logoBacks = iframeDoc.querySelector(".logo-backs2");
  if (logoBacks) {
    logoBacks.style.display = "none";
  }
};

// 1. querySelector
var containerEl = document.querySelector("ul.container");
// 2. Passing the configuration object inline
//https://www.kunkalabs.com/mixitup/docs/configuration-object/
var mixer = mixitup(containerEl, {
  animation: {
    effects: "fade translateZ(-100px)",
    effectsIn: "fade translateY(-100%)",
    easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  },
});

// fancybox insilaze & options //
$("[data-fancybox]").fancybox({
  /* "TRICK" selector - group only visible items */
  selector: ".mix:visible a",
  loop: true,
  hash: true,
  transitionEffect: "slide",
  /* zoom VS next////////////////////
  clickContent - i modify the deafult - now when you click on the image you go to the next image - i more like this approach than zoom on desktop (This idea was in the classic/first lightbox) */
  clickContent: function (current, event) {
    return current.type === "image" ? "next" : false;
  },
});
