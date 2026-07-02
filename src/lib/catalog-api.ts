import { PIZZAS, PIZZA_CATEGORIES, PIZZA_PRICES, type Pizza, type PizzaCategoryMeta } from "@/lib/site-data";

export type CatalogProduct = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  precioAnterior: number;
  imagen: string;
  ingredientes: string;
  peso: string;
  stock: number;
  promocion: string;
  etiquetas: string;
  badge: string;
  cookTime: string;
  portions: string;
  estado: string;
};

export type CatalogCategory = {
  id: string;
  nombre: string;
  emoji: string;
  accent: string;
  subtitle: string;
  orden: number;
};

const API_URL = process.env.GOOGLE_SHEET_API_URL;
const API_KEY = process.env.GOOGLE_SHEET_API_KEY;

let cachedProducts: CatalogProduct[] | null = null;
let cachedCategories: CatalogCategory[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000;

async function fetchAPI(action: string, params?: Record<string, string>) {
  if (!API_URL || !API_KEY) {
    console.warn("[catalog-api] No API URL or key configured, using fallback");
    return null;
  }

  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  url.searchParams.set("apiKey", API_KEY);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      next: { revalidate: 300 },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`[catalog-api] API error: ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (!json.ok) {
      console.error(`[catalog-api] API returned error:`, json.error);
      return null;
    }

    return json;
  } catch (err) {
    clearTimeout(timeout);
    console.error(`[catalog-api] Fetch failed:`, err);
    return null;
  }
}

function catalogProductToPizza(p: CatalogProduct): Pizza {
  const priceStr = formatPrice(p.precio);
  const ingredients = p.ingredientes
    ? p.ingredientes.split(",").map((s) => s.trim()).filter(Boolean)
    : undefined;
  return {
    id: p.id,
    name: p.nombre,
    description: p.descripcion,
    category: p.categoria as Pizza["category"],
    freezerNote: "",
    image: p.imagen,
    price: priceStr,
    badge: (p.badge as Pizza["badge"]) || undefined,
    cookTime: p.cookTime || undefined,
    portions: p.portions || undefined,
    ingredients,
  };
}

function catalogCategoryToMeta(c: CatalogCategory): PizzaCategoryMeta {
  return {
    id: c.id as PizzaCategoryMeta["id"],
    label: c.nombre,
    subtitle: c.subtitle,
    emoji: c.emoji,
    accent: c.accent,
    textClass: `text-[${c.accent}]` as PizzaCategoryMeta["textClass"],
  };
}

export function formatPrice(cents: number): string {
  const str = Math.round(cents).toString();
  const formatted = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${formatted}`;
}

export async function fetchProducts(): Promise<Pizza[]> {
  const now = Date.now();
  if (cachedProducts && now - cacheTimestamp < CACHE_TTL) {
    return cachedProducts.map(catalogProductToPizza);
  }

  const result = await fetchAPI("productos");
  if (result?.data?.length) {
    cachedProducts = result.data;
    cachedCategories = null;
    cacheTimestamp = now;
    return result.data.map(catalogProductToPizza);
  }

  return PIZZAS;
}

export async function fetchCategories(): Promise<PizzaCategoryMeta[]> {
  const now = Date.now();
  if (cachedCategories && now - cacheTimestamp < CACHE_TTL) {
    return cachedCategories!.map(catalogCategoryToMeta);
  }

  const result = await fetchAPI("categorias");
  if (result?.data?.length) {
    cachedCategories = result.data;
    cacheTimestamp = now;
    return result.data.map(catalogCategoryToMeta);
  }

  return PIZZA_CATEGORIES;
}

export async function fetchStock(): Promise<Record<string, number>> {
  const result = await fetchAPI("stock");
  if (result?.data) {
    const stockMap: Record<string, number> = {};
    for (const item of result.data) {
      stockMap[item.id] = item.stock;
    }
    return stockMap;
  }
  return {};
}

export function isApiConfigured(): boolean {
  return !!(API_URL && API_KEY);
}
