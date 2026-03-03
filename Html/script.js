// ===== script.js - VALENTINE SPECIAL =====

// Background hearts animation
setInterval(() => {
  const h = document.createElement('i');
  h.className = 'fas fa-heart b-heart';
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = (Math.random() * 15 + 10) + "px";
  document.getElementById('bg-hearts').appendChild(h);
  setTimeout(() => h.remove(), 4000);
}, 400);

// State variables
let step = 0;
let word = "";
let qStep = 1;

const messages = [
  "Haii, Cieee dapet surat nih🙈",
  "Makasih udah mau bertahan sejauh ini sama aku.",
  "Kamu itu rumah, tempat aku pulang paling nyaman.",
  "Ikutin misi ini, tolong jujur jawabnya cinta❤..."
];

// ===== FUNGSI UTAMA =====
function openSurprise() {
  document.getElementById('mainEnv').classList.add('open');
  document.getElementById('bear').style.bottom = "190px";
  setTimeout(() => {
    document.getElementById('env-stage').style.display = 'none';
    document.getElementById('stageMsg').classList.add('active');
    type();
  }, 1500);
}

function type() {
  const t = messages[step];
  let i = 0;
  const el = document.getElementById('typewriter');
  el.innerHTML = "";
  document.getElementById('nextBtn').style.display = "none";
  document.getElementById('musicToggle').style.display = "none";
  
  const timer = setInterval(() => {
    el.innerHTML += t.charAt(i);
    i++;
    if (i >= t.length) {
      clearInterval(timer);
      if (step === 0) {
        document.getElementById('musicToggle').style.display = "flex";
      } else {
        document.getElementById('nextBtn').style.display = "block";
      }
    }
  }, 40);
}

function toggleMusic() {
  const audio = document.getElementById('myMusic');
  const musicCheck = document.getElementById('musicCheck');
  const statusLabel = document.getElementById('statusLabel');
  
  if (musicCheck.checked) {
    statusLabel.innerText = "ON";
    statusLabel.style.color = "var(--accent)";
    audio.play().catch(e => console.log("Audio play error:", e));
    setTimeout(() => flow(), 1200);
  } else {
    statusLabel.innerText = "OFF";
    statusLabel.style.color = "var(--black)";
    audio.pause();
  }
}

function flow() {
  step++;
  if (step < messages.length) {
    type();
  } else {
    document.getElementById('stageMsg').classList.remove('active');
    document.getElementById('game1').classList.add('active');
  }
}

// ===== PUZZLE FUNCTIONS =====
function sel(e) {
  if (e.classList.contains('sel')) return;
  
  e.classList.add('sel');
  word += e.innerText;
  document.getElementById('p-stat').innerText = word;
  
  if (word === "SAYANG") {
    setTimeout(() => {
      document.getElementById('game1').classList.remove('active');
      document.getElementById('gameNyebelin').classList.add('active');
    }, 800);
  } else if (word.length >= 6) {
    document.getElementById('modalSalah').classList.add('show');
  }
}

function closePopup() {
  document.getElementById('modalSalah').classList.remove('show');
  word = "";
  document.querySelectorAll('.block').forEach(b => b.classList.remove('sel'));
  document.getElementById('p-stat').innerText = "";
}

// ===== MISI KEDUA =====
function erorTombol() {
  const btn = document.getElementById('btnEror');
  
  if (qStep === 1) {
    btn.style.position = 'absolute';
    btn.style.left = Math.random() * 80 + '%';
    btn.style.top = Math.random() * 80 + '%';
    btn.innerText = "Gak Bisa! 😝";
  } else if (qStep === 2) {
    btn.style.transform = "scale(0.5)";
    btn.innerText = "Eits Gak Bisa 🥺";
  } else {
    btn.style.left = Math.random() * 50 + 'px';
    btn.innerText = "Salah klik! 🙄";
  }
}

function ansBenar() {
  confetti({ particleCount: 30, spread: 50 });
  qStep++;
  
  const btnEror = document.getElementById('btnEror');
  const btnBetul = document.getElementById('ansBtn');
  const qTitle = document.getElementById('q-title');
  const qText = document.getElementById('q-text');
  
  btnEror.style = ""; // Reset posisi tombol kabur
  
  if (qStep === 2) {
    qTitle.innerText = "MISI 2 (2/3)";
    qText.innerText = "Kamu punya siapa?";
    btnBetul.innerText = "Punya Kamu Dong! 👩‍❤️‍👨";
    btnEror.innerText = "Gk tau";
  } else if (qStep === 3) {
    qTitle.innerText = "MISI 2 (3/3)";
    qText.innerText = "Janji jangan pernah pergi ya?";
    btnBetul.innerText = "Janji Sayang! 💖";
    btnEror.innerText = "Gak janji";
  } else {
    document.getElementById('gameNyebelin').classList.remove('active');
    document.getElementById('gameFinal').classList.add('active');
  }
}

// ===== GAME AKHIR =====
function moveNo() {
  const b = document.getElementById('noBtn');
  b.style.position = 'fixed';
  b.style.left = Math.random() * (window.innerWidth - 100) + 'px';
  b.style.top = Math.random() * (window.innerHeight - 50) + 'px';
}

function finish() {
  confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
  
  document.getElementById('gameFinal').innerHTML = `
    <h2 style="color:var(--accent)">I LOVE YOU TOO! ❤️</h2>
    <p style="font-weight:700">Seneng banget dengernya!</p>
    <button class="btn-style btn-accent" onclick="goWA()">MAU LANJUT? ✨</button>
  `;
}

function goWA() {
  document.getElementById('gameFinal').classList.remove('active');
  document.getElementById('stageWA').classList.add('active');
}

// ===== WHATSAPP =====
function kirimWA() {
  const nomor = document.getElementById('nomorWA').value;
  
  if (nomor.length < 10) {
    alert("Masukin nomor yang bener dong!");
    return;
  }
  
  let formatted = nomor;
  if (formatted.startsWith('0')) {
    formatted = '62' + formatted.slice(1);
  }
  
  const pesan = encodeURIComponent("I LOVE YOU! ❤️");
  window.location.href = `https://wa.me/${formatted}?text=${pesan}`;
}