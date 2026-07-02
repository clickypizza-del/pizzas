import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HeroSection } from "@/components/site/hero-section";
import { PhilosophySection } from "@/components/site/philosophy-section";
import { MenuSection } from "@/components/site/menu-section";
import { PlansSection } from "@/components/site/plans-section";
import { SocialProofSection } from "@/components/site/social-proof-section";
import { HowItWorksSection } from "@/components/site/how-it-works-section";
import { FreezerSection } from "@/components/site/freezer-section";
import { ClubClickySection } from "@/components/site/club-clicky-section";
import { RevendedorSection } from "@/components/site/revendedor-section";
import { OrderSection } from "@/components/site/order-section";
import { FaqSection } from "@/components/site/faq-section";
import { BackToTop, WhatsAppFab } from "@/components/site/floating-actions";
import { CartFab } from "@/components/site/cart-fab";
import { CartDrawer } from "@/components/site/cart-drawer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main id="main" className="flex-1">
        <HeroSection />
        <PhilosophySection />
        <MenuSection />
        <PlansSection />
        <SocialProofSection />
        <HowItWorksSection />
        <FreezerSection />
        <ClubClickySection />
        <RevendedorSection />
        <OrderSection />
        <FaqSection />
      </main>

      <SiteFooter />

      <WhatsAppFab />
      <BackToTop />
      <CartFab />
      <CartDrawer />
    </div>
  );
}
