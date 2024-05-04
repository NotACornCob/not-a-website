const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";

document.querySelector("body").appendChild(h2);

//Game Code Start

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
const colors = ["red","green","yellow","blue","orange"];
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let i =0;

function randomColor() {
  if (i >= colors.length - 1) {
    return i = 0;
  }
  return i++;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 4);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.closePath();
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        return randomColor(i);
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
        return randomColor(i);
    }
    x += dx;
    y += dy;
  }

  setInterval(draw, 10);