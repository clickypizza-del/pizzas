import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";

type Product = {
  id: string;
  [key: string]: unknown;
};

type Params = Promise<{ id: string }>;

// GET single product
export async function GET(
  _request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  const products = await readJSON<Product>("products.json");
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const products = await readJSON<Product>("products.json");
    const idx = products.findIndex((p) => p.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    products[idx] = { ...products[idx], ...body };
    await writeJSON("products.json", products);

    return NextResponse.json(products[idx]);
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
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
    let products = await readJSON<Product>("products.json");
    products = products.filter((p) => p.id !== id);
    await writeJSON("products.json", products);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}
