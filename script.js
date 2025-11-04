/* ---------- COUNTDOWN ---------- */
const countdownDate = new Date("Nov 10, 2025 00:00:00").getTime();
setInterval(() => {
  const now = Date.now();
  const d = countdownDate - now;

  const days = Math.floor(d / (1000*60*60*24));
  const hours = Math.floor((d % (1000*60*60*24)) / (1000*60*60));
  const mins = Math.floor((d % (1000*60*60)) / (1000*60));
  const secs = Math.floor((d % (1000*60)) / 1000);

  document.getElementById("days").textContent   = String(days).padStart(2,"0");
  document.getElementById("hours").textContent  = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent= String(mins).padStart(2,"0");
  document.getElementById("seconds").textContent= String(secs).padStart(2,"0");
}, 1000);

/* ---------- AUDIO (autoplay fix) ---------- */
const music   = document.getElementById("bg-music");
const overlay = document.getElementById("overlay");
const muteBtn = document.getElementById("mute-btn");

overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
  music.play().catch(()=>{});  // parte dopo interazione utente
});
muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "🔇 Unmute" : "🔊 Mute";
});

/* ---------- TILT 3D (mouse) ---------- */
const card = document.getElementById("card");
let targetRX = 0, targetRY = 0, rx = 0, ry = 0;
const lerp = (a,b,t)=>a+(b-a)*t;

function onPointerMove(e){
  const x = (e.clientX ?? (e.touches && e.touches[0].clientX)) || 0;
  const y = (e.clientY ?? (e.touches && e.touches[0].clientY)) || 0;
  const midX = window.innerWidth/2;
  const midY = window.innerHeight/2;
  targetRY = (midX - x) / 30; // rotateY
  targetRX = (y - midY) / 30; // rotateX
}
function onPointerLeave(){ targetRX = 0; targetRY = 0; }

window.addEventListener("mousemove", onPointerMove);
window.addEventListener("touchmove", onPointerMove, {passive:true});
window.addEventListener("mouseleave", onPointerLeave);
window.addEventListener("touchend", onPointerLeave);

function animateTilt(){
  rx = lerp(rx, targetRX, 0.12);
  ry = lerp(ry, targetRY, 0.12);
  card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  requestAnimationFrame(animateTilt);
}
animateTilt();

/* ---------- SFONDO: TRIANGOLI ANIMATI ---------- */
const cvs = document.getElementById("triangles");
const ctx = cvs.getContext("2d");
function resize(){ cvs.width = innerWidth; cvs.height = innerHeight; }
addEventListener("resize", resize); resize();

class Tri {
  constructor(){
    this.reset(true);
  }
  reset(first=false){
    this.size = 40 + Math.random()*70;
    this.x = first ? Math.random()*cvs.width : (Math.random()<.5?-100:cvs.width+100);
    this.y = Math.random()*cvs.height;
    this.color = Math.random()>.5 ? "#d63a8a" : "#32b3ad";
    const sp = .15 + Math.random()*.25;
    const dir = Math.random()<.5 ? -1 : 1;
    this.vx = sp*dir;
    this.vy = (Math.random()-.5)*sp;
    this.opacity = 0.35 + Math.random()*0.25;
  }
  step(){
    this.x += this.vx; this.y += this.vy;
    if(this.x < -150 || this.x > cvs.width+150 || this.y<-150 || this.y>cvs.height+150) this.reset();
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size/2);
    ctx.lineTo(this.x - this.size/2, this.y + this.size/2);
    ctx.lineTo(this.x + this.size/2, this.y + this.size/2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
const tris = Array.from({length:26}, ()=>new Tri());

(function loop(){
  ctx.clearRect(0,0,cvs.width,cvs.height);
  tris.forEach(t=>t.step());
  requestAnimationFrame(loop);
})();
