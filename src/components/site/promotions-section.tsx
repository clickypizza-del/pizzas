"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { PROMOTIONS, type Promotion } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function StampBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center justify-center font-brand text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-none bg-brand-amber text-black"
      style={{
        clipPath:
          "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
        padding: "5px 12px",
        minWidth: "70px",
        textAlign: "center",
      }}
    >
      {children}
    </span>
  );
}

function InkStamp({ text }: { text: string }) {
  return (
    <span
      className="absolute -rotate-3 z-20 font-brand text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-amber/90 border-2 border-brand-amber/60 rounded-full px-2.5 py-1"
      style={{
        textShadow: "0 0 2px rgba(245,158,11,0.3)",
        boxShadow:
          "inset 0 0 6px rgba(245,158,11,0.15), 0 0 10px rgba(245,158,11,0.1)",
      }}
    >
      {text}
    </span>
  );
}

function StampButton({
  href,
  isExternal,
  children,
  featured,
}: {
  href: string;
  isExternal: boolean;
  children: React.ReactNode;
  featured?: boolean;
}) {
  const clipPath =
    "polygon(0% 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 8px 100%, 0% calc(100% - 8px))";

  const className = `inline-flex items-center justify-center gap-1.5 font-brand text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
    featured
      ? "bg-brand-amber text-black px-5 py-2.5 shadow-lg shadow-brand-amber/30 hover:shadow-xl hover:shadow-brand-amber/40"
      : "bg-card text-brand-amber border border-brand-amber/40 px-4 py-2 hover:bg-brand-amber/10 hover:border-brand-amber/60"
  }`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ clipPath }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={{ clipPath }}>
      {children}
    </Link>
  );
}

function FeaturedCard({ promo }: { promo: Promotion }) {
  const href = promo.link ?? buildWhatsAppUrl(promo.whatsappMessage ?? "");
  const isExternal = !promo.link;

  return (
    <article className="group relative flex flex-col sm:flex-row h-full bg-[#141010] rounded-2xl border-2 border-brand-amber/30 overflow-hidden shadow-xl shadow-brand-amber/5 hover:border-brand-amber/50 transition-all duration-300">
      <div className="relative sm:w-1/2 aspect-[16/9] sm:aspect-auto overflow-hidden bg-secondary">
        <Image
          src={promo.image}
          alt={`Promoción ${promo.title} — Click & Pizza`}
          width={800}
          height={600}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141010]/60 hidden sm:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141010] to-transparent sm:hidden" />

        <div className="absolute top-3 left-3">
          <StampBadge>{promo.badge}</StampBadge>
        </div>

        {promo.cupos ? (
          <div className="absolute top-3 right-3">
            <InkStamp text={promo.cupos} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-center flex-1 p-5 sm:p-6 lg:p-8">
        <h3 className="font-brand text-xl sm:text-2xl lg:text-3xl text-foreground mb-2 leading-tight">
          {promo.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {promo.description}
        </p>

        <span className="text-2xl sm:text-3xl font-extrabold text-brand-amber mb-4 block">
          {promo.price}
        </span>

        <StampButton href={href} isExternal={isExternal} featured>
          {promo.cta}
          <ArrowRight className="size-3.5" />
        </StampButton>
      </div>
    </article>
  );
}

function SecondaryCard({ promo }: { promo: Promotion }) {
  const href = promo.link ?? buildWhatsAppUrl(promo.whatsappMessage ?? "");
  const isExternal = !promo.link;

  return (
    <article className="group relative flex flex-row h-full bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative w-28 sm:w-32 shrink-0 overflow-hidden bg-secondary">
        <Image
          src={promo.image}
          alt={`Promoción ${promo.title} — Click & Pizza`}
          width={200}
          height={200}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/40" />
        <div className="absolute top-2 left-2">
          <StampBadge>{promo.badge}</StampBadge>
        </div>
      </div>

      <div className="flex flex-col justify-center flex-1 p-3 sm:p-4">
        <h3 className="font-brand text-sm sm:text-base text-foreground mb-1 leading-tight">
          {promo.title}
        </h3>

        <span className="text-base sm:text-lg font-extrabold text-price mb-2 block">
          {promo.price}
        </span>

        <StampButton href={href} isExternal={isExternal}>
          {promo.cta}
          <ArrowRight className="size-3" />
        </StampButton>
      </div>
    </article>
  );
}

export function PromotionsSection() {
  const featured = PROMOTIONS.filter((p) => p.featured);
  const secondary = PROMOTIONS.filter((p) => !p.featured);

  return (
    <section
      id="promociones"
      aria-labelledby="promos-title"
      className="py-8 sm:py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-6 sm:mb-8">
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

        <div className="space-y-4 sm:space-y-5">
          {featured.map((promo, i) => (
            <Reveal key={promo.id} delay={i * 0.08}>
              <FeaturedCard promo={promo} />
            </Reveal>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {secondary.map((promo, i) => (
              <Reveal key={promo.id} delay={0.15 + i * 0.08}>
                <SecondaryCard promo={promo} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
