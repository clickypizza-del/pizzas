import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";

type Category = {
  id: string;
  [key: string]: unknown;
};

type Params = Promise<{ id: string }>;

// PUT update category
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const categories = await readJSON<Category>("categories.json");
    const idx = categories.findIndex((c) => c.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    categories[idx] = { ...categories[idx], ...body };
    await writeJSON("categories.json", categories);

    return NextResponse.json(categories[idx]);
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar la categoría" },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    let categories = await readJSON<Category>("categories.json");
    categories = categories.filter((c) => c.id !== id);
    await writeJSON("categories.json", categories);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar la categoría" },
      { status: 500 }
    );
  }
}
