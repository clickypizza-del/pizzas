import Image from "next/image";
import { Snowflake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PANIFICADOS, type Panificado } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

/**
 * Panificados — baked goods beyond pizzas (breads, pastries).
 * Showcases the expanding product line with real photos. Each card
 * supports a "NUEVO" badge and a freezer-stability note.
 */
export function PanificadosSection() {
  return (
    <section
      id="panificados"
      aria-labelledby="panificados-title"
      className="py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Más que pizzas"
            title={
              <>
                Nuestra línea de{" "}
                <span className="text-gradient-brand">panificados</span>
              </>
            }
            description="El mismo cuidado artesanal que ponemos en nuestras pizzas, ahora en panes y masas. Todos se congelan perfecto para que tengas pan fresco cuando quieras."
          />
        </Reveal>

        <ul
          role="list"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PANIFICADOS.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.08}>
              <PanificadoCard item={item} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.15}>
          <p className="text-center text-sm text-muted-foreground mt-10">
            Próximamente más variedades de panificados.{" "}
            <a
              href={buildWhatsAppUrl(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline underline-offset-4 inline-flex items-center gap-1"
            >
              Consultá disponibilidad
              <ArrowRight className="size-3" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PanificadoCard({ item }: { item: Panificado }) {
  return (
    <article className="group h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      {/* Product photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={item.image}
          alt={item.name}
          width={600}
          height={450}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.isNew ? (
          <Badge className="absolute top-3 right-3 border-transparent shadow-lg bg-primary text-primary-foreground">
            NUEVO
          </Badge>
        ) : null}
        {/* Freezer-stable badge */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 cp-glass border border-primary/30 rounded-full px-2.5 py-1 text-[11px] font-semibold text-foreground">
          <Snowflake className="size-3 text-primary" aria-hidden />
          <span className="text-primary">Freezer</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
            {item.name}
          </h3>
          {item.price ? (
            <span className="text-base font-extrabold text-primary whitespace-nowrap">
              {item.price}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
          {item.description}
        </p>
        {/* Stability note */}
        <p className="text-xs text-muted-foreground/90 italic mb-4 flex items-start gap-1.5">
          <Snowflake
            className="size-3.5 text-primary flex-shrink-0 mt-0.5"
            aria-hidden
          />
          <span>{item.note}</span>
        </p>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="w-full rounded-full border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          <a
            href={buildWhatsAppUrl(WA_MESSAGES.pizza(item.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por ${item.name} por WhatsApp`}
          >
            Consultar
          </a>
        </Button>
      </div>
    </article>
  );
}
