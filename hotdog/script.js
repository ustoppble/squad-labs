/* Realce progressivo: revela cards/seções ao rolar.
   Sem JS (ou sem suporte), o conteúdo aparece normalmente —
   a classe .reveal só é aplicada aqui, nunca no HTML. */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) return;

  var targets = document.querySelectorAll(
    ".card, .bebidas, .info__card, .closer__title, .band__head"
  );

  targets.forEach(function (el) { el.classList.add("reveal"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  targets.forEach(function (el) { io.observe(el); });
})();
