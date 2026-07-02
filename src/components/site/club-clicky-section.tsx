"use client";

import { Gift, Pizza, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

const STEPS = [
  { number: "1", text: "Comprás 10 pizzas" },
  { number: "2", text: "Llevamos el registro por WhatsApp" },
  { number: "3", text: "¡Recibís tu Pizza Muzzarella Clásica gratis!" },
];

export function ClubClickySection() {
  return (
    <section
      id="club-clicky"
      aria-labelledby="club-clicky-title"
      className="py-12 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
            <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-20" />
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-primary/15 rounded-full blur-[120px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 w-[20rem] h-[20rem] bg-brand-red-bright/10 rounded-full blur-[100px]"
            />

            <div className="relative z-10 p-5 sm:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                <div>
                  <Badge className="mb-6 bg-primary/15 text-primary border border-primary/30 text-xs sm:text-sm font-bold px-4 py-1.5">
                    <Gift className="size-3.5 mr-1.5" aria-hidden />
                    11.ª Pizza GRATIS
                  </Badge>

                  <h2
                    id="club-clicky-title"
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-4"
                  >
                    Club{" "}
                    <span className="text-gradient-brand">Clicky</span>
                  </h2>

                  <p className="text-lg sm:text-xl text-foreground font-bold mb-2">
                    ¡Comprá 10 pizzas y la 11.ª va de regalo!
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
                    En ClickyPizza premiamos a nuestros clientes frecuentes.
                    Sin tarjetas, sin aplicaciones. Todo por WhatsApp.
                  </p>

                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 py-6 text-base cta-hero"
                  >
                    <a
                      href={buildWhatsAppUrl(WA_MESSAGES.clubClicky)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📲 Quiero empezar a sumar pizzas
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>

                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-4 bg-gradient-to-r from-primary to-brand-red-bright rounded-3xl blur-2xl opacity-15"
                  />
                  <div className="relative bg-card rounded-3xl p-5 sm:p-8 border border-primary/20 shadow-xl">
                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
                      <Pizza className="size-5 text-primary" aria-hidden />
                      ¿Cómo funciona?
                    </h3>
                    <ul className="space-y-5">
                      {STEPS.map((step) => (
                        <li key={step.number} className="flex items-start gap-4">
                          <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-extrabold text-lg">
                              {step.number}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2">
                            {step.text}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 text-2xl">
                        🎁
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">
                          Pizza Muzzarella Clásica
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Gratis al completar tus 10 compras
                        </p>
                      </div>
                      <Check className="size-6 text-primary ml-auto flex-shrink-0" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
