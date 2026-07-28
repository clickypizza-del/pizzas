import { NextRequest, NextResponse } from "next/server";
import { verifyConnection, refreshAccessToken } from "@/lib/meta-client";

export async function GET() {
  const result = await verifyConnection();
  return NextResponse.json(result);
}

export async function POST() {
  try {
    const newToken = await refreshAccessToken();
    return NextResponse.json({
      success: true,
      message: "Token actualizado. Actualizá META_ACCESS_TOKEN en Vercel con el nuevo token.",
      newToken,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al refrescar token" },
      { status: 500 }
    );
  }
}
