import { supabase } from "./supabase/client";

export { generateId, slugify };

function generateId(): string {
  return crypto.randomUUID();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const TABLE_MAP: Record<string, string> = {
  "products.json": "products",
  "categories.json": "categories",
  "promotions.json": "promotions",
  "settings.json": "business_settings",
  "users.json": "admin_users",
  "activity.json": "activity_log",
  "sync-logs.json": "sync_logs",
};

function tableName(key: string): string {
  const name = TABLE_MAP[key];
  if (!name) throw new Error(`Unknown table for key: ${key}`);
  return name;
}

export async function readJSON<T>(key: string): Promise<T[]> {
  const table = tableName(key);
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    console.error(`readJSON error [${table}]:`, error);
    return [];
  }
  return (data || []) as T[];
}

export async function writeJSON<T>(key: string, _data: T[]): Promise<void> {
  throw new Error(
    `writeJSON is deprecated. Use Supabase queries directly for table: ${tableName(key)}`
  );
}
