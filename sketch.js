var sz = 200, pad = 10, order = 3;
var boardWidth, boardHeight;
var state, empty, emptyid;
var labels = {numbers: false, letters: false};
var move_history, redo_history;
var canvas;
var Moves = {comp: {u: 'd', d: 'u', l: 'r', r: 'l'}};

Array.prototype.last = function() {return this[this.length-1];};

function windowResized() {
  canvas.position((windowWidth - width)/2);
}

function setup() {
  Moves.code2move = {[UP_ARROW]: "u",[DOWN_ARROW]: "d",
                     [LEFT_ARROW]: "l",[RIGHT_ARROW]: "r"};
  Moves.move2code = {u: UP_ARROW, d: DOWN_ARROW,
                    l: LEFT_ARROW, r: RIGHT_ARROW};
  boardSize = parseInt(min(windowHeight*0.75,windowWidth*0.5));
  canvas = createCanvas(boardSize,boardSize);
  windowResized();
  canvas.parent('sketch');
  textSize(50);
  textAlign(CENTER,CENTER);
  textFont("Verdana");
  init();
}

function init() {
  move_history = [], redo_history = [];
  sz = boardSize*20/(21*order+1);
  pad = sz/20;
  var row1 = [], row2 = [];
  state = [];
  ids = [];
  for (var j=0; j<order; j++) {
    row1 = [];
    row2 = [];
    for (var i=0; i<order; i++) {
      row1.push(2);
      row2.push(i+j*order+1);
    }
    state.push(row1);
    ids.push(row2);
  }
  empty = [1,1];
  emptyid = ids[empty[1]][empty[0]];
  state[empty[1]][empty[0]] = 0;
}

function draw_board() {
  // console.log(order);
  var top = pad;
  for (var y=0; y<order; y++) {
    var left = pad;
    for (var x=0; x<order; x++) {
      // console.log("drawing",x,y);
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
        text((labels.numbers ? ids[y][x] : "") +
             (labels.letters ? " udlrfb"[st] : ""), left, top, sz, sz);
      }
      left += sz + pad;
    }
    top += sz + pad;
  }
}

function make_move(x,y,nx,ny) {
  ids[ny][nx] = ids[y][x];
  state[y][x] = 0;
  ids[y][x] = emptyid;
  empty = [x, y];
  // console.log(empty, state, ids);
}

function move_right(x, y) {
  state[y][x+1] = [0, 4, 3, 1, 2, 5, 6][state[y][x]];
  make_move(x,y,x+1,y);
}
function move_left(x, y) {
  state[y][x-1] = [0, 3, 4, 2, 1, 5, 6][state[y][x]];
  make_move(x,y,x-1,y);
}
function move_up(x, y) {
  state[y-1][x] = [0, 6, 5, 3, 4, 1, 2][state[y][x]];
  make_move(x,y,x,y-1);
}
function move_down(x, y) {
  state[y+1][x] = [0, 5, 6, 3, 4, 2, 1][state[y][x]];
  make_move(x,y,x,y+1);
}

function draw() {
  background(51);
  draw_board();
}

Moves.record = function(code) {
  var move = this.code2move[code];
  var prev = move_history.pop();
  if (prev != this.comp[move]) { // push only if no cancelation
    if (prev) move_history.push(prev);
    move_history.push(move);
    if (move == redo_history.last())
      redo_history.pop();
    else
      redo_history = [];
  }
}

Moves.undo = function() {
  var last = move_history.last();
  if (last) {
    redo_history.push(last);
    var code = this.move2code[this.comp[last]];
    key_handler(code);
  }
}

Moves.redo = function() {
  var move = redo_history.last();
  if (move)
    key_handler(this.move2code[move]);
}

function key_handler(code, k) {
  var x = empty[0], y = empty[1];
  var valid = true;
  if (code == UP_ARROW && y<(order-1)) // up
    move_up(x,y+1);
  else if (code == DOWN_ARROW && y>0) // down
    move_down(x,y-1);
  else if (code == RIGHT_ARROW && x>0) // right
    move_right(x-1,y);
  else if (code == LEFT_ARROW && x<(order-1)) // left
    move_left(x+1,y);
  else {
    console.log("invalid move", k, code);
    valid = false;
  }
  if (valid) Moves.record(code);

  if (k == "Z")
    Moves.undo();
  else if (k == "X")
    Moves.redo();
  console.log(move_history, redo_history);
}

function keyPressed() {
  key_handler(keyCode, key);
}
