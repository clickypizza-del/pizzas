"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Floating WhatsApp action button — visible on all screen sizes. */
export function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hacer un pedido por WhatsApp"
      className="fixed bottom-5 right-5 z-40 size-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] text-white shadow-xl shadow-[#25D366]/40 flex items-center justify-center transition-all hover:scale-110"
    >
      <WhatsAppIcon className="size-7" />
      {/* Subtle ping ring */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"
      />
    </a>
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
        "fixed bottom-5 left-5 z-40 size-12 rounded-full shadow-lg transition-all duration-300 border-border",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </Button>
  );
}
