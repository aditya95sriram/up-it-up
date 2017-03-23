/* @pjs preload="images/dot-circle.jpg"; */
/* @pjs preload="images/empty-circle.jpg"; */
/* @pjs preload="images/up-arrow.jpg"; */

int sz = 200, pad = 10;
int[] state= , empty;
var labels = {numbers: false, letters: false};
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
  canvas = createCanvas(windowHeight*0.75,windowHeight*0.75);
  windowResized();
  canvas.parent('sketch');
  state = [[2,2,2],[2,0,2],[2,2,2]];
  ids = [[1,2,3],[4,5,6],[7,8,9]];
  empty = [1,1];
  textSize(50);
  textAlign(CENTER,CENTER);
  textFont("Verdana");
  angleMode(DEGREES);
}

function draw_iso_face() {
  push();
  beginShape();
  vertex(0,0);
  vertex(sz*cos(30),-sz*sin(30));
  vertex(sz*cos(30),sz-sz*sin(30));
  vertex(0,sz);
  endShape(CLOSE);
  pop();
}

function find_corner(i, j) {
  var x = width/2 + sz/2 + i*sz, y = j*sz, theta = 30;
  var nx = x*cos(theta) - y*cos(theta),
  ny = x*sin(theta) + y*sin(theta);
  return {x: nx, y: ny};
}

function draw_iso_cube(i, j) {
  var corner = find_corner(i, j);
  push();
  translate(corner.x, corner.y);
  draw_iso_face();
  rotate(120);
  draw_iso_face();
  rotate(120);
  draw_iso_face();
  pop();
}

function draw_board() {
  for (var j=0; j<3; j++) {
    for (var i=0; i<3; i++) {
      draw_iso_cube(i, j);
    }
  }
}

function draw() {
  background(51);
  push();
  noFill();
  stroke(255);
  strokeWeight(3);

   draw_board();
  draw_iso_cube(0,0);
  pop();
}


$('document').ready(function() {
  // initialize settings
  for (var k in labels) {
    $('[data-key=' + k + ']').data('checked', labels[k]);
  }
  $('.labels').click(function() {
    $(this).data('checked', !$(this).data('checked'));
    labels[$(this).data('key')] = $(this).data('checked');
  });
  $('[data-key=letters]').click();
});
