console.clear();
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const balloon = new Image();
balloon.src = "https://assets.codepen.io/550547/red_balloon.png";
//
let can_box = canvas.getBoundingClientRect();
console.table(can_box);
canvas.width = 600;
canvas.height = 400;
let eye_move = 1;
let eye_direction = 1;
const draw_balloon = function (left, top) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.drawImage(balloon, left + 300, top, 150, 150);
  ctx.moveTo(350, 330);
  ctx.lineTo(left + 375, top + 150);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(250 + eye_move, 335, 7, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(300 + eye_move, 335, 7, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
};
let last_time = 0;
let eye_last_time = 0;
const animate = function (time) {
  requestAnimationFrame(animate);
  if (time - last_time > 100) {
    last_time = time;
    let left_delta = Math.floor(Math.random() * 10);
    let top_delta = Math.floor(Math.random() * 10);
    draw_balloon(30 + left_delta, 30 + top_delta);
    eye_move += 0.5 * eye_direction;
    if (eye_move > 5 || eye_move < -5) {
      eye_direction = eye_direction * -1;
    }
  }
};

animate();
