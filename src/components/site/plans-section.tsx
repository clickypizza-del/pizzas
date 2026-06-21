import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PLANS } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const PLAN_MESSAGES: Record<string, string> = {
  "kit-semanal": WA_MESSAGES.planKitSemanal,
  "kit-premium": WA_MESSAGES.planKitPremium,
  "evento-especial": WA_MESSAGES.planEvento,
};

export function PlansSection() {
  return (
    <section
      id="suscripcion"
      aria-labelledby="suscripcion-title"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#0b0b0b] border-y border-border overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {PLANS.map((plan, i) => (
            <Reveal as="li" key={plan.id} delay={i * 0.1}>
              <article
                className={cn(
                  "relative h-full flex flex-col p-6 sm:p-8 rounded-2xl border text-center transition-all",
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
                <p className="text-sm text-muted-foreground mb-5 min-h-[3.5rem]">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">
                    {plan.price}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-1">
                    {plan.unit}
                  </span>
                </div>

                <ul
                  role="list"
                  className="text-left space-y-2.5 mb-7 flex-1"
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

                <Button
                  asChild
                  className={cn(
                    "w-full rounded-full",
                    plan.popular
                      ? ""
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  <a
                    href={buildWhatsAppUrl(PLAN_MESSAGES[plan.id])}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Elegir el plan ${plan.name} por WhatsApp`}
                  >
                    Elegir este plan
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="text-center text-sm text-muted-foreground mt-10">
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
    </section>
  );
}
