"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ShoppingCart, Check } from "lucide-react";
import { PIZZAS } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Promotion } from "@/lib/site-data";

type Props = {
  promo: Promotion;
  onClose: () => void;
};

export function ComboBuilder({ promo, onClose }: Props) {
  const combo = promo.combo!;
  const categories = combo.categories ?? ["gourmet"];
  const pool = PIZZAS.filter((p) => categories.includes(p.category));
  const hasDrinks = combo.drinks > 0 && combo.drinkOptions.length > 0;
  const totalSteps = hasDrinks ? 3 : 2;

  const fixedPizzas = (combo.fixed ?? [])
    .map((f) => ({ pizza: PIZZAS.find((p) => p.id === f.pizzaId), qty: f.qty }))
    .filter((f): f is { pizza: (typeof PIZZAS)[number]; qty: number } => Boolean(f.pizza));

  const [selectedPizzas, setSelectedPizzas] = useState<string[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<string>("");
  const [step, setStep] = useState(1);

  const togglePizza = (pizzaId: string) => {
    setSelectedPizzas((prev) => {
      if (prev.includes(pizzaId)) return prev.filter((id) => id !== pizzaId);
      if (prev.length >= combo.pizzas) return prev;
      return [...prev, pizzaId];
    });
  };

  const canNextStep1 = selectedPizzas.length === combo.pizzas;
  const canNextStep2 = !hasDrinks || selectedDrink !== "";

  const handleSend = () => {
    const lines = fixedPizzas.map(
      (f) => `🍕 ${f.qty}× ${f.pizza.name}`,
    );

    selectedPizzas.forEach((id) => {
      const pizza = pool.find((p) => p.id === id);
      if (pizza) lines.push(`🍕 Pizza a elección: ${pizza.name}`);
    });

    if (hasDrinks) {
      const drinkName = combo.drinkOptions.find((d) => d.id === selectedDrink)?.name;
      lines.push(`🥤 Bebida: ${drinkName}`);
    }

    const msg = `¡Hola Click & Pizza! Quiero mi ${promo.title}:\n\n${lines.join("\n")}`;

    window.open(buildWhatsAppUrl(msg), "_blank");
    onClose();
  };

  const isLastStep = step === totalSteps;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4">
      <div className="bg-[#111111] border border-white/10 w-full sm:max-w-lg sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div>
            <h3 className="font-brand text-lg text-white">{promo.title}</h3>
            <p className="text-xs text-white/40">
              {fixedPizzas.length > 0
                ? `${fixedPizzas.map((f) => `${f.qty}× ${f.pizza.name}`).join(" + ")} + ${combo.pizzas} especial a elección${hasDrinks ? " + vino de regalo" : ""}`
                : `${combo.pizzas} pizzas a elección${hasDrinks ? " + bebida de regalo" : ""}`}
            </p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="size-5" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 px-5 pt-4 shrink-0">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const s = idx + 1;
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    step === s
                      ? "bg-brand-red text-white"
                      : step > s
                        ? "bg-green-600 text-white"
                        : "bg-white/10 text-white/30"
                  }`}
                >
                  {step > s ? <Check className="size-3.5" /> : s}
                </div>
                {s < totalSteps && (
                  <div
                    className={`h-px flex-1 ${step > s ? "bg-green-600" : "bg-white/10"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="px-5 pt-2 pb-1 shrink-0">
          <p className="text-xs text-white/30">
            {step === 1 &&
              (fixedPizzas.length > 0
                ? "Elegí tu pizza especial"
                : `Elegí tus ${combo.pizzas} pizzas`)}
            {step === 2 && hasDrinks && "Elegí tu bebida de regalo"}
            {isLastStep && "Confirmá tu pedido"}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {/* Step 1: Pick pizzas */}
          {step === 1 && (
            <div className="space-y-2">
              {fixedPizzas.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 mb-3">
                  <p className="text-[10px] uppercase tracking-wider text-white/30 mb-2">
                    Incluidas en el combo
                  </p>
                  <div className="space-y-2">
                    {fixedPizzas.map((f) => (
                      <div key={f.pizza.id} className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
                          <Image
                            src={f.pizza.image}
                            alt={f.pizza.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-white">
                          {f.qty}× {f.pizza.name}
                        </span>
                        <Check className="size-4 text-green-500 ml-auto shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {pool.map((pizza) => {
                const isSelected = selectedPizzas.includes(pizza.id);
                return (
                  <button
                    key={pizza.id}
                    onClick={() => togglePizza(pizza.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? "border-brand-red/50 bg-brand-red/10"
                        : "border-white/10 bg-[#0D0D0D] hover:border-white/20"
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white/5">
                      <Image
                        src={pizza.image}
                        alt={pizza.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{pizza.name}</div>
                      <div className="text-xs text-white/40">{pizza.price}</div>
                    </div>
                    <div
                      className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-brand-red bg-brand-red"
                          : "border-white/20"
                      }`}
                    >
                      {isSelected && <Check className="size-3.5 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Pick drink */}
          {step === 2 && hasDrinks && (
            <div className="space-y-2">
              {combo.drinkOptions.map((drink) => {
                const isSelected = selectedDrink === drink.id;
                return (
                  <button
                    key={drink.id}
                    onClick={() => setSelectedDrink(drink.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                      isSelected
                        ? "border-brand-red/50 bg-brand-red/10"
                        : "border-white/10 bg-[#0D0D0D] hover:border-white/20"
                    }`}
                  >
                    <span className="text-lg">🥤</span>
                    <span className="text-sm font-medium text-white">{drink.name}</span>
                    <span className="ml-auto text-xs text-green-400 font-medium">Gratis</span>
                    {isSelected && (
                      <Check className="size-4 text-brand-red shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Review */}
          {isLastStep && (
            <div className="space-y-4">
              <div className="bg-[#0D0D0D] rounded-xl p-4 space-y-3">
                <h4 className="text-xs text-white/30 uppercase tracking-wider">Tus pizzas</h4>
                {fixedPizzas.map((f) => (
                  <div key={f.pizza.id} className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image src={f.pizza.image} alt={f.pizza.name} fill className="object-cover" />
                    </div>
                    <span className="text-sm text-white">
                      {f.qty}× {f.pizza.name}
                    </span>
                  </div>
                ))}
                {selectedPizzas.map((id) => {
                  const pizza = pool.find((p) => p.id === id);
                  if (!pizza) return null;
                  return (
                    <div key={id} className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image src={pizza.image} alt={pizza.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm text-white">{pizza.name}</span>
                      <span className="text-xs text-white/40 ml-auto">{pizza.price}</span>
                    </div>
                  );
                })}
              </div>

              {hasDrinks ? (
                <div className="bg-[#0D0D0D] rounded-xl p-4 space-y-2">
                  <h4 className="text-xs text-white/30 uppercase tracking-wider">Tu bebida</h4>
                  <div className="flex items-center gap-2">
                    <span>🥤</span>
                    <span className="text-sm text-white">
                      {combo.drinkOptions.find((d) => d.id === selectedDrink)?.name}
                    </span>
                    <span className="text-xs text-green-400 ml-auto">Gratis</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 shrink-0">
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white"
              >
                Volver
              </button>
            )}
            {!isLastStep && (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={(step === 1 && !canNextStep1) || (step === 2 && !canNextStep2)}
                className="flex-1 py-2.5 bg-brand-red text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-brand-red/90 transition-all disabled:opacity-40"
              >
                Siguiente
              </button>
            )}
            {isLastStep && (
              <button
                onClick={handleSend}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-green-700 transition-all"
              >
                <ShoppingCart className="size-4" />
                Pedir por WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
