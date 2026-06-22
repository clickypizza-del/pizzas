import { Compass, Package, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const PILLARS = [
  {
    icon: Compass,
    title: "Curaduría de sabores",
    description:
      "No encontrarás estas recetas en supermercados. Ingredientes seleccionados y combinaciones únicas.",
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

export function PhilosophySection() {
  return (
    <section
      id="filosofia"
      aria-labelledby="filosofia-title"
      className="py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Nuestra filosofía"
              title={
                <>
                  La <span className="text-gradient-brand">experiencia gourmet</span>{" "}
                  que merecés
                </>
              }
              description={
                <>
                  No vendemos pizzas congeladas comunes. Somos una{" "}
                  <strong className="text-foreground font-semibold">
                    marca de conveniencia premium
                  </strong>
                  : productos curados, empaque diseñado para tu freezer y la
                  garantía de una cena perfecta en 15 minutos.
                </>
              }
            />
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              <strong className="text-foreground font-semibold">“Click”</strong>{" "}
              es la facilidad de pedir desde casa.{" "}
              <strong className="text-foreground font-semibold">“Pizza”</strong>{" "}
              es nuestra pasión artesanal. Directo a tu puerta, sin
              intermediarios.
            </p>
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
                <div className="text-3xl font-extrabold text-[#e0332a] mb-1">
                  Sin
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Intermediarios
                </div>
              </div>
            </div>
          </Reveal>

          {/* Pillars card */}
          <Reveal delay={0.12}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 bg-gradient-to-r from-primary to-[#e0332a] rounded-3xl blur-2xl opacity-10"
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
      </div>
    </section>
  );
}
