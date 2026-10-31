"use client";

import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ZoneChecker() {
  const [zone, setZone] = useState("");

  const waHref = buildWhatsAppUrl(
    `¡Hola Click & Pizza! Quiero saber si entregan en ${zone || "mi zona"} y cuánto cuesta el envío.`,
  );

  return (
    <div className="w-full max-w-md">
      <label htmlFor="zone-input" className="sr-only">
        Tu barrio o zona
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <MapPin
            className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
            aria-hidden
          />
          <input
            id="zone-input"
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            placeholder="Tu barrio o zona (ej: Godoy Cruz)"
            className="w-full h-11 pl-10 pr-4 rounded-full bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-brand-green hover:bg-brand-green-hover text-white text-sm font-semibold transition-colors whitespace-nowrap"
        >
          <MessageCircle className="size-4" aria-hidden />
          Consultar mi zona
        </a>
      </div>
      <p className="mt-2 text-xs text-muted-foreground text-center sm:text-left">
        Te confirmamos disponibilidad y costo exacto de envío por WhatsApp.
      </p>
    </div>
  );
}
