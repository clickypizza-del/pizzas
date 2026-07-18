"use client";

import { useState } from "react";
import {
  Handshake, DollarSign, Package, Star, ArrowRight, Store,
  Truck, Clock, TrendingUp, Users, Phone, Check, ChevronDown,
  Zap, ShieldCheck, Target
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: Phone,
    step: "01",
    title: "Contactanos",
    description: "Escribinos por WhatsApp y contanos sobre tu negocio. Te explicamos todo sin compromiso.",
  },
  {
    icon: Package,
    step: "02",
    title: "Recibí tu kit",
    description: "Armamos tu primer pedido con las variedades que elijas. Pizzas congeladas, listas para hornear.",
  },
  {
    icon: Store,
    step: "03",
    title: "Vendé y ganá",
    description: "Sacá tus pizzas del freezer, hornéalas 15 minutos y vendé. Margen de ganancia en cada venta.",
  },
];

const BENEFITS = [
  {
    icon: DollarSign,
    title: "Alto margen de ganancia",
    description: "Trabajamos con márgenes que hacen tu negocio rentable desde el primer mes.",
  },
  {
    icon: Zap,
    title: "Producto con demanda",
    description: "Las pizzas artesanales congeladas crecen 30% al año. Un mercado que no para.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    description: "Masa artesanal, ingredientes premium. Tu cliente repite y vos vendés más.",
  },
  {
    icon: Clock,
    title: "Stock permanente",
    description: "Freezer = inventario. Sin merma, sin desperdicio, sin vencimientos cercanos.",
  },
  {
    icon: Truck,
    title: "Entrega en tu negocio",
    description: "Te llevamos el pedido hasta la puerta. No tenés que ir a buscar nada.",
  },
  {
    icon: Target,
    title: "Sin competencia directa",
    description: "Exclusividad por zona. Nosotros no vendemos al consumidor final en tu área.",
  },
];

const FAQS = [
  {
    q: "¿Cuánto invertir para arrancar?",
    a: "No necesitás una inversión grande. Arrancá con un kit mínimo y crecé a tu ritmo. Sin cuotas fijas ni exclusividad forzosa.",
  },
  {
    q: "¿Necesito local?",
    a: "Podés vender desde un kiosco, rotisería, confitería o incluso desde tu casa con freezer. La flexibilidad es total.",
  },
  {
    q: "¿Cómo se conservan las pizzas?",
    a: "Se guardan en freezer estándar (-18°C). Vida útil de 90 días. Sin aditivos artificiales.",
  },
  {
    q: "¿Cuánto tarda en hornearse?",
    a: "15 minutos a 220°C. Tu cliente recibe una pizza artesanal recién salida del horno.",
  },
  {
    q: "¿Qué variedades puedo ofrecer?",
    a: "Tenemos 12 variedades en 5 categorías: Clásica, Gourmet, Premium, Individual y Mini. Algo para cada cliente.",
  },
];

