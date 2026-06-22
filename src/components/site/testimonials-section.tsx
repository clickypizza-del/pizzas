"use client";

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
import { TESTIMONIALS } from "@/lib/site-data";

export function TestimonialsSection() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonios"
            title="Lo que dicen nuestros clientes"
            description="Miles de hogares ya disfrutan la experiencia Click & Pizza. Esto es lo que nos cuentan."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl mx-auto"
            aria-label="Carrusel de testimonios de clientes"
          >
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t) => (
                <CarouselItem
                  key={t.name}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <figure className="h-full bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col hover:border-primary/40 hover:shadow-lg transition-all">
                    <Quote
                      className="size-7 text-primary/40 mb-3"
                      aria-hidden
                    />
                    <div
                      className="flex gap-0.5 text-yellow-400 mb-4"
                      role="img"
                      aria-label="5 de 5 estrellas"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" aria-hidden />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground italic leading-relaxed flex-1">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
                      <div
                        className="size-11 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm"
                        aria-hidden
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role}
                        </div>
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
      </div>
    </section>
  );
}
