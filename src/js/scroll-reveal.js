/**
 * Scroll Reveal Module
 * Hybrid IntersectionObserver + scroll-based reveal animation system.
 */

export function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');

  if (!elements.length) return;

  function revealElement(el) {
    if (!el.classList.contains('is-visible')) {
      el.classList.add('is-visible');
    }
  }

  function checkVisibility() {
    const vh = window.innerHeight;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh - 30 && rect.bottom > 0) {
        revealElement(el);
      }
    });
  }

  // Try IntersectionObserver first
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // Scroll-based fallback — checks on every scroll
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial check after short delay
  setTimeout(checkVisibility, 100);

  // Also check after fonts load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(checkVisibility);
  }
}
