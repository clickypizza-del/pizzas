import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// GET all promotions
export async function GET() {
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST create promotion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("promotions")
      .insert(body)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log").insert({
      action: "create",
      entity_type: "promotion",
      entity_id: data.id,
      details: { title: body.title },
    });

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error creating promotion" },
      { status: 500 }
    );
  }
}
