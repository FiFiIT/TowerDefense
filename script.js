const canvas = document.querySelector("#canvas_1");
const fps = document.querySelector("#fps");
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

//FPS
var lastTimeCalled;
var frames;

//mouse
const mouse = {
  x: 0,
  y: 0,
  width: 0.1,
  height: 0.1,
};
const canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener("mouseleave", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

class Cell {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    if (!mouse.x || !collision(this, mouse)) return;

    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

function fillGameGrid() {
  posX = 0;
  posY = CELL_SIZE;
  while (posY < W_HEIGHT) {
    while (posX < W_WIDTH) {
      gameGrid.push(new Cell(posX, posY, CELL_SIZE, CELL_SIZE));
      posX += CELL_SIZE;
    }
    posY += CELL_SIZE;
    posX = 0;
  }
}

function drawGrid() {
  gameGrid.forEach((cell) => cell.draw());
}

function fraps() {
  if (!lastTimeCalled) {
    lastTimeCalled = performance.now();
    frames = 0;
    return;
  }
  delta = (performance.now() - lastTimeCalled) / 1000;
  lastTimeCalled = performance.now();
  fps.innerHTML = Math.ceil(1 / delta) + " FPS";
}

window.countFPS = (function () {
  var lastLoop = new Date().getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = new Date().getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
})();

function collision(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}

fillGameGrid();

function animate() {
  fps.innerHTML = countFPS() + " FPS";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
  requestAnimationFrame(animate);
}

animate();
