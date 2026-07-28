import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

type Params = Promise<{ id: string }>;

// PUT update promotion
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("promotions")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log").insert({
      action: "update",
      entity_type: "promotion",
      entity_id: id,
      details: { fields: Object.keys(body) },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Error updating promotion" },
      { status: 500 }
    );
  }
}

// DELETE promotion
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from("promotions")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log").insert({
      action: "delete",
      entity_type: "promotion",
      entity_id: id,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error deleting promotion" },
      { status: 500 }
    );
  }
}
