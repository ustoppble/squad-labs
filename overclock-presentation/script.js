/* =============================================================
   OVERCLOCK* 1.0 — presentation runtime (vanilla, zero deps)
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sections = Array.prototype.slice.call(document.querySelectorAll('.beat'));

  /* ---------- 1. scroll progress bar ---------- */
  var bar = document.getElementById('progressBar');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max * 100 : 0;
    if (bar) bar.style.width = pct.toFixed(2) + '%';
    var nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('is-scrolled', (h.scrollTop || 0) > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. build beat rail ---------- */
  var rail = document.getElementById('rail');
  if (rail) {
    sections.forEach(function (sec) {
      var n = sec.getAttribute('data-beat');
      var label = sec.getAttribute('data-label') || '';
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + sec.id;
      a.setAttribute('data-target', sec.id);
      a.setAttribute('aria-label', 'Beat ' + n + ' — ' + label);
      a.innerHTML = '<span class="rail__label">' + n + ' · ' + label + '</span><span class="rail__dot"></span>';
      li.appendChild(a);
      rail.appendChild(li);
    });
  }
  var railLinks = rail ? Array.prototype.slice.call(rail.querySelectorAll('a')) : [];

  /* ---------- 3. reveal on scroll + active section ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  // stagger delay classes to reveal groups inside a section
  sections.forEach(function (sec) {
    var kids = Array.prototype.slice.call(sec.querySelectorAll('.reveal'));
    kids.forEach(function (el, i) {
      if (i > 0 && i < 5 && !/d[1-4]/.test(el.className)) el.classList.add('d' + i);
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); revObs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { revObs.observe(el); });
  }

  // active section → rail highlight
  var activeObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        railLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('data-target') === e.target.id);
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(function (s) { activeObs.observe(s); });

  /* ---------- 4. keyboard nav (arrow / page keys jump beats) ---------- */
  function currentIndex() {
    var mid = window.scrollY + window.innerHeight / 2;
    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= mid) return i;
    }
    return 0;
  }
  function goTo(i) {
    i = Math.max(0, Math.min(sections.length - 1, i));
    sections[i].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(currentIndex() + 1); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(currentIndex() - 1); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(sections.length - 1); }
  });

  /* ---------- 5. voice waveform bars (beat 06) ---------- */
  var wave = document.getElementById('voiceWave');
  if (wave) {
    var COUNT = 56;
    for (var b = 0; b < COUNT; b++) {
      var span = document.createElement('span');
      // deterministic pseudo-height so it reads as a voice envelope, not noise
      var t = b / COUNT;
      var env = Math.sin(t * Math.PI);                 // 0..1 hump across the row
      var ripple = 0.5 + 0.5 * Math.sin(t * Math.PI * 9);
      var h = 10 + env * ripple * 54;
      span.style.setProperty('--h', h.toFixed(0) + 'px');
      span.style.animationDelay = (t * 1.1).toFixed(2) + 's';
      if (reduceMotion) span.style.height = (h * 0.6).toFixed(0) + 'px';
      wave.appendChild(span);
    }
  }
})();
