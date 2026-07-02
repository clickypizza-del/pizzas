import type { Metadata } from "next";
import { RevendedorSection } from "@/components/site/revendedor-section";

export const metadata: Metadata = {
  title: "Revendedores — Vendé Click & Pizza",
  description:
    "Sé nuestro revendedor. Margen de ganancia atractivo, producto premium con demanda creciente. Contactanos y empezá a vender.",
  alternates: { canonical: "/revendedores" },
};

export default function RevendedoresPage() {
  return <RevendedorSection />;
}
