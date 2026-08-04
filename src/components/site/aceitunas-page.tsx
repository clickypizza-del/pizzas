"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ShoppingCart,
  MessageCircle,
  Wine,
  GlassWater,
  Beer,
  Droplets,
  Citrus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ACEITUNAS, BEBIDAS, SITE } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { useCartStore } from "@/lib/cart-store";
import { WhatsAppIcon } from "@/components/site/icons";
import { useState } from "react";

const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
  "mas-vendida": { label: "Más vendida", className: "bg-brand-amber text-black" },
  nueva: { label: "Nueva", className: "bg-brand-green text-white" },
  premium: { label: "Premium", className: "bg-purple-600 text-white" },
};

const BEBIDA_CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: typeof Wine; color: string }
> = {
  gaseosa: { label: "Gaseosas", icon: GlassWater, color: "text-red-400" },
  cerveza: { label: "Cervezas", icon: Beer, color: "text-amber-400" },
  agua: { label: "Aguas", icon: Droplets, color: "text-sky-400" },
  jugo: { label: "Jugos", icon: Citrus, color: "text-orange-400" },
};

type Section = "aceitunas" | "bebidas" | "todas";

export function AceitunasPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [activeSection, setActiveSection] = useState<Section>("todas");

  const handleAddAceituna = (aceituna: (typeof ACEITUNAS)[number]) => {
    addItem({
      id: aceituna.id,
      name: `Aceituna ${aceituna.name}`,
      price: parseInt(aceituna.price.replace(/[^0-9]/g, ""), 10),
      image: aceituna.image,
      category: "aceitunas",
    });
  };

  const handleAddBebida = (bebida: (typeof BEBIDAS)[number]) => {
    addItem({
      id: bebida.id,
      name: bebida.name,
      price: parseInt(bebida.price.replace(/[^0-9]/g, ""), 10),
      image: bebida.image,
      category: "bebidas",
    });
  };

  const bebidaCategories = Array.from(
    new Set(BEBIDAS.map((b) => b.category))
  );

  const showAceitunas =
    activeSection === "todas" || activeSection === "aceitunas";
  const showBebidas =
    activeSection === "todas" || activeSection === "bebidas";

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
                Aceitunas y Bebidas{" "}
                <span className="text-gradient-brand">para tu Picada</span>
              </>
            }
            description="Armá la picada perfecta: aceitunas verdes rellenas artesanales y las mejores bebidas para acompañar. Todo congelado, listo para disfrutar."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {(
              [
                { key: "todas", label: "Todo el catálogo" },
                { key: "aceitunas", label: "Aceitunas" },
                { key: "bebidas", label: "Bebidas" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeSection === tab.key
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {showAceitunas && (
          <section className="mb-20">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                  <span className="text-xl">🫒</span>
                </div>
                <div>
                  <h3 className="font-brand text-2xl sm:text-3xl text-foreground">
                    Aceitunas Verdes Rellenas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    14 rellenos artesanales en aceituna verde descarozada
                  </p>
                </div>
              </div>
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
                          onClick={() => handleAddAceituna(aceituna)}
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
                            href={buildWhatsAppUrl(
                              WA_MESSAGES.aceituna(aceituna.name)
                            )}
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
          </section>
        )}

        {showBebidas && (
          <section className="mb-12">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                  <Wine className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-brand text-2xl sm:text-3xl text-foreground">
                    Bebidas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Para acompañar, refrescar y brindar
                  </p>
                </div>
              </div>
            </Reveal>

            {bebidaCategories.map((cat) => {
              const config = BEBIDA_CATEGORY_CONFIG[cat];
              const Icon = config.icon;
              const items = BEBIDAS.filter((b) => b.category === cat);

              return (
                <div key={cat} className="mb-10 last:mb-0">
                  <Reveal>
                    <div className="flex items-center gap-2 mb-4 ml-1">
                      <Icon className={`size-4 ${config.color}`} />
                      <h4 className="font-semibold text-foreground text-base">
                        {config.label}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        ({items.length})
                      </span>
                    </div>
                  </Reveal>

                  <ul
                    role="list"
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  >
                    {items.map((bebida, i) => (
                      <Reveal as="li" key={bebida.id} delay={i * 0.05}>
                        <article className="group h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                          <div className="relative h-36 sm:h-40 overflow-hidden bg-gradient-to-br from-secondary via-secondary/80 to-secondary">
                            <Image
                              src={bebida.image}
                              alt={bebida.name}
                              width={300}
                              height={300}
                              loading="lazy"
                              className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                            />
                            {bebida.badge ? (
                              <Badge
                                className={`absolute top-3 right-3 border-transparent shadow-lg ${BADGE_CONFIG[bebida.badge].className}`}
                              >
                                {BADGE_CONFIG[bebida.badge].label}
                              </Badge>
                            ) : null}
                          </div>

                          <div className="p-4 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-bold text-foreground leading-tight">
                                {bebida.name}
                              </h3>
                              <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2.5 py-0.5 font-medium whitespace-nowrap">
                                {bebida.volume}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                              {bebida.description}
                            </p>
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-extrabold text-primary">
                                {bebida.price}
                              </span>
                              <div className="flex gap-2 ml-auto">
                                <Button
                                  size="sm"
                                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-3"
                                  onClick={() => handleAddBebida(bebida)}
                                >
                                  <ShoppingCart className="size-3.5" />
                                </Button>
                                <Button
                                  asChild
                                  size="sm"
                                  variant="outline"
                                  className="rounded-full border-border px-3"
                                >
                                  <a
                                    href={buildWhatsAppUrl(
                                      WA_MESSAGES.bebida(bebida.name)
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Consultar ${bebida.name} por WhatsApp`}
                                  >
                                    <WhatsAppIcon className="size-3.5" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        )}

        <Reveal delay={0.15}>
          <div className="relative mt-14 p-8 sm:p-10 rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-primary/5 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(193,18,31,0.08),transparent_60%)]" />
            <div className="relative">
              <p className="text-lg font-brand text-foreground mb-2">
                ¿Querés armar una picada completa?
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Elegí aceitunas, bebidas y pizzas. Consultá combos y descuentos
                por WhatsApp.
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
          </div>
        </Reveal>
      </div>
    </div>
  );
}
