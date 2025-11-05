// === Background Grid Animation ===
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

function drawGrid() {
  const size = 80;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  for (let x = 0; x < canvas.width; x += size) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += size) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}
function animateGrid() {
  drawGrid();
  requestAnimationFrame(animateGrid);
}
animateGrid();

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

// ===== WhatsApp Link Handler (apre app su mobile o web su desktop) =====
document.querySelector('.fa-whatsapp').parentElement.addEventListener('click', (e) => {
  e.preventDefault();

  const phone = "393534907105"; // ✅ numero corretto con prefisso Italia
  const message = encodeURIComponent("Hi Iosif! I'm interested in your portfolio.");
  const mobileURL = `whatsapp://send?phone=${phone}&text=${message}`;
  const webURL = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;

  // Se l’utente è su mobile → tenta apertura diretta app
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = mobileURL;
    // fallback se non apre l’app entro 1.5 secondi
    setTimeout(() => {
      window.open(webURL, "_blank");
    }, 1500);
  } else {
    // se è desktop → apre WhatsApp Web
    window.open(webURL, "_blank");
  }
});

