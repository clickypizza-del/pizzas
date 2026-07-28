import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON, generateId, slugify } from "@/lib/db";

type Category = {
  id: string;
  slug: string;
  label: string;
  subtitle: string;
  emoji: string;
  accent_color: string;
  sort_order: number;
  visible: boolean;
};

// GET all categories
export async function GET() {
  const categories = await readJSON<Category>("categories.json");
  categories.sort((a, b) => a.sort_order - b.sort_order);
  return NextResponse.json(categories);
}

// POST create category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const categories = await readJSON<Category>("categories.json");

    const newCategory: Category = {
      id: generateId(),
      slug: body.slug || slugify(body.label),
      label: body.label,
      subtitle: body.subtitle || "",
      emoji: body.emoji || "🍕",
      accent_color: body.accent_color || "#C1121F",
      sort_order: categories.length,
      visible: body.visible ?? true,
    };

    categories.push(newCategory);
    await writeJSON("categories.json", categories);

    return NextResponse.json(newCategory, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear la categoría" },
      { status: 500 }
    );
  }
}
