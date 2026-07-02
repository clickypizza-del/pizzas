import { NextRequest, NextResponse } from "next/server";

const GAS_URL = process.env.GOOGLE_SHEET_API_URL;
const GAS_KEY = process.env.GOOGLE_SHEET_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, whatsapp, localidad, tipoConsumo, planes } = body;

    if (!nombre || !email) {
      return NextResponse.json(
        { ok: false, error: "Nombre y email son obligatorios" },
        { status: 400 },
      );
    }

    const payload = {
      action: "addSubscriber",
      nombre,
      email,
      whatsapp: whatsapp || "",
      localidad: localidad || "",
      tipoConsumo: tipoConsumo || "",
      planes: planes || "",
      timestamp: new Date().toISOString(),
    };

    if (GAS_URL && GAS_KEY) {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ apiKey: GAS_KEY, ...payload }),
      });
      const data = await res.json();
      if (data.status === "ok") {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json(
        { ok: false, error: data.message || "Error guardando suscriptor" },
        { status: 500 },
      );
    }

    // Fallback: log locally when API not configured
    console.log("[subscriber-fallback]", payload);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/subscribers error", e);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
