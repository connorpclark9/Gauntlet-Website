/**
 * Canvas Ember Particle System
 * Renders drifting ember particles behind section content.
 */

const COLORS = ['#C0392B', '#E74C3C', '#E8751A', '#C9982A'];

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function createParticle(width, height) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const rgb = hexToRgb(color);

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1 + Math.random() * 2,
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
    opacity: 0.1 + Math.random() * 0.4,
    speed: 0.2 + Math.random() * 0.6,
    wobbleAmplitude: 0.5 + Math.random() * 1.5,
    wobbleFrequency: 0.001 + Math.random() * 0.003,
    wobbleOffset: Math.random() * Math.PI * 2,
  };
}

function createParticleSystem(container) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  container.style.position = container.style.position || 'relative';
  container.insertBefore(canvas, container.firstChild);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let particles = [];
  let animationId = null;
  let isVisible = false;

  function resize() {
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  function initParticlesArray() {
    const count = window.innerWidth < 768 ? 25 : 50;
    const rect = container.getBoundingClientRect();
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(rect.width, rect.height));
    }
  }

  function draw(timestamp) {
    if (!isVisible) {
      animationId = null;
      return;
    }

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.y -= p.speed;
      p.x += Math.sin(timestamp * p.wobbleFrequency + p.wobbleOffset) * p.wobbleAmplitude;

      if (p.y + p.radius < 0) {
        p.y = h + p.radius;
        p.x = Math.random() * w;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.opacity})`;
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  function start() {
    if (animationId) return;
    isVisible = true;
    animationId = requestAnimationFrame(draw);
  }

  function stop() {
    isVisible = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Visibility observer
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      });
    },
    { threshold: 0 }
  );

  // Initialize
  resize();
  initParticlesArray();
  visibilityObserver.observe(container);

  // Handle resize
  window.addEventListener('resize', () => {
    resize();
    initParticlesArray();
  });
}

export function initParticles(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  createParticleSystem(container);
}
