import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// GET all products
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const visible = searchParams.get("visible");
  const featured = searchParams.get("featured");

  let query = supabase
    .from("products")
    .select("*, categories(label, slug)")
    .order("sort_order", { ascending: true });

  if (category) query = query.eq("category_id", category);
  if (visible !== null) query = query.eq("visible", visible === "true");
  if (featured !== null) query = query.eq("featured", featured === "true");

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST create product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate slug from name
    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const { data, error } = await supabase
      .from("products")
      .insert({ ...body, slug })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log activity
    await supabase.from("activity_log").insert({
      action: "create",
      entity_type: "product",
      entity_id: data.id,
      details: { name: body.name },
    });

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
