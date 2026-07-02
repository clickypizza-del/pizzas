"use client";

import { useState } from "react";
import { Check, ArrowRight, UserPlus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PLANS, SITE } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { ShareButton } from "@/components/site/share-button";
import { RegisterForm } from "@/components/site/register-form";
import { cn } from "@/lib/utils";

const PLAN_MESSAGES: Record<string, string> = {
  "kit-semanal": WA_MESSAGES.planKitSemanal,
  "kit-premium": WA_MESSAGES.planKitPremium,
  "evento-especial": WA_MESSAGES.planEvento,
};

const PLAN_UNIT_PRICE: Record<string, string | null> = {
  "kit-semanal": "$6.250",
  "kit-premium": "$8.333",
  "evento-especial": null,
};

const PLAN_SAVINGS: Record<string, string | null> = {
  "kit-semanal": "Ahorro vs. individual",
  "kit-premium": null,
  "evento-especial": "Precio según selección",
};

export function PlansSection() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("kit-semanal");

  return (
    <section
      id="suscripcion"
      aria-labelledby="suscripcion-title"
      className="relative py-12 sm:py-24 lg:py-28 bg-surface-dark border-y border-border overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/25 rounded-full px-4 py-1.5">
            <span aria-hidden className="w-2 h-2 bg-brand-amber rounded-full animate-pulse" />
            <span className="text-brand-amber text-xs sm:text-sm font-semibold">🗓 Pedidos abiertos — próxima entrega martes</span>
          </div>
        </div>
        <Reveal>
          <SectionHeading
            eyebrow="Suscripción semanal"
            title={
              <>
                Tu <span className="text-gradient-brand">kit gourmet</span> sin
                preocupaciones
              </>
            }
            description="Recibí tus pizzas favoritas todas las semanas, sin tener que volver a pedir. Flexibilidad, ahorro y la garantía de tener siempre una cena premium lista en 15 minutos."
          />
        </Reveal>

        <ul
          role="list"
          className="flex gap-6 lg:gap-8 max-w-5xl mx-auto overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 sm:grid sm:grid-cols-3 md:grid-cols-3"
        >
          {PLANS.map((plan, i) => (
            <Reveal as="li" key={plan.id} delay={i * 0.1} className="min-w-[280px] sm:min-w-0 snap-center flex">
              <article
                className={cn(
                  "relative h-full flex flex-col p-5 sm:p-8 rounded-2xl border text-center transition-all min-w-[280px] sm:min-w-0",
                  plan.popular
                    ? "border-primary bg-gradient-to-b from-primary/10 to-card shadow-xl shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                {plan.popular ? (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground border-transparent shadow-lg">
                    Más elegido
                  </Badge>
                ) : null}

                <div
                  className="text-4xl mb-3"
                  role="img"
                  aria-label={plan.name}
                >
                  {plan.emoji}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 sm:mb-5 min-h-[2.5rem] sm:min-h-[3.5rem]">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">
                    {plan.price}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-1">
                    {plan.unit}
                  </span>
                  {PLAN_UNIT_PRICE[plan.id] ? (
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-brand-amber/10 border border-brand-amber/20 rounded-full px-3 py-1">
                      <Tag className="size-3 text-brand-amber" aria-hidden />
                      <span className="text-xs font-bold text-brand-amber">
                        {PLAN_UNIT_PRICE[plan.id]}/pizza
                      </span>
                      {PLAN_SAVINGS[plan.id] ? (
                        <span className="text-[10px] text-brand-amber/70">
                          · {PLAN_SAVINGS[plan.id]}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <ul
                  role="list"
                  className="text-left space-y-2 sm:space-y-2.5 mb-5 sm:mb-7 flex-1"
                >
                  {plan.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check
                        className="size-4 text-primary flex-shrink-0 mt-0.5"
                        aria-hidden
                      />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-1.5 sm:space-y-2">
                    <Button
                      type="button"
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        setRegisterOpen(true);
                      }}
                      className={cn(
                        "w-full cta-section",
                        plan.popular
                          ? ""
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                      )}
                    >
                    <UserPlus className="size-4" />
                    Anotarme
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full cta-inline border-border"
                  >
                    <a
                      href={buildWhatsAppUrl(PLAN_MESSAGES[plan.id])}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Elegir el plan ${plan.name} por WhatsApp`}
                    >
                      Consultar por WhatsApp
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <ShareButton
                    title={`${plan.name} — Click & Pizza`}
                    text={`Te recomiendo el ${plan.name} de Click & Pizza. ${plan.price}${plan.unit}`}
                    url={`${SITE.shareUrl}/#suscripcion`}
                    variant="outline"
                    size="sm"
                    label="Compartir con un amigo"
                    className="w-full rounded-full border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="text-center text-sm text-muted-foreground mt-6 sm:mt-10">
            ¿Dudas sobre qué plan elegir?{" "}
            <a
              href={buildWhatsAppUrl(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline underline-offset-4"
            >
              Escribinos por WhatsApp
            </a>{" "}
            y te ayudamos.
          </p>
        </Reveal>
      </div>

      <RegisterForm
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        defaultPlan={selectedPlan}
      />
    </section>
  );
}
