import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PIZZAS } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

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
            title="Sabores irresistibles"
            description="Todas nuestras pizzas están hechas a mano y congeladas al instante para máxima frescura. Conocé nuestras variedades."
          />
        </Reveal>

        <ul
          role="list"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {PIZZAS.map((pizza, i) => (
            <Reveal as="li" key={pizza.id} delay={i * 0.08}>
              <article
                className={cn(
                  "group h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden",
                  "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300",
                )}
              >
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src={pizza.image}
                    alt={`Pizza ${pizza.name}: ${pizza.ingredients.join(", ")}`}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge
                    className={cn(
                      "absolute top-3 right-3 shadow-lg",
                      pizza.badgeTone === "bright"
                        ? "bg-[#e0332a] text-white border-transparent"
                        : "bg-primary text-primary-foreground border-transparent",
                    )}
                  >
                    {pizza.badge}
                  </Badge>
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1.5">
                    {pizza.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {pizza.description}
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
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
