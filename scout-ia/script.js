/* ============================================================
   SCOUT-IA — interações (vanilla, zero dependências)
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Nav: glass on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 12) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- FAQ accordion ---------- */
  var faqButtons = document.querySelectorAll(".faq__q");
  faqButtons.forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      // fecha os outros (comportamento de acordeão)
      faqButtons.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          var p = document.getElementById(other.getAttribute("aria-controls"));
          if (p) p.style.maxHeight = null;
        }
      });
      if (isOpen) {
        btn.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
      } else {
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Hero: efeito de digitação do email ---------- */
  var typed = document.getElementById("typed");
  if (typed) {
    var phrase =
      "Toda segunda você reabre a caixa de entrada e a sua oferta já está lá — pronta, no seu tom, fechando venda enquanto você cuida do resto.";
    if (reduceMotion) {
      typed.textContent = phrase;
    } else {
      var i = 0;
      var caret = document.createElement("span");
      caret.className = "caret";
      typed.appendChild(caret);

      function type() {
        if (i <= phrase.length) {
          typed.textContent = phrase.slice(0, i);
          typed.appendChild(caret);
          i++;
          setTimeout(type, 28 + Math.floor((i % 5) * 6));
        }
      }
      // começa após o reveal do hero
      setTimeout(type, 900);
    }
  }
})();
