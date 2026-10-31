import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { POSTRES } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/icons";

/**
 * Home teaser for the "MMM Postre!" line. Shows the hero dessert and drives
 * traffic to /postres without turning the home into a catalog.
 */
export function PostresTeaser() {
  const postre = POSTRES[0];
  if (!postre) return null;

  return (
    <section id="postres" aria-labelledby="postres-title" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <article className="group grid lg:grid-cols-2 gap-0 bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-500">
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-secondary">
              <Image
                src={postre.image}
                alt={`${postre.name} — postre artesanal congelado`}
                width={900}
                height={700}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card/60" />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 cp-glass border border-primary/30 rounded-full px-3 py-1 text-[11px] font-semibold">
                <Snowflake className="size-3 text-primary" aria-hidden />
                <span className="text-primary">Listo para servir</span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">
                MMM Postre!
              </span>
              <h2
                id="postres-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight mb-3"
              >
                ¿Y el postre?{" "}
                <span className="text-gradient-brand">{postre.name}</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 max-w-lg">
                {postre.description}
              </p>

              <div className="flex items-baseline gap-3 mb-6">
                {postre.price ? (
                  <span className="text-2xl sm:text-3xl font-extrabold text-price leading-none">
                    {postre.price}
                  </span>
                ) : null}
                <span className="text-xs text-muted-foreground">{postre.note}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="cta-section px-6">
                  <Link href="/postres">
                    Ver MMM Postre!
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="cta-inline px-6 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <a
                    href={buildWhatsAppUrl(WA_MESSAGES.postres)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-4" />
                    Consultar
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
