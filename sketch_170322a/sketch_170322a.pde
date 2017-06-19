/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/circle-dot.jpg"; */
/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/circle-empty.jpg"; */
/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/arrow-up.jpg"; */
/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/arrow-down.jpg"; */
/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/arrow-right.jpg"; */
/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/arrow-left.jpg"; */
import java.util.*;

int sz = 200, pad = 10;
int[][] state = new int[3][3];
int[][] ids = new int[3][3];
int[] empty = new int[2];

PImage dot_circle, empty_circle, arrow_up, arrow_down, arrow_left, arrow_right;
HashMap<String, PImage> texmap;

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
  System.out.println("hello");
  texmap = new HashMap<String,PImage>();
  texmap.put("dot"         , loadImage("http://localhost:8000/shiffman/up-it-up/images/circle-dot.jpg"));
  texmap.put("empty"       , loadImage("http://localhost:8000/shiffman/up-it-up/images/circle-empty.jpg"));
  texmap.put("arrow-up"    , loadImage("http://localhost:8000/shiffman/up-it-up/images/arrow-up.jpg"));
  texmap.put("arrow-down"  , loadImage("http://localhost:8000/shiffman/up-it-up/images/arrow-down.jpg"));
  texmap.put("arrow-left"  , loadImage("http://localhost:8000/shiffman/up-it-up/images/arrow-left.jpg"));
  texmap.put("arrow-right" , loadImage("http://localhost:8000/shiffman/up-it-up/images/arrow-right.jpg"));
  
  System.out.println("hello");
}

void draw_iso_face(String s) {
  PImage tex;
  tex = texmap.containsKey(s) ? texmap.get(s) : texmap.get("dot");
  float theta = radians(30);
  stroke(220);
  textureMode(NORMAL);
  fill(255);
  beginShape();
  texture(tex);
  vertex(            0,               0,0,0);
  vertex(sz*cos(theta),  -sz*sin(theta),1,0);
  vertex(sz*cos(theta),sz-sz*sin(theta),1,1);
  vertex(            0,              sz,0,1);
  endShape(CLOSE);
}

PVector find_corner(int i, int j) {
  float x = width/2 + sz/2 + i*sz, y = j*sz, theta = radians(30);
  float nx = x*cos(theta) - y*cos(theta),
        ny = x*sin(theta) + y*sin(theta);
  return new PVector(nx, ny);
}

void draw_iso_cube(int i, int j) {
  PVector corner = find_corner(i, j);
  translate(corner.x, corner.y, i*3+j);
  int st = state[j][i];
  String rface, lface, uface;
  switch (st) {
    case 0:
      translate(-corner.x, -corner.y, -i*3-j);
      return;
    case 1: // top
      rface = "arrow-up";
      lface = "arrow-left";
      uface = "dot";
      break;
    case 2: // bottom
      rface = "arrow-down";
      lface = "arrow-right";
      uface = "empty";
      break;
    case 3: // left
      rface = "empty";
      lface = "arrow-down"; 
      uface = "arrow-right";
      break;
    case 4: // right
      rface = "dot";
      lface = "arrow-up";
      uface = "arrow-left";
      break;
    case 5: // front
      rface = "arrow-left";
      lface = "dot";
      uface = "arrow-up";
      break;
    case 6: // back
      rface = "arrow-right"; 
      lface = "empty";
      uface = "arrow-down";
      break;
    default:
      rface = uface = lface = "empty";
  }
  draw_iso_face(rface);
  rotate(radians(120));
  draw_iso_face(lface);
  rotate(radians(120));
  draw_iso_face(uface);
  rotate(radians(-240));
  translate(-corner.x, -corner.y, -i*3-j);
}

void draw_board() {
  for (int j=0; j<3; j++) {
    for (int i=0; i<3; i++) {
      draw_iso_cube(j, i);
    }
  }
}

void draw() {
  if (mousePressed) {
    lights();
  }
  background(51);
  noFill();
  stroke(255);
  strokeWeight(3);
  //translate(50,50);
  //draw_iso_face("empty");
  draw_board();
  
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