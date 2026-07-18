"use client";

import { useState } from "react";
import { Snowflake, ArrowRight, PackageCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { KitBuilder } from "@/components/site/kit-builder";
import {
  CATALOG_FAMILIES,
  CATALOG_STATS,
  FREEZER_ADVANTAGES,
  type IngredientFamily,
} from "@/lib/site-data";

export function FreezerSection() {
  const [kitOpen, setKitOpen] = useState(false);
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
            description="No son pizzas al azar. Elegimos 12 variedades en 5 líneas que comparten ingredientes y soportan estar congeladas 3+ meses sin perder calidad."
          />
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.08}>
          <ul role="list" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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

        {/* Ventajas en grid */}
        <Reveal delay={0.12}>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6">
            ¿Por qué congeladas?
          </h3>
          <ul role="list" className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {FREEZER_ADVANTAGES.map((adv, i) => (
              <li key={adv.id}>
                <article className="group h-full bg-card/60 rounded-2xl border border-border p-4 sm:p-6 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="size-9 sm:size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-lg sm:text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span aria-hidden>{adv.emoji}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                      {adv.title}
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    {adv.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Lógica de ingredientes */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start mb-12">
          <Reveal delay={0.15}>
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                ¿Cómo elegimos las variedades?
              </h3>
              <FeatureRow
                icon={Layers}
                title="Ingredientes compartidos"
                description="Las pizzas se arman con pocas familias de insumos. Menos stock, más fresco, menos desperdicio."
              />
              <FeatureRow
                icon={Snowflake}
                title="Estabilidad probada"
                description="Cada variedad fue testeada para aguantar 3+ meses en freezer sin perder calidad."
              />
              <FeatureRow
                icon={PackageCheck}
                title="Envasado al vacío"
                description="Sellado individual con instructivo. Vida útil extendida sin perder textura ni sabor."
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-card rounded-2xl border border-primary/20 p-5 sm:p-6 shadow-xl">
              <h3 className="text-base font-bold text-foreground mb-1">
                Familias de ingredientes
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                Cómo se reparten los insumos entre las 12 variedades
              </p>
              <ul role="list" className="space-y-4">
                {CATALOG_FAMILIES.map((family) => (
                  <li key={family.id}>
                    <FamilyRow family={family} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="text-center">
            <Button
              size="lg"
              className="cta-section"
              onClick={() => setKitOpen(true)}
            >
              Armar mi kit con el catálogo elegido
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </div>

      <KitBuilder open={kitOpen} onClose={() => setKitOpen(false)} />
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
    <div className="flex items-start gap-3">
      <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
        <Icon className="size-5 text-primary" aria-hidden />
      </div>
      <div>
        <h4 className="font-bold text-foreground text-sm mb-0.5">{title}</h4>
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
      <span className="text-xl flex-shrink-0" aria-hidden>
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
