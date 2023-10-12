  document.addEventListener('DOMContentLoaded', function() {
  var isDialupStarted = false;

  document.addEventListener('click', function(event) {
    if (!isDialupStarted) {
      startDialup();
      isDialupStarted = true;
    }
    event.stopPropagation();
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 's') {
      clearTimeout(dialupInterval); // Stop the dial-up loop
      skipDialup();
    }
  });
});

var currentImageIndex = 0;
var images = ['https://raw.githubusercontent.com/channel77/Dial-up/main/dialup0.png', 'https://raw.githubusercontent.com/channel77/Dial-up/main/dialup1.png', 'https://raw.githubusercontent.com/channel77/Dial-up/main/dialup2.png', 'https://raw.githubusercontent.com/channel77/Dial-up/main/dialup3.png'];
var isContentDisplayed = false;
var dialupInterval;

function startDialup() {
  var dialupSound = document.getElementById('dialup-sound');
  dialupSound.play();

  var dialupOverlay = document.getElementById('dialup-overlay');
  var dialupImage = document.getElementById('dialup-image');

  dialupImage.src = images[currentImageIndex];
  dialupImage.style.opacity = 1;
  currentImageIndex = (currentImageIndex + 1) % images.length;

  dialupInterval = setTimeout(startDialup, 7250); // 7.25 seconds (7250 milliseconds)

  if (currentImageIndex === 0 && !isContentDisplayed) {
    dialupSound.onended = function() {
      dialupOverlay.style.display = 'none';
      dialupImage.style.opacity = 0;

      var websiteContent = document.getElementById('website-content');
      websiteContent.style.display = 'block';
      isContentDisplayed = true;

      clearTimeout(dialupInterval); // Stop the dial-up loop
    };
  }
}

function skipDialup() {
  var dialupOverlay = document.getElementById('dialup-overlay');
  var dialupImage = document.getElementById('dialup-image');

  dialupOverlay.style.display = 'none';
  dialupImage.style.opacity = 0;

  var websiteContent = document.getElementById('website-content');
  websiteContent.style.display = 'block';
  isContentDisplayed = true;

  clearTimeout(dialupInterval); // Stop the dial-up loop

  var dialupSound = document.getElementById('dialup-sound');
  dialupSound.pause();
  dialupSound.currentTime = 0;
}