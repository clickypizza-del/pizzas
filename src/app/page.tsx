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
    "Pizza artesanal gourmet, congelada al instante. Masa artesanal, ingredientes premium. Directo de tu freezer en 15 minutos. Delivery en Mendoza.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
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
