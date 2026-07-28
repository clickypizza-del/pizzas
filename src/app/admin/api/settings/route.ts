import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// GET all settings
export async function GET() {
  const { data, error } = await supabase
    .from("business_settings")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Convert array of {key, value} to a flat object
  const settings: Record<string, string> = {};
  (data || []).forEach((row) => {
    settings[row.key] =
      typeof row.value === "string" ? row.value : JSON.stringify(row.value);
  });

  return NextResponse.json(settings);
}

// PUT update settings (bulk)
export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json();

    const updates = Object.entries(settings).map(([key, value]) =>
      supabase
        .from("business_settings")
        .upsert({ key, value: JSON.stringify(value) }, { onConflict: "key" })
    );

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar la configuración" },
      { status: 500 }
    );
  }
}
