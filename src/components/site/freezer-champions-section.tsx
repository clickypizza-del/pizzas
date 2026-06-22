import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { FREEZER_CHAMPIONS, type FreezerChampion } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

/**
 * Highlights the 6 pizza varieties that best survive long-term freezing,
 * with their stability notes. Reassures subscription customers that
 * stockpiling a weekly kit is safe.
 */
export function FreezerChampionsSection() {
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
            eyebrow="Congelación premium"
            title={
              <>
                Las que más{" "}
                <span className="text-gradient-brand">aguantan en freezer</span>
              </>
            }
            description="No todas las pizzas congelan igual. Estas 6 variedades son nuestras campeonas: mantienen textura, sabor y calidad por más tiempo, ideales para acumular en tu suscripción semanal."
          />
        </Reveal>

        <ul role="list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FREEZER_CHAMPIONS.map((champ, i) => (
            <Reveal as="li" key={champ.id} delay={i * 0.08}>
              <ChampionCard champ={champ} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="rounded-full">
              <a
                href={buildWhatsAppUrl(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Armar mi kit con las campeonas
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChampionCard({ champ }: { champ: FreezerChampion }) {
  return (
    <article className="group h-full flex gap-4 bg-card rounded-2xl border border-primary/25 p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all">
      {/* Medal */}
      <div className="flex-shrink-0">
        <div className="relative size-14 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#b45309] flex items-center justify-center shadow-lg shadow-[#f59e0b]/20">
          <Award
            className="size-7 text-white"
            aria-hidden
          />
          <span
            className="absolute -bottom-1 -right-1 size-6 rounded-full bg-background border-2 border-[#f59e0b] flex items-center justify-center text-xs font-extrabold text-[#f59e0b]"
            aria-hidden
          >
            {champ.rank}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl" aria-hidden>
            🥇
          </span>
          <h3 className="font-bold text-foreground text-base sm:text-lg leading-tight">
            {champ.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {champ.note}
        </p>
      </div>
    </article>
  );
}
