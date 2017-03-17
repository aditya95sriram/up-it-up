var sz = 200, pad = 10;
var state, empty;
function setup() {
  createCanvas(3*sz+4*pad,3*sz+4*pad);
  state = [[2,2,2],[2,0,2],[2,2,2]];
  label = [[1,2,3],[4,5,6],[7,8,9]];
  empty = [1,1];
  textSize(50);
  textAlign(CENTER,CENTER);
  textFont("Verdana");
}

function draw_board() {
  var top = pad;
  for (var y=0; y<3; y++) {
    left = pad;
    for (var x=0; x<3; x++) {
      var st = state[y][x];
      if (st != 0) {
        // base color
        fill(216, 224, 199);
        rect(left, top, sz, sz);

        // periphery coloring
        fill(207, 247, 128);
        if (st == 1) // top
          rect(left, top, sz, sz);
        else if (st == 4) // right
          rect(left + sz - pad, top, pad, sz);
        else if (st == 3) // left
          rect(left, top, pad, sz);
        else if (st == 5) // front
          rect(left, top + sz - pad, sz, pad);
        else if (st == 6) // back
          rect(left, top, sz, pad);

        // text
        fill(51);
        text(" udlrfb"[st], left, top, sz, sz);
      }
      left += sz + pad;
    }
    top += sz + pad;
  }
}

function move(x,y,nx,ny) {
  label[y][x] = label[ny][nx];
  state[y][x] = 0;
  label[y][x] = 5;
  empty = [x, y];
  console.log(empty, state, label);
}

function move_right(x, y) {
  state[y][x+1] = [0, 4, 3, 1, 2, 5, 6][state[y][x]];
  move(x,y,x+1,y);
}
function move_left(x, y) {
  state[y][x-1] = [0, 3, 4, 2, 1, 5, 6][state[y][x]];
  move(x,y,x-1,y);
}
function move_up(x, y) {
  state[y-1][x] = [0, 6, 5, 3, 4, 1, 2][state[y][x]];
  move(x,y,x,y-1);
}
function move_down(x, y) {
  state[y+1][x] = [0, 5, 6, 3, 4, 2, 1][state[y][x]];
  move(x,y,x,y+1);
}

function draw() {
  background(51);
  draw_board();
}

function keyPressed() {
  var x = empty[0], y = empty[1];
  if (keyCode == UP_ARROW && y<2) // up
    move_up(x,y+1);
  else if (keyCode == DOWN_ARROW && y>0) // down
    move_down(x,y-1);
  else if (keyCode == RIGHT_ARROW && x>0) // right
    move_right(x-1,y);
  else if (keyCode == LEFT_ARROW && x<2) // left
    move_left(x+1,y);
  else
    console.log("invalid");
}
