import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";

type Setting = {
  key: string;
  value: string;
};

// GET all settings
export async function GET() {
  const settings = await readJSON<Setting>("settings.json");
  const result: Record<string, string> = {};
  settings.forEach((s) => {
    result[s.key] = s.value;
  });
  return NextResponse.json(result);
}

// PUT update settings (bulk)
export async function PUT(request: NextRequest) {
  try {
    const incoming = await request.json();
    const settings = await readJSON<Setting>("settings.json");

    for (const [key, value] of Object.entries(incoming)) {
      const idx = settings.findIndex((s) => s.key === key);
      if (idx !== -1) {
        settings[idx].value = String(value);
      } else {
        settings.push({ key, value: String(value) });
      }
    }

    await writeJSON("settings.json", settings);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar la configuración" },
      { status: 500 }
    );
  }
}
