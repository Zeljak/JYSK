// Anketa
document.querySelector('#submit-form').addEventListener('click', function(e){

  const url = 'https://script.google.com/macros/s/AKfycbzspIzedNtPLgXUZdXInpkwvIFM-h6gIU5Hca0ylzgGpIWaQkXybdEVlbOhKSv67LTncg/exec';
  

  e.preventDefault();

  if(document.getElementById('pravila').checked) {

      document.querySelector('#submit-form').classList.add('is-hidden');
      document.querySelector('#error-msg').classList.add('is-hidden');
      document.querySelector('#loading-indicator').classList.remove('is-hidden');

      console.log($('form#jysk-anketa').serializeJSON());

      fetch(url,{
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: $('form#jysk-anketa').serializeJSON()
      })
        .then(document.querySelector('#loading-indicator').classList.add('is-hidden'))
        .then(document.querySelector('#response-msg').classList.remove('is-hidden'));
        
  } else {
    document.querySelector('#error-msg').classList.remove('is-hidden');
  }

});

// Universal variables
var viewWidth = document.querySelector('body').offsetWidth;

// Window resize
var resizeTimer;

window.addEventListener('resize', function() {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
  
    location.reload();
       
  }, 250);

});

// Anketa Smooth Scroll
if(document.querySelector('#jysk-anketa')) {
  ;(function($){
      $('#anketa__button').on('click', function(event) {
          if (this.hash !== '') {
              event.preventDefault();
      
              const hash = this.hash;
      
              $('html, body').animate(
                  {
                      scrollTop: $(hash).offset().top - 70
                  },
                  2000
              );
          }
      });
  })(jQuery);
}

// Stars animation header
// var vw = window.innerWidth;
var vw = document.querySelector('.stars__wrapper').offsetWidth;
var vw2 = document.querySelector('.stars__wrapper_2').offsetWidth;
// var vh = window.innerHeight;
var vh = document.querySelector('.stars__wrapper').offsetHeight - 20;
var vh2 = document.querySelector('.stars__wrapper_2').offsetHeight - (0.07 * viewWidth);

var textures = document.querySelectorAll(".star");
var main = document.querySelector(".stars__wrapper");
var main2 = document.querySelector(".stars__wrapper_2");
var frag = document.createDocumentFragment();
var frag2 = document.createDocumentFragment();

var appearMin = 0.3;
var appearMax = 0.8;

var delayMin = 2;
var delayMax = 6;

var durationMin = 0.3;
var durationMax = 1;

// var numAnimations = 50;
// var numStars = 300;
var numAnimations = 10;
var numStars = 100;

var stars = [];
var stars2 = [];
var eases = [];

for (var i = 0; i < numAnimations; i++) {
  
  var ease = new RoughEase({ 
    template:  Linear.easeNone, 
    strength: random(1, 3), 
    points: random(50, 200)|0, 
    taper: "both", 
    randomize: true, 
    clamp: true
  });
  
  eases.push(ease);
}

// Wait for images to load
window.addEventListener("load", onLoad);

function onLoad() {
    
  for (var i = 0; i < numStars; i++) {
    stars.push(createStar());
    stars2.push(createStar());
  }
  
  main.appendChild(frag);
  main2.appendChild(frag2);
}

function createStar() {
 
  var index = random(textures.length)|0;
  var star = textures[index].cloneNode(true);
  var star2 = textures[index].cloneNode(true);
  frag.appendChild(star);
  frag2.appendChild(star2);
  
  TweenLite.set(star, {
    rotation: random(360),
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    x: random(vw),
    y: random(vh),
  });
  TweenLite.set(star2, {
    rotation: random(360),
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    x: random(vw2),
    y: random(vh2),
  });
  
  var tl = new TimelineMax({ repeat: -1, yoyo: true });
  var tl2 = new TimelineMax({ repeat: -1, yoyo: true });
   
  for (var i = 0; i < numAnimations; i++) {
    
    var ease1 = eases[random(numAnimations)|0];
    var ease2 = eases[random(numAnimations)|0];
    
    var alpha = random(0.7, 1);
    var scale = random(0.15, 0.4);
    
    var appear = "+=" + random(appearMin, appearMax);
    var delay = "+=" + random(delayMin, delayMax);  
    var duration1 = random(durationMin, durationMax);
    var duration2 = random(durationMin, durationMax);   
    
    tl.to(star, duration1, { autoAlpha: alpha, scale: scale, ease: ease1 }, delay)
      .to(star, duration2, { autoAlpha: 0, scale: 0, ease: ease2 }, appear)
    tl2.to(star2, duration1, { autoAlpha: alpha, scale: scale, ease: ease1 }, delay)
      .to(star2, duration2, { autoAlpha: 0, scale: 0, ease: ease2 }, appear)
  }
    
  tl.progress(random(1));
  tl2.progress(random(1));
  
  return {
    element: star,
    element: star2,
    timeline: tl,
    timeline: tl2
  };
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
}