import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import Script from "next/script";
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
  preload: true,
});

const bebasNeue = Bebas_Neue({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
});

const siteUrl = "https://clickypizza.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Click & Pizza — Pizza Gourmet Congelada en Mendoza",
    template: "%s · Click & Pizza",
  },
  description:
    "Pizza artesanal congelada delivery en Mendoza. Muzzarella, fugazzeta, jamón y más. Lista en 15 minutos. Pedí por WhatsApp.",
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
    "pizza Mendoza",
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
      "Pizza artesanal gourmet, congelada al instante. Lista en 15 minutos. Delivery en Mendoza.",
    images: [
      {
        url: "/pizzas/muzza.webp",
        width: 1200,
        height: 630,
        alt: "Pizza gourmet Muzzarella Clásica de Click & Pizza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Click & Pizza — Pizza Gourmet Congelada en Mendoza",
    description:
      "Pizza artesanal gourmet, congelada al instante. Lista en 15 minutos. Delivery en Mendoza.",
    images: ["/pizzas/muzza.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo-click.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f0f0f",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://clickypizza.com.ar#restaurant",
  name: "Click & Pizza",
  description:
    "Pizza artesanal congelada gourmet. Lista en 15 minutos. Delivery en Mendoza.",
  url: siteUrl,
  telephone: "+54 261 254-5724",
  image: `${siteUrl}/logo-click.png`,
  servesCuisine: ["Pizza", "Comida Italiana", "Pizza Congelada"],
  priceRange: "$$",
  paymentAccepted: "Efectivo, Transferencia bancaria",
  currenciesAccepted: "ARS",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
    addressRegion: "Mendoza",
    addressLocality: "Mendoza",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -32.8895,
    longitude: -68.8458,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
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
    <html lang="es-AR" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/hero.webp"
          type="image/webp"
        />
        <meta name="google-adsense-account" content="ca-pub-6697921053683954" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
        >
          Saltar al contenido principal
        </a>
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6697921053683954"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
