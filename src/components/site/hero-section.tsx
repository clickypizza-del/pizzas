import Image from "next/image";
import { ArrowRight, Clock, Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-24 pb-20 sm:pt-32 lg:pt-52 lg:pb-32"
    >
      {/* Ambient red glows */}
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, #1f1212 0%, #0f0f0f 45%, #0a0a0a 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Copy */}
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/25 rounded-full px-4 py-1.5 mb-8">
              <span
                aria-hidden
                className="w-2 h-2 bg-brand-amber rounded-full animate-pulse"
              />
              <span className="text-brand-amber text-xs sm:text-sm font-semibold tracking-wide">
                🗓 Próxima entrega: martes — pedidos hasta lunes 20 hs
              </span>
            </div>
            <h1
              id="hero-title"
              className="font-brand text-4xl sm:text-5xl lg:text-7xl text-foreground leading-[1.05] tracking-tight"
            >
              Pizza Gourmet.{" "}
              <span className="text-gradient-brand">Lista en 15 minutos.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Del freezer a tu mesa. Sin pasar por el supermercado. Masa artesanal, ingredientes premium, sabor que conquista.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="cta-hero px-8 py-5 sm:py-6 text-base font-semibold"
              >
                <a href="#planes">
                  Ver planes y armar mi caja
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="cta-inline px-8 py-5 sm:py-6 text-base border-border hover:border-primary/40"
              >
                <a href="#menu">Ver pizza del día</a>
              </Button>
            </div>

            {/* Trust strip with icons */}
            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { v: "15 min", l: "Al horno", icon: Clock },
                { v: "4.9★", l: "Valoración", icon: Star },
                { v: "100%", l: "Natural", icon: Leaf },
              ].map((item) => (
                <div
                  key={item.l}
                  className="flex flex-col items-center sm:items-start gap-1"
                >
                  <div className="flex items-center gap-1.5">
                    <item.icon
                      className="size-4 text-primary"
                      aria-hidden
                    />
                    <dd className="text-2xl sm:text-3xl font-extrabold text-foreground">
                      {item.v}
                    </dd>
                  </div>
                  <dt className="text-xs text-muted-foreground">{item.l}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.15} className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 bg-gradient-to-r from-primary to-brand-red-bright rounded-[2rem] blur-3xl opacity-20"
            />
            <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-black/50">
              <Image
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80"
                alt="Pizza premium recién horneada con mozzarella derretida"
                width={900}
                height={600}
                priority
                className="w-full h-[240px] sm:h-[480px] lg:h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:left-7 sm:right-auto sm:max-w-xs cp-glass border border-primary/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
                <div className="size-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl flex-shrink-0">
                  🍕
                </div>
                <div>
                <p className="text-foreground font-bold text-sm">
                  20 variedades · Desde $7.700
                </p>
                <p className="text-muted-foreground text-xs">
                  Precio individual · Entrega en Mendoza
                </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
