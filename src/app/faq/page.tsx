import type { Metadata } from "next";
import { FaqSection } from "@/components/site/faq-section";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las preguntas más comunes: cómo se cocina, cuánto dura congelada, cómo se entrega y más.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return <FaqSection />;
}
