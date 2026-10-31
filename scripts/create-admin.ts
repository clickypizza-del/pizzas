#!/usr/bin/env npx tsx

import bcrypt from "bcryptjs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en el .env");
  process.exit(1);
}

const EMAIL = "admin@clickypizza.com.ar";
const PASSWORD = "clicky2024";
const NAME = "Admin Clicky";

async function main() {
  const hash = await bcrypt.hash(PASSWORD, 10);

  const res = await fetch(`${url}/rest/v1/admin_users`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      email: EMAIL,
      password_hash: hash,
      name: NAME,
      role: "admin",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Error:", res.status, body);
    process.exit(1);
  }

  console.log("Usuario admin creado:");
  console.log(`  Email:    ${EMAIL}`);
  console.log(`  Password: ${PASSWORD}`);
  console.log(`  URL:      https://clickypizza.com.ar/admin/login`);
}

main();
