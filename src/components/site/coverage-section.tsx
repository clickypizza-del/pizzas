import { MapPin, Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ZONES } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function CoverageSection() {
  return (
    <section
      id="zonas"
      aria-labelledby="zonas-title"
      className="py-20 sm:py-24 lg:py-28 bg-[#0b0b0b] border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Zonas de entrega"
              title="Llegamos a tu barrio"
              description="Trabajamos con entregas programadas por zona para garantizar la cadena de frío. Si tu zona no aparece, escribinos: sumamos barrios según la demanda."
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="rounded-full">
                <a
                  href={buildWhatsAppUrl(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar mi zona
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border"
              >
                <a href="#pedidos">Ver horarios</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ul
              role="list"
              className="cp-scroll max-h-[26rem] overflow-y-auto pr-2 space-y-3"
            >
              {ZONES.map((zone) => (
                <li
                  key={zone.name}
                  className="flex items-center justify-between gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={
                        zone.available
                          ? "size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                          : "size-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0"
                      }
                    >
                      <MapPin
                        className={
                          zone.available
                            ? "size-5 text-primary"
                            : "size-5 text-muted-foreground"
                        }
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {zone.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Clock className="size-3" aria-hidden />
                        {zone.schedule}
                      </p>
                    </div>
                  </div>
                  {zone.available ? (
                    <Badge className="bg-primary/15 text-primary border border-primary/30">
                      <Check className="size-3" aria-hidden />
                      Disponible
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-muted-foreground border-border"
                    >
                      <X className="size-3" aria-hidden />
                      Próximamente
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
