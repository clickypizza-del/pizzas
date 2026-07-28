import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON, generateId } from "@/lib/db";

type Promotion = {
  id: string;
  [key: string]: unknown;
};

// GET all promotions
export async function GET() {
  const promos = await readJSON<Promotion>("promotions.json");
  promos.sort((a, b) => (a.sort_order as number) - (b.sort_order as number));
  return NextResponse.json(promos);
}

// POST create promotion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const promos = await readJSON<Promotion>("promotions.json");

    const newPromo: Promotion = {
      id: generateId(),
      title: body.title,
      subtitle: body.subtitle || "",
      description: body.description || "",
      image_url: body.image_url || "",
      start_date: body.start_date || "",
      end_date: body.end_date || "",
      button_text: body.button_text || "Ver más",
      button_url: body.button_url || "",
      badge: body.badge || "",
      accent_color: body.accent_color || "#C1121F",
      status: body.status || "active",
      featured: body.featured ?? false,
      sort_order: promos.length,
    };

    promos.push(newPromo);
    await writeJSON("promotions.json", promos);

    return NextResponse.json(newPromo, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear la promoción" },
      { status: 500 }
    );
  }
}
