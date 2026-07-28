import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON, generateId, slugify } from "@/lib/db";

type Product = {
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
  delivery_time_minutes: number;
  sort_order: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  view_count: number;
  whatsapp_clicks: number;
  order_clicks: number;
};

// GET all products
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const visible = searchParams.get("visible");
  const featured = searchParams.get("featured");

  let products = await readJSON<Product>("products.json");

  if (category) products = products.filter((p) => p.category_id === category);
  if (visible !== null)
    products = products.filter(
      (p) => p.visible === (visible === "true")
    );
  if (featured !== null)
    products = products.filter(
      (p) => p.featured === (featured === "true")
    );

  products.sort((a, b) => a.sort_order - b.sort_order);

  // Attach category info
  const categories = await readJSON<{ id: string; label: string; slug: string }>(
    "categories.json"
  );
  const catMap = new Map(categories.map((c) => [c.id, c]));

  const result = products.map((p) => ({
    ...p,
    categories: catMap.get(p.category_id) || null,
  }));

  return NextResponse.json(result);
}

// POST create product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const products = await readJSON<Product>("products.json");

    const newProduct: Product = {
      id: generateId(),
      slug: body.slug || slugify(body.name),
      name: body.name,
      category_id: body.category_id || "",
      description_short: body.description_short || "",
      description_full: body.description_full || "",
      ingredients: body.ingredients || [],
      price: body.price || 0,
      previous_price: body.previous_price || 0,
      discount_percent: body.discount_percent || 0,
      badge: body.badge || null,
      available: body.available ?? true,
      sold_out: body.sold_out ?? false,
      featured: body.featured ?? false,
      visible: body.visible ?? true,
      stock: body.stock || 0,
      image_url: body.image_url || "",
      prep_time_minutes: body.prep_time_minutes || 15,
      delivery_time_minutes: body.delivery_time_minutes || 30,
      sort_order: products.length,
      meta_title: body.meta_title || "",
      meta_description: body.meta_description || "",
      meta_keywords: body.meta_keywords || [],
      view_count: 0,
      whatsapp_clicks: 0,
      order_clicks: 0,
    };

    products.push(newProduct);
    await writeJSON("products.json", products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
}
