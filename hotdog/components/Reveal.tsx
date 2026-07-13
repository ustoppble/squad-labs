"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE_CINEMA } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Viewport-triggered reveal. Framer Motion's whileInView is SSR-safe and
 * automatically respects the OS reduced-motion setting via MotionConfig in the
 * layout, so no manual guard is needed here.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  once = true,
  ...rest
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE_CINEMA, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
