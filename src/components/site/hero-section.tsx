import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-28"
    >
      {/* Ambient red glows */}
      <div
        aria-hidden
        className="absolute -top-24 right-0 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-primary/10 rounded-full blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at top right, #1a1a1a 0%, #0f0f0f 45%, #0a0a0a 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-6">
              <span
                aria-hidden
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
              />
              <span className="text-primary text-xs sm:text-sm font-semibold tracking-wide">
                Experiencia Gourmet sin Esfuerzo
              </span>
            </div>
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.08] tracking-tight"
            >
              Tu pizza premium, directa a tu freezer,{" "}
              <span className="text-gradient-brand">lista en 15 minutos</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Somos la marca de conveniencia premium que te garantiza una cena
              de restaurante en casa, sin moverte. Suscribite a nuestro kit
              semanal y olvidate de cocinar.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button asChild size="lg" className="rounded-full px-7 text-base shadow-lg shadow-primary/30">
                <a href="#suscripcion">
                  Quiero mi suscripción
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-full px-7 text-base border-border"
              >
                <a href="#menu">
                  <Play className="size-4 text-primary" />
                  Ver menú
                </a>
              </Button>
            </div>

            {/* Trust strip */}
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: "15 min", l: "Al horno" },
                { v: "4.9★", l: "Valoración" },
                { v: "100%", l: "Natural" },
              ].map((item) => (
                <div key={item.l} className="text-center sm:text-left">
                  <dt className="sr-only">{item.l}</dt>
                  <dd className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    {item.v}
                  </dd>
                  <p className="text-xs text-muted-foreground mt-1">{item.l}</p>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.15} className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 bg-gradient-to-r from-primary to-[#e0332a] rounded-3xl blur-2xl opacity-15"
            />
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80"
                alt="Pizza premium recién horneada con mozzarella derretida"
                width={900}
                height={600}
                priority
                className="w-full h-[360px] sm:h-[440px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs cp-glass border border-primary/30 rounded-2xl p-4 flex items-center gap-3">
                <div className="size-11 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                  🍕
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">
                    Suscripción semanal
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Sin compromiso · Cancelás cuando quieras
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
