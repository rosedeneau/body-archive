let images = [];
let grid = [];
let numCols = 23; 
let numRows = 23;
let cellSize;

function preload() {
  for (let i = 0; i < 5; i++) {
    // Ensure your images are named 0.png, 1.png, etc. in the same folder
    images[i] = loadImage(`${i}.png`);
  }
}

function setup() {
  createCanvas(800, 800);
  
  // Calculate cellSize once
  cellSize = width / numCols;
  
  // CRITICAL: Initialize the grid here
  for (let i = 0; i < numCols; i++) {
    grid[i] = [];
    for (let j = 0; j < numRows; j++) {
      grid[i][j] = floor(random(5));
    }
  }
  
  noStroke();
}

function draw() {
  background(255); // Your white grid lines
  
  // Only draw if images are actually loaded
  if (images.length === 5) {
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        let imgIndex = grid[i][j];
        
        // Safety check for the image index
        if (images[imgIndex]) {
          let x = floor(i * cellSize);
          let y = floor(j * cellSize);
          let s = floor(cellSize);
          
          copy(
            images[imgIndex],
            x, y, s, s,    // Source (from the original photo)
            x, y, s, s     // Destination (on the 800x800 canvas)
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