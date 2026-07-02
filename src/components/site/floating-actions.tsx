"use client";

import { useEffect, useState } from "react";
import { ArrowUp, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/icons";
import { SITE } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Floating WhatsApp action button — expands to a mini chat panel. */
export function WhatsAppFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 z-40 flex flex-col items-end gap-3" style={{ right: "max(1rem, env(safe-area-inset-right, 16px))" }}>
      {/* Chat panel */}
      {open ? (
        <div className="w-64 sm:w-80 rounded-2xl bg-card border border-border shadow-2xl shadow-black/40 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="bg-brand-green px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                <WhatsAppIcon className="size-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{SITE.name}</p>
                <p className="text-white/80 text-xs">En línea · Responde en minutos</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Chat bubbles */}
          <div className="p-4 space-y-3 bg-wa-dark min-h-[120px]">
            <div className="bg-wa-bubble rounded-xl rounded-tl-none p-3 max-w-[85%]">
              <p className="text-sm text-wa-text leading-relaxed">
                ¡Hola! 👋 Somos {SITE.name}. ¿En qué podemos ayudarte?
              </p>
              <p className="text-[10px] text-wa-meta mt-1 text-right">Ahora</p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="p-3 bg-card border-t border-border space-y-2">
            <a
              href={buildWhatsAppUrl("¡Hola Click & Pizza! Quiero info sobre las pizzas.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm text-foreground hover:bg-primary/20 transition-colors"
            >
              <MessageCircle className="size-4 text-primary" aria-hidden />
              Consultar por pizzas
            </a>
            <a
              href={buildWhatsAppUrl("¡Hola Click & Pizza! Quiero suscribirme a un kit.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm text-foreground hover:bg-primary/20 transition-colors"
            >
              <MessageCircle className="size-4 text-primary" aria-hidden />
              Quiero suscribirme
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              <MessageCircle className="size-4" aria-hidden />
              Otra consulta
            </a>
          </div>
        </div>
      ) : null}

      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Abrir chat de WhatsApp"
        className="relative size-12 lg:size-14 rounded-full bg-brand-green hover:bg-brand-green-hover text-white shadow-xl shadow-brand-green/40 flex items-center justify-center transition-all active:scale-95"
      >
        {open ? (
          <X className="size-6 lg:size-7" />
        ) : (
          <>
            <WhatsAppIcon className="size-6 lg:size-7" />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-brand-green animate-ping opacity-20"
            />
          </>
        )}
      </button>
    </div>
  );
}

/** Back-to-top button that appears after the user scrolls down. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Volver arriba"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className={cn(
        "fixed bottom-5 left-5 z-40 size-12 rounded-full shadow-lg transition-all duration-300 border-border max-lg:hidden",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </Button>
  );
}


