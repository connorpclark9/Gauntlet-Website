/**
 * Navigation Controller
 * Handles scroll styling, active section highlighting, and mobile menu.
 */

const SCROLL_THRESHOLD = 80;

function initScrollBehavior(nav) {
  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initActiveSectionHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const navLinks = document.querySelectorAll(`a[href="#${id}"]`);

          // Remove active from all nav links
          document.querySelectorAll('a.active').forEach((link) => {
            link.classList.remove('active');
          });

          // Add active to matching links
          navLinks.forEach((link) => {
            link.classList.add('active');
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav__mobile-toggle');
  const menu = document.querySelector('.nav__mobile-menu');

  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.classList.remove('active');
    menu.classList.remove('nav__mobile-menu--open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.classList.add('active');
    menu.classList.add('nav__mobile-menu--open');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('nav__mobile-menu--open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking a link inside it
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

export function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  initScrollBehavior(nav);
  initActiveSectionHighlighting();
  initMobileMenu();
}
