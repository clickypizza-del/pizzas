import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BackToTop, WhatsAppFab } from "@/components/site/floating-actions";
import { CartFab } from "@/components/site/cart-fab";
import { CartDrawer } from "@/components/site/cart-drawer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const siteUrl = "https://clickypizza.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Click & Pizza — Experiencia Gourmet a un Click",
    template: "%s · Click & Pizza",
  },
  description:
    "Suscripción semanal de pizzas artesanales premium congeladas, entregadas en casa. Muzzarella, Jamón con Aceitunas, Especial Salame, Roquefort y más. Listas en 15 minutos.",
  keywords: [
    "pizza congelada",
    "pizza premium",
    "suscripción pizza",
    "pizza artesanal",
    "mini pizzetas",
    "pizza individual",
    "Muzzarella Clásica",
    "Provolone",
    "Queso Azul",
    "Salame Tandil",
    "Click & Pizza",
    "delivery pizza",
  ],
  authors: [{ name: "Click & Pizza" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Click & Pizza",
    title: "Click & Pizza — Pizza Gourmet Congelada en Mendoza",
    description:
      "Pizza artesanal gourmet, congelada al instante. Masa artesanal, ingredientes premium. Directo de tu freezer en 15 minutos. Delivery en Mendoza.",
    images: [{ url: "/pizzas/muzza.png", width: 1200, height: 630, alt: "Pizza gourmet de Click & Pizza" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Click & Pizza — Pizza Gourmet Congelada en Mendoza",
    description:
      "Pizza artesanal gourmet, congelada al instante. Masa artesanal, ingredientes premium. Directo de tu freezer en 15 minutos. Delivery en Mendoza.",
    images: ["/pizzas/muzza.png"],
  },
  icons: {
    icon: "/logo-click.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Click & Pizza",
  description:
    "Marca de conveniencia premium de pizzas congeladas artesanales con suscripción semanal.",
  servesCuisine: ["Pizza", "Italiana"],
  priceRange: "$$",
  telephone: "+54 261 254-5724",
  image: "/logo-click.png",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
    addressRegion: "Mendoza",
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Kit Semanal",
      price: "25000",
      priceCurrency: "ARS",
      description: "4 pizzas a elección entregadas cada semana.",
    },
    {
      "@type": "Offer",
      name: "Kit Premium",
      price: "50000",
      priceCurrency: "ARS",
      description:
        "6 pizzas de sabores exclusivos, instructivo de cocción y bolsa térmica de regalo.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <WhatsAppFab />
        <BackToTop />
        <CartFab />
        <CartDrawer />
        <Toaster />
      </body>
    </html>
  );
}
