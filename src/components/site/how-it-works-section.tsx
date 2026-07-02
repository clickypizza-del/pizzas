import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { STEPS } from "@/lib/site-data";

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="py-12 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Del freezer a tu mesa en 3 pasos"
            description="Simple, rápido y con la garantía de calidad que solo una marca directa al consumidor puede dar."
          />
        </Reveal>

        <ol
          role="list"
          className="relative grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Decorative connector line between steps (desktop) */}
          <li
            aria-hidden
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full"
          />

          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.12}>
              <div className="relative text-center">
                <div className="size-16 sm:size-24 mx-auto mb-4 sm:mb-6 relative z-10 rounded-full bg-gradient-to-br from-primary to-brand-red-bright flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shadow-xl shadow-primary/30 border-4 border-background">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="text-center text-sm text-muted-foreground mt-8 sm:mt-14">
            <span aria-hidden>📍 </span>
            Entregas programadas en Mendoza. Consultá tu zona por WhatsApp.
            Horarios de entrega: martes a viernes de 18 a 21 hs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
