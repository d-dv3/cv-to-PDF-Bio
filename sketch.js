//
//
//
let img;
let gridSize = 10;
let px, py, ox, oy, colors;
let total;

// preload() runs before setup - safe place to load images in p5.js
function preload() {
  img = loadImage("dD-circulo-reSize.png");
}

function setup() {
  // pixelDensity(2); // trying to upgrade img quality
  pixelDensity(displayDensity());
  let canvas = createCanvas(200, 200); // replaces size() in Processing
  canvas.parent("sketch-container");
  noStroke();

  // let offsetX = (width - img.width) / 2;
  // let offsetY = (height - img.height) / 2;

  let cols = floor(img.width / gridSize);
  let rows = floor(img.height / gridSize);
  total = cols * rows;

  px = new Array(total);
  py = new Array(total);
  ox = new Array(total);
  oy = new Array(total);
  colors = new Array(total);

  let i = 0;
  for (let y = 0; y < img.height; y += gridSize) {
    for (let x = 0; x < img.width; x += gridSize) {
      let c = img.get(x, y);

      colors[i] = img.get(x, y);

      ox[i] = x;
      oy[i] = y;
      px[i] = ox[i];
      py[i] = oy[i];

      i++;
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < total; i++) {
    let dx = px[i] - mouseX;
    let dy = py[i] - mouseY;
    let dist = sqrt(dx * dx + dy * dy);

    let radius = 60;

    if (dist < radius) {
      let angle = atan2(dy, dx);
      let force = (radius - dist) / radius;
      px[i] += cos(angle) * force * 15;
      py[i] += sin(angle) * force * 15;
    }

    // return to original position
    px[i] += (ox[i] - px[i]) * 0.1;
    py[i] += (oy[i] - py[i]) * 0.1;

    fill(colors[i]);
    rect(px[i], py[i], gridSize, gridSize);
  }
}
