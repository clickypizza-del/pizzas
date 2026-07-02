import type { Metadata } from "next";
import { MenuSection } from "@/components/site/menu-section";

export const metadata: Metadata = {
  title: "Menú — Variedades de pizza gourmet",
  description:
    "Catálogo completo de pizzas gourmet congeladas: Clásicas, Premium, Individuales y Mini Pizzetas. Ingredientes seleccionados, listas en 15 minutos.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return <MenuSection />;
}
