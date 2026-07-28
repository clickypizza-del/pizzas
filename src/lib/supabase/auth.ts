import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { readJSON, writeJSON, generateId } from "../db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

const COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "8h";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  password_hash: string;
  last_login?: string;
  created_at: string;
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(user: {
  id: string;
  email: string;
  role: string;
}): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(
  token: string
): Promise<{ id: string; email: string; name: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.sub) return null;

    const users = await readJSON<AdminUser>("users.json");
    const user = users.find((u) => u.id === payload.sub);
    if (!user) return null;

    return { id: user.id, email: user.email, name: user.name, role: user.role };
  } catch {
    return null;
  }
}

export async function findUserByEmail(email: string): Promise<AdminUser | null> {
  const users = await readJSON<AdminUser>("users.json");
  return users.find((u) => u.email === email) || null;
}

export async function updateUserLogin(id: string): Promise<void> {
  const users = await readJSON<AdminUser>("users.json");
  const idx = users.findIndex((u) => u.id === id);
  if (idx !== -1) {
    users[idx].last_login = new Date().toISOString();
    await writeJSON("users.json", users);
  }
}

export async function logActivity(
  adminId: string,
  action: string,
  entityType: string,
  entityId?: string,
  details?: Record<string, unknown>,
  ip?: string
): Promise<void> {
  const activity = await readJSON<{
    id: string;
    admin_id: string;
    action: string;
    entity_type: string;
    entity_id?: string;
    details?: Record<string, unknown>;
    ip_address?: string;
    created_at: string;
  }>("activity.json");

  activity.unshift({
    id: generateId(),
    admin_id: adminId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details,
    ip_address: ip,
    created_at: new Date().toISOString(),
  });

  // Keep last 200 entries
  await writeJSON("activity.json", activity.slice(0, 200));
}

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 8 * 60 * 60,
  };
}

export { COOKIE_NAME };
