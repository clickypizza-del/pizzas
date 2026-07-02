import type { Metadata } from "next";
import { PlansSection } from "@/components/site/plans-section";
import { ClubClickySection } from "@/components/site/club-clicky-section";
import { OrderSection } from "@/components/site/order-section";

export const metadata: Metadata = {
  title: "Suscripción — Planes semanales y Club Clicky",
  description:
    "Kit Semanal, Kit Premium y Evento Especial. Suscribite y recibí pizzas gourmet cada semana. En el Club Clicky, la 11ª pizza es gratis.",
  alternates: { canonical: "/suscripcion" },
};

export default function SuscripcionPage() {
  return (
    <>
      <PlansSection />
      <ClubClickySection />
      <OrderSection />
    </>
  );
}
