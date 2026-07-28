import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import {
  verifyPassword,
  createToken,
  cookieOptions,
  COOKIE_NAME,
} from "@/lib/supabase/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Update last login
    await supabase
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    // Log activity
    await supabase.from("activity_log").insert({
      admin_id: user.id,
      action: "login",
      entity_type: "admin_users",
      entity_id: user.id,
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
    });

    const token = await createToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set(COOKIE_NAME, token, cookieOptions());
    return response;
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
