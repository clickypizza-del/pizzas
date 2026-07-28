import { NextResponse } from "next/server";
import { getSyncStatus, getSyncLogs, syncAllProducts } from "@/lib/sync-service";

export async function GET() {
  try {
    const [status, logs] = await Promise.all([getSyncStatus(), getSyncLogs()]);
    return NextResponse.json({ status, logs: logs.slice(0, 50) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al obtener estado de sincronización" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const logs = await syncAllProducts();
    const status = await getSyncStatus();
    return NextResponse.json({ status, logs });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al sincronizar" },
      { status: 500 }
    );
  }
}
