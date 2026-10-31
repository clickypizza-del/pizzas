import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  const { data, error } = await supabase
    .from("business_settings")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result: Record<string, string> = {};
  (data || []).forEach((s: { key: string; value: unknown }) => {
    const val =
      typeof s.value === "string" ? s.value : JSON.stringify(s.value);
    result[s.key] = val.replace(/^"|"$/g, "");
  });

  return NextResponse.json(result);
}

export async function PUT(request: NextRequest) {
  try {
    const incoming = await request.json();

    for (const [key, value] of Object.entries(incoming)) {
      const jsonValue = typeof value === "string" ? `"${value}"` : value;

      const { error } = await supabase
        .from("business_settings")
        .upsert({ key, value: jsonValue }, { onConflict: "key" });

      if (error) {
        console.error(`Error upserting setting ${key}:`, error);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar la configuración" },
      { status: 500 }
    );
  }
}
