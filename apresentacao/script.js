/* ==========================================================================
   ONFOCUS — INTERACTIVE & CINEMATIC SCRIPT
   - ScrollTrigger / Scroll Storytelling
   - Web Audio API Ambient Synthesizer
   - Interactive Proximity Simulator
   - Quantum Particles Engine
   - Custom Cursor Dynamics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initScrollAnimations();
  }

  initParticles();
  initCustomCursor();
  initProximitySimulator();
  initAmbientAudio();
  initClock();
});

/* ==========================================================================
   1. PARTICLES CANVAS ENGINE
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = window.innerWidth < 768 ? 35 : 75;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#00f0ff';
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');
  if (!dot || !glow || window.innerWidth < 768) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let glowX = mouseX, glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

/* ==========================================================================
   3. SCROLL STORYTELLING & GSAP
   ========================================================================== */
function initScrollAnimations() {
  // Update HUD progress and Active Chapter on scroll
  const hudProgress = document.getElementById('hud-progress-bar');
  const hudChapter = document.getElementById('hud-chapter-text');

  const chapters = [
    { id: 'hero', name: '01 / IMPACTO' },
    { id: 'problema', name: '02 / O PROBLEMA' },
    { id: 'descoberta', name: '03 / A DESCOBERTA' },
    { id: 'produto', name: '04 / PRODUTO' },
    { id: 'como-funciona', name: '05 / COMO FUNCIONA' },
    { id: 'proximidade', name: '06 / KIOSK MODE' },
    { id: 'tecnologia', name: '07 / ARQUITETURA' },
    { id: 'dashboard', name: '08 / GESTOR' },
    { id: 'beneficios', name: '09 / BENEFÍCIOS' },
    { id: 'wow', name: '10 / PRINCÍPIO' },
    { id: 'futuro', name: '11 / FUTURO' },
    { id: 'cta', name: '12 / APRESENTAÇÃO' }
  ];

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (hudProgress) hudProgress.style.height = `${scrollPercent}%`;

    const scrollPos = window.scrollY + window.innerHeight / 3;
    for (let i = chapters.length - 1; i >= 0; i--) {
      const section = document.getElementById(chapters[i].id);
      if (section && section.offsetTop <= scrollPos) {
        if (hudChapter) hudChapter.textContent = chapters[i].name;
        break;
      }
    }
  });

  // Hero Section Parallax Fade
  gsap.to('.hero-fade-in', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: -50,
    opacity: 0,
    stagger: 0.1
  });

  // Problem Section: Chaos elements vanish as user scrolls
  const chaosTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#problema',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  });

  chaosTl.to('.chaos-element', {
    scale: 0.2,
    opacity: 0,
    y: 80,
    filter: 'blur(10px)',
    stagger: 0.15,
    ease: 'power2.inOut'
  })
  .to('#chaos-phone', {
    scale: 1.08,
    boxShadow: '0 0 80px rgba(0, 240, 255, 0.4)',
    borderColor: '#00f0ff',
    duration: 0.5
  }, '-=0.3')
  .to('#phone-focus-rebirth', {
    opacity: 1,
    duration: 0.4
  }, '-=0.2')
  .to('#chaos-resolution-text', {
    opacity: 1,
    y: -10,
    duration: 0.4
  });

  // Product Presentation: 4-Stage Screen & Narrative Morphs
  const productTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#produto',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  });

  // Stage 1 -> Stage 2
  productTl.to('#product-narrative-1', { opacity: 0, y: -20, duration: 0.2 })
    .to('#product-narrative-2', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.2 }, '<')
    .to('#screen-view-1', { opacity: 0, duration: 0.2 }, '<')
    .to('#screen-view-2', { opacity: 1, pointerEvents: 'auto', duration: 0.2 }, '<')
    .to('#product-phone-frame', { rotateY: 5, rotateZ: -1, duration: 0.3 }, '<')
    .to('.product-step-indicator:nth-child(1)', { width: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }, '<')
    .to('.product-step-indicator:nth-child(2)', { width: '32px', backgroundColor: '#00f0ff' }, '<')

  // Stage 2 -> Stage 3
  productTl.to('#product-narrative-2', { opacity: 0, y: -20, duration: 0.2 })
    .to('#product-narrative-3', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.2 }, '<')
    .to('#screen-view-2', { opacity: 0, duration: 0.2 }, '<')
    .to('#screen-view-3', { opacity: 1, pointerEvents: 'auto', duration: 0.2 }, '<')
    .to('#product-phone-frame', { rotateY: -5, rotateZ: 1, duration: 0.3 }, '<')
    .to('.product-step-indicator:nth-child(2)', { width: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }, '<')
    .to('.product-step-indicator:nth-child(3)', { width: '32px', backgroundColor: '#00f0ff' }, '<')

  // Stage 3 -> Stage 4
  productTl.to('#product-narrative-3', { opacity: 0, y: -20, duration: 0.2 })
    .to('#product-narrative-4', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.2 }, '<')
    .to('#screen-view-3', { opacity: 0, duration: 0.2 }, '<')
    .to('#screen-view-4', { opacity: 1, pointerEvents: 'auto', duration: 0.2 }, '<')
    .to('#product-phone-frame', { rotateY: 0, rotateZ: 0, scale: 1.04, duration: 0.3 }, '<')
    .to('.product-step-indicator:nth-child(3)', { width: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }, '<')
    .to('.product-step-indicator:nth-child(4)', { width: '32px', backgroundColor: '#00f0ff' }, '<');
}

/* ==========================================================================
   4. PROXIMITY & KIOSK MODE INTERACTIVE SIMULATOR
   ========================================================================== */
