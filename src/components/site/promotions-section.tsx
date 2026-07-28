"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Snowflake, Timer, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { PROMOTIONS, type Promotion } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const BENEFITS = [
  { icon: Clock, text: "Lista para horno" },
  { icon: Snowflake, text: "Sin descongelar" },
  { icon: Timer, text: "Lista en 15 minutos" },
  { icon: Users, text: "Ideal para compartir" },
];

function FeaturedCard({ promo }: { promo: Promotion }) {
  const href = promo.link ?? buildWhatsAppUrl(promo.whatsappMessage ?? "");
  const isExternal = !promo.link;

  return (
    <article className="group relative flex flex-col lg:flex-row h-full bg-[#0D0D0D] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 hover:border-brand-red/30 transition-all duration-500">
      <div className="relative lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden bg-secondary">
        <Image
          src={promo.image}
          alt={`Noche Clicky — Cena gourmet en casa con Click & Pizza`}
          width={800}
          height={600}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0D0D0D]/70 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent lg:hidden" />

        {promo.badge && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-red text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm">
              {promo.badge}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center flex-1 p-6 sm:p-8 lg:p-10">
        <span className="text-xs sm:text-sm font-semibold text-brand-red uppercase tracking-[0.2em] mb-3">
          La excusa perfecta
        </span>

        <h3 className="font-brand text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-[1.1]">
          {promo.title}
        </h3>

        <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-6 max-w-lg">
          {promo.description}
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-sm mb-8 w-fit">
          <span className="text-sm sm:text-base font-semibold text-brand-gold">
            {promo.price}
          </span>
        </div>

        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-fit px-6 py-3 bg-brand-red text-white font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-brand-red/90 transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/30 active:scale-[0.98]"
          >
            {promo.cta}
            <ArrowRight className="size-4" />
          </a>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center justify-center gap-2 w-fit px-6 py-3 bg-brand-red text-white font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-brand-red/90 transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/30 active:scale-[0.98]"
          >
            {promo.cta}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </article>
  );
}

function SecondaryCard({ promo }: { promo: Promotion }) {
  const href = promo.link ?? buildWhatsAppUrl(promo.whatsappMessage ?? "");
  const isExternal = !promo.link;

  return (
    <article className="group relative flex flex-col h-full bg-[#111111] rounded-2xl border border-white/10 overflow-hidden hover:border-brand-red/30 hover:-translate-y-1 transition-all duration-500">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={promo.image}
          alt={`${promo.title} — Click & Pizza`}
          width={400}
          height={250}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />

        {promo.badge && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 bg-brand-red/90 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-sm">
              {promo.badge}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h4 className="font-brand text-lg sm:text-xl text-white mb-2 leading-tight">
          {promo.title}
        </h4>

        <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
          {promo.description}
        </p>

        <div className="mt-auto">
          <span className="text-lg sm:text-xl font-extrabold text-brand-gold block mb-4">
            {promo.price}
          </span>

          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-red/10 hover:border-brand-red/30 transition-all duration-300"
            >
              {promo.cta}
              <ArrowRight className="size-3.5" />
            </a>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-red/10 hover:border-brand-red/30 transition-all duration-300"
            >
              {promo.cta}
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
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
      className="py-12 sm:py-16 lg:py-24 bg-[#0D0D0D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-semibold text-brand-red uppercase tracking-[0.25em] mb-4 block">
              Experiencia Clicky
            </span>
            <h2
              id="promos-title"
              className="font-brand text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            >
              Noche Clicky
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto">
              La excusa perfecta para compartir. Convertí cualquier noche en un
              momento especial.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-14">
          {featured.map((promo, i) => (
            <Reveal key={promo.id} delay={i * 0.08}>
              <FeaturedCard promo={promo} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14">
            {BENEFITS.map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-2.5 text-white/60"
              >
                <b.icon className="size-4 sm:size-5 text-brand-red" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  {b.text}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {secondary.map((promo, i) => (
            <Reveal key={promo.id} delay={0.15 + i * 0.08}>
              <SecondaryCard promo={promo} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
