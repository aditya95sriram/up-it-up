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
  canvas = createCanvas(windowHeight*0.75,windowHeight*0.75);
  windowResized();
  canvas.parent('sketch');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
  background(255);
  box();
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
