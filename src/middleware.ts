import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

const ADMIN_ROUTES = ["/admin"];
const PUBLIC_ADMIN = ["/admin/login", "/admin/api"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-admin routes
  if (!ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // Allow public admin routes (login, API)
  if (PUBLIC_ADMIN.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // Check token
  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("admin_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
