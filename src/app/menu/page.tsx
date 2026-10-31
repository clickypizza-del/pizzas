import type { Metadata } from "next";
import { fetchProducts, fetchCategories } from "@/lib/catalog-api";
import { MenuSection } from "@/components/site/menu-section";

export const metadata: Metadata = {
  title: "Catálogo — Variedades de pizza gourmet",
  description:
    "Catálogo completo de pizzas gourmet congeladas: Clásicas, Premium, Individuales y Mini Pizzetas. Ingredientes seleccionados, listas en 15 minutos.",
  alternates: { canonical: "/menu" },
};

export const revalidate = 300;

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const [products, categories, params] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    searchParams,
  ]);

  return (
    <MenuSection
      initialCategory={params.cat}
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
