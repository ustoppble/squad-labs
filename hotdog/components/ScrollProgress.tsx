"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin chromatic progress line fixed to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[65] h-[2px] w-full origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--glow-teal), var(--glow-blue) 50%, var(--glow-ember))",
      }}
    />
  );
}
