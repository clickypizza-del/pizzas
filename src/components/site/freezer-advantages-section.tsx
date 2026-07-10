import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { FREEZER_ADVANTAGES } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function FreezerAdvantagesSection() {
  return (
    <section
      id="ventajas-freezer"
      aria-labelledby="ventajas-title"
      className="py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué congeladas"
            title={
              <>
                Las ventajas de tener pizzas en el{" "}
                <span className="text-gradient-brand">freezer</span>
              </>
            }
            description="Conservar las pizzas en el freezer no es una limitación: es la estrategia que garantiza calidad y hace la diferencia con el cliente."
          />
        </Reveal>

        <ul role="list" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FREEZER_ADVANTAGES.map((adv, i) => (
            <Reveal as="li" key={adv.id} delay={i * 0.07}>
              <article className="group h-full bg-card rounded-2xl border border-border p-6 sm:p-7 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span aria-hidden>{adv.emoji}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                    {adv.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {adv.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="cta-section">
              <a
                href={buildWhatsAppUrl(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quiero aprovechar estas ventajas
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
