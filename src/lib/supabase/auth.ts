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

export async function createToken(user: AdminUser): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(
  token: string
): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.sub) return null;

    const { data } = await supabase
      .from("admin_users")
      .select("id, email, name, role")
      .eq("id", payload.sub)
      .single();

    return data;
  } catch {
    return null;
  }
}

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 8 * 60 * 60, // 8 hours
  };
}

export { COOKIE_NAME };
