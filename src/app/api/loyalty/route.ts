import { NextRequest, NextResponse } from "next/server";

const LOYALTY_API_URL = process.env.LOYALTY_API_URL;
const LOYALTY_API_KEY = process.env.LOYALTY_API_KEY;

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");

  if (!phone) {
    return NextResponse.json({ error: "phone required" }, { status: 400 });
  }

  if (!LOYALTY_API_URL || !LOYALTY_API_KEY) {
    return NextResponse.json(
      { error: "Loyalty API not configured", url: !!LOYALTY_API_URL, key: !!LOYALTY_API_KEY },
      { status: 503 }
    );
  }

  try {
    const url = `${LOYALTY_API_URL}?action=get&phone=${encodeURIComponent(phone)}&key=${encodeURIComponent(LOYALTY_API_KEY)}`;
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "Accept": "application/json" },
    });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from Apps Script", raw: text.substring(0, 200) },
        { status: 502 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to connect to Apps Script", detail: String(err) },
      { status: 502 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { phone, name } = body;

  if (!phone) {
    return NextResponse.json({ error: "phone required" }, { status: 400 });
  }

  if (!LOYALTY_API_URL || !LOYALTY_API_KEY) {
    return NextResponse.json(
      { error: "Loyalty API not configured", url: !!LOYALTY_API_URL, key: !!LOYALTY_API_KEY },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(LOYALTY_API_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        action: "add Purchase",
        phone,
        name: name || "",
        key: LOYALTY_API_KEY,
      }),
    });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from Apps Script", raw: text.substring(0, 200) },
        { status: 502 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to connect to Apps Script", detail: String(err) },
      { status: 502 }
    );
  }
}
