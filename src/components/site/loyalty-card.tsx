"use client";

import { useState } from "react";
import { Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type LoyaltyData = {
  phone: string;
  name: string;
  purchases: number;
  lastPurchase: string | null;
  rewardReady: boolean;
};

export function LoyaltyCard() {
  const [phone, setPhone] = useState("");
  const [data, setData] = useState<LoyaltyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 8) {
      setError("Ingresá un número válido");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/loyalty?phone=${encodeURIComponent(cleaned)}`);
      const result = await res.json();
      if (result.error) {
        if (result.error === "Loyalty API not configured") {
          setError("El sistema de fidelidad aún no está configurado. Contactanos por WhatsApp.");
        } else {
          setError(result.error);
        }
      } else {
        setData(result);
      }
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const filledSlots = data ? Math.min(data.purchases, 10) : 0;
  const progress = data ? `${data.purchases}/10` : "0/10";

  return (
    <div className="relative max-w-md mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary to-brand-red-bright rounded-[2rem] blur-3xl opacity-15" />
      <div className="relative bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-2xl shadow-black/30">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            Club Clicky
          </p>
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
            Tu tarjeta de fidelidad
          </h3>
        </div>

        {/* Phone input (shown when no data) */}
        {!data ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Ingresá tu número de WhatsApp para ver tu progreso.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="261 254-5724"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <Button
                onClick={handleLookup}
                disabled={loading}
                size="sm"
                className="cta-section px-4"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Buscar"
                )}
              </Button>
            </div>
            {error ? (
              <p className="text-xs text-destructive text-center">{error}</p>
            ) : null}
          </div>
        ) : (
          <>
            {/* Logged in state */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-muted-foreground">
                {data.name ? `${data.name} · ` : ""}{data.phone}
              </span>
              <span className="font-bold text-primary">{progress}</span>
            </div>

            {/* Loyalty grid */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
              {Array.from({ length: 10 }).map((_, i) => {
                const filled = i < filledSlots;
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 ${
                      filled
                        ? "bg-primary/20 border-2 border-primary shadow-md shadow-primary/20 scale-105"
                        : "bg-secondary/60 border border-border"
                    }`}
                  >
                    {filled ? "🍕" : "⬜"}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-secondary rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-brand-red-bright rounded-full transition-all duration-700"
                style={{ width: `${(filledSlots / 10) * 100}%` }}
              />
            </div>

            {/* Reward */}
            {data.rewardReady ? (
              <div className="flex items-center gap-3 p-4 bg-brand-green/10 border border-brand-green/30 rounded-xl animate-pulse">
                <div className="size-12 rounded-xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-2xl flex-shrink-0">
                  🎁
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-green">
                    ¡Tu pizza gratis está lista!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pedí tu Muzzarella Clásica por WhatsApp
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <div className="size-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl flex-shrink-0">
                  🎁
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    11.ª Pizza GRATIS
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Te faltan {10 - filledSlots} {10 - filledSlots === 1 ? "compra" : "compras"} para tu recompensa
                  </p>
                </div>
              </div>
            )}

            {/* Change user */}
            <button
              type="button"
              onClick={() => {
                setData(null);
                setPhone("");
              }}
              className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              Cambiar número
            </button>
          </>
        )}
      </div>
    </div>
  );
}
