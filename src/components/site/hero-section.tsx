import Image from "next/image";
import { ArrowRight, Clock, Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

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
        <Reveal className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 bg-gradient-to-r from-primary to-brand-red-bright rounded-[2rem] blur-3xl opacity-20"
          />
          <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-black/50">
            {/* Image */}
            <Image
              src="/hero.webp"
              alt="Pizzas gourmet recién horneadas con ingredientes premium"
              width={1400}
              height={600}
              priority
              className="w-full object-cover"
              style={{ aspectRatio: "16/7" }}
            />

            {/* Solid dark overlay — ensures text is always readable */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Text overlay — vertically centered, left-aligned */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-5 sm:px-8 lg:px-14">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/25 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
                    <span
                      aria-hidden
                      className="w-2 h-2 bg-brand-amber rounded-full animate-pulse"
                    />
                    <span className="text-brand-amber text-[11px] sm:text-sm font-semibold tracking-wide">
                      🗓 Próxima entrega: martes
                    </span>
                  </div>
                  <h1
                    id="hero-title"
                    className="font-brand text-3xl sm:text-5xl lg:text-7xl text-white leading-[1.05] tracking-tight"
                  >
                    Pizza Gourmet.{" "}
                    <span className="text-gradient-brand">Lista en 15 minutos.</span>
                  </h1>
                  <p className="mt-3 sm:mt-6 text-sm sm:text-lg text-white/80 leading-relaxed">
                    Del freezer a tu mesa. Sin pasar por el supermercado. Masa artesanal, ingredientes premium.
                  </p>
                  <div className="mt-6 sm:mt-9 flex flex-col sm:flex-row gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="cta-hero px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-semibold"
                    >
                      <a href="#planes">
                        Ver planes
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="cta-inline px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base border-white/30 text-white hover:bg-white hover:text-black hover:border-white"
                    >
                      <a href="#menu">Ver el catálogo</a>
                    </Button>
                  </div>

                  {/* Trust strip */}
                  <dl className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-sm sm:max-w-lg">
                    {[
                      { v: "15 min", l: "Al horno", icon: Clock },
                      { v: "4.9★", l: "Valoración", icon: Star },
                      { v: "100%", l: "Natural", icon: Leaf },
                    ].map((item) => (
                      <div
                        key={item.l}
                        className="flex flex-col items-center sm:items-start gap-0.5 sm:gap-1"
                      >
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <item.icon className="size-3 sm:size-4 text-primary" aria-hidden />
                          <dd className="text-lg sm:text-3xl font-extrabold text-white">
                            {item.v}
                          </dd>
                        </div>
                        <dt className="text-[10px] sm:text-xs text-white/60">{item.l}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
