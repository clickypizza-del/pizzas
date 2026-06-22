import { Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  PIZZAS,
  PIZZA_CATEGORIES,
  type Pizza,
  type PizzaCategoryMeta,
} from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

/** Group pizzas by category, preserving declaration order. */
function pizzasByCategory(catId: PizzaCategoryMeta["id"]): Pizza[] {
  return PIZZAS.filter((p) => p.category === catId);
}

export function MenuSection() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestro menú"
            title="Catálogo curado de 8 variedades"
            description="Ocho pizzas seleccionadas para producción: ingredientes compartidos que simplifican el stock y estabilidad probada en freezer. Todas llegan listas para hornear en 15 minutos."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Tabs defaultValue="clasica" className="w-full">
            {/* Category switcher */}
            <div className="flex justify-center mb-10">
              <TabsList
                aria-label="Filtrar pizzas por categoría"
                className="h-auto bg-muted/60 p-1.5 rounded-full gap-1"
              >
                {PIZZA_CATEGORIES.map((cat) => {
                  const count = pizzasByCategory(cat.id).length;
                  return (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="rounded-full px-5 sm:px-6 py-2 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                    >
                      <span aria-hidden className="text-base mr-1.5">
                        {cat.emoji}
                      </span>
                      {cat.label}
                      <span className="ml-1.5 text-xs opacity-70">({count})</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* One tab panel per category */}
            {PIZZA_CATEGORIES.map((cat) => {
              const items = pizzasByCategory(cat.id);
              return (
                <TabsContent key={cat.id} value={cat.id} className="mt-0">
                  <ul
                    role="list"
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {items.map((pizza, i) => (
                      <li key={pizza.id}>
                        <Reveal as="div" delay={i * 0.06}>
                          <PizzaCard pizza={pizza} category={cat} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              );
            })}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}

function PizzaCard({
  pizza,
  category,
}: {
  pizza: Pizza;
  category: PizzaCategoryMeta;
}) {
  return (
    <article className="group h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      {/* Emoji hero on a subtle category-tinted gradient */}
      <div
        className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${category.accent}22 0%, ${category.accent}08 45%, transparent 100%)`,
        }}
        aria-hidden
      >
        <span className="text-7xl sm:text-8xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          🍕
        </span>
        <Badge
          className="absolute top-3 right-3 border-transparent shadow-lg text-white"
          style={{ backgroundColor: category.accent }}
        >
          <span aria-hidden className="mr-1">
            {category.emoji}
          </span>
          {category.label}
        </Badge>
        {/* Freezer-stable badge */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 cp-glass border border-primary/30 rounded-full px-2.5 py-1 text-[11px] font-semibold text-foreground">
          <Snowflake className="size-3 text-primary" aria-hidden />
          <span className="text-primary">3+ meses</span>
        </div>
        {/* Decorative ring */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${category.accent}40 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5 leading-tight">
          {pizza.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
          {pizza.description}
        </p>
        {/* Freezer stability note */}
        <p className="text-xs text-muted-foreground/90 italic mb-4 flex items-start gap-1.5">
          <Snowflake
            className="size-3.5 text-primary flex-shrink-0 mt-0.5"
            aria-hidden
          />
          <span>{pizza.freezerNote}</span>
        </p>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="w-full rounded-full border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          <a
            href={buildWhatsAppUrl(WA_MESSAGES.pizza(pizza.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por la pizza ${pizza.name} por WhatsApp`}
          >
            Consultar
          </a>
        </Button>
      </div>
    </article>
  );
}
