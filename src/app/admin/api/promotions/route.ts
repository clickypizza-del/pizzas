import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newPromo = {
      slug: body.slug || body.title?.toLowerCase().replace(/\s+/g, "-"),
      title: body.title,
      description: body.description || "",
      price: body.price || null,
      image_url: body.image_url || "",
      badge: body.badge || null,
      badge_color: body.badge_color || null,
      cta: body.cta || body.button_text || "Ver más",
      whatsapp_message: body.whatsapp_message || null,
      link: body.link || body.button_url || null,
      featured: body.featured ?? false,
      visible: body.visible ?? true,
      combo: body.combo || null,
    };

    const { data, error } = await supabase
      .from("promotions")
      .insert(newPromo)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear la promoción" },
      { status: 500 }
    );
  } finally {
    revalidatePath("/");
  }
}
