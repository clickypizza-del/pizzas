import { SITE } from "@/lib/site-data";

/**
 * Build a wa.me deep link with a pre-filled, URL-encoded message.
 * This lets every CTA on the page route the user into WhatsApp with context
 * (e.g. "Quiero el Kit Premium") already typed out.
 */
export function buildWhatsAppUrl(message?: string): string {
  const text = message ?? SITE.whatsappText;
  return `https://wa.me/${SITE.phone}?text=${encodeURIComponent(text)}`;
}

/** Pre-filled messages for each plan / pizza CTA. */
export const WA_MESSAGES = {
  general: SITE.whatsappText,
  planKitSemanal:
    "¡Hola Click & Pizza! Quiero suscribirme al Kit Semanal (4 pizzas). ¿Cómo seguimos?",
  planKitPremium:
    "¡Hola Click & Pizza! Quiero el Kit Premium (6 pizzas + bolsa térmica). ¿Cómo seguimos?",
  planEvento:
    "¡Hola Click & Pizza! Quiero armar un pedido para un evento especial. ¿Me pasan info?",
  pizza: (name: string) =>
    `¡Hola Click & Pizza! Quería consultar por la pizza ${name}. ¿La tengo disponible esta semana?`,
  zona: (zone: string) =>
    `¡Hola Click & Pizza! Quería saber si entregan en ${zone}.`,
} as const;
