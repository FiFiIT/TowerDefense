const canvas = document.querySelector("#canvas_1");
const ctx = canvas.getContext("2d");

//global variables
const W_WIDTH = 900;
const W_HEIGHT = 600;
const CELL_SIZE = 100;
const CELL_GAP = 3;
const gameGrid = [];

canvas.width = W_WIDTH;
canvas.height = W_HEIGHT;

//game board
const controlsBar = {
  width: W_WIDTH,
  height: CELL_SIZE,
};

function animate() {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
  requestAnimationFrame(animate);
}

animate();
