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
    <article className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={promo.image}
          alt={promo.title}
          width={600}
          height={375}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        {promo.badge ? (
          <Badge
            className={`absolute top-3 left-3 border-transparent shadow-lg text-[10px] sm:text-xs font-bold px-2 py-0.5 ${promo.badgeColor ?? "bg-primary text-white"}`}
          >
            {promo.badge}
          </Badge>
        ) : null}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-extrabold text-foreground mb-1.5">
          {promo.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
          {promo.description}
        </p>
        <div className="flex items-center gap-3 mt-auto">
          {promo.price ? (
            <span className="text-lg sm:text-xl font-extrabold text-price">
              {promo.price}
            </span>
          ) : null}
          <Button
            asChild
            size="sm"
            className="cta-section ml-auto text-xs sm:text-sm"
          >
            <a
              href={buildWhatsAppUrl(promo.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={promo.cta}
            >
              {promo.cta}
              <ArrowRight className="size-3.5" />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
