/* ============================================================
   AGÊNCIA ZERO — script.js
   Countdown honesto (deadline real fixa) · scroll reveal ·
   accordion acessível · parallax sutil · progress bar
   ============================================================ */
// ── CHECKOUT ────────────────────────────────────────────────
// Enquanto não há gateway real, o valor abaixo mantém os botões
// de compra levando o usuário até a seção de oferta (#oferta).
// Ao colar a URL real do Hotmart/Kiwify/etc, TODOS os botões de
// compra passam a abrir o checkout automaticamente — sem mais nada a mudar.
const CHECKOUT_URL = '#oferta'; // [TO CONFIRM: colar aqui a URL real do checkout (Hotmart/Kiwify/etc)]

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── COUNTDOWN HONESTO ──────────────────────────────────────
     Deadline REAL e FIXA: 2026-07-20 23:59:59 BRT (UTC-3).
     Não reinicia. Quando expira, mostra estado encerrado. */
  var DEADLINE = new Date('2026-07-20T23:59:59-03:00').getTime();

  var groups = Array.prototype.slice.call(document.querySelectorAll('[data-countdown]'));
  var compacts = Array.prototype.slice.call(document.querySelectorAll('[data-countdown-compact]'));

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function renderCountdown() {
    var now = Date.now();
    var diff = DEADLINE - now;

    if (diff <= 0) {
      groups.forEach(function (g) {
        g.classList.add('is-ended');
        var d = g.querySelector('[data-d]'), h = g.querySelector('[data-h]'),
            m = g.querySelector('[data-m]'), s = g.querySelector('[data-s]');
        if (d) d.textContent = '00';
        if (h) h.textContent = '00';
        if (m) m.textContent = '00';
        if (s) s.textContent = '00';
      });
      compacts.forEach(function (c) { c.textContent = 'inscrições encerradas'; });
      return false; // para de agendar
    }

    var totalSec = Math.floor(diff / 1000);
    var days = Math.floor(totalSec / 86400);
    var hours = Math.floor((totalSec % 86400) / 3600);
    var mins = Math.floor((totalSec % 3600) / 60);
    var secs = totalSec % 60;

    groups.forEach(function (g) {
      var d = g.querySelector('[data-d]'), h = g.querySelector('[data-h]'),
          m = g.querySelector('[data-m]'), s = g.querySelector('[data-s]');
      if (d) d.textContent = pad(days);
      if (h) h.textContent = pad(hours);
      if (m) m.textContent = pad(mins);
      if (s) s.textContent = pad(secs);
    });

    var compactStr = days > 0
      ? days + 'd ' + pad(hours) + 'h ' + pad(mins) + 'm'
      : pad(hours) + 'h ' + pad(mins) + 'm ' + pad(secs) + 's';
    compacts.forEach(function (c) { c.textContent = compactStr; });

    return true;
  }

  if (groups.length || compacts.length) {
    if (renderCountdown()) {
      var cdInterval = setInterval(function () {
        if (!renderCountdown()) { clearInterval(cdInterval); }
      }, 1000);
    }
  }

  /* ── SCROLL REVEAL (IntersectionObserver) ─────────────────── */
  // Prepara stagger em grupos de cards
  document.querySelectorAll('.card-group').forEach(function (group) {
    var items = group.children;
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('reveal');
      items[i].style.transitionDelay = (i * 80) + 'ms';
    }
  });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── HERO ENTRY ───────────────────────────────────────────── */
  var hero = document.getElementById('hero');
  if (hero) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add('is-in'); });
    });
  }

  /* ── FAQ ACCORDION (acessível) ────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      if (!panel) return;
      if (expanded) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  // Reajusta altura de painéis abertos ao redimensionar
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });

  /* ── NAVBAR SCROLLED STATE + PROGRESS + PARALLAX ─────────── */
  var navbar = document.getElementById('navbar');
  var progress = document.getElementById('progress');
  var heroMedia = document.querySelector('.hero-media');
  var metodoMedia = document.querySelector('.metodo-media');
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) navbar.classList.toggle('is-scrolled', y > 8);

    if (progress) {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = docH > 0 ? Math.min(y / docH, 1) : 0;
      progress.style.transform = 'scaleX(' + ratio + ')';
    }

    if (!reduceMotion) {
      if (heroMedia) heroMedia.style.transform = 'translate3d(0,' + (y * 0.08) + 'px,0) scale(1.04)';
      if (metodoMedia) {
        var rect = metodoMedia.parentElement.getBoundingClientRect();
        var offset = (rect.top - window.innerHeight) * -0.04;
        metodoMedia.style.transform = 'translate3d(0,' + offset + 'px,0) scale(1.06)';
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ── SMOOTH ANCHOR + FOCO ACESSÍVEL ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    // Botões de compra são tratados pelo roteamento de checkout abaixo.
    if (link.hasAttribute('data-cta')) return;
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      // move o foco para acessibilidade sem re-scroll brusco
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ── CHECKOUT — roteamento de todos os botões de compra ───── */
  // Enquanto CHECKOUT_URL for uma âncora (#oferta), o clique rola
  // suavemente até a seção de oferta. Quando for uma URL real, o
  // mesmo clique abre o checkout. Um único ponto de configuração.
  function goToCheckout(e) {
    // hook para tracking futuro:
    // window.dataLayer && window.dataLayer.push({ event: 'cta_click', location: this.dataset.cta });
    if (CHECKOUT_URL.charAt(0) === '#') {
      var target = document.querySelector(CHECKOUT_URL);
      if (!target) return; // deixa o href do <a> agir como fallback
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    } else {
      e.preventDefault();
      window.location.href = CHECKOUT_URL;
    }
  }
  document.querySelectorAll('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', goToCheckout);
  });
})();
