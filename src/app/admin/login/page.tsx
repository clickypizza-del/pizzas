"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/admin/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-red flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-brand text-2xl font-bold">CP</span>
          </div>
          <h1 className="font-brand text-2xl text-white mb-1">
            Click & Pizza
          </h1>
          <p className="text-sm text-white/40">Panel de administración</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand-red/50 transition-colors"
              placeholder="admin@clickypizza.com.ar"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand-red/50 transition-colors pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-red text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-brand-red/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-white/20 mt-6">
          Acceso restringido a administradores autorizados
        </p>
      </div>
    </div>
  );
}
