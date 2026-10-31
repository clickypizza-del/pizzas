import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  const { data, error } = await supabase
    .from("backups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json([]);
  }

  return NextResponse.json(
    (data || []).map((b: Record<string, unknown>) => ({
      filename: b.filename,
      created_at: b.created_at,
    }))
  );
}

export async function POST() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `backup-${timestamp}.json`;

    const [productsResult, categoriesResult, promotionsResult, settingsResult, usersResult, activityResult] =
      await Promise.all([
        supabase.from("products").select("*"),
        supabase.from("categories").select("*"),
        supabase.from("promotions").select("*"),
        supabase.from("business_settings").select("*"),
        supabase.from("admin_users").select("id, email, name, role, last_login, created_at"),
        supabase.from("activity_log").select("*"),
      ]);

    const backupData = {
      version: "1.0",
      created_at: new Date().toISOString(),
      products: productsResult.data,
      categories: categoriesResult.data,
      promotions: promotionsResult.data,
      settings: settingsResult.data,
      users: usersResult.data,
      activity: activityResult.data,
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const sizeBytes = new TextEncoder().encode(jsonStr).length;

    const { data, error } = await supabase
      .from("backups")
      .insert({
        filename,
        size_bytes: sizeBytes,
        status: "completed",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        filename,
        size_bytes: sizeBytes,
        status: "completed",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al crear el backup" },
      { status: 500 }
    );
  }
}
