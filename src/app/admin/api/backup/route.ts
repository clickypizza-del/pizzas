import { NextResponse } from "next/server";
import { readJSON } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

// GET list backups
export async function GET() {
  const backupDir = path.join(process.cwd(), "data", "backups");
  try {
    const files = await fs.readdir(backupDir);
    const backups = files
      .filter((f) => f.endsWith(".json"))
      .map((f) => ({
        filename: f,
        created_at: f,
      }))
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 20);
    return NextResponse.json(backups);
  } catch {
    return NextResponse.json([]);
  }
}

// POST create backup
export async function POST() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `backup-${timestamp}.json`;

    const [products, categories, promotions, settings, users, activity] =
      await Promise.all([
        readJSON("products.json"),
        readJSON("categories.json"),
        readJSON("promotions.json"),
        readJSON("settings.json"),
        readJSON("users.json"),
        readJSON("activity.json"),
      ]);

    const backupData = {
      version: "1.0",
      created_at: new Date().toISOString(),
      products,
      categories,
      promotions,
      settings,
      users: users.map((u: Record<string, unknown>) => {
        const { password_hash, ...rest } = u;
        return rest;
      }),
      activity,
    };

    const backupDir = path.join(process.cwd(), "data", "backups");
    try {
      await fs.access(backupDir);
    } catch {
      await fs.mkdir(backupDir, { recursive: true });
    }

    const filePath = path.join(backupDir, filename);
    await fs.writeFile(filePath, JSON.stringify(backupData, null, 2), "utf-8");

    return NextResponse.json(
      {
        filename,
        size_bytes: (await fs.stat(filePath)).size,
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
