"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  X, Plus, Minus, ShoppingCart, ArrowRight, ArrowLeft,
  Trash2, ChevronRight, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  PIZZAS,
  PIZZA_CATEGORIES,
  PIZZA_PRICES,
  type PizzaCategory,
} from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type KitItem = {
  pizzaId: string;
  name: string;
  category: PizzaCategory;
  price: number;
  qty: number;
  image: string;
};

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
}

function formatPrice(n: number): string {
  return n.toLocaleString("es-AR");
}

export function KitBuilder({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"category" | "select" | "review">("category");
  const [selectedCategory, setSelectedCategory] = useState<PizzaCategory | null>(null);
  const [kit, setKit] = useState<KitItem[]>([]);

  const categoryPizzas = useMemo(() => {
    if (!selectedCategory) return [];
    return PIZZAS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalItems = kit.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = kit.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addItem = (pizza: (typeof PIZZAS)[number]) => {
    const existing = kit.find((item) => item.pizzaId === pizza.id);
    if (existing) {
      setKit(
        kit.map((item) =>
          item.pizzaId === pizza.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setKit([
        ...kit,
        {
          pizzaId: pizza.id,
          name: pizza.name,
          category: pizza.category,
          price: parsePrice(pizza.price ?? PIZZA_PRICES[pizza.category]),
          qty: 1,
          image: pizza.image,
        },
      ]);
    }
  };

  const removeItem = (pizzaId: string) => {
    const existing = kit.find((item) => item.pizzaId === pizzaId);
    if (!existing) return;
    if (existing.qty <= 1) {
      setKit(kit.filter((item) => item.pizzaId !== pizzaId));
    } else {
      setKit(
        kit.map((item) =>
          item.pizzaId === pizzaId ? { ...item, qty: item.qty - 1 } : item
        )
      );
    }
  };

  const clearKit = () => setKit([]);

  const getQty = (pizzaId: string) =>
    kit.find((item) => item.pizzaId === pizzaId)?.qty ?? 0;

  const buildMessage = (): string => {
    const lines = ["*¡Armo mi kit!*", ""];
    kit.forEach((item) => {
      lines.push(`• ${item.name} x${item.qty} — $${formatPrice(item.price * item.qty)}`);
    });
    lines.push("");
    lines.push(`*Total estimado: $${formatPrice(totalPrice)}*`);
    lines.push("");
    lines.push("¿Me pueden armar este kit? ¡Gracias!");
    return lines.join("\n");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("category");
      setSelectedCategory(null);
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-5 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-bold">
                {step === "category" && "Elegí la categoría"}
                {step === "select" && "Sumá variedades"}
                {step === "review" && "Revisá tu kit"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {step === "category" && "¿Qué tipo de pizzas querés en tu kit?"}
                {step === "select" && (
                  <>
                    {PIZZA_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                  </>
                )}
                {step === "review" && `${totalItems} pizza${totalItems !== 1 ? "s" : ""} en tu kit`}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {kit.length > 0 && step !== "review" && (
                <Badge variant="secondary" className="tabular-nums">
                  <ShoppingCart className="size-3 mr-1" />
                  {totalItems}
                </Badge>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="size-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-4 pb-4">
            {(["category", "select", "review"] as const).map((s, i) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 rounded-full flex-1 transition-colors",
                  step === s
                    ? "bg-primary"
                    : (["category", "select", "review"].indexOf(step) > i)
                      ? "bg-primary/40"
                      : "bg-border"
                )}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {/* Step: Category */}
          {step === "category" && (
            <div className="space-y-2">
              {PIZZA_CATEGORIES.filter((c) =>
                PIZZAS.some((p) => p.category === c.id)
              ).map((cat) => {
                const count = PIZZAS.filter((p) => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setStep("select");
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-secondary/50 transition-all text-left group"
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-sm">
                        {cat.shortLabel ?? cat.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {cat.subtitle} · {count} variedades
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      desde {PIZZA_PRICES[cat.id]}
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Step: Select */}
          {step === "select" && (
            <div className="space-y-2">
              {categoryPizzas.map((pizza) => {
                const qty = getQty(pizza.id);
                const price = parsePrice(pizza.price ?? PIZZA_PRICES[pizza.category]);
                return (
                  <div
                    key={pizza.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl border transition-all",
                      qty > 0
                        ? "border-primary/40 bg-primary/5"
                        : "border-border bg-card"
                    )}
                  >
                    <div className="size-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={pizza.image}
                        alt={pizza.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-sm leading-tight truncate">
                        {pizza.name}
                      </p>
                      <p className="text-xs text-primary font-semibold mt-0.5">
                        ${formatPrice(price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {qty > 0 ? (
                        <>
                          <button
                            type="button"
                            onClick={() => removeItem(pizza.id)}
                            className="size-8 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive/20 hover:text-destructive transition-colors"
                          >
                            {qty === 1 ? (
                              <Trash2 className="size-3.5" />
                            ) : (
                              <Minus className="size-3.5" />
                            )}
                          </button>
                          <span className="w-6 text-center text-sm font-bold tabular-nums">
                            {qty}
                          </span>
                        </>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => addItem(pizza)}
                        className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Other categories */}
              <div className="pt-3 border-t border-border mt-4">
                <p className="text-xs text-muted-foreground mb-2 font-medium">
                  ¿Querés agregar de otra categoría?
                </p>
                <div className="flex flex-wrap gap-2">
                  {PIZZA_CATEGORIES.filter(
                    (c) => c.id !== selectedCategory && PIZZAS.some((p) => p.category === c.id)
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {cat.emoji} {cat.shortLabel ?? cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step: Review */}
          {step === "review" && (
            <div className="space-y-3">
              {kit.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="size-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Tu kit está vacío. Volvé y agregá variedades.
                  </p>
                </div>
              ) : (
                <>
                  {kit.map((item) => (
                    <div
                      key={item.pizzaId}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-border bg-card"
                    >
                      <div className="size-12 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-sm leading-tight truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${formatPrice(item.price)} c/u
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => removeItem(item.pizzaId)}
                          className="size-7 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive/20 hover:text-destructive transition-colors"
                        >
                          {item.qty === 1 ? (
                            <Trash2 className="size-3" />
                          ) : (
                            <Minus className="size-3" />
                          )}
                        </button>
                        <span className="w-5 text-center text-sm font-bold tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const pizza = PIZZAS.find((p) => p.id === item.pizzaId);
                            if (pizza) addItem(pizza);
                          }}
                          className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-foreground tabular-nums whitespace-nowrap">
                        ${formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-foreground">
                        Total estimado
                      </span>
                      <span className="text-xl font-extrabold text-primary">
                        ${formatPrice(totalPrice)}
                      </span>
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="w-full cta-hero bg-brand-green hover:bg-brand-green/90 text-white rounded-full"
                    >
                      <a
                        href={buildWhatsAppUrl(buildMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Enviar kit por WhatsApp
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>

                    <button
                      type="button"
                      onClick={clearKit}
                      className="w-full text-xs text-muted-foreground hover:text-destructive mt-3 py-2 transition-colors"
                    >
                      Vaciar kit
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Bottom nav */}
        {step !== "category" && (
          <div className="border-t border-border p-4 flex items-center justify-between bg-card">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(step === "review" ? "select" : "category")}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              {step === "review" ? "Agregar más" : "Volver"}
            </Button>

            {step === "select" && kit.length > 0 && (
              <Button
                type="button"
                onClick={() => setStep("review")}
                className="gap-2"
              >
                Revisar kit
                <Badge variant="secondary" className="ml-1 tabular-nums">
                  {totalItems}
                </Badge>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
