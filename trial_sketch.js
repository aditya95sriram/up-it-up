var sz = 200, pad = 10;
var canvas;

var images = {}

function windowResized() {
  canvas.position((windowWidth - width)/2);
}

function preload() {
  images.dot_circle   = loadImage("images/dot-circle.jpg");
  images.empty_circle = loadImage("images/empty-circle.jpg");
  images.up_arrow     = loadImage("images/up-arrow.jpg");
}

function setup() {
  sz = parseInt(windowHeight*0.12);
  pad = parseInt(sz/20);
  canvas = createCanvas(windowHeight*0.75,windowHeight*0.75,WEBGL);
  windowResized();
  canvas.parent('sketch');
}

function draw(){
  background(51);
  //orbitControl();
  rotateZ(0.9);
  beginShape();
  texture(images.dot_circle);
  fill(175);
  vertex(20,20,0);
  vertex(20,-20,0);
  vertex(-20,-20,0);
  vertex(-20,20,0);
  face = endShape(CLOSE);
}
