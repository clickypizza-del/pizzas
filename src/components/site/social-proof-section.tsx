"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useInView } from "framer-motion";
import { Star, Quote, Users, Flame, Clock, Leaf } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TESTIMONIALS, STATS, type Stat } from "@/lib/site-data";

const STAT_ICONS: Record<string, typeof Flame> = {
  "Pizzas producidas": Flame,
  "Calificación promedio": Star,
  "Tiempo de cocción": Clock,
  "Ingredientes naturales": Leaf,
};

function parseValue(value: string): [number, string] | null {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return [parseFloat(match[1]), match[2]];
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || !parsed || hasAnimated.current) return;
    hasAnimated.current = true;
    const [target, suffix] = parsed;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const isInt = Number.isInteger(target);

    setDisplay((isInt ? 0 : "0.0") + suffix);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay((isInt ? Math.round(current) : current.toFixed(1)) + suffix);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed]);

  return <span ref={ref}>{display}</span>;
}

export function SocialProofSection() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonios"
            headingId="testimonios-title"
            title={
              <>
                Lo que dicen nuestros{" "}
                <span className="text-gradient-brand">clientes</span>
              </>
            }
            description="Miles de hogares ya disfrutan de la experiencia Click & Pizza."
          />
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-3 space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs flex-shrink-0">
                      {t.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-foreground text-sm">
                          {t.name}
                        </span>
                        <div
                          className="flex gap-0.5 text-price"
                          role="img"
                          aria-label="5 de 5 estrellas"
                        >
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className="size-3 fill-current"
                              aria-hidden
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {t.role}
                        {t.since ? (
                          <span className="text-primary font-medium ml-2">
                            {t.since}
                          </span>
                        ) : null}
                      </p>
                      <blockquote className="text-sm text-muted-foreground leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                    </div>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:sticky lg:top-24">
              {STATS.map((stat, i) => {
                const Icon = STAT_ICONS[stat.label] || Users;
                return (
                  <Reveal key={stat.label} delay={i * 0.06}>
                    <div className="group text-center p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="inline-flex items-center justify-center size-10 rounded-xl bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-primary mb-1 tabular-nums">
                        <CountUp value={stat.value} />
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
