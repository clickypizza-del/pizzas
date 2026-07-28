import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";

type Promotion = {
  id: string;
  [key: string]: unknown;
};

type Params = Promise<{ id: string }>;

// PUT update promotion
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const promos = await readJSON<Promotion>("promotions.json");
    const idx = promos.findIndex((p) => p.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "Promoción no encontrada" }, { status: 404 });
    }

    promos[idx] = { ...promos[idx], ...body };
    await writeJSON("promotions.json", promos);

    return NextResponse.json(promos[idx]);
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar la promoción" },
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
    let promos = await readJSON<Promotion>("promotions.json");
    promos = promos.filter((p) => p.id !== id);
    await writeJSON("promotions.json", promos);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar la promoción" },
      { status: 500 }
    );
  }
}
