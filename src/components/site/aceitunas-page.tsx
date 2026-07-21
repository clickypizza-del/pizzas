"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ShoppingCart, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ACEITUNAS, SITE } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { useCartStore } from "@/lib/cart-store";
import { WhatsAppIcon } from "@/components/site/icons";

const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
  "mas-vendida": { label: "Más vendida", className: "bg-brand-amber text-black" },
  nueva: { label: "Nueva", className: "bg-brand-green text-white" },
  premium: { label: "Premium", className: "bg-purple-600 text-white" },
};

export function AceitunasPage() {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (aceituna: (typeof ACEITUNAS)[number]) => {
    addItem({
      id: aceituna.id,
      name: `Aceituna ${aceituna.name}`,
      price: parseInt(aceituna.price.replace(/[^0-9]/g, ""), 10),
      image: aceituna.image,
      category: "aceitunas",
    });
  };

  return (
    <div className="py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio
        </Link>

        <Reveal>
          <SectionHeading
            eyebrow="Picadas gourmet"
            title={
              <>
                Aceitunas Verdes{" "}
                <span className="text-gradient-brand">Rellenas</span>
              </>
            }
            description="14 rellenos artesanales en aceituna verde descarozada. Cada una es una combinación pensada para acompañar, contrastar y sorprender. Ideales para picadas, fiestas y meriendas con estilo."
          />
        </Reveal>

        <ul
          role="list"
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {ACEITUNAS.map((aceituna, i) => (
            <Reveal as="li" key={aceituna.id} delay={i * 0.04}>
              <article className="group h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <Image
                    src={aceituna.image}
                    alt={`Aceituna rellena de ${aceituna.name}`}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {aceituna.badge ? (
                    <Badge
                      className={`absolute top-3 right-3 border-transparent shadow-lg ${BADGE_CONFIG[aceituna.badge].className}`}
                    >
                      {BADGE_CONFIG[aceituna.badge].label}
                    </Badge>
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {aceituna.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-lg font-extrabold text-primary">
                      {aceituna.price}
                    </span>
                    {aceituna.weight ? (
                      <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2.5 py-0.5 font-medium">
                        {aceituna.weight}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {aceituna.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleAdd(aceituna)}
                    >
                      <ShoppingCart className="size-3.5" />
                      Agregar
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-full border-border"
                    >
                      <a
                        href={buildWhatsAppUrl(WA_MESSAGES.aceituna(aceituna.name))}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Consultar aceituna ${aceituna.name} por WhatsApp`}
                      >
                        <WhatsAppIcon className="size-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.15}>
          <div className="mt-14 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              ¿Querés armar una picada completa? Consultá combos y descuentos por WhatsApp.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
            >
              <a
                href={buildWhatsAppUrl(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4" />
                Armar mi picada
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
