'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { motion } from 'framer-motion';
import { STATS } from '@/lib/site-data';
import type { Stat } from '@/lib/site-data';

// ─── Parallax aurora layer ──────────────────────────────────────────────────

function AuroraLayer() {
  const auroraRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!auroraRef.current || !glowARef.current || !glowBRef.current) return;

    const ctx = gsap.context(() => {
      // Layer 1 — slower parallax (deep)
      gsap.to(glowARef.current, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: auroraRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      // Layer 2 — faster parallax (close)
      gsap.to(glowBRef.current, {
        yPercent: -38,
        ease: 'none',
        scrollTrigger: {
          trigger: auroraRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, auroraRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={auroraRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Teal glow — deep layer */}
      <div
        ref={glowARef}
        className="absolute"
        style={{
          inset: '-20% -10%',
          background:
            'radial-gradient(ellipse 70% 55% at 20% 60%, rgba(31,182,201,0.10) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      {/* Ember glow — close layer */}
      <div
        ref={glowBRef}
        className="absolute"
        style={{
          inset: '-20% -10%',
          background:
            'radial-gradient(ellipse 60% 45% at 80% 40%, rgba(255,90,54,0.08) 0%, transparent 65%)',
          willChange: 'transform',
        }}
      />
      {/* Static spectrum ambient at top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(100deg, transparent 0%, var(--glow-teal) 30%, var(--glow-blue) 55%, var(--glow-ember) 80%, transparent 100%)',
          opacity: 0.4,
        }}
      />
    </div>
  );
}

// ─── Single stat cell ───────────────────────────────────────────────────────

interface StatCellProps {
  stat: Stat;
  index: number;
  isLast: boolean;
}

function StatCell({ stat, index, isLast }: StatCellProps) {
  return (
    <Reveal
      delay={index * 0.1}
      y={20}
      className={[
        'relative flex flex-col gap-3 px-8 py-10',
        // Vertical hairline dividers between columns — desktop only
        !isLast
          ? 'md:after:absolute md:after:right-0 md:after:top-6 md:after:bottom-6 md:after:w-px md:after:bg-line md:after:content-[\'\']'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Huge number */}
      <p
        className="font-display tracking-tighter text-ink leading-none"
        style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
        aria-label={`${stat.prefix ?? ''}${stat.value}${stat.suffix} — ${stat.label}`}
      >
        {stat.prefix && (
          <span
            className="font-display tracking-tighter text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {stat.prefix}
          </span>
        )}
        <CountUp
          value={stat.value}
          decimals={stat.decimals ?? 0}
          duration={1600}
          className="font-display tracking-tighter tabular-nums"
        />
        <span
          className="text-accent font-display tracking-tight ml-0.5"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          {stat.suffix}
        </span>
      </p>

      {/* Label */}
      <span className="eyebrow text-ink-dim" style={{ letterSpacing: '0.12em' }}>
        {stat.label}
      </span>
    </Reveal>
  );
}

// ─── Section header ─────────────────────────────────────────────────────────

function SectionHeader() {
  return (
    <Reveal y={18} className="mb-0">
      <div className="flex flex-col gap-3">
        <span className="eyebrow text-accent">By the numbers</span>
        <h2
          className="font-display font-black text-ink tracking-tighter leading-none"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
        >
          Trusted by directors{' '}
          <span className="text-spectrum">at scale.</span>
        </h2>
      </div>
    </Reveal>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────

export default function Stats() {
  return (
    <section
      id="metrics"
      className="relative bg-bg-1 overflow-hidden"
      aria-label="Lumina performance metrics"
    >
      {/* Layered parallax aurora background */}
      <AuroraLayer />

      {/* Bottom spectrum hairline */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(100deg, transparent 0%, var(--glow-teal) 30%, var(--glow-blue) 55%, var(--glow-ember) 80%, transparent 100%)',
          opacity: 0.25,
        }}
      />

      <div className="shell relative z-10 py-24 md:py-32">
        {/* Header — left-aligned */}
        <div className="mb-16 md:mb-20 max-w-xl">
          <SectionHeader />
        </div>

        {/* Stats grid — 2 col mobile / 4 col desktop */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 border border-line"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STATS.map((stat, i) => (
            <StatCell
              key={stat.label}
              stat={stat}
              index={i}
              isLast={i === STATS.length - 1}
            />
          ))}
        </motion.div>

        {/* Subtle descriptor below */}
        <Reveal delay={0.45} y={12} className="mt-8">
          <p className="font-mono text-xs text-muted tracking-wider uppercase">
            Figures represent rolling 30-day averages &mdash; updated in real time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
