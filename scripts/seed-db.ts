#!/usr/bin/env node

/**
 * Seed script — populates Supabase with products from site-data.ts
 * Run: npx tsx scripts/seed-db.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const adminEmail = process.env.ADMIN_EMAIL || "admin@clickypizza.com.ar";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

async function seedAdmin() {
  console.log("🔑 Seeding admin user...");
  const hash = await bcrypt.hash(adminPassword, 10);
  const { error } = await supabase.from("admin_users").upsert(
    {
      email: adminEmail,
      password_hash: hash,
      name: "Admin",
      role: "admin",
    },
    { onConflict: "email" }
  );
  if (error) console.error("  Admin error:", error.message);
  else console.log(`  ✅ Admin: ${adminEmail}`);
}

async function seedProducts() {
  console.log("🍕 Seeding products...");

  // Get categories first
  const { data: cats } = await supabase.from("categories").select("id, slug");
  const catMap = new Map((cats || []).map((c) => [c.slug, c.id]));

  const products = [
    // Clásicas
    { name: "Muzzarella Clásica", slug: "muzzarella-clasica", cat: "clasica", price: 7200, desc: "Mozzarella fresca, salsa de tomate natural, aceite de oliva y orégano.", ingredients: ["Mozzarella fresca", "Salsa de tomate", "Aceite de oliva", "Orégano"], badge: null, featured: true },
    { name: "Clásica de Jamón", slug: "clasica-jamon", cat: "clasica", price: 7800, desc: "Mozzarella, jamón cocido, salsa de tomate y orégano.", ingredients: ["Mozzarella", "Jamón cocido", "Salsa de tomate", "Orégano"] },
    { name: "Fugazzeta", slug: "fugazzeta", cat: "clasica", price: 8200, desc: "Cebolla caramelizada, mozzarella y aceite de oliva.", ingredients: ["Cebolla", "Mozzarella", "Aceite de oliva"] },
    { name: "Cuatro Quesos", slug: "cuatro-quesos", cat: "clasica", price: 9000, desc: "Mozzarella, roquefort, parmesano y provolone.", ingredients: ["Mozzarella", "Roquefort", "Parmesano", "Provolone"] },
    { name: "Salame", slug: "salame", cat: "clasica", price: 8000, desc: "Mozzarella, salame industrial, salsa de tomate y orégano.", ingredients: ["Mozzarella", "Salame", "Salsa de tomate", "Orégano"], badge: "popular" },
    // Gourmet
    { name: "Azul", slug: "azul", cat: "gourmet", price: 9800, desc: "Mozzarella, queso azul, nueces y miel.", ingredients: ["Mozzarella", "Queso azul", "Nueces", "Miel"], badge: null },
    { name: "Especial Salame", slug: "especial-salame", cat: "gourmet", price: 9200, desc: "Mozzarella, salame premium, morrones y aceitunas.", ingredients: ["Mozzarella", "Salame premium", "Morrones", "Aceitunas"] },
    { name: "Cantimpalo", slug: "cantimpalo", cat: "gourmet", price: 9400, desc: "Mozzarella, chorizo cantimpalo, cebolla y pimentón.", ingredients: ["Mozzarella", "Chorizo cantimpalo", "Cebolla", "Pimentón"] },
    { name: "Lomo Gourmet", slug: "lomo-gourmet", cat: "gourmet", price: 9400, desc: "Mozzarella, lomo cortado finamente, hongos y provolone.", ingredients: ["Mozzarella", "Lomo", "Hongos", "Provolone"], badge: "nueva" },
    // Premium
    { name: "Mozzarella con Aceitunas", slug: "muzzarella-aceitunas", cat: "premium", price: 9600, desc: "Mozzarella fresca, aceitunas rellenas y albahaca.", ingredients: ["Mozzarella", "Aceitunas rellenas", "Albahaca"], maridaje: "Maridaje: Verdeo de Uco Valley" },
    { name: "Provolone con Orégano", slug: "provolone-oregano", cat: "premium", price: 9800, desc: "Provolone gratinado con orégano fresco y aceite de oliva.", ingredients: ["Provolone", "Orégano fresco", "Aceite de oliva"] },
    // Individuales
    { name: "Individual Muzzarella", slug: "individual-muzzarella", cat: "individual", price: 5200, desc: "Porción individual de muzzarella clásica.", ingredients: ["Mozzarella", "Salsa de tomate", "Orégano"] },
    { name: "Individual Jamón y Queso", slug: "individual-jamon-queso", cat: "individual", price: 5600, desc: "Porción individual de jamón y queso.", ingredients: ["Mozzarella", "Jamón cocido"] },
    // Mini pizzetas
    { name: "Mini Pizzetas Muzzarella (x6)", slug: "mini-pizzetas-muzzarella", cat: "mini-pizzeta", price: 4800, desc: "6 mini pizzetas de muzzarella.", ingredients: ["Mozzarella", "Salsa de tomate"] },
  ];

  let count = 0;
  for (const p of products) {
    const { error } = await supabase.from("products").upsert(
      {
        name: p.name,
        slug: p.slug,
        category_id: catMap.get(p.cat) || null,
        price: p.price,
        description_short: p.desc,
        ingredients: p.ingredients,
        badge: p.badge,
        featured: p.featured || false,
        visible: true,
        available: true,
        sort_order: count,
        image_url: `/pizzas/${p.slug.replace("clasica-jamon", "jamon").replace("clasica-", "")}.webp`,
      },
      { onConflict: "slug" }
    );
    if (!error) count++;
    else console.error(`  ${p.name}:`, error.message);
  }
  console.log(`  ✅ ${count} products seeded`);
}

async function main() {
  console.log("🚀 Seeding ClickyPizza database...\n");
  await seedAdmin();
  await seedProducts();
  console.log("\n✨ Done!");
}

main().catch(console.error);
