import '../main.css';
import { initScrollReveal } from './scroll-reveal.js';
import { initCounters } from './counters.js';
import { initParticles } from './particles.js';
import { initNav } from './nav.js';
import { initSmoothScroll } from './smooth-scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initParticles('#hero-particles');
  initParticles('#cta-particles');
});
