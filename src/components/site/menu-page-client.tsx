"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MenuSection } from "@/components/site/menu-section";
import { PIZZA_CATEGORIES } from "@/lib/site-data";

function MenuPageContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  return <MenuSection initialCategory={cat ?? undefined} />;
}

export function MenuPageClient() {
  return (
    <Suspense fallback={<MenuSection />}>
      <MenuPageContent />
    </Suspense>
  );
}
