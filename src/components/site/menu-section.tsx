"use client";

import { useState } from "react";
import Image from "next/image";
import { Snowflake, ArrowRight, Package, Clock, Users, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ShareButton } from "@/components/site/share-button";
import {
  PIZZAS,
  PIZZA_CATEGORIES,
  PIZZA_PRICES,
  SITE,
  MINI_PIZZETA_COMBOS,
  type MiniPizzetaCombo,
  type MiniPizzetaComboLabel,
  type Pizza,
  type PizzaCategoryMeta,
} from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { useCartStore } from "@/lib/cart-store";

function pizzasByCategory(catId: PizzaCategoryMeta["id"]): Pizza[] {
  return PIZZAS.filter((p) => p.category === catId);
}

const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
  "mas-vendida": { label: "Más vendida", className: "bg-brand-amber text-black" },
  "nueva": { label: "Nueva", className: "bg-brand-green text-white" },
  "premium": { label: "Premium", className: "bg-purple-600 text-white" },
};

const COMBO_LABEL_CONFIG: Record<MiniPizzetaComboLabel, { label: string; className: string }> = {
  "mas-vendida": { label: "Más vendida", className: "bg-brand-amber text-black" },
  "recomendada": { label: "Recomendada", className: "bg-brand-green text-white" },
  "familiar": { label: "Familiar", className: "bg-blue-600 text-white" },
  "premium": { label: "Premium", className: "bg-purple-600 text-white" },
};

