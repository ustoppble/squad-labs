"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Custom cursor: a small solid dot that tracks the pointer 1:1 plus a larger
 * lerp-following ring using mix-blend-mode: difference. The ring grows when the
 * pointer is over any interactive element (a, button, [data-cursor]).
 * Only mounts on fine pointers; respects reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        "a, button, [data-cursor], input, textarea, label",
      );
      if (interactive !== hovering) {
        hovering = interactive;
        ring.style.setProperty("--ring-scale", hovering ? "2.1" : "1");
        ring.style.setProperty(
          "--ring-bg",
          hovering ? "rgba(255,90,54,0.18)" : "transparent",
        );
      }
    };

    const render = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(var(--ring-scale, 1))`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-ink/70 transition-[background] duration-300 ease-cinema"
        style={{
          background: "var(--ring-bg, transparent)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
