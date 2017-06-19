/* @pjs preload="http://localhost:8000/shiffman/up-it-up/images/circle-dot.jpg"; */
int i = 0; 
PImage tex;
void setup() {
    size(400, 400, P3D); 
    smooth();
    //strokeWeight(15);
    tex = requestImage("http://localhost:8000/shiffman/up-it-up/images/circle-dot.jpg");
} 
void draw() {
    background(255);
    textureMode(NORMAL);
    beginShape();
  if (tex.width > 0) {
    //fill(250);
    texture(tex);
    vertex(75,160,0,0);
    vertex(90,210,0,1);
    vertex(180,200,1,1);
    vertex(220,100,1,0);
  } else {
    fill(140);
    vertex(75,160);
    vertex(90,210);
    vertex(180,200);
    vertex(220,100);
  }
    endShape(CLOSE);
}