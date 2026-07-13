/* Overclock landing — micro-interactions.
   All motion is gated on prefers-reduced-motion. Nothing here is required
   for the page to be readable; it only animates the signature console. */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- nav: hairline border once scrolled --------------------------------- */
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- reveal sections on scroll ----------------------------------------- */
  const reveals = document.querySelectorAll(
    ".section-head, .card, .step, .what-point, .col, .cta-card, .console"
  );
  reveals.forEach((el) => el.classList.add("reveal"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            // small stagger within a batch
            setTimeout(() => e.target.classList.add("in"), Math.min(i, 6) * 60);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  if (reduceMotion) return; // leave the console in its static composed state

  /* --- the signature: a living squad ------------------------------------- */
  const panesEl = document.getElementById("panes");
  if (!panesEl) return;

  const orch = panesEl.querySelector('[data-pane="orchestrator"]');
  const workers = Array.from(panesEl.querySelectorAll(".pane:not(.is-orchestrator)"));
  const handoff = document.getElementById("handoff");
  const costEl = document.getElementById("cost");

  const STATES = ["boot", "run", "done"];
  const STATUS_TEXT = { boot: "booting", run: "running", done: "done" };
  const PROGRESS = { boot: 8, run: 52, done: 100 };

  let cost = 0.84;

  // gentle cost ticker on the squad meter
  setInterval(() => {
    cost += Math.random() * 0.04;
    if (costEl) costEl.textContent = "$" + cost.toFixed(2);
  }, 1400);

  function setState(pane, state) {
    pane.dataset.state = state;
    const status = pane.querySelector(".status");
    if (status) status.textContent = STATUS_TEXT[state];
    const bar = pane.querySelector(".meter i");
    if (bar) bar.style.width = PROGRESS[state] + "%";
  }

  // fire a handoff packet from a worker up into the orchestrator
  function fireHandoff(worker) {
    if (!handoff || !orch) return;
    const grid = panesEl.getBoundingClientRect();
    const w = worker.getBoundingClientRect();
    const o = orch.getBoundingClientRect();
    const x0 = w.left - grid.left + w.width / 2;
    const y0 = w.top - grid.top + 14;
    const x1 = o.left - grid.left + o.width / 2;
    const y1 = o.top - grid.top + o.height / 2;
    handoff.style.setProperty("--hx0", x0 + "px");
    handoff.style.setProperty("--hy0", y0 + "px");
    handoff.style.setProperty("--hx1", x1 + "px");
    handoff.style.setProperty("--hy1", y1 + "px");
    handoff.classList.remove("fire");
    void handoff.offsetWidth; // reflow to restart animation
    handoff.classList.add("fire");
  }

  // advance one worker through boot -> run -> done, then hand off and recycle
  function cycle(worker) {
    const idx = STATES.indexOf(worker.dataset.state);
    const next = idx < 0 ? 0 : (idx + 1) % STATES.length;
    const state = STATES[next];
    setState(worker, state);
    if (state === "done") {
      setTimeout(() => fireHandoff(worker), 350);
    }
  }

  // each worker runs on its own offset rhythm so the grid feels alive
  workers.forEach((w, i) => {
    setTimeout(() => {
      cycle(w);
      setInterval(() => cycle(w), 4200 + i * 900);
    }, 1200 + i * 1300);
  });

  // keep the orchestrator meter subtly breathing
  const obar = orch && orch.querySelector(".meter i");
  if (obar) {
    let up = true;
    setInterval(() => {
      const v = up ? 78 : 54;
      obar.style.width = v + "%";
      up = !up;
    }, 2600);
  }
})();
