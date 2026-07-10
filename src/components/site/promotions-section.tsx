"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { PROMOTIONS, type Promotion } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function PromotionCard({ promo }: { promo: Promotion }) {
  return (
    <article className="group relative flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/8 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={promo.image}
          alt={promo.title}
          width={800}
          height={500}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        {promo.badge ? (
          <Badge
            className={`absolute top-3 left-3 border-transparent shadow-md text-[10px] sm:text-xs font-bold px-2.5 py-1 tracking-wide ${promo.badgeColor ?? "bg-primary text-white"}`}
          >
            {promo.badge}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-1.5 leading-tight">
          {promo.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {promo.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-border/50">
          {promo.price ? (
            <span className="text-base sm:text-lg font-extrabold text-price whitespace-nowrap">
              {promo.price}
            </span>
          ) : (
            <span />
          )}
          <Button
            asChild
            size="sm"
            className="cta-section shrink-0 text-xs sm:text-sm px-4 py-2 h-9 rounded-xl font-semibold"
          >
            <a
              href={buildWhatsAppUrl(promo.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={promo.cta}
            >
              {promo.cta}
              <ArrowRight className="size-3.5 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function PromotionsSection() {
  return (
    <section
      id="promociones"
      aria-labelledby="promos-title"
      className="py-10 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Promociones
            </p>
            <h2
              id="promos-title"
              className="font-brand text-2xl sm:text-3xl lg:text-4xl text-foreground"
            >
              Ofertas que no podés dejar pasar
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROMOTIONS.map((promo, i) => (
            <Reveal key={promo.id} delay={i * 0.08}>
              <PromotionCard promo={promo} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
