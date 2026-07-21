import type { Metadata } from "next";
import { MenuPageClient } from "@/components/site/menu-page-client";

export const metadata: Metadata = {
  title: "Catálogo — Variedades de pizza gourmet",
  description:
    "Catálogo completo de pizzas gourmet congeladas: Clásicas, Premium, Individuales y Mini Pizzetas. Ingredientes seleccionados, listas en 15 minutos.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return <MenuPageClient />;
}
