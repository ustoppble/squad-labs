// SSR-safe motion helpers shared across all animated components.

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Standard cinematic easings (mirror the tailwind config values).
export const EASE_CINEMA = [0.16, 1, 0.3, 1] as const;
export const EASE_SNAPPY = [0.77, 0, 0.175, 1] as const;

// Shared Framer Motion variants for viewport-triggered section reveals.
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CINEMA },
  },
};

export const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};
