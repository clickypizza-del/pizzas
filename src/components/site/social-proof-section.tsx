"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  const [display, setDisplay] = useState(() =>
    parsed ? `0${parsed[1]}` : value,
  );

  useEffect(() => {
    if (!inView) return;
    const p = parseValue(value);
    if (!p) return;
    const [target, suffix] = p;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const isInt = Number.isInteger(target);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay((isInt ? Math.round(current) : current.toFixed(1)) + suffix);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export function SocialProofSection() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="py-12 sm:py-24 lg:py-28"
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
          <Reveal delay={0.1} className="lg:col-span-3">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
              aria-label="Carrusel de testimonios de clientes"
            >
              <CarouselContent className="-ml-4">
                {TESTIMONIALS.map((t) => (
                  <CarouselItem
                    key={t.name}
                    className="pl-4 sm:basis-1/2"
                  >
                    <figure className="h-full bg-card border border-border rounded-2xl p-6 sm:p-7 flex flex-col hover:border-primary/40 hover:shadow-lg transition-all">
                      <Quote
                        className="size-6 text-primary/30 mb-3"
                        aria-hidden
                      />
                      <div
                        className="flex gap-0.5 text-price mb-3"
                        role="img"
                        aria-label="5 de 5 estrellas"
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" aria-hidden />
                        ))}
                      </div>
                      <blockquote className="text-sm text-muted-foreground italic leading-relaxed flex-1">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                        <div
                          className="size-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs"
                          aria-hidden
                        >
                          {t.initials}
                        </div>
                        <div>
                          <div className="font-bold text-foreground text-sm">{t.name}</div>
                          <div className="text-xs text-muted-foreground">
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
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 sm:-left-12 bg-background border-border" />
              <CarouselNext className="-right-2 sm:-right-12 bg-background border-border" />
            </Carousel>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center p-5 sm:p-6 rounded-2xl bg-card/60 border border-border backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1 tabular-nums">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
