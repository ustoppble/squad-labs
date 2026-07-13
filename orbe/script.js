/* ═══════════════════════════════════════════════════════════════════════
   Orbe — movimento ambiente (nunca decorativo).
   3 técnicas: reveal escalonado no scroll · parallax rAF-ticado ·
   contadores que sobem ao entrar em cena. Tudo respeita reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1 · Nav: sólida ao rolar, invertida quando cruza seção escura ──── */
  var nav = document.getElementById('nav');
  var darkSections = document.querySelectorAll('.hero, .tile--dark, .band');

  function syncNavTheme() {
    if (!nav) return;
    var probe = nav.offsetHeight / 2;
    var overDark = false;
    for (var i = 0; i < darkSections.length; i++) {
      var r = darkSections[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) { overDark = true; break; }
    }
    nav.classList.toggle('is-over-dark', overDark);
  }

  /* ── 1b · Menu mobile (hambúrguer) ──────────────────────────────────── */
  var navToggle = document.getElementById('nav-toggle');
  var navItems = document.getElementById('nav-items');

  function setMenu(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('is-menu-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  if (navToggle && navItems) {
    navToggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-menu-open'));
    });
    navItems.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 600) setMenu(false);
    }, { passive: true });
  }

  /* ── 2 · Reveal escalonado (fade + rise) ───────────────────────────── */
  var revealables = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    revealables.forEach(function (el) {
      var d = el.getAttribute('data-reveal-delay');
      if (d) el.style.setProperty('--reveal-delay', d + 'ms');
    });

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealIO.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    revealables.forEach(function (el) {
      /* o hero entra sozinho na abertura — nunca depende de scroll */
      if (el.closest('.hero')) { el.classList.add('is-in'); return; }
      revealIO.observe(el);
    });
  }

  /* ── 3 · Cenas com animação própria (gráfico de sono, ondas NFC) ────── */
  var scenes = document.querySelectorAll('.sleep__chart, .pay');
  if (!('IntersectionObserver' in window)) {
    scenes.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var sceneIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        sceneIO.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    scenes.forEach(function (el) { sceneIO.observe(el); });
  }

  /* ── 4 · Contadores ────────────────────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');

  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    if (reduced) { el.textContent = String(target); return; }

    var duration = 1100;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  } else {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        countIO.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countIO.observe(el); });
  }

  /* ── 5 · Parallax rAF-ticado (hero, banda de textura, água) ─────────── */
  var layers = [].slice.call(document.querySelectorAll('[data-parallax]')).map(function (el) {
    return { el: el, rate: parseFloat(el.getAttribute('data-parallax')) || 0.1, y: 0 };
  });

  var ticking = false;
  var vh = window.innerHeight;

  function paint() {
    ticking = false;
    layers.forEach(function (layer) {
      var rect = layer.el.parentElement.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      var progress = (vh - rect.top) / (vh + rect.height); // 0 → 1 atravessando a viewport
      var offset = (progress - 0.5) * rect.height * layer.rate;
      layer.el.style.transform = 'translate3d(0,' + offset.toFixed(2) + 'px,0)';
    });
  }

  function onScroll() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
    syncNavTheme();
    if (reduced || ticking) return;
    ticking = true;
    requestAnimationFrame(paint);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    vh = window.innerHeight;
    if (!reduced) requestAnimationFrame(paint);
  }, { passive: true });

  if (!reduced) requestAnimationFrame(paint);
  onScroll();
})();