function initProximitySimulator() {
  const slider = document.getElementById('proximity-slider');
  const btnToggle = document.getElementById('sim-btn-toggle');
  const distanceLabel = document.getElementById('proximity-distance-label');
  const badge = document.getElementById('sim-badge');
  const title = document.getElementById('sim-title');
  const desc = document.getElementById('sim-desc');
  const metricKiosk = document.getElementById('metric-kiosk');
  const metricNotif = document.getElementById('metric-notif');
  const ring1 = document.getElementById('radar-ring-1');
  const ring2 = document.getElementById('radar-ring-2');
  const ring3 = document.getElementById('radar-ring-3');
  const card = document.getElementById('sim-status-card');

  if (!slider) return;

  function updateSimulator(val) {
    const isInside = val > 40;

    if (isInside) {
      const meters = ((100 - val) / 100 * 1.5).toFixed(1);
      distanceLabel.textContent = `DISTÂNCIA: ${meters}m (ZONA ATIVA)`;
      distanceLabel.className = 'text-cyan-400 font-bold';

      badge.textContent = 'ONFOCUS ACTIVATED';
      badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-400 text-black';

      title.textContent = 'Ambiente Protegido Ativo';
      desc.textContent = 'O smartphone está na carteira autorizada. O launcher seguro bloqueia jogos e redes sociais, liberando apenas apps pedagógicos.';

      metricKiosk.textContent = 'ATIVO / DPM';
      metricKiosk.className = 'text-emerald-400 font-bold';

      metricNotif.textContent = 'SUSPENSAS';
      metricNotif.className = 'text-cyan-400 font-bold';

      ring1.style.borderColor = '#00f0ff';
      ring1.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.4)';
      ring2.style.borderColor = 'rgba(0, 240, 255, 0.4)';
      ring3.style.borderColor = 'rgba(0, 240, 255, 0.2)';

      card.className = 'p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 transition-all duration-500';
    } else {
      const meters = (((100 - val) / 50) * 8).toFixed(1);
      distanceLabel.textContent = `DISTÂNCIA: ${meters}m (FORA DA ESCOLA)`;
      distanceLabel.className = 'text-zinc-500 font-bold';

      badge.textContent = 'FOCUS MODE DEACTIVATED';
      badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-700 text-white';

      title.textContent = 'Modo Pessoal Restaurado';
      desc.textContent = 'O aluno saiu da área autorizada. O smartphone restaura o wallpaper pessoal, apps normais e notificações sem intervenção manual.';

      metricKiosk.textContent = 'DESATIVADO';
      metricKiosk.className = 'text-zinc-500 font-bold';

      metricNotif.textContent = 'LIBERADAS';
      metricNotif.className = 'text-zinc-400 font-bold';

      ring1.style.borderColor = 'rgba(255,255,255,0.1)';
      ring1.style.boxShadow = 'none';
      ring2.style.borderColor = 'rgba(255,255,255,0.05)';
      ring3.style.borderColor = 'rgba(255,255,255,0.05)';

      card.className = 'p-6 rounded-2xl bg-zinc-900/60 border border-white/10 transition-all duration-500';
    }
  }

  slider.addEventListener('input', (e) => {
    updateSimulator(parseInt(e.target.value));
  });

  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      const current = parseInt(slider.value);
      const target = current > 40 ? 10 : 85;
      slider.value = target;
      updateSimulator(target);
    });
  }

  updateSimulator(parseInt(slider.value));
}

/* ==========================================================================
   5. AMBIENT AUDIO SYNTHESIZER (WEB AUDIO API)
   ========================================================================== */
function initAmbientAudio() {
  const toggleBtn = document.getElementById('sound-toggle');
  const label = document.getElementById('sound-label');
  const waves = document.querySelectorAll('.audio-wave');
  if (!toggleBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let osc1 = null, osc2 = null, gainNode = null;

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
  });

  function startAmbientSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Osc 1: Deep drone
      osc1 = audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, audioCtx.currentTime); // A2

      // Osc 2: Ethereal harmonic
      osc2 = audioCtx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220, audioCtx.currentTime); // A3

      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();

      isPlaying = true;
      label.textContent = 'Audio Atmosfera: ON';
      label.classList.add('text-cyan-400');
      waves.forEach(w => w.classList.add('active'));
    } catch (e) {
      console.log('Web Audio disabled or not supported');
    }
  }

  function stopAmbientSound() {
    if (gainNode && audioCtx) {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
      setTimeout(() => {
        if (osc1) osc1.stop();
        if (osc2) osc2.stop();
        if (audioCtx) audioCtx.close();
      }, 1000);
    }
    isPlaying = false;
    label.textContent = 'Audio Atmosfera: OFF';
    label.classList.remove('text-cyan-400');
    waves.forEach(w => w.classList.remove('active'));
  }
}

/* ==========================================================================
   6. CLOCK & MODALS
   ========================================================================== */
function initClock() {
  const clockEl = document.getElementById('mockup-clock');
  if (!clockEl) return;
  function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}`;
  }
  updateTime();
  setInterval(updateTime, 30000);
}

// Modal Controllers
window.openPitchModal = function() {
  const modal = document.getElementById('pitch-modal');
  if (!modal) return;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
};

window.closePitchModal = function() {
  const modal = document.getElementById('pitch-modal');
  if (!modal) return;
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0', 'pointer-events-none');
};

// WOW Confetti Trigger
window.triggerConfettiReward = function() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#818cf8', '#10b981', '#ffffff']
    });
  }
};
