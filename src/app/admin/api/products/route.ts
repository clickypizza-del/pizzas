import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";
import { slugify } from "@/lib/db";

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const visible = searchParams.get("visible");
  const featured = searchParams.get("featured");

  let query = supabase
    .from("products")
    .select("*, categories(id, label, slug)")
    .order("sort_order", { ascending: true });

  if (category) query = query.eq("category_id", category);
  if (visible) query = query.eq("visible", visible === "true");
  if (featured) query = query.eq("featured", featured === "true");

  const { data: products, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = (products || []).map((p: Record<string, unknown>) => ({
    ...p,
    categories: (p.categories as Record<string, unknown>) || null,
  }));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const newProduct = {
      slug: body.slug || slugify(body.name),
      name: body.name,
      category_id: body.category_id || null,
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
      sort_order: count || 0,
    };

    const { data, error } = await supabase
      .from("products")
      .insert(newProduct)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  } finally {
    revalidatePath("/");
    revalidatePath("/menu");
  }
}
