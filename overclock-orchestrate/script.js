document.addEventListener("DOMContentLoaded", () => {

  // ─── 1. SCROLL REVEAL ───────────────────────────────────────────────────────

  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));

  if (revealEls.length) {
    const staggerParents = [".features-grid", ".feature-grid", ".steps-grid", ".steps-list", ".models-list", ".model-cards"];

    function applyStagger(el) {
      const parentSelector = staggerParents.find((sel) => el.closest(sel));
      if (parentSelector) {
        const parent = el.closest(parentSelector);
        const siblings = Array.from(parent.querySelectorAll("[data-reveal]"));
        const idx = siblings.indexOf(el);
        if (idx > -1) {
          el.style.transitionDelay = idx * 100 + "ms";
        }
      }
    }

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              applyStagger(entry.target);
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );

      revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          applyStagger(el);
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    }
  }


  // ─── 2. NAV SCROLL EFFECT ───────────────────────────────────────────────────

  const nav = document.querySelector(".site-nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => nav.classList.toggle("scrolled", window.scrollY > 30),
      { passive: true }
    );
  }


  // ─── 3. SMOOTH SCROLL ───────────────────────────────────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      const target = href.length > 1 ? document.querySelector(href) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });


  // ─── 4. AGENT GRID ANIMATION ────────────────────────────────────────────────

  const panes = Array.from(document.querySelectorAll(".agent-pane"));

  if (panes.length) {
    const terminalLines = {
      scout: [
        "$ scanning codebase...",
        "  found 47 endpoints",
        "  mapping dependencies...",
        "  ✓ done (2.3s)",
      ],
      builder: [
        "$ writing auth.ts...",
        "  → POST /api/login",
        "  → JWT generation",
        "  ✓ compiled 0 errors",
      ],
      reviewer: [
        "$ reviewing diff...",
        "  1 security finding",
        "  suggesting fix...",
        "  ✓ approved",
      ],
      orchestrator: [
        "$ decomposing task...",
        "  → scout: map APIs",
        "  → builder: impl auth",
        "  → reviewer: check",
      ],
      memory: [
        "$ indexing session...",
        "  47 facts stored",
        "  context window: 12k",
        "  ✓ synced",
      ],
    };

    const statusTexts = ["RUNNING", "ACTIVE", "WORKING", "SCANNING", "BUILDING"];

    let activePaneIndex = 0;

    function setActivePane(index) {
      panes.forEach((p) => p.classList.remove("pane--active"));
      panes[index].classList.add("pane--active");
    }

    setActivePane(activePaneIndex);

    setInterval(() => {
      activePaneIndex = (activePaneIndex + 1) % panes.length;
      setActivePane(activePaneIndex);
    }, 2800);

    setInterval(() => {
      const randomPane = panes[Math.floor(Math.random() * panes.length)];
      const statusEl = randomPane.querySelector(".pane-status");
      if (statusEl) {
        statusEl.textContent = statusTexts[Math.floor(Math.random() * statusTexts.length)];
      }
    }, 4000);
  }


  // ─── 5. BUTTON HOVER MAGNETIC EFFECT ────────────────────────────────────────

  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tx = dx * 4;
      const ty = dy * 4;
      btn.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

});
