var ctracker;
var videoInput


function setup() {

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(640, 480);
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


  noStroke();
  
}

function draw() {
 clear();

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
 if(positions.length > 0) {
  for (var i = 0; i < positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    // draw ellipse at each position point

    ellipse(positions[i][0], positions[i][1], 10, 10);
  }
 }
  

  

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}