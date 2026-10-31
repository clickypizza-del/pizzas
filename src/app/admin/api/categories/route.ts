import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";
import { slugify } from "@/lib/db";

export async function GET() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { count } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const newCategory = {
      slug: body.slug || slugify(body.label),
      label: body.label,
      subtitle: body.subtitle || "",
      emoji: body.emoji || "🍕",
      accent_color: body.accent_color || "#C1121F",
      sort_order: count || 0,
      visible: body.visible ?? true,
    };

    const { data, error } = await supabase
      .from("categories")
      .insert(newCategory)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear la categoría" },
      { status: 500 }
    );
  } finally {
    revalidatePath("/");
    revalidatePath("/menu");
  }
}
