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
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-32"
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-8">
              <span
                aria-hidden
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
              />
              <span className="text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase">
                Experiencia Gourmet sin Esfuerzo
              </span>
            </div>
            <h1
              id="hero-title"
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight"
            >
              Tu pizza premium,{" "}
              <span className="block sm:inline">directa a tu freezer,</span>{" "}
              <span className="text-gradient-brand">lista en 15 minutos</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Somos la marca de conveniencia premium que te garantiza una cena
              de restaurante en casa, sin moverte. Suscribite a nuestro kit
              semanal y olvidate de cocinar.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 text-base shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all"
              >
                <a href="#suscripcion">
                  Quiero mi suscripción
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-full px-8 py-6 text-base border-border hover:border-primary/40 transition-all"
              >
                <a href="#menu">Ver menú</a>
              </Button>
            </div>

            {/* Trust strip with icons */}
            <dl className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
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
              className="absolute -inset-4 bg-gradient-to-r from-primary to-[#e0332a] rounded-[2rem] blur-3xl opacity-20"
            />
            <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-black/50">
              <Image
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80"
                alt="Pizza premium recién horneada con mozzarella derretida"
                width={900}
                height={600}
                priority
                className="w-full h-[380px] sm:h-[480px] lg:h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:left-7 sm:right-auto sm:max-w-xs cp-glass border border-primary/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
                <div className="size-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl flex-shrink-0">
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
