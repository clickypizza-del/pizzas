import type { Metadata } from "next";
import { PlansSection } from "@/components/site/plans-section";
import { OrderSection } from "@/components/site/order-section";

export const metadata: Metadata = {
  title: "Suscripción — Planes semanales",
  description:
    "Kit Semanal, Kit Premium y Evento Especial. Suscribite y recibí pizzas gourmet cada semana en tu casa.",
  alternates: { canonical: "/suscripcion" },
};

export default function SuscripcionPage() {
  return (
    <>
      <PlansSection />
      <OrderSection />
    </>
  );
}
