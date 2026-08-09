let images = [];
let grid = [];
let numCols = 23; 
let numRows = 23;
let cellSize;

function preload() {
  for (let i = 0; i < 5; i++) 
    images[i] = loadImage(`${i}.png`);
  }

function setup() {
  createCanvas(800, 800);

  // calculate cellSize once
  cellSize = width / numCols;

  // grid
  for (let i = 0; i < numCols; i++) {
    grid[i] = [];
    for (let j = 0; j < numRows; j++) {
      grid[i][j] = floor(random(5));
    }
  }

  noStroke();
}

function draw() {
  background(255); // white grid lines

  // draw if images are loaded
  if (images.length === 5) {
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        let imgIndex = grid[i][j];

        // check for the image index
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

function mousePressed() {
  let col = floor(mouseX / cellSize);
  let row = floor(mouseY / cellSize);

  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    grid[col][row] = (grid[col][row] + 1) % 5;
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        grid[i][j] = floor(random(5));
      }
    }
  }

  if (key === 's' || key === 'S') {
    saveCanvas('amalgam_capture', 'png');
  }
}