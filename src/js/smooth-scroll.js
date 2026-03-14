/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links with nav offset.
 */

const NAV_HEIGHT = 72;

export function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Close mobile menu if this link is inside one
      const mobileMenu = document.querySelector('.nav__mobile-menu');
      const toggle = document.querySelector('.nav__mobile-toggle');

      if (mobileMenu && link.closest('.nav__mobile-menu')) {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('nav__mobile-menu--open');
        document.body.style.overflow = '';
      }
    });
  });
}
