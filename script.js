const h2 = document.createElement("h2");

h2.textContent = "This content added by JavaScript";

document.querySelector("body").appendChild(h2);

//Game Code Start

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 30;
const colors = ["red","green","yellow","blue","orange"];
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -3;
let i =0;

function randomColor() {
  if (i >= colors.length - 1) {
    return i = 0;
  }
  return i++;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        return randomColor(i);
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
        return randomColor(i);
    }
    if (rightPressed) {
      paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } 
    else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
    }
    x += dx;
    y += dy;
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

  setInterval(draw, 10);