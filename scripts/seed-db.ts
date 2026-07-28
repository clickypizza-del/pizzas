#!/usr/bin/env node

/**
 * Seed script — creates admin user + data files
 * Run: npx tsx scripts/seed-db.ts
 */

import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function seedAdmin() {
  console.log("🔑 Creando usuario admin...");
  const hash = await bcrypt.hash("admin123", 10);
  const users = [
    {
      id: "admin-001",
      email: "admin@clickypizza.com.ar",
      password_hash: hash,
      name: "Admin",
      role: "admin",
      last_login: null,
      created_at: new Date().toISOString(),
    },
  ];
  await fs.writeFile(
    path.join(DATA_DIR, "users.json"),
    JSON.stringify(users, null, 2)
  );
  console.log("  ✅ Admin: admin@clickypizza.com.ar / admin123");
}

async function main() {
  console.log("🚀 Seed de ClickyPizza...\n");
  await ensureDir();
  await seedAdmin();
  console.log("\n✨ Listo! Los archivos de datos ya existen en /data/");
}

main().catch(console.error);
