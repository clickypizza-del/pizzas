import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { FAQS } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-8 sm:py-14 lg:py-18 bg-surface-dark border-y border-border"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Resolvé tus dudas"
            description="Lo que más nos consultan. Si tu pregunta no está acá, escribinos por WhatsApp."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:no-underline hover:text-primary py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4">
              ¿No encontraste tu respuesta?
            </p>
            <Button asChild className="cta-section">
              <a
                href={buildWhatsAppUrl(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribinos por WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
