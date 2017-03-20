var sz = 200, pad = 10;
var state, empty;
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
  canvas = createCanvas(windowHeight*0.75,windowHeight*0.75,WEBGL);
  windowResized();
  canvas.parent('sketch');
  state = [[2,2,2],[2,0,2],[2,2,2]];
  ids = [[1,2,3],[4,5,6],[7,8,9]];
  empty = [1,1];

  background(51);
  push();
  stroke(255);
  strokeWeight(3);

  // draw_board();
  // draw_iso_cube(0,0);
  //translate(width/2,width/2,0);
  //draw_iso_face();
  // box(20,20,20);
  pop();

}

function draw() {draw_iso_face();}

function draw_iso_face() {
  push();
  fill(255);
  rotateZ(radians(90));
  beginShape();
  vertex(0,0,0);
  vertex(sz*cos(30),-sz*sin(30),0);
  vertex(sz*cos(30),sz-sz*sin(30),0);
  vertex(0,sz,0);
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
  /*
  switch(state[j][i]) {
    case 1: // top

      break;
    case 2: // bottom

      break;
    case 3: // left

      break;
    case 4: // right

      break;
    case 5: // front

      break;
    case 6: // back

      break;
    default:

  }*/
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

function drwe() {
  background(51);
  push();
  noFill();
  stroke(255);
  strokeWeight(3);

  // draw_board();
  // draw_iso_cube(0,0);
  draw_iso_face();
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
