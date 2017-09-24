var ctracker;
var videoInput


//nose
var imgNome;
var imgGoggle;


var _isTesting = false;


function setup() {

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(480, 480);
  videoInput.position(0, 0);
  videoInput.id('p5video');

  // setup canvas
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5canvas');
  cnv.position(0, 0);



  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);


  //images
  loadImages();

  noStroke();
  background(51);
}

function loadImages() {

  imgNome = loadImage("assets/images/frida_MASTER_NOSE_0.png"); // Load the image
  imgGoggle = loadImage("assets/images/frida_MASTER_GOGGLE_0.png"); // Load the image

}

function draw() {
  clear();

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  if (positions.length > 0) {

    if (_isTesting) {

      for (var i = 0; i < positions.length; i++) {
        // set the color of the ellipse based on position on screen
        fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
        // draw ellipse at each position point
        ellipse(positions[i][0], positions[i][1], 10, 10);
      }
    }


    var distanceGoggle = abs(positions[0][0] - positions[14][0]);
    
    image(imgGoggle, positions[0][0], positions[0][1]-distanceGoggle/3, distanceGoggle, distanceGoggle*0.6);

    var distance = abs(positions[44][0] - positions[50][0]);
    //print('DISTANCE :: ' + distance);
    image(imgNome, positions[41][0] - distance, positions[41][1], distance * 2, distance * 2);



  }





}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}