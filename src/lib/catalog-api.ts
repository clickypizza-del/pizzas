import {
  PIZZAS,
  PIZZA_CATEGORIES,
  type Pizza,
  type PizzaCategoryMeta,
} from "@/lib/site-data";
import { supabase } from "@/lib/supabase/client";

export function formatPrice(cents: number): string {
  const str = Math.round(cents).toString();
  const formatted = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${formatted}`;
}

type DbProduct = {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  description_short: string;
  description_full: string;
  ingredients: string[];
  price: number;
  previous_price: number;
  discount_percent: number;
  badge: string | null;
  available: boolean;
  sold_out: boolean;
  featured: boolean;
  visible: boolean;
  stock: number;
  image_url: string;
  prep_time_minutes: number;
  sort_order: number;
  categories?: { id: string; label: string; slug: string; subtitle: string; emoji: string; accent_color: string } | null;
};

type DbCategory = {
  id: string;
  slug: string;
  label: string;
  subtitle: string;
  emoji: string;
  accent_color: string;
  sort_order: number;
  visible: boolean;
};

const CATEGORY_MAP: Record<string, Pizza["category"]> = {
  clasica: "clasica",
  gourmet: "gourmet",
  premium: "premium",
  individual: "individual",
  "mini-pizzeta": "mini-pizzeta",
};

function dbProductToPizza(p: DbProduct): Pizza {
  const catSlug = p.categories?.slug || p.category_id || "clasica";
  const category = CATEGORY_MAP[catSlug] || "clasica";

  const ingredients =
    p.ingredients?.length && typeof p.ingredients[0] === "string"
      ? p.ingredients
      : undefined;

  return {
    id: p.id,
    name: p.name,
    description: p.description_short || p.description_full || "",
    category,
    freezerNote: "",
    image: p.image_url || "/pizzas/muzza.webp",
    price: formatPrice(p.price),
    badge: (p.badge as Pizza["badge"]) || undefined,
    cookTime: p.prep_time_minutes ? `${p.prep_time_minutes} min` : undefined,
    portions: category === "individual" ? "1 porción" : "4-6 porciones",
    ingredients,
    detail: p.description_full || undefined,
    _soldOut: p.sold_out,
    _featured: p.featured,
    _stock: p.stock,
  } as Pizza & { _soldOut?: boolean; _featured?: boolean; _stock?: number };
}

function dbCategoryToMeta(c: DbCategory): PizzaCategoryMeta {
  const id = CATEGORY_MAP[c.slug] || ("clasica" as PizzaCategoryMeta["id"]);
  return {
    id,
    label: c.label,
    subtitle: c.subtitle || "",
    emoji: c.emoji || "🍕",
    accent: c.accent_color || "#c81009",
    textClass: `text-[${c.accent_color || "#c81009"}]` as PizzaCategoryMeta["textClass"],
  };
}

export async function fetchProducts(): Promise<Pizza[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(id, label, slug, subtitle, emoji, accent_color)")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[catalog] Supabase products error:", error.message);
      return PIZZAS;
    }

    if (data && data.length > 0) {
      return (data as unknown as DbProduct[]).map(dbProductToPizza);
    }
  } catch (err) {
    console.error("[catalog] fetchProducts failed:", err);
  }

  return PIZZAS;
}

export async function fetchCategories(): Promise<PizzaCategoryMeta[]> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[catalog] Supabase categories error:", error.message);
      return PIZZA_CATEGORIES;
    }

    if (data && data.length > 0) {
      return (data as unknown as DbCategory[]).map(dbCategoryToMeta);
    }
  } catch (err) {
    console.error("[catalog] fetchCategories failed:", err);
  }

  return PIZZA_CATEGORIES;
}

export async function fetchFeaturedProducts(limit = 6): Promise<Pizza[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(id, label, slug, subtitle, emoji, accent_color)")
      .eq("visible", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (!error && data && data.length > 0) {
      return (data as unknown as DbProduct[]).map(dbProductToPizza);
    }

    if (!error && data && data.length === 0) {
      const { data: fallback } = await supabase
        .from("products")
        .select("*, categories(id, label, slug, subtitle, emoji, accent_color)")
        .eq("visible", true)
        .order("sort_order", { ascending: true })
        .limit(limit);

      if (fallback && fallback.length > 0) {
        return (fallback as unknown as DbProduct[]).map(dbProductToPizza);
      }
    }
  } catch (err) {
    console.error("[catalog] fetchFeaturedProducts failed:", err);
  }

  const { BEST_SELLER_IDS } = await import("@/lib/site-data");
  return BEST_SELLER_IDS
    .map((id) => PIZZAS.find((p) => p.id === id))
    .filter((p): p is Pizza => Boolean(p));
}

export async function fetchStock(): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, stock")
      .gt("stock", 0);

    if (!error && data) {
      const map: Record<string, number> = {};
      for (const item of data as { id: string; stock: number }[]) {
        map[item.id] = item.stock;
      }
      return map;
    }
  } catch {}
  return {};
}

export function isApiConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
