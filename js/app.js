// =============================================================================
// "Will you go out with me" — 5 screen experience
// EDIT-ME CONSTANTS live at the top of each section below — search "EDIT ME"
// =============================================================================

(function () {
  "use strict";

  // ---------------------------------------------------------------------
  // Screen state machine
  // ---------------------------------------------------------------------
  const screens = Array.from(document.querySelectorAll(".screen"));
  let current = 1;

  function goToScreen(n) {
    const target = document.getElementById("screen-" + n);
    if (!target) return;
    screens.forEach((s) => s.classList.remove("screen--active"));
    target.classList.add("screen--active");
    current = n;
    onScreenEnter(n);
  }

  const enteredOnce = new Set();
  function onScreenEnter(n) {
    if (enteredOnce.has(n)) return;
    enteredOnce.add(n);
    if (n === 2) startLetterReveal();
    if (n === 3) initCarousel();
    if (n === 4) startAnticipation();
    if (n === 5) initQuestionScreen();
  }

  // ---------------------------------------------------------------------
  // Screen 1 — Envelope
  // ---------------------------------------------------------------------
  const envelopeTap = document.getElementById("envelopeTap");
  const tapHint = document.getElementById("tapHint");

  setTimeout(() => {
    if (current === 1 && !envelopeTap.classList.contains("is-open")) {
      tapHint.classList.add("show");
    }
  }, 2500);

  let envelopeOpened = false;
  envelopeTap.addEventListener("click", () => {
    if (envelopeOpened) return;
    envelopeOpened = true;
    tapHint.classList.remove("show");
    envelopeTap.classList.add("is-open");

    setTimeout(() => {
      envelopeTap.classList.add("is-leaving");
    }, 650);

    setTimeout(() => {
      goToScreen(2);
    }, 1250);
  });

  // ---------------------------------------------------------------------
  // Screen 2 — Letter reveal
  // ---------------------------------------------------------------------

  // Each entry becomes its own line, revealed one at a time.
  const MESSAGE_LINES = [
    "Hey Ruby,",
    "I don't say this enough, but you make even the most ordinary days feel like something worth smiling about.",
    "Your laugh is my favorite sound, and somehow your smile has a way of showing up in my head at the worst possible times — like when I'm supposed to be focusing on literally anything else.",
    "There's something I've been wanting to ask you...",
    "Keep reading 👀",
  ];

  function startLetterReveal() {
    const container = document.getElementById("letterText");
    container.innerHTML = "";
    MESSAGE_LINES.forEach((line, i) => {
      const p = document.createElement("p");
      p.className = "letter-line";
      p.textContent = line;
      container.appendChild(p);
      setTimeout(() => p.classList.add("show"), 350 + i * 550);
    });
  }

  document.getElementById("toScreen3").addEventListener("click", () => {
    goToScreen(3);
  });

  // ---------------------------------------------------------------------
  // Screen 3 — Memories carousel
  // ---------------------------------------------------------------------

  const MEMORIES = [
    { text: "The way your eyes light up right before you laugh at your own joke", image: "public/assets/1.jpg" },
    { text: "How you make me feel like the luckiest person just by texting back 'lol'", image: "public/assets/3.jpg" },
    { text: "Your laugh — loud, unfiltered, and somehow my favorite sound in the world", image: "public/assets/4.jpg" },
    { text: "How easy it is to just be myself around you, no filter needed", image: "public/assets/5.jpg" },
    { text: "The way you care about people quietly, without ever needing credit for it", image: "public/assets/6.jpg" },
    { text: "Simply put — you're the best thing that's happened to me in a long time", image: "public/assets/7.jpg" },
  ];

  let carActive = 0;
  let carInitDone = false;
  const carStage = document.getElementById("carouselStage");
  const carDotsWrap = document.getElementById("carouselDots");
  const carContinue = document.getElementById("toScreen4");

  function initCarousel() {
    if (carInitDone) return;
    carInitDone = true;

    MEMORIES.forEach((m, i) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.index = i;

      if (m.image) {
        const img = document.createElement("img");
        img.className = "memory-photo";
        img.src = m.image;
        img.alt = "";
        img.loading = "lazy";
        card.appendChild(img);
      } else {
        const ph = document.createElement("div");
        ph.className = "memory-photo-placeholder";
        ph.textContent = "[PHOTO HERE]";
        card.appendChild(ph);
      }

      const text = document.createElement("div");
      text.className = "memory-text";
      text.textContent = m.text;
      card.appendChild(text);

      carStage.appendChild(card);

      m.dots = i;
      const dot = document.createElement("span");
      dot.className = "carousel-dot";
      carDotsWrap.appendChild(dot);
    });

    renderCarousel();

    document.getElementById("carPrev").addEventListener("click", () => moveCarousel(-1));
    document.getElementById("carNext").addEventListener("click", () => moveCarousel(1));

    // swipe support
    let startX = 0;
    let dragging = false;
    let dragDX = 0;

    const getActiveCardEl = () => carStage.querySelector('.memory-card[data-index="' + carActive + '"]');

    carStage.addEventListener("pointerdown", (e) => {
      dragging = true;
      startX = e.clientX;
      dragDX = 0;
    });

    carStage.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      dragDX = e.clientX - startX;
      const el = getActiveCardEl();
      if (el) el.style.transform = "translateX(" + dragDX + "px) rotate(" + dragDX / 20 + "deg)";
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      const el = getActiveCardEl();
      if (el) el.style.transform = "";
      if (dragDX > 55) moveCarousel(-1);
      else if (dragDX < -55) moveCarousel(1);
      dragDX = 0;
    }

    carStage.addEventListener("pointerup", endDrag);
    carStage.addEventListener("pointercancel", endDrag);
    carStage.addEventListener("pointerleave", endDrag);
  }

  function moveCarousel(dir) {
    const next = carActive + dir;
    if (next < 0 || next >= MEMORIES.length) return;
    carActive = next;
    renderCarousel();
  }

  function renderCarousel() {
    const cards = carStage.querySelectorAll(".memory-card");
    cards.forEach((card) => {
      const i = Number(card.dataset.index);
      const offset = i - carActive;
      card.style.transform = "";
      if (offset === 0) {
        card.style.display = "flex";
        card.style.zIndex = 3;
        card.style.opacity = "1";
        card.style.transform = "translateY(0) scale(1) rotate(0deg)";
      } else if (offset === 1 || offset === -1) {
        card.style.display = "flex";
        card.style.zIndex = 2;
        card.style.opacity = "0.55";
        const sign = offset > 0 ? 1 : -1;
        card.style.transform = "translateY(14px) scale(0.93) rotate(" + sign * 4 + "deg)";
      } else {
        card.style.display = "none";
      }
    });

    const dots = carDotsWrap.querySelectorAll(".carousel-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === carActive));

    document.getElementById("carPrev").style.visibility = carActive === 0 ? "hidden" : "visible";
    document.getElementById("carNext").style.visibility = carActive === MEMORIES.length - 1 ? "hidden" : "visible";

    if (carActive === MEMORIES.length - 1) {
      carContinue.classList.remove("hidden");
    }
  }

  carContinue.addEventListener("click", () => goToScreen(4));

  // ---------------------------------------------------------------------
  // Screen 4 — Anticipation (auto-advance)
  // ---------------------------------------------------------------------

  const ANTICIPATION_MS = 3000; // EDIT ME — how long the "held breath" lasts

  function startAnticipation() {
    setTimeout(() => {
      const flash = document.getElementById("flashOverlay");
      flash.classList.add("flash");
      setTimeout(() => goToScreen(5), 350);
    }, ANTICIPATION_MS);
  }

  // ---------------------------------------------------------------------
  // Screen 5 — The question
  // ---------------------------------------------------------------------

  // EDIT ME — the date shown in the question heading
  const DATE_TEXT = "this Saturday";
  // EDIT ME — message shown/confetti'd on a Yes
  const YES_MESSAGE = "Can't wait! See you Saturday 💕";
  // EDIT ME — message auto-copied to clipboard on a No
  const DECLINE_MESSAGE = "I can't make Saturday, sorry!";

  const MAX_DODGES = 4;
  let dodgeCount = 0;
  let questionInitDone = false;

  function initQuestionScreen() {
    if (questionInitDone) return;
    questionInitDone = true;

    document.getElementById("dateText").textContent = DATE_TEXT;
    document.getElementById("yesMessage").textContent = YES_MESSAGE;
    document.getElementById("declineMessage").textContent = DECLINE_MESSAGE;

    const btnNo = document.getElementById("btnNo");
    const btnYes = document.getElementById("btnYes");
    const buttonsWrap = document.getElementById("questionButtons");

    function dodge() {
      if (dodgeCount >= MAX_DODGES) {
        decline();
        return;
      }
      dodgeCount++;

      const rect = btnNo.getBoundingClientRect();
      const margin = 12;
      const maxX = window.innerWidth - rect.width - margin;
      const maxY = window.innerHeight - rect.height - margin;
      const minX = margin;
      const minY = margin;

      const newX = Math.max(minX, Math.min(maxX, minX + Math.random() * (maxX - minX)));
      const newY = Math.max(minY, Math.min(maxY, minY + Math.random() * (maxY - minY)));

      btnNo.classList.add("dodging");
      btnNo.style.left = newX + "px";
      btnNo.style.top = newY + "px";
    }

    btnNo.addEventListener("mouseenter", dodge);
    btnNo.addEventListener("touchstart", (e) => {
      e.preventDefault();
      dodge();
    }, { passive: false });
    btnNo.addEventListener("click", (e) => {
      e.preventDefault();
      decline();
    });

    function decline() {
      // Clipboard write must happen synchronously inside the gesture handler.
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(DECLINE_MESSAGE).catch(() => {});
      }
      document.getElementById("questionStage").classList.add("hidden-out");
      document.getElementById("outcomeNo").classList.remove("hidden");
    }

    btnYes.addEventListener("click", () => {
      document.getElementById("questionStage").classList.add("hidden-out");
      document.getElementById("outcomeYes").classList.remove("hidden");
      document.body.classList.add("warm-shift");
      fireConfetti();

      const vid = document.getElementById("celebrateVideo");
      vid.play().catch(() => {});
    });
  }

  // ---------------------------------------------------------------------
  // Lightweight confetti (canvas, no external dependency)
  // ---------------------------------------------------------------------

  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const CONFETTI_COLORS = ["#b3324c", "#e8b34d", "#ffd9e0", "#7a2e3a", "#fff8f0"];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function fireConfetti() {
    const particleCount = window.innerWidth < 480 ? 70 : 130;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 60,
        y: canvas.height * 0.35,
        vx: (Math.random() - 0.5) * 9,
        vy: Math.random() * -9 - 4,
        size: Math.random() * 7 + 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        heart: Math.random() < 0.35,
      });
    }

    const gravity = 0.28;
    const drag = 0.995;
    let frame = 0;
    const maxFrames = 220;

    function drawHeart(p) {
      const s = p.size / 6;
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(-s * 2, -s, -s, -s * 2.2, 0, -s * 0.6);
      ctx.bezierCurveTo(s, -s * 2.2, s * 2, -s, 0, s);
      ctx.fill();
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        if (p.y > canvas.height + 40) return;
        alive = true;

        p.vy += gravity;
        p.vx *= drag;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.heart) {
          drawHeart(p);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }
        ctx.restore();
      });

      frame++;
      if (alive && frame < maxFrames) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    requestAnimationFrame(tick);
  }
})();
