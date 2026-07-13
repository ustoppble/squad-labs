'use strict';

function initMobileNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.hamburger');      // B2 fix: was .nav__hamburger
  const mobileMenu = document.querySelector('.mobile-menu');   // B2 fix: was .nav__mobile-menu
  if (!hamburger || !mobileMenu) return;

  const close = () => {
    nav.classList.remove('nav__mobile-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');            // S2
  };

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav__mobile-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));   // S2
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav__mobile-open')) close();
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('nav__mobile-open')) close();
  });
}

function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');

  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
      // B3: no hidden attribute in HTML — max-height CSS handles visibility
    });
  });
}

function initParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  hero.addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    hero.style.setProperty('--mouse-x', x + '%');
    hero.style.setProperty('--mouse-y', y + '%');
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;                        // B4 fix: guard against querySelector('#')
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);  // S5: CSS .nav--scrolled defined
  }, { passive: true });
}

function initCTAPulse() {
  const btn = document.querySelector('.btn-primary');
  if (!btn) return;
  let timer;
  const addPulse = () => { btn.classList.add('btn-pulse'); };    // S5: CSS .btn-pulse defined
  const removePulse = () => {
    btn.classList.remove('btn-pulse');
    clearTimeout(timer);
    timer = setTimeout(addPulse, 5000);
  };
  timer = setTimeout(addPulse, 3000);
  ['mousemove', 'scroll', 'keydown'].forEach((ev) => {
    window.addEventListener(ev, removePulse, { passive: true });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
  initFAQ();
  initParallax();
  initSmoothScroll();
  initNavScroll();
  initCTAPulse();
});
