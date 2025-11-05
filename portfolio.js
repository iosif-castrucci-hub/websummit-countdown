// === Background Animation ===
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let shapes = [];
const colors = ['#32b3ad', '#d63a8a', '#ffffff'];

class Shape {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 12 + 6;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.type = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)];
  }

  draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    if (this.type === 'circle') {
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    } else if (this.type === 'square') {
      ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else if (this.type === 'triangle') {
      ctx.moveTo(this.x, this.y - this.size);
      ctx.lineTo(this.x - this.size, this.y + this.size);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.closePath();
    }
    ctx.stroke();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    this.draw();
  }
}

for (let i = 0; i < 80; i++) shapes.push(new Shape());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((s) => s.update());
  requestAnimationFrame(animate);
}
animate();

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// === Fade-in on Scroll ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));
