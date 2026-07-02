"use client";

import { Handshake, DollarSign, Package, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { SITE } from "@/lib/site-data";

const BENEFITS = [
  { icon: DollarSign, text: "Excelente margen de ganancia." },
  { icon: Package, text: "Pizzas listas para hornear y vender." },
  { icon: Package, text: "Fácil almacenamiento y stock permanente." },
  { icon: Star, text: "Producto de calidad que fideliza clientes." },
];

export function RevendedorSection() {
  return (
    <section
      id="revendedor"
      aria-labelledby="revendedor-title"
      className="py-12 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-amber/30 bg-gradient-to-br from-brand-amber/10 via-card to-card">
            <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-20" />
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-brand-amber/15 rounded-full blur-[120px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 w-[20rem] h-[20rem] bg-brand-red-bright/10 rounded-full blur-[100px]"
            />

            <div className="relative z-10 p-5 sm:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                <div>
                  <Badge className="mb-6 bg-brand-amber/15 text-brand-amber border border-brand-amber/30 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 inline-flex flex-wrap items-center gap-1">
                    <Handshake className="size-3.5 shrink-0" aria-hidden />
                    <span className="sm:hidden">¿Querés vender pizzas?</span>
                    <span className="hidden sm:inline">¿Querés ganar dinero vendiendo pizzas?</span>
                  </Badge>

                  <h2
                    id="revendedor-title"
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-4"
                  >
                    Sé nuestro{" "}
                    <span className="text-gradient-brand">Revendedor</span>
                  </h2>

                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
                    Sumate a Click & Pizza y obtené todo lo que necesitás para arrancar tu propio negocio. Sin inversión grande, con producto de calidad y soporte permanente.
                  </p>

                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 py-6 text-base cta-hero bg-brand-amber hover:bg-brand-amber/90 text-black"
                  >
                    <a
                      href={buildWhatsAppUrl(WA_MESSAGES.revendedor)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📲 Consultanos por WhatsApp
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>

                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-4 bg-gradient-to-r from-brand-amber to-brand-red-bright rounded-3xl blur-2xl opacity-15"
                  />
                  <div className="relative bg-card rounded-3xl p-5 sm:p-8 border border-brand-amber/20 shadow-xl">
                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
                      <Handshake className="size-5 text-brand-amber" aria-hidden />
                      Sumate a Click & Pizza y obtené:
                    </h3>
                    <ul className="space-y-5">
                      {BENEFITS.map((b, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="size-10 rounded-xl bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center flex-shrink-0">
                            <b.icon className="size-5 text-brand-amber" aria-hidden />
                          </div>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2">
                            {b.text}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 bg-brand-amber/5 border border-brand-amber/20 rounded-2xl p-5 flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-brand-amber/15 flex items-center justify-center flex-shrink-0 text-2xl">
                        📲
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">
                          {SITE.phoneDisplay}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Consultanos por WhatsApp
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 sm:mt-10 text-center text-sm sm:text-base text-muted-foreground font-medium">
                ¡Empezá tu propio negocio con Click & Pizza!
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
