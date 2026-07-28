import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

type Params = Promise<{ id: string }>;

// GET single product
export async function GET(
  _request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(label, slug)")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("products")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log").insert({
      action: "update",
      entity_type: "product",
      entity_id: id,
      details: { fields: Object.keys(body) },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log").insert({
      action: "delete",
      entity_type: "product",
      entity_id: id,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}
