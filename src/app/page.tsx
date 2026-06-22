import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HeroSection } from "@/components/site/hero-section";
import { PhilosophySection } from "@/components/site/philosophy-section";
import { FeaturesSection } from "@/components/site/features-section";
import { MenuSection } from "@/components/site/menu-section";
import { OptimizedCatalogSection } from "@/components/site/optimized-catalog-section";
import { PlansSection } from "@/components/site/plans-section";
import { HowItWorksSection } from "@/components/site/how-it-works-section";
import { CoverageSection } from "@/components/site/coverage-section";
import { OrderSection } from "@/components/site/order-section";
import { StatsSection } from "@/components/site/stats-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { FaqSection } from "@/components/site/faq-section";
import { BackToTop, WhatsAppFab } from "@/components/site/floating-actions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main id="main" className="flex-1">
        <HeroSection />
        <PhilosophySection />
        <FeaturesSection />
        <MenuSection />
        <OptimizedCatalogSection />
        <PlansSection />
        <HowItWorksSection />
        <CoverageSection />
        <OrderSection />
        <StatsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>

      <SiteFooter />

      {/* Floating UI — WhatsApp CTA + back-to-top */}
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
}
