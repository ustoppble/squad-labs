(function () {
  'use strict';

  // Nav: add scrolled class when page scrolls > 10px
  const navWrapper = document.querySelector('.nav-wrapper');
  if (navWrapper) {
    const onScroll = () => navWrapper.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open', !expanded);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });

    document.addEventListener('click', e => {
      if (!navWrapper.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // FAQ accordion (button-based, ARIA-driven)
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.faq-item');
      const answer  = document.getElementById(btn.getAttribute('aria-controls'));
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';

      // Collapse all others
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other === item) return;
        other.classList.remove('open');
        other.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
        const otherAnswer = document.getElementById(other.querySelector('.faq-btn').getAttribute('aria-controls'));
        if (otherAnswer) otherAnswer.hidden = true;
      });

      // Toggle this one
      const next = !isOpen;
      btn.setAttribute('aria-expanded', String(next));
      item.classList.toggle('open', next);
      if (answer) answer.hidden = !next;
    });
  });

  // Scroll-reveal via IntersectionObserver
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

})();
