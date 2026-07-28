import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// GET list backups
export async function GET() {
  const { data, error } = await supabase
    .from("backups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST create backup
export async function POST() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `backup-${timestamp}.json`;

    // Export all data
    const [products, categories, promotions, settings, admins] =
      await Promise.all([
        supabase.from("products").select("*"),
        supabase.from("categories").select("*"),
        supabase.from("promotions").select("*"),
        supabase.from("business_settings").select("*"),
        supabase.from("admin_users").select("id, email, name, role, created_at"),
      ]);

    const backupData = {
      version: "1.0",
      created_at: new Date().toISOString(),
      products: products.data || [],
      categories: categories.data || [],
      promotions: promotions.data || [],
      business_settings: settings.data || [],
      admin_users: admins.data || [],
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const buffer = Buffer.from(jsonStr);

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("backups")
      .upload(filename, buffer, {
        contentType: "application/json",
      });

    if (uploadError) {
      throw uploadError;
    }

    // Record backup
    const { data: backup, error: dbError } = await supabase
      .from("backups")
      .insert({
        filename,
        size_bytes: buffer.length,
        status: "completed",
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    await supabase.from("activity_log").insert({
      action: "backup_created",
      entity_type: "backup",
      entity_id: backup.id,
      details: { filename, size: buffer.length },
    });

    return NextResponse.json(backup, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Error creating backup" },
      { status: 500 }
    );
  }
}
