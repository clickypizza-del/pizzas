import type { Metadata } from "next";
import { HeroSection } from "@/components/site/hero-section";
import { PromotionsSection } from "@/components/site/promotions-section";
import { PhilosophySection } from "@/components/site/philosophy-section";
import { SocialProofSection } from "@/components/site/social-proof-section";
import { HowItWorksSection } from "@/components/site/how-it-works-section";
import { FaqSection } from "@/components/site/faq-section";
import { OrderSection } from "@/components/site/order-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Click & Pizza — Pizza Gourmet Congelada en Mendoza",
  description:
    "Pizza artesanal congelada delivery en Mendoza. Muzzarella, fugazzeta, jamón y más. Lista en 15 minutos. Pedí por WhatsApp.",
  alternates: { canonical: "https://clickypizza.com.ar" },
  openGraph: {
    title: "Click & Pizza — Pizza Gourmet Congelada en Mendoza",
    description:
      "Pizza artesanal gourmet, congelada al instante. Lista en 15 minutos. Delivery en Mendoza.",
    url: "https://clickypizza.com.ar",
    images: [
      {
        url: "/pizzas/muzza.webp",
        width: 1200,
        height: 630,
        alt: "Pizza gourmet Muzzarella Clásica de Click & Pizza",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://clickypizza.com.ar",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo pido mis pizzas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Escribinos por WhatsApp, elegí tus variedades y coordinamos la entrega. Es simple y rápido.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tarda en estar lista la pizza?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Del freezer al horno en 15 minutos. Sin descongelar, directo al horno a 220°C.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo se conservan las pizzas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En freezer estándar a -18°C tienen una vida útil de 90 días. Sin aditivos ni conservantes artificiales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué medios de pago aceptan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Efectivo y transferencia bancaria. Al ser delivery local en Mendoza, facilitamos los medios más simples.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hay suscripción semanal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, tenemos Kit Semanal (4 pizzas) y Kit Premium (6 pizzas + bolsa térmica). Sin compromiso, pausá cuando quieras.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el envío?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El envío tiene costo variable según la zona. Consultanos por WhatsApp con tu dirección y te decimos el precio exacto.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <PromotionsSection />
      <PhilosophySection />

      <section className="py-8 sm:py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-brand text-3xl sm:text-4xl text-foreground mb-4">
            12 variedades gourmet
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Clásicas, premium, individuales y mini pizzetas. Elegí tus favoritas y armá tu caja.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/menu">
                Ver catálogo completo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-border">
              <Link href="/suscripcion">
                Ver planes
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SocialProofSection />
      <HowItWorksSection />
      <FaqSection />

      <OrderSection />

      {/* Club Clicky CTA */}
      <section className="py-8 sm:py-14 lg:py-18 bg-surface-sunken">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-brand text-3xl sm:text-4xl text-foreground mb-4">
            Registrate en el <span className="text-gradient-brand">Club Clicky</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Comprá 10 pizzas y te regalamos 1 Muzzarella Clásica. Sin inscripción, sin costo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/club-clicky">
                Conocer Club Clicky
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
