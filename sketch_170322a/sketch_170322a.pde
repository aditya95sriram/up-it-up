/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/dot-circle.jpg"; */
/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/empty-circle.jpg"; */
/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/up-arrow.jpg"; */

int sz = 200, pad = 10;
int[][] state = new int[3][3];
int[][] ids = new int[3][3];
int[] empty = new int[2];

PImage dot_circle, empty_circle, arrow;
/*
function windowResized() {
  canvas.position((windowWidth - width)/2);
}
*/
void setup() {
  size(600,600,P3D);
  sz = parseInt(height*0.12);
  pad = parseInt(sz/20);
  //windowResized();
  int[][] tmp1 = {{2,2,2},
                 {2,0,2},
                 {2,2,2}};
  state = tmp1;
  int[][] tmp2 = {{1,2,3},
                 {4,5,6},
                 {7,8,9}};
  ids = tmp2;   
  empty[0] = 1;
  empty[1] = 1;
  
  dot_circle   = loadImage("http://localhost:8000/shiffman/up-it-up/images/dot-circle.jpg");
  empty_circle = loadImage("http://localhost:8000/shiffman/up-it-up/images/empty-circle.jpg");
  arrow     = loadImage("http://localhost:8000/shiffman/up-it-up/images/up-arrow.jpg");
}

void draw_iso_face() {
  float theta = radians(30);
  pushMatrix();
  textureMode(NORMAL);
  noStroke();
  beginShape();
  //fill(255);
  texture(empty_circle);
  vertex(            0,               0,0,0);
  vertex(sz*cos(theta),  -sz*sin(theta),0,1);
  vertex(sz*cos(theta),sz-sz*sin(theta),1,1);
  vertex(            0,              sz,1,0);
  endShape(CLOSE);
  popMatrix();
}
/*
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
*/
void draw() {
  background(51);
  pushMatrix();
  noFill();
  stroke(255);
  strokeWeight(3);
  translate(50,50);
  draw_iso_face();
   //draw_board();
  //draw_iso_cube(0,0);
  popMatrix();
}
/*

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
*/