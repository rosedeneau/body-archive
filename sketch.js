let images = [];
let grid = [];
let numCols = 23; 
let numRows = 23;
let cellSize;
let input;

function preload() {
  for (let i = 0; i < 5; i++) {
    images[i] = loadImage(`${i}.png`);
  }
}

// draw grid and image input
function setup() {
  createCanvas(800, 800);
  cellSize = width / numCols;
  for (let i = 0; i < numCols; i++) {
    grid[i] = [];
    for (let j = 0; j < numRows; j++) {
      grid[i][j] = floor(random(5));
    }
  }
  noStroke();

  input = createFileInput(handleImage);
  input.position(30, 820);
}

// columns and rows
function draw() {
  background(255);
  if (images.length === 5) {
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        let imgIndex = grid[i][j];
        if (images[imgIndex]) {
          let x = floor(i * cellSize);
          let y = floor(j * cellSize);
          let s = floor(cellSize);
          copy(
            images[imgIndex],
            x, y, s, s,
            x, y, s, s
          );
        }
      }
    }
  }
}

let div = createDiv();
div.position(10,20);
div.size(80, 60);
div.id('container');
let p = createP('p5.js')
p.parent('container');

// go to next image in series
function mousePressed() {
  let col = floor(mouseX / cellSize);
  let row = floor(mouseY / cellSize);
  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    grid[col][row] = (grid[col][row] + 1) % 5;
  }
}

// reset
function keyPressed() {
  if (key === 'r' || key === 'R') {
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        grid[i][j] = floor(random(5));
      }
    }
  }

  // download
  if (key === 's' || key === 'S') {
    saveCanvas('amalgam_capture', 'png');
  }
}

// image handler
function handleImage(file) {
  if (file.type === 'image') {
    images[0] = loadImage(file.data);
  } else {
    img = null;
  }
}