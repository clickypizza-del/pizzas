"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TESTIMONIALS, STATS, type Stat } from "@/lib/site-data";

function parseValue(value: string): [number, string] | null {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return [parseFloat(match[1]), match[2]];
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || !parsed) return;
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
  }, [inView, value, parsed]);

  return <span ref={ref}>{display}</span>;
}

export function SocialProofSection() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="py-8 sm:py-14 lg:py-18"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonios"
            title="Lo que dicen nuestros clientes"
            description="Miles de hogares ya disfrutan de la experiencia Click & Pizza."
          />
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Testimonios */}
          <div className="lg:col-span-3 space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="bg-card border border-border rounded-2xl p-5 sm:p-6 flex flex-col hover:border-primary/40 hover:shadow-lg transition-all">
                  <Quote className="size-5 text-primary/30 mb-2" aria-hidden />
                  <div
                    className="flex gap-0.5 text-price mb-2"
                    role="img"
                    aria-label="5 de 5 estrellas"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                    <div
                      className="size-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0"
                      aria-hidden
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {t.role}
                      </div>
                      {t.since ? (
                        <div className="text-[10px] text-primary font-medium mt-0.5">
                          {t.since}
                        </div>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:sticky lg:top-24">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 sm:p-5 rounded-2xl bg-card/60 border border-border backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary mb-1 tabular-nums">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
