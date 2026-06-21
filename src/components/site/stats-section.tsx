"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/site/reveal";
import { STATS, type Stat } from "@/lib/site-data";

/** Parse a stat value like "50K+" or "4.9★" into { number, suffix }. */
function parseValue(value: string): { number: number; suffix: string } | null {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return { number: parseFloat(match[1]), suffix: match[2] };
}

/**
 * Animates a stat value from 0 → target when it scrolls into view.
 * The initial state is derived from props (not set inside the effect),
 * so we never call setState synchronously during the effect body.
 */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const parsed = parseValue(value);

  // Start from "0"+suffix so the count-up is visible; fall back to raw value.
  const [display, setDisplay] = useState(
    parsed ? `0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!inView || !parsed) return;
    const { number: target, suffix } = parsed;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const isInt = Number.isInteger(target);
      // setState is called inside the rAF callback (async), not in the effect body
      setDisplay(
        (isInt ? Math.round(current) : current.toFixed(1)) + suffix,
      );
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed]);

  return <span ref={ref}>{display}</span>;
}

export function StatsSection() {
  return (
    <section
      aria-labelledby="stats-title"
      className="py-20 sm:py-24 relative overflow-hidden border-y border-border bg-[#0b0b0b]"
    >
      <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-30" />
      <h2 id="stats-title" className="sr-only">
        Números que hablan
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <p className="text-center text-primary font-bold text-xs sm:text-sm uppercase tracking-[0.18em] mb-3">
            Números que hablan
          </p>
          <p className="text-center text-3xl sm:text-4xl font-extrabold text-foreground mb-12">
            Miles de hogares felices
          </p>
        </Reveal>

        <ul
          role="list"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
        >
          {STATS.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 0.1}>
              <StatCard stat={stat} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="text-center p-6 sm:p-8 rounded-2xl bg-card/60 border border-border backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all">
      <div className="text-4xl sm:text-5xl font-extrabold text-primary mb-2 tabular-nums">
        <CountUp value={stat.value} />
      </div>
      <div className="text-sm sm:text-base text-muted-foreground font-medium">
        {stat.label}
      </div>
    </div>
  );
}
