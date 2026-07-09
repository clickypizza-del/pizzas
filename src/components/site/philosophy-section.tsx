import { Compass, Package, HeartHandshake, Clock, Sparkles, Snowflake, Truck, Leaf, Wallet, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { FEATURES, type Feature } from "@/lib/site-data";

const PILLARS = [
  {
    icon: Compass,
    title: "Curaduría de sabores",
    description:
      "No encontrás estas recetas en supermercados. Ingredientes seleccionados y combinaciones únicas.",
  },
  {
    icon: Package,
    title: "Empaque inteligente",
    description:
      "Diseñado para tu freezer hogareño. Incluye instructivos de cocción para un resultado perfecto.",
  },
  {
    icon: HeartHandshake,
    title: "Relación directa",
    description:
      "Te conocemos, sabemos qué te gusta y te ofrecemos justo lo que necesitás, sin vueltas.",
  },
];

const ICONS: Record<Feature["icon"], LucideIcon> = {
  clock: Clock,
  sparkles: Sparkles,
  snowflake: Snowflake,
  truck: Truck,
  leaf: Leaf,
  wallet: Wallet,
};

export function PhilosophySection() {
  return (
    <section
      id="filosofia"
      aria-labelledby="filosofia-title"
      className="py-12 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-8 sm:mb-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Nuestra filosofía"
              title={
                <>
                  La <span className="text-gradient-brand">diferencia</span> está en cada detalle
                </>
              }
              description={
                <>
                  En Click & Pizza creemos que disfrutar una excelente pizza no debería depender del tiempo que tengas. Por eso elaboramos pizzas artesanales con{" "}
                  <strong className="text-foreground font-semibold">
                    ingredientes cuidadosamente seleccionados
                  </strong>
                  , las congelamos en su punto justo de frescura y las presentamos en un empaque diseñado para conservar intacto su sabor, textura y calidad.
                </>
              }
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md">
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
                <div className="text-3xl font-extrabold text-primary mb-1">
                  100%
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Control de calidad
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
                <div className="text-3xl font-extrabold text-brand-red-bright mb-1">
                  Sin
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Intermediarios
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 bg-gradient-to-r from-primary to-brand-red-bright rounded-3xl blur-2xl opacity-10"
              />
              <div className="relative bg-card rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-xl">
                <ul className="space-y-6">
                  {PILLARS.map((p) => (
                    <li key={p.title} className="flex items-start gap-4">
                      <div className="size-12 rounded-xl bg-background border border-border flex items-center justify-center flex-shrink-0">
                        <p.icon className="size-6 text-primary" aria-hidden />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          {p.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {p.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title="La mejor pizza congelada del mercado"
            description="No somos una pizza congelada común. Usamos técnicas artesanales y los mejores ingredientes para que cada bocado sea una experiencia italiana auténtica."
          />
        </Reveal>

        <ul
          role="list"
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
        >
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <Reveal as="li" key={feature.title} delay={i * 0.08}>
                <article className="group h-full cp-glass border border-border rounded-2xl p-4 sm:p-8 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="size-10 sm:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="size-5 sm:size-7 text-primary" aria-hidden />
                  </div>
                  <h3 className="text-sm sm:text-xl font-bold text-foreground mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