export function MenuSection() {
  const [selected, setSelected] = useState<Pizza | null>(null);
  const [selectedCat, setSelectedCat] = useState<PizzaCategoryMeta | null>(null);
  const [activeCat, setActiveCat] = useState<PizzaCategoryMeta["id"] | "all">("all");

  const filteredPizzas = activeCat === "all"
    ? PIZZAS
    : PIZZAS.filter((p) => p.category === activeCat);

  const miniPizzetaPizza = PIZZAS.find((p) => p.category === "mini-pizzeta");
  const showMiniPizzetaCard = activeCat === "all" || activeCat === "mini-pizzeta";
  const showOtherPizzas = filteredPizzas.filter((p) => p.category !== "mini-pizzeta");
  const showCombos = activeCat === "mini-pizzeta";

  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="py-12 sm:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestro catálogo"
            title="Catálogo elegido de variedades gourmet"
            description="Veinte pizzas seleccionadas en cinco líneas: Clásica & Tradicional, Gourmet & Selección de Quesos, Premium & Especialidades de Autor, Mini Pizzetas y Pizza Individual. Ingredientes compartidos que simplifican el stock y estabilidad probada en freezer. Todas llegan listas para hornear."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <nav aria-label="Filtrar por línea">
            <ul
              role="list"
              className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8"
            >
              <li>
                <button
                  type="button"
                  onClick={() => setActiveCat("all")}
                  className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCat === "all"
                      ? "bg-foreground text-background shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  Todas ({PIZZAS.length})
                </button>
              </li>
              {PIZZA_CATEGORIES.map((cat) => {
                const count = pizzasByCategory(cat.id).length;
                const isActive = activeCat === cat.id;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => setActiveCat(cat.id)}
                      className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? "text-white shadow-md"
                          : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                      style={isActive ? { backgroundColor: cat.accent } : undefined}
                    >
                      <span aria-hidden className="mr-1">{cat.emoji}</span>
                      <span className="hidden sm:inline">{cat.label}</span>
                      <span className="sm:hidden">{cat.shortLabel ?? cat.label.split("&")[0].trim()}</span>
                      <span className="ml-1 opacity-70">({count})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ul
            role="list"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
          >
            {showOtherPizzas.map((pizza, i) => {
              const cat = PIZZA_CATEGORIES.find((c) => c.id === pizza.category)!;
              return (
                <li key={pizza.id}>
                  <Reveal as="div" delay={i * 0.04}>
                    <PizzaCard
                      pizza={pizza}
                      category={cat}
                      onSelect={() => {
                        setSelected(pizza);
                        setSelectedCat(cat);
                      }}
                    />
                  </Reveal>
                </li>
              );
            })}
            {showOtherPizzas.length > 0 && Array.from({ length: (3 - (showOtherPizzas.length % 3)) % 3 }).map((_, i) => (
              <li key={`banner-${i}`}>
                <Reveal as="div" delay={(showOtherPizzas.length + i) * 0.04}>
                  <ComboBanner />
                </Reveal>
              </li>
            ))}
            {showMiniPizzetaCard && miniPizzetaPizza && (
              <li key="mini-pizzetas" className="col-span-full">
                <Reveal delay={0.05}>
                  <MiniPizzetaCard pizza={miniPizzetaPizza} showCombos={showCombos} />
                </Reveal>
              </li>
            )}
          </ul>
        </Reveal>
      </div>

      <PizzaDialog
        pizza={selected}
        category={selectedCat}
        onClose={() => {
          setSelected(null);
          setSelectedCat(null);
        }}
      />
    </section>
  );
}

/* ─── Mini Pizzetas — single card with inline combo selector ───────── */

function MiniPizzetaCard({ pizza, showCombos }: { pizza: Pizza; showCombos: boolean }) {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedCombo, setSelectedCombo] = useState<MiniPizzetaCombo>(MINI_PIZZETA_COMBOS[0]);
  const [added, setAdded] = useState(false);

  const cat = PIZZA_CATEGORIES.find((c) => c.id === pizza.category)!;

  const handleAdd = () => {
    addItem({
      id: `${pizza.id}-${selectedCombo.id}`,
      name: `Mini Pizzetas — ${selectedCombo.nombre}`,
      price: selectedCombo.precio,
      image: pizza.image,
      category: pizza.category,
      flavors: selectedCombo.sabores.map((s) => `${s.qty} ${s.name}`),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappMsg = `¡Hola Click & Pizza! Quiero las Mini Pizzetas — ${selectedCombo.nombre} ($${selectedCombo.precio.toLocaleString("es-AR")}). ${selectedCombo.sabores.map((s) => `${s.qty} ${s.name}`).join(", ")}.`;

  return (
    <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-80 lg:w-96 flex-shrink-0 overflow-hidden bg-secondary">
          <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full">
            <Image
              src={pizza.image}
              alt={`Pizza ${pizza.name}`}
              width={600}
              height={450}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 cp-glass border border-primary/30 rounded-full px-2.5 py-1 text-[11px] font-semibold text-foreground">
              <Snowflake className="size-3 text-primary" aria-hidden />
              <span className="text-primary">3+ meses</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 flex flex-col min-h-0">
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <Badge
              className="border-transparent shadow-lg text-white text-[9px] sm:text-[10px] px-1.5 py-0.5 leading-tight"
              style={{ backgroundColor: cat.accent }}
            >
              <span aria-hidden className="mr-0.5">{cat.emoji}</span>
              {cat.label}
            </Badge>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-1">
            {pizza.name}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {pizza.description}
          </p>

          <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
            {pizza.cookTime ? (
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden />
                {pizza.cookTime}
              </span>
            ) : null}
            {pizza.portions ? (
              <span className="inline-flex items-center gap-1">
                <Users className="size-3" aria-hidden />
                {pizza.portions}
              </span>
            ) : null}
          </div>

          {showCombos && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm" aria-hidden>🫓</span>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Elegí tu combinación
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {MINI_PIZZETA_COMBOS.map((combo) => {
                  const isSelected = selectedCombo.id === combo.id;
                  const labelConf = combo.etiqueta ? COMBO_LABEL_CONFIG[combo.etiqueta] : null;
                  return (
                    <button
                      key={combo.id}
                      type="button"
                      onClick={() => setSelectedCombo(combo)}
                      className={`text-left rounded-xl p-3 border transition-all duration-200 ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-md shadow-primary/10"
                          : "bg-secondary/60 border-border hover:border-primary/40 hover:bg-secondary"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate">
                          {combo.nombre}
                        </h4>
                        {labelConf ? (
                          <Badge className={`border-transparent shadow-lg text-[8px] sm:text-[9px] font-bold px-1 py-0.5 flex-shrink-0 ${labelConf.className}`}>
                            {labelConf.label}
                          </Badge>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-2">
                        {combo.sabores.map((s) => (
                          <span key={s.name} className="text-[10px] sm:text-xs text-muted-foreground">
                            <span className="font-bold text-foreground">{s.qty}</span> {s.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base font-extrabold text-price">
                          ${combo.precio.toLocaleString("es-AR")}
                        </span>
                        {isSelected ? (
                          <span className="size-4 rounded-full bg-primary flex items-center justify-center">
                            <Check className="size-2.5 text-primary-foreground" />
                          </span>
                        ) : (
                          <span className="size-4 rounded-full border border-border" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-border mt-auto">
            <div>
              <span className="text-xs text-muted-foreground">Precio:</span>
              <span className="ml-2 text-xl sm:text-2xl font-extrabold text-price">
                ${selectedCombo.precio.toLocaleString("es-AR")}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={handleAdd}
                className={`text-xs sm:text-sm transition-all duration-300 ${
                  added
                    ? "bg-brand-green hover:bg-brand-green text-white"
                    : "cta-section"
                }`}
              >
                {added ? (
                  <>
                    <Check className="size-3.5" />
                    Agregado
                  </>
                ) : (
                  <>
                    <ShoppingCart className="size-3.5" />
                    Agregar
                  </>
                )}
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="cta-inline border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary text-xs sm:text-sm"
              >
                <a
                  href={buildWhatsAppUrl(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Consultar Mini Pizzetas ${selectedCombo.nombre} por WhatsApp`}
                >
                  <MessageCircle className="size-3.5 sm:hidden" />
                  <span className="hidden sm:inline">Consultar</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Standard pizza card ──────────────────────────────────────────── */

function PizzaCard({
  pizza,
  category,
  onSelect,
}: {
  pizza: Pizza;
  category: PizzaCategoryMeta;
  onSelect: () => void;
}) {
  const badgeConf = pizza.badge ? BADGE_CONFIG[pizza.badge] : null;
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const priceNum = parseInt((pizza.price ?? PIZZA_PRICES[pizza.category]).replace(/[^0-9]/g, ""), 10);

  const handleAdd = () => {
    addItem({
      id: pizza.id,
      name: pizza.name,
      price: priceNum,
      image: pizza.image,
      category: pizza.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      <button
        type="button"
        onClick={onSelect}
        className="relative aspect-[4/3] overflow-hidden bg-secondary cursor-pointer text-left w-full flex-shrink-0"
        aria-label={`Ver detalle de ${pizza.name}`}
      >
        <Image
          src={pizza.image}
          alt={`Pizza ${pizza.name}`}
          width={600}
          height={450}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 cp-glass border border-primary/30 rounded-full px-2.5 py-1 text-[11px] font-semibold text-foreground">
          <Snowflake className="size-3 text-primary" aria-hidden />
          <span className="text-primary">3+ meses</span>
        </div>
      </button>

      <div className="p-3 sm:p-5 flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <Badge
            className="border-transparent shadow-lg text-white text-[9px] sm:text-[10px] px-1.5 py-0.5 leading-tight"
            style={{ backgroundColor: category.accent }}
          >
            <span aria-hidden className="mr-0.5">{category.emoji}</span>
            {category.label}
          </Badge>
          {badgeConf ? (
            <Badge className={`border-transparent shadow-lg text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 leading-tight ${badgeConf.className}`}>
              {badgeConf.label}
            </Badge>
          ) : null}
        </div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">
            {pizza.name.split(/(\([^)]+\))/g).map((part, i) =>
              part.startsWith("(") ? (
                <span key={i} className="text-[10px] sm:text-xs font-semibold opacity-70">{part}</span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h3>
          <span className="text-sm sm:text-base font-extrabold text-price whitespace-nowrap">
            {pizza.price ?? PIZZA_PRICES[pizza.category]}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-1.5 sm:mb-3 line-clamp-2">
          {pizza.description}
        </p>
        {(pizza.cookTime || pizza.portions) ? (
          <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3 text-[10px] sm:text-xs text-muted-foreground">
            {pizza.cookTime ? (
              <span className="inline-flex items-center gap-0.5">
                <Clock className="size-2.5 sm:size-3" aria-hidden />
                {pizza.cookTime}
              </span>
            ) : null}
            {pizza.portions ? (
              <span className="inline-flex items-center gap-0.5">
                <Users className="size-2.5 sm:size-3" aria-hidden />
                {pizza.portions}
              </span>
            ) : null}
          </div>
        ) : null}
        <div className="flex gap-2 mt-auto">
          <Button
            type="button"
            size="sm"
            onClick={handleAdd}
            className={`flex-1 text-xs sm:text-sm transition-all duration-300 ${
              added
                ? "bg-brand-green hover:bg-brand-green text-white"
                : "cta-section"
            }`}
          >
            {added ? (
              <>
                <Check className="size-3.5" />
                Agregado
              </>
            ) : (
              <>
                <ShoppingCart className="size-3.5" />
                Agregar
              </>
            )}
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="cta-inline border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary text-xs sm:text-sm"
          >
            <a
              href={buildWhatsAppUrl(WA_MESSAGES.pizza(pizza.name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar por la pizza ${pizza.name} por WhatsApp`}
            >
              <MessageCircle className="size-3.5 sm:hidden" />
              <span className="hidden sm:inline">Consultar</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

/* ─── Combo banner (filler card) ───────────────────────────────────── */

function ComboBanner() {
  return (
    <article className="group flex flex-col bg-gradient-to-br from-primary/10 via-card to-card rounded-2xl border border-primary/20 overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-primary/5 flex items-center justify-center">
        <div className="absolute inset-0 cp-dotgrid opacity-10" />
        <div className="relative z-10 flex flex-col items-center gap-3 p-6 text-center">
          <div className="size-16 rounded-2xl bg-primary/15 flex items-center justify-center">
            <Package className="size-8 text-primary" aria-hidden />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">
            Armá tu <span className="text-gradient-brand">combo</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Combiná pizzas y ahorrá. Consultá por packs personalizados.
          </p>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-bold text-foreground">Desde $25.000</span>
          <span className="text-xs text-muted-foreground line-through">$30.000</span>
          <span className="text-[10px] font-bold text-white bg-primary px-2 py-0.5 rounded-full">-17%</span>
        </div>
        <Button
          asChild
          size="sm"
          className="w-full cta-section mt-auto"
        >
          <a
            href={buildWhatsAppUrl("¡Hola Click & Pizza! Quiero armar un combo personalizado. ¿Qué opciones tengo?")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar combo por WhatsApp"
          >
            Armar mi combo
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </article>
  );
}

/* ─── Pizza detail dialog ──────────────────────────────────────────── */

function PizzaDialog({
  pizza,
  category,
  onClose,
}: {
  pizza: Pizza | null;
  category: PizzaCategoryMeta | null;
  onClose: () => void;
}) {
  const isMiniPizzeta = pizza?.category === "mini-pizzeta";

  return (
    <Dialog open={!!pizza} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl w-[calc(100%-1.5rem)] h-[calc(100dvh-2rem)] max-h-[calc(100dvh-2rem)] p-0 overflow-hidden bg-card border-border flex flex-col">
        {pizza && category ? (
          <>
            <div className="relative w-full h-56 sm:h-72 flex-shrink-0 overflow-hidden bg-secondary">
              <Image
                src={pizza.image}
                alt={`Pizza ${pizza.name}`}
                width={900}
                height={450}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <Badge
                className="absolute top-4 right-4 border-transparent shadow-lg text-white"
                style={{ backgroundColor: category.accent }}
              >
                <span aria-hidden className="mr-1">
                  {category.emoji}
                </span>
                {category.label}
              </Badge>
              <p className="absolute bottom-4 right-4 text-xs text-muted-foreground/80 cp-glass rounded-full px-3 py-1 border border-primary/20">
                {category.subtitle}
              </p>
            </div>
            <div className="p-6 sm:p-8 -mt-10 relative z-10 flex-1 overflow-y-auto cp-scroll">
              <div className="flex items-start justify-between gap-3 mb-2">
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {pizza.name.split(/(\([^)]+\))/g).map((part, i) =>
                    part.startsWith("(") ? (
                      <span key={i} className="text-lg sm:text-xl font-bold opacity-70">{part}</span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </DialogTitle>
                {!isMiniPizzeta && (
                  <span className="text-xl sm:text-2xl font-extrabold text-price whitespace-nowrap">
                    {pizza.price ?? PIZZA_PRICES[pizza.category]}
                  </span>
                )}
              </div>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed mb-4">
                {pizza.description}
              </DialogDescription>

              {!isMiniPizzeta && (
                <>
                  {pizza.ingredients?.length ? (
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-sm" aria-hidden>🧅</span>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Ingredientes
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {pizza.ingredients.map((ing, i) => (
                          <span
                            key={ing}
                            className="inline-flex items-center text-xs bg-secondary/80 text-foreground rounded-full px-2.5 py-1 border border-border"
                          >
                            {ing}
                            {i < pizza.ingredients!.length - 1 ? (
                              <span className="sr-only">,</span>
                            ) : null}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {pizza.detail ? (
                    <div className="mb-6 space-y-3">
                      {pizza.detail.split("\n\n").map((block, i) => {
                        const boldMatch = block.match(/^\*\*(.+?)\*\*[:\s]*(.*)/);
                        if (boldMatch) {
                          return (
                            <div key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 size-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden />
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                <strong className="text-foreground font-semibold">{boldMatch[1]}</strong>{" "}
                                {boldMatch[2]}
                              </p>
                            </div>
                          );
                        }
                        return (
                          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                            {block}
                          </p>
                        );
                      })}
                    </div>
                  ) : null}
                  <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                    <Snowflake className="size-5 text-primary flex-shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-0.5">Estabilidad en freezer</p>
                      <p className="text-sm text-muted-foreground">{pizza.freezerNote}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="flex-1 min-w-0 cta-section"
                    >
                      <a
                        href={buildWhatsAppUrl(WA_MESSAGES.pizza(pizza.name))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate"
                      >
                        Consultar por {pizza.name}
                        <ArrowRight className="size-4 shrink-0" />
                      </a>
                    </Button>
                    <ShareButton
                      title={`${pizza.name} — Click & Pizza`}
                      text={`Mirá esta pizza: ${pizza.name} de Click & Pizza. 🍕`}
                      url={`${SITE.shareUrl}/menu`}
                      variant="outline"
                      size="lg"
                      label="Compartir"
                      className="cta-inline border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary sm:flex-none"
                    />
                  </div>
                </>
              )}
            </div>
          </>
        ) : null}
       </DialogContent>
     </Dialog>
   );
 }
