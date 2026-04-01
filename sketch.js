//
//
//
let img;
let gridSize = 2;
let px, py;
let ox, oy;
let total;
let colors;

// preload() runs before setup - safe place to load images in p5.js
function preload() {
  img = loadImage("dD-200PixelCV.png");
}

function setup() {
  let canvas = createCanvas(200, 200);
  canvas.parent("sketch-container");
  noStroke();
  // pixelDensity(2); // trying to upgrade img quality

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
      // image is already b&w - just grab color directly
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
  background(204);

  for (let i = 0; i < total; i++) {
    let dx = px[i] - mouseX;
    let dy = py[i] - mouseY;
    let dist = sqrt(dx * dx + dy * dy);

    let radius = 10;
    let force = 80;
    let easing = 0.15;

    if (abs(dx) < radius && abs(dy) < radius) {
      let angle = atan2(dy, dx);
      let strength = (radius - abs(dx)) / radius;
      px[i] += cos(angle) * strength * force;
      py[i] += sin(angle) * strength * force;
    }

    //circle
    // if (dist < radius) {
    //   let angle = atan2(dy, dx);
    //   let strength = (radius - dist) / radius;
    //   px[i] += cos(angle) * strength * force;
    //   py[i] += sin(angle) * strength * force;
    // }

    // return to original position
    px[i] += (ox[i] - px[i]) * easing;
    py[i] += (oy[i] - py[i]) * easing;

    fill(colors[i]);
    rect(px[i], py[i], gridSize, gridSize);
  }
}
