import { Snowflake, ArrowRight, Lightbulb, Flame, Layers, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  CATALOG_FAMILIES,
  CATALOG_STATS,
  FREEZER_ADVANTAGES,
  FREEZER_SCIENCE_TIPS,
  FREEZER_SCIENCE_TRICKS,
  FREEZER_SCIENCE_TRICK_NOTE,
  type IngredientFamily,
} from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function FreezerSection() {
  return (
    <section
      id="freezer"
      aria-labelledby="freezer-title"
      className="py-12 sm:py-24 lg:py-28 bg-surface-dark border-y border-border relative overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Producción y conservación"
            title={
              <>
                Un catálogo <span className="text-gradient-brand">optimizado</span> para tu freezer
              </>
            }
            description="No son pizzas al azar. Elegimos 20 variedades en 5 líneas que comparten ingredientes y soportan estar congeladas 3+ meses sin perder calidad. Hasta más tiempo si están bien envasadas al vacío."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ul
            role="list"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {CATALOG_STATS.map((stat) => (
              <li
                key={stat.label}
                className="text-center p-5 sm:p-6 rounded-2xl bg-card/60 border border-border backdrop-blur-sm"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-start mb-16">
          <Reveal delay={0.12}>
            <div className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Por qué estas 20 variedades
              </h3>
              <FeatureRow
                icon={Layers}
                title="Ingredientes compartidos"
                description="Las 20 pizzas se arman con 3 familias de insumos. Menos SKUs, stock más fresco y menos desperdicio — eficiencia que trasladamos a tu precio."
              />
              <FeatureRow
                icon={Snowflake}
                title="Estabilidad en freezer"
                description="Cada variedad fue probada para aguantar 3+ meses con excelente calidad. Quesos semiduros, salame y panceta son los más resilientes al congelado."
              />
              <FeatureRow
                icon={PackageCheck}
                title="Envasado al vacío"
                description="Sellado al vacío individual con instructivo de cocción. Así extendés la vida útil más allá de los 3 meses sin perder textura ni sabor."
              />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="bg-card rounded-2xl border border-primary/20 p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Familias de ingredientes
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Cómo se reparten los insumos entre las 20 variedades
              </p>
              <ul role="list" className="space-y-5">
                {CATALOG_FAMILIES.map((family) => (
                  <li key={family.id}>
                    <FamilyRow family={family} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <SectionHeading
            eyebrow="Por qué congeladas"
            title={
              <>
                Las ventajas de tener pizzas en el{" "}
                <span className="text-gradient-brand">freezer</span>
              </>
            }
            description="Conservar las pizzas en el freezer no es una limitación: es la estrategia que garantiza calidad, reduce pérdidas y hace la diferencia con el cliente."
          />
        </Reveal>

        <ul
          role="list"
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8 sm:mb-12"
        >
          {FREEZER_ADVANTAGES.map((adv, i) => (
            <Reveal as="li" key={adv.id} delay={i * 0.07}>
              <article className="group h-full bg-card/60 rounded-2xl border border-border p-4 sm:p-7 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                  <div className="size-9 sm:size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span aria-hidden>{adv.emoji}</span>
                  </div>
                  <h3 className="text-xs sm:text-lg font-bold text-foreground leading-tight">
                    {adv.title}
                  </h3>
                </div>
                <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed">
                  {adv.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Flame className="size-5 text-primary" aria-hidden />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm mb-1">
                  El truco del choque de calor
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {FREEZER_SCIENCE_TRICK_NOTE}
                </p>
                <ul className="space-y-2">
                  {FREEZER_SCIENCE_TRICKS.map((trick) => (
                    <li key={trick.id} className="flex items-start gap-2">
                      <span className="mt-1 inline-block size-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        <strong className="text-foreground font-semibold">{trick.product}:</strong> {trick.instruction}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-primary/10 border-b border-border">
                <Snowflake className="size-5 text-primary" aria-hidden />
                <h3 className="font-bold text-foreground text-sm">
                  Consejos maestros para productos de harina
                </h3>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-bold text-muted-foreground px-4 sm:px-6 py-3 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="text-left text-xs font-bold text-muted-foreground px-4 sm:px-6 py-3 uppercase tracking-wider">
                      Mejor técnica
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FREEZER_SCIENCE_TIPS.map((tip, i) => (
                    <tr
                      key={tip.id}
                      className={i < FREEZER_SCIENCE_TIPS.length - 1 ? "border-b border-border" : ""}
                    >
                      <td className="px-4 sm:px-6 py-3 text-sm font-semibold text-foreground whitespace-nowrap">
                        {tip.product}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-sm text-muted-foreground">
                        {tip.technique}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="cta-section">
              <a
                href={buildWhatsAppUrl(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Armar mi kit con el catálogo elegido
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Layers;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
        <Icon className="size-5 text-primary" aria-hidden />
      </div>
      <div>
        <h4 className="font-bold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function FamilyRow({ family }: { family: IngredientFamily }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl flex-shrink-0" aria-hidden>
        {family.emoji}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h4 className="font-semibold text-foreground text-sm">
            {family.name}
          </h4>
          <span className="text-xs font-medium text-primary whitespace-nowrap">
            en {family.usedIn}/20
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {family.ingredients.map((ing) => (
            <span
              key={ing}
              className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
