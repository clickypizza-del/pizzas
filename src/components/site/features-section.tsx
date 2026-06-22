import {
  Clock,
  Sparkles,
  Snowflake,
  Truck,
  Leaf,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { FEATURES, type Feature } from "@/lib/site-data";

const ICONS: Record<Feature["icon"], LucideIcon> = {
  clock: Clock,
  sparkles: Sparkles,
  snowflake: Snowflake,
  truck: Truck,
  leaf: Leaf,
  wallet: Wallet,
};

export function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-title"
      className="py-20 sm:py-24 lg:py-28 bg-[#0b0b0b] border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title="La mejor pizza congelada del mercado"
            description="No somos una pizza congelada común. Usamos técnicas artesanales y los mejores ingredientes para que cada bocado sea una experiencia italiana auténtica."
          />
        </Reveal>

        <ul
          role="list"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <Reveal as="li" key={feature.title} delay={i * 0.08}>
                <article className="group h-full cp-glass border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="size-7 text-primary" aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
