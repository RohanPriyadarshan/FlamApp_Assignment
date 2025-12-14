const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Input Section

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let P0 = { x: 100, y: canvas.height / 2 };
let P3 = { x: canvas.width - 100, y: canvas.height / 2 };

let P1 = { x: 300, y: canvas.height / 2, vx: 0, vy: 0 };
let P2 = { x: canvas.width - 300, y: canvas.height / 2, vx: 0, vy: 0 };

// Physics Section

function applySpring(point, targetX, targetY) {
  const k = 0.01;
  const damping = 0.9;

  let ax = -k * (point.x - targetX);
  let ay = -k * (point.y - targetY);

  point.vx += ax;
  point.vy += ay;

  point.vx *= damping;
  point.vy *= damping;

  point.x += point.vx;
  point.y += point.vy;
}

// Math Section

function bezierPoint(t, P0, P1, P2, P3) {
  const x =
    Math.pow(1 - t, 3) * P0.x +
    3 * Math.pow(1 - t, 2) * t * P1.x +
    3 * (1 - t) * Math.pow(t, 2) * P2.x +
    Math.pow(t, 3) * P3.x;

  const y =
    Math.pow(1 - t, 3) * P0.y +
    3 * Math.pow(1 - t, 2) * t * P1.y +
    3 * (1 - t) * Math.pow(t, 2) * P2.y +
    Math.pow(t, 3) * P3.y;

  return { x, y };
}

function bezierTangent(t, P0, P1, P2, P3) {
  const x =
    3 * Math.pow(1 - t, 2) * (P1.x - P0.x) +
    6 * (1 - t) * t * (P2.x - P1.x) +
    3 * Math.pow(t, 2) * (P3.x - P2.x);

  const y =
    3 * Math.pow(1 - t, 2) * (P1.y - P0.y) +
    6 * (1 - t) * t * (P2.y - P1.y) +
    3 * Math.pow(t, 2) * (P3.y - P2.y);

  return { x, y };
}

// Rendering Section

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  applySpring(P1, mouse.x, mouse.y);
  applySpring(P2, mouse.x, mouse.y);

  ctx.beginPath();
  for (let t = 0; t <= 1; t += 0.01) {
    const p = bezierPoint(t, P0, P1, P2, P3);
    ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  for (let t = 0; t <= 1; t += 0.1) {
    const p = bezierPoint(t, P0, P1, P2, P3);
    let tan = bezierTangent(t, P0, P1, P2, P3);

    const length = Math.hypot(tan.x, tan.y);
    tan.x /= length;
    tan.y /= length;

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + tan.x * 30, p.y + tan.y * 30);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  [P0, P1, P2, P3].forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "cyan";
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();