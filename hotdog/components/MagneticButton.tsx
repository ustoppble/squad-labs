"use client";

import { useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
};

/**
 * Magnetic hover: the element eases toward the pointer while hovered and
 * springs back on leave. Pure transform (GPU-friendly), no library. Magnetism
 * is skipped under reduced-motion but the element stays fully interactive.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.4,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const shared = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "data-cursor": "hover",
    "aria-label": ariaLabel,
    className: `inline-flex items-center justify-center transition-transform duration-500 ease-cinema will-change-transform ${className}`,
  } as const;

  if (href) {
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} {...shared}>
      {children}
    </button>
  );
}
