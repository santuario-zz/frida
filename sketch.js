var ctracker;
var videoInput
var cnv;


//frida
var imgOver_0;
var imgNose_0;
var imgNose_1;
var imgGoggle;
var imgEarsL;
var imgEarsR;
var dogSound;
var loaderCounter = 0;


var _isTesting = false;
var recording = false;
var gif;
/*
function preload() {
  dogSound = loadSound('assets/sounds/dog_1.mp3');
}*/

function setup() {

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(480, 360);
  videoInput.position(0, 0);
  videoInput.id('p5video');
  videoInput.hide();
  // setup canvas
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5canvas');
  cnv.position(0, 0);



  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);


  //images
  loadImages();

  //sound
  //dogSound = loadSound('assets/sounds/dog.mp3', soundLoaded);
  setupGif();

  noStroke();
  background(51);
}

function soundLoaded() {

  dogSound.loop();
  dogSound.setVolume(0.0);

}

function loadImages() {

  imgNose_0 = loadImage("assets/images/frida_MASTER_NOSE_0.png"); // Load the image
  imgNose_1 = loadImage("assets/images/frida_MASTER_NOSE_1.png"); // Load the image
  imgGoggle = loadImage("assets/images/frida_MASTER_GOGGLE_0.png"); // Load the image
  imgEarsL = loadImage("assets/images/frida_MASTER_EARSL_0.png"); // Load the image
  imgEarsR = loadImage("assets/images/frida_MASTER_EARSR_0.png"); // Load the image
  imgOver_0 = loadImage("assets/images/frida_MASTER_OVER_0.png"); // Load the image

}

function draw() {
  clear();
  image(videoInput, 0, 60, 480, 360);

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  if (positions.length > 0) {

    if (_isTesting) {

      for (var i = 0; i < positions.length; i++) {
        // set the color of the ellipse based on position on screen
        fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
        // draw ellipse at each position point
        ellipse(positions[i][0], 60 + positions[i][1], 10, 10);
      }
    }

    if (abs(positions[0][0] - positions[14][0]) < 300) {

      var distanceEars = abs(positions[4][0] - positions[10][0]);
      //image(imgEars, positions[0][0] - distanceEars / 4, positions[21][1] - distanceEars / 5, distanceEars * 1.5, distanceEars * 1.5 * 0.6);
      image(imgEarsL, positions[0][0] - distanceEars / 2, 60 + positions[21][1] - distanceEars / 3, distanceEars, distanceEars * 1.5);
      image(imgEarsR, positions[14][0] - distanceEars / 2, 60 + positions[17][1] - distanceEars / 3, distanceEars, distanceEars * 1.5);



      var v1Goggle = createVector(positions[0][0], positions[0][1]);
      var v2Goggle = createVector(positions[14][0], positions[14][1]);
      var distanceGoggle = abs(v1Goggle.x - v2Goggle.x);
      var angleGoggle = Math.atan2(v2Goggle.y - v1Goggle.y, v2Goggle.x - v1Goggle.x);

      applyMatrix();
      translate(v1Goggle.x, 60 + v1Goggle.y - distanceGoggle / 3);
      rotate(angleGoggle);
      image(imgGoggle, 0, 0, distanceGoggle * 1.1, distanceGoggle * 1.1 * 0.6);
      resetMatrix();
      //image(imgGoggle, positions[0][0], positions[0][1] - distanceGoggle / 3, distanceGoggle * 1.1, distanceGoggle * 1.1 * 0.6);

      var distance = abs(positions[44][0] - positions[50][0]);
      var mouthH = abs(positions[57][1] - positions[60][1]);
      var faceH = abs(positions[7][1] - positions[33][1]);
      var mouthR = mouthH / faceH;

      applyMatrix();
      translate(positions[41][0] - distance, 60 + positions[41][1]);
      rotate(angleGoggle);
      if (mouthR > 0.1) {
        image(imgNose_0, 0, 0, distance * 2.5, distance * 2.5);
        //dogSound.setVolume(1.0);
      } else {
        image(imgNose_1, 0, 0, distance * 2.5, distance * 2.5);
        //dogSound.setVolume(0.0);
      }
      resetMatrix();

    }


  }

  image(imgOver_0, 0, 0, 1080, 1080);


  if (recording && frameCount % 3 == 0) {
    gif.addFrame(cnv.elt, {
      delay: 1,
      copy: true
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {
  /*recording = !recording;
   if (!recording) {
     gif.render();
   }*/

  saveCanvas('frida', 'jpg');
}

function setupGif() {
  gif = new GIF({
    workers: 2,
    quality: 40
  });

  gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    setupGif();
  });
}

function DetectBrowser() {
  var uagent = navigator.userAgent.toLowerCase();
  if (uagent.search("iphone") > -1 || uagent.search("ipad") > -1 || uagent.search("android") > -1 || uagent.search("blackberry") > -1 || uagent.search("webos") > -1 || uagent.search("safari") < -1) {
   //Chrome
   window.location.href = "indexM.html";
  }

}