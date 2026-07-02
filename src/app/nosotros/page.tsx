import type { Metadata } from "next";
import { PhilosophySection } from "@/components/site/philosophy-section";
import { FreezerSection } from "@/components/site/freezer-section";
import { FreezerScienceSection } from "@/components/site/freezer-science-section";
import { FreezerAdvantagesSection } from "@/components/site/freezer-advantages-section";

export const metadata: Metadata = {
  title: "Nosotros — Filosofía y ciencia del freezer",
  description:
    "Conocé la filosofía detrás de Click & Pizza: ingredientes premium, masa artesanal y la ciencia que hace que nuestras pizzas se congelen perfecto.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <PhilosophySection />
      <FreezerSection />
      <FreezerScienceSection />
      <FreezerAdvantagesSection />
    </>
  );
}
