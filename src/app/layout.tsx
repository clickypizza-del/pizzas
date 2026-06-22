import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

const siteUrl = "https://clickpizza.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Click & Pizza — Experiencia Gourmet a un Click",
    template: "%s · Click & Pizza",
  },
  description:
    "Suscripción semanal de pizzas artesanales premium congeladas, entregadas en casa. Muzza, Especial Salame, Especial Jamón y Especial Queso Azul. Listas en 15 minutos.",
  keywords: [
    "pizza congelada",
    "pizza premium",
    "suscripción pizza",
    "pizza artesanal",
    "Muzza",
    "Especial Salame",
    "Especial Jamón",
    "Especial Queso Azul",
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
    title: "Click & Pizza — Experiencia Gourmet a un Click",
    description:
      "Tu pizza premium, directa a tu freezer, lista en 15 minutos. Suscripción semanal de pizzas artesanales.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Click & Pizza — Experiencia Gourmet a un Click",
    description:
      "Tu pizza premium, directa a tu freezer, lista en 15 minutos. Suscripción semanal de pizzas artesanales.",
  },
  icons: {
    icon: "/logo-click.png",
  },
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
