#!/usr/bin/env node

/**
 * Seed script — populates Redis with initial data
 * Run: REDIS_URL=redis://... npx tsx scripts/seed-db.ts
 */

import { createClient } from "redis";
import bcrypt from "bcryptjs";

const REDIS_URL = process.env.REDIS_URL;
const REDIS_TOKEN = process.env.REDIS_TOKEN;

if (!REDIS_URL) {
  console.error("❌ Missing REDIS_URL env var");
  process.exit(1);
}

async function main() {
  console.log("🚀 Seed de ClickyPizza...\n");

  const redis = REDIS_TOKEN
    ? createClient({ url: REDIS_URL, password: REDIS_TOKEN })
    : createClient({ url: REDIS_URL });

  redis.on("error", (err) => console.error("Redis error:", err));
  await redis.connect();

  // Seed admin user
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
  await redis.set("users", JSON.stringify(users));
  console.log("  ✅ admin@clickypizza.com.ar / admin123");

  // Seed categories
  console.log("📂 Creando categorías...");
  const categories = [
    { id: "cat-clasica", slug: "clasica", label: "Clásicas", subtitle: "Las favoritas de siempre", emoji: "🍕", accent_color: "#C1121F", sort_order: 0, visible: true },
    { id: "cat-gourmet", slug: "gourmet", label: "Gourmet", subtitle: "Sabores que te sorprenden", emoji: "🧀", accent_color: "#D4A574", sort_order: 1, visible: true },
    { id: "cat-premium", slug: "premium", label: "Premium & Especialidades", subtitle: "Lo mejor de nuestra cocina", emoji: "👨‍🍳", accent_color: "#FFD700", sort_order: 2, visible: true },
    { id: "cat-individual", slug: "individual", label: "Individuales", subtitle: "Porque a veces querés todo para vos", emoji: "👤", accent_color: "#4CAF50", sort_order: 3, visible: true },
    { id: "cat-mini", slug: "mini-pizzeta", label: "Mini Pizzetas", subtitle: "Para picar y compartir", emoji: "✨", accent_color: "#9C27B0", sort_order: 4, visible: true },
  ];
  await redis.set("categories", JSON.stringify(categories));
  console.log(`  ✅ ${categories.length} categorías`);

  // Seed products
  console.log("🍕 Creando productos...");
  const products = [
    { id: "prod-001", slug: "muzzarella-clasica", name: "Muzzarella Clásica", category_id: "cat-clasica", description_short: "Mozzarella fresca, salsa de tomate natural, aceite de oliva y orégano.", ingredients: ["Mozzarella fresca", "Salsa de tomate", "Aceite de oliva", "Orégano"], price: 7200, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: true, visible: true, stock: 0, image_url: "/pizzas/muzza.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 0, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-002", slug: "clasica-jamon", name: "Clásica de Jamón", category_id: "cat-clasica", description_short: "Mozzarella, jamón cocido, salsa de tomate y orégano.", ingredients: ["Mozzarella", "Jamón cocido", "Salsa de tomate", "Orégano"], price: 7800, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/jamon.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 1, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-003", slug: "fugazzeta", name: "Fugazzeta", category_id: "cat-clasica", description_short: "Cebolla caramelizada, mozzarella y aceite de oliva.", ingredients: ["Cebolla", "Mozzarella", "Aceite de oliva"], price: 8200, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/fugazzeta.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 2, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-004", slug: "cuatro-quesos", name: "Cuatro Quesos", category_id: "cat-clasica", description_short: "Mozzarella, roquefort, parmesano y provolone.", ingredients: ["Mozzarella", "Roquefort", "Parmesano", "Provolone"], price: 9000, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/cuatro-quesos.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 3, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-005", slug: "salame", name: "Salame", category_id: "cat-clasica", description_short: "Mozzarella, salame industrial, salsa de tomate y orégano.", ingredients: ["Mozzarella", "Salame", "Salsa de tomate", "Orégano"], price: 8000, previous_price: 0, discount_percent: 0, badge: "popular", available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/salame.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 4, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-006", slug: "azul", name: "Azul", category_id: "cat-gourmet", description_short: "Mozzarella, queso azul, nueces y miel.", ingredients: ["Mozzarella", "Queso azul", "Nueces", "Miel"], price: 9800, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/azul.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 5, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-007", slug: "especial-salame", name: "Especial Salame", category_id: "cat-gourmet", description_short: "Mozzarella, salame premium, morrones y aceitunas.", ingredients: ["Mozzarella", "Salame premium", "Morrones", "Aceitunas"], price: 9200, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/especial-salame.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 6, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-008", slug: "cantimpalo", name: "Cantimpalo", category_id: "cat-gourmet", description_short: "Mozzarella, chorizo cantimpalo, cebolla y pimentón.", ingredients: ["Mozzarella", "Chorizo cantimpalo", "Cebolla", "Pimentón"], price: 9400, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/azul.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 7, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-009", slug: "lomo-gourmet", name: "Lomo Gourmet", category_id: "cat-gourmet", description_short: "Mozzarella, lomo cortado finamente, hongos y provolone.", ingredients: ["Mozzarella", "Lomo", "Hongos", "Provolone"], price: 9400, previous_price: 0, discount_percent: 0, badge: "nueva", available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/lomo-gourmet.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 8, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-010", slug: "muzzarella-aceitunas", name: "Mozzarella con Aceitunas", category_id: "cat-premium", description_short: "Mozzarella fresca, aceitunas rellenas y albahaca.", ingredients: ["Mozzarella", "Aceitunas rellenas", "Albahaca"], price: 9600, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/muzzarella-aceitunas.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 9, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-011", slug: "provolone-oregano", name: "Provolone con Orégano", category_id: "cat-premium", description_short: "Provolone gratinado con orégano fresco y aceite de oliva.", ingredients: ["Provolone", "Orégano fresco", "Aceite de oliva"], price: 9800, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/provolone-oregano.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 10, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-012", slug: "individual-muzzarella", name: "Individual Muzzarella", category_id: "cat-individual", description_short: "Porción individual de muzzarella clásica.", ingredients: ["Mozzarella", "Salsa de tomate", "Orégano"], price: 5200, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/invividual1.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 11, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-013", slug: "individual-jamon-queso", name: "Individual Jamón y Queso", category_id: "cat-individual", description_short: "Porción individual de jamón y queso.", ingredients: ["Mozzarella", "Jamón cocido"], price: 5600, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/invividual1.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 12, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
    { id: "prod-014", slug: "mini-pizzetas-muzzarella", name: "Mini Pizzetas Muzzarella (x6)", category_id: "cat-mini", description_short: "6 mini pizzetas de muzzarella.", ingredients: ["Mozzarella", "Salsa de tomate"], price: 4800, previous_price: 0, discount_percent: 0, badge: null, available: true, sold_out: false, featured: false, visible: true, stock: 0, image_url: "/pizzas/mini-pizzetas.webp", prep_time_minutes: 15, delivery_time_minutes: 30, sort_order: 13, meta_title: "", meta_description: "", meta_keywords: [], view_count: 0, whatsapp_clicks: 0, order_clicks: 0 },
  ];
  await redis.set("products", JSON.stringify(products));
  console.log(`  ✅ ${products.length} productos`);

  // Seed promotions
  console.log("📣 Creando promociones...");
  const promotions = [
    { id: "promo-001", title: "Noche Clicky", subtitle: "La excusa perfecta para compartir", description: "Elegí tus sabores favoritos y disfrutá una cena gourmet en casa.", image_url: "/pizzas/muzza.webp", start_date: "", end_date: "", button_text: "Pedir por WhatsApp", button_url: "", badge: "Combo especial", accent_color: "#C1121F", status: "active", featured: true, sort_order: 0 },
    { id: "promo-002", title: "Combo Familiar", subtitle: "Para compartir en familia", description: "4 pizzas gourmet para compartir en familia.", image_url: "/pizzas/cuatro-quesos.webp", start_date: "", end_date: "", button_text: "Armar mi combo", button_url: "", badge: "Para compartir", accent_color: "#D4A574", status: "active", featured: false, sort_order: 1 },
    { id: "promo-003", title: "Mix de Sabores", subtitle: "Mix & Match", description: "Armá tu mix con 3 variedades distintas.", image_url: "/pizzas/especial-salame.webp", start_date: "", end_date: "", button_text: "Elegir mis sabores", button_url: "", badge: "Mix & Match", accent_color: "#9C27B0", status: "active", featured: false, sort_order: 2 },
    { id: "promo-004", title: "Promo Club Clicky", subtitle: "Exclusivo para clientes frecuentes", description: "Sumá 10 pedidos y regalamos una pizza Muzzarella Clásica.", image_url: "/pizzas/lomo-gourmet.webp", start_date: "", end_date: "", button_text: "Unirme al Club", button_url: "/club-clicky", badge: "Exclusivo", accent_color: "#4CAF50", status: "active", featured: false, sort_order: 3 },
  ];
  await redis.set("promotions", JSON.stringify(promotions));
  console.log(`  ✅ ${promotions.length} promociones`);

  // Seed settings
  console.log("⚙️ Creando configuración...");
  const settings = [
    { key: "phone", value: "542612545724" },
    { key: "phone_display", value: "+54 9 261 254-5724" },
    { key: "email", value: "info@clickypizza.com.ar" },
    { key: "address", value: "Mendoza, Argentina" },
    { key: "instagram", value: "click_y_pizza" },
    { key: "hero_title", value: "Pizzas artesanales listas para horno" },
    { key: "hero_subtitle", value: "Sin cocinar, sin ensuciar. La mejor pizza de casa, lista en minutos." },
  ];
  await redis.set("settings", JSON.stringify(settings));
  console.log(`  ✅ ${settings.length} ajustes`);

  // Empty activity log
  await redis.set("activity", JSON.stringify([]));

  await redis.disconnect();
  console.log("\n✨ Listo! Datos cargados en Redis.");
}

main().catch(console.error);
