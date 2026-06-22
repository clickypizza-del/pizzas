import { Snowflake, Layers, PackageCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  CATALOG_FAMILIES,
  CATALOG_STATS,
  type IngredientFamily,
} from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

/**
 * Communicates the production rationale behind the 8-pizza catalog:
 * shared ingredients (simplified purchasing) + proven freezer stability.
 * Replaces the old "freezer champions" list — which is now redundant
 * since every pizza in the curated catalog is freezer-optimized.
 */
export function OptimizedCatalogSection() {
  return (
    <section
      id="freezer"
      aria-labelledby="freezer-title"
      className="py-20 sm:py-24 lg:py-28 bg-[#0b0b0b] border-y border-border relative overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Producción y conservación"
            title={
              <>
                Un catálogo{" "}
                <span className="text-gradient-brand">optimizado</span> para tu
                freezer
              </>
            }
            description="No son pizzas al azar. Elegimos 8 variedades que comparten ingredientes —simplifican compras y stock— y que soportan estar congeladas largos períodos sin perder calidad. Hasta 3 meses con excelente resultado, y más tiempo si están bien envasadas al vacío."
          />
        </Reveal>

        {/* Headline stats */}
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Why this catalog works */}
          <Reveal delay={0.12}>
            <div className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Por qué estas 8 variedades
              </h3>
              <FeatureRow
                icon={Layers}
                title="Ingredientes compartidos"
                description="Las 8 pizzas se arman con 3 familias de insumos. Menos SKUs, stock más fresco y menos desperdicio — eficiencia que trasladamos a tu precio."
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

          {/* Ingredient families */}
          <Reveal delay={0.18}>
            <div className="bg-card rounded-2xl border border-primary/20 p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Familias de ingredientes
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Cómo se reparten los insumos entre las 8 variedades
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

        <Reveal delay={0.22}>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="rounded-full">
              <a
                href={buildWhatsAppUrl(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Armar mi kit con el catálogo curado
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
            en {family.usedIn}/8
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
