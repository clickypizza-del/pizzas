import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { supabase } from "./client";

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

    const { data: user } = await supabase
      .from("admin_users")
      .select("id, email, name, role")
      .eq("id", payload.sub)
      .single();

    if (!user) return null;
    return user as { id: string; email: string; name: string; role: string };
  } catch {
    return null;
  }
}

export async function findUserByEmail(email: string): Promise<AdminUser | null> {
  const { data } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .single();
  return (data as AdminUser) || null;
}

export async function updateUserLogin(id: string): Promise<void> {
  await supabase
    .from("admin_users")
    .update({ last_login: new Date().toISOString() })
    .eq("id", id);
}

export async function logActivity(
  adminId: string,
  action: string,
  entityType: string,
  entityId?: string,
  details?: Record<string, unknown>,
  ip?: string
): Promise<void> {
  await supabase.from("activity_log").insert({
    admin_id: adminId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details: details || null,
    ip_address: ip || null,
  });
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
