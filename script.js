const h2 = document.createElement("h2");
document.querySelector("body").appendChild(h2);


//Game Code Start

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 30;
const colors = ["purple","green","yellow","blue","orange"];
const paddleHeight = 10;
const paddleWidth = 125;
let x = canvas.width / 2;
let y = canvas.height - 30;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let mouseClick = false;
let gameOver = false;
let dx = 3;
let dy = -3;
let i =0;

function randomColor() {
  if (i >= colors.length - 1) {
    return i = 0;
  }
  return i++;
}

function drawMainText() {
  ctx.font = "bold 72px Pixelify Sans";
  ctx.fillStyle = colors[i];
  ctx.fillText("NotAWebsite", 666, 450);
}

function drawGameOver() {
  ctx.font = "bold 72px Pixelify Sans";
  ctx.fillStyle = "red";
  ctx.fillText("You Dead ;_;", 666, 450);
  document.getElementById("myCanvas").removeAttribute("onclick")
  document.getElementById("myCanvas").addEventListener("click", mouseClickHandler2);
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
    drawMainText();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        return randomColor(i);
        
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        return randomColor(i);
    }
    else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          return randomColor(i);
    } 
    else {
          clearInterval(interval);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const intervalGameOver = setInterval(drawGameOver, 10);
          }
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
  document.addEventListener("mousemove", mouseMoveHandler, false);
  document.addEventListener("onclick", mouseClickHandler, false);
  document.addEventListener("onclick2", mouseClickHandler2, false);

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

  function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  function mouseClickHandler(e) {
    randomColor(i);
  }

  function mouseClickHandler2(e) {
    document.location.reload();
    clearInterval(intervalGameOver);
  }


const interval = setInterval(draw, 10);