import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SITE } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/icons";

export function OrderSection() {
  return (
    <section
      id="pedidos"
      aria-labelledby="pedidos-title"
      className="relative py-12 sm:py-24 lg:py-28 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 cp-dotgrid opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Pedidos"
            title={
              <>
                Hacé tu pedido por{" "}
                <span className="text-gradient-brand">WhatsApp</span>
              </>
            }
            description="¿Listo para vivir la experiencia gourmet? Escaneá el código o escribinos para armar tu suscripción o pedido puntual."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col items-center gap-8">
            <figure className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 bg-primary/20 rounded-3xl blur-2xl"
              />
              <Image
                src={SITE.qrUrl}
                alt="Código QR para abrir el chat de WhatsApp de Click & Pizza"
                width={250}
                height={250}
                className="relative size-56 sm:size-64 rounded-2xl border-2 border-primary p-3 bg-white shadow-2xl shadow-primary/30"
                priority
              />
              <figcaption className="sr-only">
                Escaneá este QR con la cámara de tu celular para chatear con
                nosotros
              </figcaption>
            </figure>

            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base sm:text-lg cta-hero bg-brand-green hover:bg-brand-green-hover text-white shadow-brand-green/30"
            >
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-5" />
                Contactar por WhatsApp
              </a>
            </Button>

            <p className="text-sm text-muted-foreground text-center max-w-md">
              Atendemos de{" "}
              <span className="text-foreground font-medium">
                lunes a viernes de 9 a 21 hs
              </span>{" "}
              y los sábados de 10 a 14 hs.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
