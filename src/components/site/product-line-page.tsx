import Image from "next/image";
import Link from "next/link";
import { Snowflake, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import type { Panificado } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/icons";

export type ProductLineTip = {
  id: string;
  product: string;
  technique: string;
};

type ProductLinePageProps = {
  /** Title shown above the grid. */
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  items: Panificado[];
  backHref?: string;
  backLabel?: string;
  /** Optional freezing-tips table rendered under the grid. */
  tips?: {
    title: string;
    rows: ProductLineTip[];
  };
  /** Copy shown above the final CTA. */
  footerText: string;
  ctaLabel: string;
  whatsappMessage: string;
  /** Prefix used in the product inquiry WhatsApp message. */
  inquiryLabel: string;
};

/**
 * Shared layout for secondary product lines (panificados, postres, etc.).
 * Single source of truth so every line stays visually consistent.
 */
export function ProductLinePage({
  eyebrow,
  title,
  description,
  items,
  backHref = "/",
  backLabel = "Volver al inicio",
  tips,
  footerText,
  ctaLabel,
  whatsappMessage,
  inquiryLabel,
}: ProductLinePageProps) {
  return (
    <div className="py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>

        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </Reveal>

        <ul role="list" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.08}>
              <article className="group h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image
                    src={item.image}
                    alt={`${item.name} — ${inquiryLabel} artesanal congelado`}
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
                      <span className="text-base font-extrabold text-price whitespace-nowrap">
                        {item.price}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                    {item.description}
                  </p>
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
                      href={buildWhatsAppUrl(
                        `¡Hola Click & Pizza! Quiero consultar por ${item.name}. ¿Está disponible esta semana?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Consultar por ${item.name} por WhatsApp`}
                    >
                      Consultar
                    </a>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {tips ? (
          <Reveal delay={0.15}>
            <div className="mt-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Snowflake className="size-5 text-primary" aria-hidden />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {tips.title}
                </h3>
              </div>
              <div className="overflow-x-auto cp-scroll">
                <table className="w-full border-collapse bg-card rounded-2xl overflow-hidden border border-border">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="text-left text-sm font-bold text-foreground px-6 py-4">
                        Producto
                      </th>
                      <th className="text-left text-sm font-bold text-foreground px-6 py-4">
                        Mejor técnica
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tips.rows.map((tip, i) => (
                      <tr
                        key={tip.id}
                        className={
                          i < tips.rows.length - 1 ? "border-b border-border" : ""
                        }
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">
                          {tip.product}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {tip.technique}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <p className="text-sm text-muted-foreground mb-6">{footerText}</p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
            >
              <a href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                {ctaLabel}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
