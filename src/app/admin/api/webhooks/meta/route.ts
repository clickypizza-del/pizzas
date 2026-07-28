import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || "clickypizza_webhook_2024";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verificación fallida" }, { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const entry = body.entry?.[0];
    const changes = entry?.changes || [];

    for (const change of changes) {
      const { field, value } = change;

      const logEntry = {
        source: "meta_webhook",
        field,
        value: JSON.stringify(value),
        receivedAt: new Date().toISOString(),
      };

      console.log("[Meta Webhook]", JSON.stringify(logEntry));
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
