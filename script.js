function show() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

function OpenCloseButton() {

  var menu = document.querySelector("#menu");
  var full = document.querySelector("#fullscreen-nav");
  var nav = document.querySelector("#nav h3");
  var line1 = document.querySelector("#line1");
  var line2 = document.querySelector("#line2"); 

  var clickCounter = 1;

  menu.addEventListener("click", function () {
    if (clickCounter === 1) {

      full.style.transform = `translateY(0%)`;

      nav.style.color = "#232025";
  
      line1.style.backgroundColor = "#232025";

      line2.style.backgroundColor = "#232025";

      line1.style.transform = `rotate(45deg) translate(-8px, 13px)`;
      line2.style.transform = `rotate(-45deg) translate(-8px, -13px)`;
      line2.style.width = `2.5vw`;
       

      gsap.from("#fullscreen-nav>h1", {
        opacity: 0,
        y: '-500',
        autoAlpha: 1,
        stagger: 0.5,

      })
      gsap.from("#products>h4", {
        opacity: 0,
        y: '-400',
        autoAlpha: 1,

      })
      gsap.from("#info>h4", {
        opacity: 0,
        y: '-400',
        autoAlpha: 1,

      })

      clickCounter = 0;
    } else {
      full.style.transform = `translateY(-100%)`;

      nav.style.color = "#D5CDC4";

      line1.style.backgroundColor = "#D5CDC4";

      line2.style.backgroundColor = "#D5CDC4";

      line1.style.transform = `initial`;
      line2.style.transform = `initial`;

      line2.style.width = `1.6vw`;
      clickCounter = 1;
    }

  })

}

function mainPageAnimation() {
  gsap.from("#maintext", {

    opacity: 0,
    duration: 2,

    onStart: function () {
      $("#maintext").textillate({ in: { effect: 'fadeInUp' } });
    }
  })

  gsap.from("#sub-text>h3", {

    opacity: 0,
    y: '30',
    stagger: 0.1,
  })
  gsap.from("#sub2-text>h4", {

    opacity: 0,
    y: '30',
    stagger: 0.1,
  })
}

function ImageZoomAnimation() {
  gsap.to("#page2-img", {

    scrollTrigger: {
      trigger: "#page2-img",
      scroller: "#main",
      scrub: true,
    },

    scale: '1.1',
  })

}

function ImageRevealAnimation() {


  var link = document.querySelectorAll('.link');
  var linkHoverReveal = document.querySelectorAll('.hover-reveal');
  var linkImages = document.querySelectorAll('.hidden-img');
  var hiddenArrow = document.querySelectorAll('.hidden-arrow');



  for (let i = 0; i < link.length; i++) {

    link[i].addEventListener('mousemove', (e) => {
      linkHoverReveal[i].style.opacity = 1;
      hiddenArrow[i].style.opacity = 1;

      linkHoverReveal[i].style.transform = `translate(-100%, -50% ) rotate(5deg)`;
      linkImages[i].style.transform = 'scale(1, 1)';
      linkHoverReveal[i].style.left = e.clientX + "px";
    })

    link[i].addEventListener('mouseleave', (e) => {
      linkHoverReveal[i].style.opacity = 0;
      hiddenArrow[i].style.opacity = 0;

      linkHoverReveal[i].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
      linkImages[i].style.transform = 'scale(0.8, 0.8)';
    })
  }



}

function ImageShowOnHover() {
  var yes = document.querySelector('#yes>h2');
  var YesImg = document.querySelector('#yes-img');

  var no = document.querySelector('#no>h2');
  var NoImg = document.querySelector('#no-img');


  yes.addEventListener('mousemove', function (dets) {

    YesImg.style.opacity = '1';
    YesImg.style.transform = `translate(-50%,-100% )`;
    YesImg.style.left = dets.clientX + "px";
    YesImg.style.top = dets.clientY + "px";

  })

  yes.addEventListener('mouseleave', function (dets) {

    YesImg.style.opacity = '0';
  })

  no.addEventListener('mousemove', function (dets) {

    NoImg.style.opacity = '1';
    NoImg.style.transform = `translate(-230%, -100% )`;
    NoImg.style.left = dets.clientX + "px";
    NoImg.style.top = dets.clientY + "px";

  })

  no.addEventListener('mouseleave', function (dets) {

    NoImg.style.opacity = '0';
  })


}

function TextAnimation() {
  var AnimateIt = document.querySelectorAll(".txts");

  for (let i = 0; i < AnimateIt.length; i++) {

    gsap.from(AnimateIt[i], {

      scrollTrigger: {
        trigger: AnimateIt[i],
        scroller: "#main",
        start: "top 70%",
        end: "top 50%",
        scrub: true,
      },
      opacity: 0,
      y: '40',
      autoAlpha: 1,
      stagger: 0.5,

    })

  }
}

function lineGrowAnimation() {

  var lineGrow = document.querySelectorAll(".lines");

  for (let i = 0; i < lineGrow.length; i++) {

    gsap.to(lineGrow, {

      scrollTrigger: {
        trigger: lineGrow,
        scroller: "#main",
        start: "top 80%",
        end: "top 60%",
        scrub: true,

      },
      width: '100%',
      duration: 3,

    })
  }

  gsap.to("#middle", {

    scrollTrigger: {
      trigger: "#middle",
      scroller: "#main",
      start: "top 80%",
      end: "top 60%",
      scrub: true,

    },
    width: '15.3%',
    duration: 3,

  })
  gsap.to("#line", {

    scrollTrigger: {
      trigger: "#line",
      scroller: "#main",
      start: "top 80%",
      end: "top 60%",
      scrub: true,

    },
    width: '90%',
    duration: 3,

  })
}

function smilyAnimation() {

  gsap.to("#smily", {


    rotate: '360deg',
    repeat: '-1',

    duration: 3,
    ease: "none",

  })
}

function oneone() {
  var RightJayega = document.querySelectorAll(".right-jayega");
  var LeftJayega = document.querySelectorAll(".left-jayega");


  for (let i = 0; i < RightJayega.length; i++) {

    gsap.from(RightJayega[i], {

      scrollTrigger: {
        trigger: RightJayega[i],
        scroller: "#main",
        scrub: true,
      },
      x: '30%',

    })
  }

  for (let i = 0; i < LeftJayega.length; i++) {

    gsap.from(LeftJayega[i], {

      scrollTrigger: {
        trigger: LeftJayega[i],
        scroller: "#main",
        scrub: true,
      },
      x: '-20%',

    })

  }



}

show();
OpenCloseButton();
TextAnimation();
mainPageAnimation();
oneone();
ImageZoomAnimation();
lineGrowAnimation();
smilyAnimation();
ImageRevealAnimation();
ImageShowOnHover();




