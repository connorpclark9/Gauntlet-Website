/**
 * Animated Number Counters Module
 * Counts from 0 to a target value with easeOutExpo easing.
 */

function formatWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function easeOutExpo(t) {
  return 1 - Math.pow(2, -10 * t);
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count-to'), 10);
  const suffix = el.getAttribute('data-count-suffix') || '';
  const duration = 2000;
  let startTime = null;

  function tick(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const current = Math.round(easedProgress * target);

    el.textContent = formatWithCommas(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

export function initCounters() {
  const elements = document.querySelectorAll('[data-count-to]');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  elements.forEach((el) => {
    el.textContent = '0';
    observer.observe(el);
  });
}
