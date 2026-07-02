import { NextResponse } from "next/server";

const API_URL = process.env.GOOGLE_SHEET_API_URL;
const API_KEY = process.env.GOOGLE_SHEET_API_KEY;

export async function GET(request: Request) {
  if (!API_URL || !API_KEY) {
    return NextResponse.json(
      { ok: false, error: "Catalog API not configured" },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "productos";

  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  url.searchParams.set("apiKey", API_KEY);

  for (const [key, value] of searchParams.entries()) {
    if (key !== "action" && key !== "apiKey") {
      url.searchParams.set(key, value);
    }
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `Upstream error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("[/api/catalog] Proxy error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch catalog" },
      { status: 502 }
    );
  }
}
