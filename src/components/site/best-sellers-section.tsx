"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, ShoppingCart, Snowflake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PIZZAS as FALLBACK_PIZZAS, PIZZA_CATEGORIES as FALLBACK_CATEGORIES, BEST_SELLER_IDS, type Pizza, type PizzaCategoryMeta } from "@/lib/site-data";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { useCartStore } from "@/lib/cart-store";

const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
  "mas-vendida": { label: "Más vendida", className: "bg-brand-amber text-black" },
  "premium": { label: "Premium", className: "bg-purple-600 text-white" },
  "nueva": { label: "Nueva", className: "bg-brand-green text-white" },
};

function categoryOf(pizza: Pizza, categories: PizzaCategoryMeta[]): PizzaCategoryMeta {
  return categories.find((c) => c.id === pizza.category) ?? FALLBACK_CATEGORIES[0];
}

function BestSellerCard({ pizza, categories }: { pizza: Pizza; categories: PizzaCategoryMeta[] }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const category = categoryOf(pizza, categories);
  const badgeConf = pizza.badge ? BADGE_CONFIG[pizza.badge] : null;
  const priceNum = parseInt((pizza.price ?? "").replace(/[^0-9]/g, ""), 10);

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
    <article className="group h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary group/img">
        <Image
          src={pizza.image}
          alt={`Pizza ${pizza.name}`}
          width={600}
          height={450}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
        />
        <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 cp-glass border border-primary/30 rounded-full px-2 py-0.5 text-[10px] font-semibold text-foreground">
          <Snowflake className="size-2.5 text-primary" aria-hidden />
          <span className="text-primary">Lista en 15 min</span>
        </div>
        {badgeConf ? (
          <Badge className={`absolute top-2 right-2 border-transparent shadow-lg text-[10px] sm:text-xs font-bold px-1.5 py-0.5 leading-tight ${badgeConf.className}`}>
            {badgeConf.label}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <Badge
          className="w-fit border-transparent shadow-lg text-white text-[10px] sm:text-xs px-1.5 py-0.5 leading-tight mb-2"
          style={{ backgroundColor: category.accent }}
        >
          {category.label}
        </Badge>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">
            {pizza.name.split(/(\([^)]+\))/g).map((part, i) =>
              part.startsWith("(") ? (
                <span key={i} className="text-[10px] sm:text-xs font-semibold opacity-70">{part}</span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h3>
          <span className="text-sm sm:text-base font-extrabold text-price whitespace-nowrap">
            {pizza.price}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-2">
          {pizza.description}
        </p>
        <div className="flex items-center gap-3 mb-3 text-[10px] sm:text-xs text-muted-foreground">
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
            className="cta-inline border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary text-xs sm:text-sm px-3"
            aria-label={`Pedir ${pizza.name} por WhatsApp`}
          >
            <a
              href={buildWhatsAppUrl(WA_MESSAGES.pizza(pizza.name))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function BestSellersSection({ products, categories }: { products?: Pizza[]; categories?: PizzaCategoryMeta[] }) {
  const allPizzas = products ?? FALLBACK_PIZZAS;
  const allCategories = categories ?? FALLBACK_CATEGORIES;
  let bestSellers = BEST_SELLER_IDS.map((id) => allPizzas.find((p) => p.id === id))
    .filter((p): p is Pizza => Boolean(p));
  if (bestSellers.length === 0 && allPizzas.length > 0) {
    bestSellers = allPizzas.slice(0, 3);
  }
  // La sección muestra únicamente las 3 más pedidas.
  bestSellers = bestSellers.slice(0, 3);

  return (
    <section
      id="mas-pedidas"
      aria-labelledby="mas-pedidas-title"
      className="py-12 sm:py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Las más pedidas"
            headingId="mas-pedidas-title"
            title={
              <>
                Las pizzas que todos{" "}
                <span className="text-gradient-brand">vuelven a pedir</span>
              </>
            }
            description="Del freezer al horno en 15 minutos. Agregá al carrito y confirmá tu pedido por WhatsApp."
          />
        </Reveal>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {bestSellers.map((pizza, i) => (
            <Reveal as="li" key={pizza.id} delay={i * 0.05}>
              <BestSellerCard pizza={pizza} categories={allCategories} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.15}>
          <div className="mt-10 sm:mt-12 flex flex-col items-center gap-6">
            <nav aria-label="Explorar por línea">
              <ul role="list" className="flex flex-wrap justify-center gap-2">
                {allCategories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/menu?cat=${cat.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-2 text-[11px] sm:text-sm font-semibold bg-card border border-border text-muted-foreground hover:text-foreground transition-all hover:border-primary/40"
                      style={{ borderLeft: `3px solid ${cat.accent}` }}
                    >
                      <span aria-hidden>{cat.emoji}</span>
                      {cat.shortLabel ?? cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-border">
              <Link href="/menu">
                Ver catálogo completo (14 variedades)
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
