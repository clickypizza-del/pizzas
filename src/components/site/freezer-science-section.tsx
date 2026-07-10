import { Snowflake, Flame, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  FREEZER_SCIENCE_REASONS,
  FREEZER_SCIENCE_TIPS,
  FREEZER_SCIENCE_TRICKS,
  FREEZER_SCIENCE_INTRO,
  FREEZER_SCIENCE_TRICK_NOTE,
} from "@/lib/site-data";

export function FreezerScienceSection() {
  return (
    <section
      id="ciencia-freezer"
      aria-labelledby="ciencia-freezer-title"
      className="py-20 sm:py-24 lg:py-28 bg-muted/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Ciencia del freezer"
            title={
              <>
                Por qué congelar es la mejor solución para todo lo que sea{" "}
                <span className="text-gradient-brand">harina</span>
              </>
            }
            description={FREEZER_SCIENCE_INTRO}
          />
        </Reveal>

        <ul role="list" className="grid sm:grid-cols-2 gap-6 mb-14">
          {FREEZER_SCIENCE_REASONS.map((reason, i) => (
            <Reveal as="li" key={reason.id} delay={i * 0.07}>
              <article className="group h-full bg-card rounded-2xl border border-border p-6 sm:p-7 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span aria-hidden>{reason.emoji}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                    {reason.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Consejos maestros */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 bg-primary/10 border-b border-border">
                <Snowflake className="size-5 text-primary" aria-hidden />
                <h3 className="font-bold text-foreground text-sm">
                  Consejos maestros
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-bold text-muted-foreground px-5 py-3 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="text-left text-xs font-bold text-muted-foreground px-5 py-3 uppercase tracking-wider">
                        Mejor técnica
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FREEZER_SCIENCE_TIPS.map((tip, i) => (
                      <tr
                        key={tip.id}
                        className={i < FREEZER_SCIENCE_TIPS.length - 1 ? "border-b border-border" : ""}
                      >
                        <td className="px-5 py-3 text-sm font-semibold text-foreground whitespace-nowrap">
                          {tip.product}
                        </td>
                        <td className="px-5 py-3 text-sm text-muted-foreground">
                          {tip.technique}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Truco de resurrección */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-5 flex-1">
                <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Flame className="size-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">
                    El &quot;Truco de Resurrección&quot;
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {FREEZER_SCIENCE_TRICK_NOTE}
                  </p>
                  <ul className="space-y-2">
                    {FREEZER_SCIENCE_TRICKS.map((trick) => (
                      <li key={trick.id} className="flex items-start gap-2">
                        <span className="mt-1 inline-block size-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          <strong className="text-foreground font-semibold">{trick.product}:</strong> {trick.instruction}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-brand-amber/5 border border-brand-amber/20 rounded-2xl p-5">
                <div className="size-10 rounded-xl bg-brand-amber/15 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="size-5 text-brand-amber" aria-hidden />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-semibold">Masas pre-cocidas:</strong> horneá la masa un 70-80% (sin dorar del todo), congelala, y cuando quieras comerla, solo terminala de hornear con los ingredientes encima. Queda impecable.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
