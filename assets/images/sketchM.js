var backgroundImage;
var cnv;

function setup() {
    // setup canvas
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5canvas');
  cnv.position(0, 0);
    backgroundImage = loadImage("assets/images/frida_MASTER.png"); // Load the image
}

function draw() {
  background(255);
  image(backgroundImage, 0, 0, windowWidth, windowWidth);

}