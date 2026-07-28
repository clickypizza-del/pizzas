import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function getRedis(): Promise<RedisClientType> {
  if (client && client.isOpen) return client;

  const url = process.env.REDIS_URL || process.env.KV_REST_API_URL;
  const token = process.env.REDIS_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url) {
    throw new Error("Missing REDIS_URL env var");
  }

  if (token) {
    client = createClient({ url, password: token }) as RedisClientType;
  } else {
    client = createClient({ url }) as RedisClientType;
  }

  client.on("error", (err) => console.error("Redis error:", err));
  await client.connect();
  return client;
}

export async function readJSON<T>(key: string): Promise<T[]> {
  try {
    const redis = await getRedis();
    const raw = await redis.get(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeJSON<T>(key: string, data: T[]): Promise<void> {
  const redis = await getRedis();
  await redis.set(key, JSON.stringify(data));
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
