"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

function TestimonialCard({
  t,
  featured = false,
}: {
  t: (typeof TESTIMONIALS)[number];
  featured?: boolean;
}) {
  return (
    <figure
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
        featured
          ? "bg-gradient-to-br from-primary/10 via-card to-card border-primary/30 p-6 sm:p-8 shadow-xl shadow-primary/5"
          : "bg-card border-border p-5 sm:p-6 hover:border-primary/40 hover:shadow-lg"
      }`}
    >
      {featured && (
        <div className="absolute -top-px left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      <Quote
        className={`size-6 mb-3 ${featured ? "text-primary/60" : "text-primary/25"}`}
        aria-hidden
      />
      <div
        className="flex gap-0.5 text-price mb-3"
        role="img"
        aria-label="5 de 5 estrellas"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`${featured ? "size-4" : "size-3.5"} fill-current`}
            aria-hidden
          />
        ))}
      </div>
      <blockquote
        className={`leading-relaxed flex-1 ${
          featured
            ? "text-foreground text-base sm:text-lg font-medium not-italic"
            : "text-sm text-muted-foreground italic"
        }`}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 mt-5 pt-4 border-t border-border/60">
        <div
          className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
            featured
              ? "size-11 bg-primary text-primary-foreground text-sm"
              : "size-9 bg-primary/15 text-primary text-xs"
          }`}
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
  );
}

export function SocialProofSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

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
          <div className="lg:col-span-3">
            {/* Desktop: 2-column masonry-like layout with featured card */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-4">
              <div className="row-span-2">
                <Reveal delay={0}>
                  <TestimonialCard t={TESTIMONIALS[0]} featured />
                </Reveal>
              </div>
              {TESTIMONIALS.slice(1).map((t, i) => (
                <Reveal key={t.name} delay={(i + 1) * 0.08}>
                  <TestimonialCard t={t} />
                </Reveal>
              ))}
            </div>

            {/* Mobile: horizontal scroll carousel */}
            <div className="lg:hidden relative">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none"
                style={{ scrollbarWidth: "none" }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={t.name}
                    className="flex-none w-[85vw] max-w-[360px] snap-center"
                  >
                    <Reveal delay={i * 0.06}>
                      <TestimonialCard t={t} featured={i === 0} />
                    </Reveal>
                  </div>
                ))}
              </div>
              {/* Scroll indicators */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {TESTIMONIALS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === 0
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
              {/* Edge fade */}
              {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              )}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:sticky lg:top-24">
              {STATS.map((stat, i) => {
                const Icon = STAT_ICONS[stat.label] || Users;
                return (
                  <Reveal key={stat.label} delay={i * 0.08}>
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
