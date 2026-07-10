import type { Metadata } from "next";
import { ShoppingBag, Check, Gift, Star, Shield, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { LoyaltyCard } from "@/components/site/loyalty-card";
import { SITE } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Club Clicky — Programa de Fidelización",
  description:
    "Comprá 10 pizzas y regalamos 1 Pizza Muzzarella Clásica. Sin inscripción, sin costo. Acumulá compras y recibí tu recompensa en Click & Pizza.",
  alternates: { canonical: "/club-clicky" },
  openGraph: {
    title: "Club Clicky — Comprá 10 y Regalamos 1 | Click & Pizza",
    description:
      "Programa de fidelización de Click & Pizza. Comprá tus pizzas favoritas, acumulá 10 y recibí una Muzzarella Clásica gratis.",
    url: `${SITE.shareUrl}/club-clicky`,
  },
};

const STEPS = [
  {
    number: "1",
    icon: ShoppingBag,
    title: "Elegí tus pizzas",
    description: "Explorá nuestro catálogo de 12 variedades y elegí las que más te gusten.",
  },
  {
    number: "2",
    icon: Check,
    title: "Realizá tus compras",
    description: "Pedí por WhatsApp o suscribite. Cada compra suma a tu acumulado.",
  },
  {
    number: "3",
    icon: Star,
    title: "Sumá tus 10 pizzas",
    description: "Cada pizza que compres acerca tu recompensa. Seguí comprando tranquilo.",
  },
  {
    number: "4",
    icon: Gift,
    title: "Recibí tu pizza gratis",
    description: "Al completar 10 pizzas, te regalamos una Pizza Muzzarella Clásica.",
  },
];

const BENEFITS = [
  {
    icon: Shield,
    title: "Sin inscripción",
    description: "No necesitás registrarte. Empezás a acumular con tu primera compra.",
  },
  {
    icon: Heart,
    title: "Sin costo",
    description: "El programa es totalmente gratuito. No hay cuotas ni cargos ocultos.",
  },
  {
    icon: Star,
    title: "Acumulás compras",
    description: "Cada pizza que compres suma a tu total. No importa el sabor o la línea.",
  },
  {
    icon: Gift,
    title: "Recompensa asegurada",
    description: "Al llegar a 10 pizzas, tu Muzzarella Clásica gratis te espera.",
  },
  {
    icon: Sparkles,
    title: "Exclusivo para vos",
    description: "Solo para clientes de Click & Pizza. Una forma de agradecerte tu confianza.",
  },
];

export default function ClubClickyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 lg:pt-44 lg:pb-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, #1f1212 0%, #0f0f0f 50%, #0a0a0a 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/25 rounded-full px-4 py-1.5 mb-6">
                <span className="text-brand-amber text-xs sm:text-sm font-semibold tracking-wide">
                  🎁 Programa de fidelización
                </span>
              </div>
              <h1 className="font-brand text-4xl sm:text-5xl lg:text-7xl text-foreground leading-[1.05] tracking-tight">
                Club <span className="text-gradient-brand">Clicky</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-muted-foreground">
                Cada compra tiene recompensa.
              </p>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Comprá tus pizzas favoritas. Cuando completes 10 pizzas compradas te regalamos una Pizza Muzzarella Clásica.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="cta-hero px-8 py-5 sm:py-6 text-base font-semibold"
                >
                  <a href="#como-funciona">
                    Quiero empezar a sumar pizzas
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="cta-inline px-8 py-5 sm:py-6 text-base border-border hover:border-primary/40"
                >
                  <a
                    href={buildWhatsAppUrl("¡Hola Click & Pizza! Quiero información sobre el Club Clicky.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedir por WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Cómo funciona"
              title="4 pasos para tu pizza gratis"
              description="Es simple: comprá, acumulá y recibí tu recompensa. Sin formularios, sin puntos, sin complicaciones."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="relative bg-card rounded-2xl border border-border p-5 sm:p-6 text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="size-7 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">
                    Paso {step.number}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {i < STEPS.length - 1 ? (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-primary/40" aria-hidden>
                      →
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tarjeta de fidelidad */}
      <section className="py-12 sm:py-20 lg:py-24 bg-surface-sunken">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Tu progreso"
              title="Acumulá 10 pizzas, regalamos 1"
              description="Cada compra suma. Mirá cómo vas avanzando hacia tu pizza gratis."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <LoyaltyCard />
          </Reveal>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Beneficios"
              title="¿Por qué unirte al Club Clicky?"
              description="Porque ser cliente de Click & Pizza tiene sus ventajas."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <div className="group bg-card rounded-2xl border border-border p-5 sm:p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 sm:py-20 lg:py-24 bg-surface-sunken">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
              ¿Listo para empezar a <span className="text-gradient-brand">sumar</span>?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Hacé tu primer pedido y empezá a acumular hacia tu pizza gratis. Sin inscripción, sin costo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="cta-hero px-8 py-5 sm:py-6 text-base font-semibold"
              >
                <a
                  href={buildWhatsAppUrl("¡Hola Click & Pizza! Quiero hacer mi primer pedido y empezar a sumar en el Club Clicky.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quiero empezar a sumar pizzas
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-border"
              >
                <a href="/menu">Ver nuestro menú</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