export function RevendedorSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
      >
        <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-30" />
        <div
          aria-hidden
          className="absolute -top-48 -right-48 w-[40rem] h-[40rem] bg-brand-amber/15 rounded-full blur-[150px]"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-brand-red-bright/10 rounded-full blur-[120px]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-brand-amber/15 text-brand-amber border border-brand-amber/30 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 inline-flex items-center gap-2">
                <Handshake className="size-3.5 shrink-0" aria-hidden />
                Programa de revendedores
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-5">
                Hacé crecer tu negocio{" "}
                <span className="text-gradient-brand">vendiendo pizzas</span>{" "}
                artesanales
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Sumá un producto premium con alta demanda a tu negocio.
                Margen atractivo, sin inversión grande y con la calidad que
                fideliza clientes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 py-6 text-base cta-hero bg-brand-amber hover:bg-brand-amber/90 text-black"
                >
                  <a
                    href={buildWhatsAppUrl(WA_MESSAGES.revendedor)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📲 Quiero ser revendedor
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base border-border"
                >
                  <a href="#como-funciona">Cómo funciona</a>
                </Button>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "12", label: "Variedades", sub: "para ofrecer" },
                { value: "15", label: "Minutos", sub: "de horno" },
                { value: "30%", label: "Crecimiento", sub: "del mercado" },
                { value: "90", label: "Días", sub: "vida útil" },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={cn(
                    "rounded-2xl border p-5 sm:p-6 text-center transition-all hover:scale-105",
                    i % 2 === 0
                      ? "border-brand-amber/20 bg-brand-amber/5"
                      : "border-border bg-card"
                  )}>
                    <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {stat.sub}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section
        id="como-funciona"
        className="py-12 sm:py-20 bg-surface-dark border-y border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Simple y directo"
              title={<>Así de <span className="text-gradient-brand">fácil</span></>}
              description="En 3 pasos estás vendiendo pizzas artesanales en tu negocio."
            />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-10">
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="relative group">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div
                      aria-hidden
                      className="hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px] bg-border"
                    />
                  )}
                  <div className="relative text-center">
                    <div className="relative mx-auto mb-5">
                      <div className="size-20 rounded-2xl bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <s.icon className="size-8 text-brand-amber" aria-hidden />
                      </div>
                      <span className="absolute -top-2 -right-2 size-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      {s.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Por qué Click & Pizza"
              title={<>Todo lo que <span className="text-gradient-brand">necesitás</span></>}
              description="Un modelo de negocio probado, pensado para que tengas éxito."
            />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-10">
            {BENEFITS.map((b, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl border border-border bg-card p-6 sm:p-7 hover:border-brand-amber/30 hover:shadow-lg hover:shadow-brand-amber/5 transition-all">
                  <div className="size-12 rounded-xl bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <b.icon className="size-6 text-brand-amber" aria-hidden />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Variedades showcase */}
      <section className="py-12 sm:py-20 bg-surface-dark border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Nuestro catálogo"
              title={<>12 variedades para <span className="text-gradient-brand">vender</span></>}
              description="De la clásica muzzarella a la premium con queso azul. Algo para cada cliente."
            />
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-10">
            {[
              { img: "muzza.webp", name: "Muzzarella Clásica", cat: "Clásica" },
              { img: "jamon.webp", name: "Jamón y Morrones", cat: "Clásica" },
              { img: "fugazzeta.webp", name: "Fugazzeta", cat: "Clásica" },
              { img: "especial-salame.webp", name: "Especial Salame", cat: "Clásica" },
              { img: "cuatro-quesos.webp", name: "Cuatro Quesos", cat: "Gourmet" },
              { img: "azul.webp", name: "Roquefort", cat: "Gourmet" },
              { img: "salame.webp", name: "Salame Premium", cat: "Gourmet" },
              { img: "panceta-ahumada.webp", name: "Lomito Ahumado", cat: "Premium" },
              { img: "provolone-oregano.webp", name: "Provolone", cat: "Premium" },
              { img: "muzzarella-aceitunas.webp", name: "Muzzarella c/ Aceitunas", cat: "Premium" },
              { img: "invividual1.webp", name: "Individual", cat: "Individual" },
              { img: "mini-pizzetas.webp", name: "Mini Pizzetas", cat: "Mini" },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-brand-amber/30 transition-all">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={`/pizzas/${p.img}`}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-[10px] font-bold text-brand-amber bg-brand-amber/20 rounded-full px-2 py-0.5">
                        {p.cat}
                      </span>
                      <p className="text-xs font-bold text-white mt-1 leading-tight">
                        {p.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Todo lo que querés saber"
            />
          </Reveal>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-foreground">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 text-muted-foreground shrink-0 transition-transform duration-200",
                        openFaq === i && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand-amber/30 bg-gradient-to-br from-brand-amber/10 via-card to-card p-8 sm:p-12 lg:p-16">
              <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-20" />
              <div
                aria-hidden
                className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-brand-amber/15 rounded-full blur-[120px]"
              />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
                  ¿Listo para empezar?
                </h2>
                <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
                  Escribinos ahora y te explicamos cómo funciona todo.
                  Sin compromiso, sin letra chica.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-10 py-6 text-base cta-hero bg-brand-amber hover:bg-brand-amber/90 text-black"
                >
                  <a
                    href={buildWhatsAppUrl(WA_MESSAGES.revendedor)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📲 Consultanos por WhatsApp
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  {SITE.phoneDisplay} · Respondemos rápido
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
