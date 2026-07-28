"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Database, Download } from "lucide-react";

type Settings = Record<string, string>;

const SETTING_FIELDS = [
  { key: "phone", label: "WhatsApp (E.164)", placeholder: "542612545724" },
  { key: "phone_display", label: "WhatsApp visible", placeholder: "+54 9 261 254-5724" },
  { key: "email", label: "Email", placeholder: "info@clickypizza.com.ar" },
  { key: "address", label: "Dirección", placeholder: "Mendoza, Argentina" },
  { key: "instagram", label: "Instagram", placeholder: "click_y_pizza" },
  { key: "hero_title", label: "Hero título", placeholder: "Pizzas artesanales..." },
  { key: "hero_subtitle", label: "Hero subtítulo", placeholder: "Sin cocinar..." },
  { key: "analytics_ga", label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX" },
  { key: "analytics_gtm", label: "Google Tag Manager", placeholder: "GTM-XXXXXXX" },
  { key: "analytics_meta_pixel", label: "Meta Pixel ID", placeholder: "123456789" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [backing, setBacking] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/admin/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    await fetch("/admin/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setMessage("Configuración guardada");
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleBackup = async () => {
    setBacking(true);
    const res = await fetch("/admin/api/backup", { method: "POST" });
    const data = await res.json();
    if (data.filename) {
      setMessage(`Backup creado: ${data.filename}`);
    } else {
      setMessage("Error al crear backup");
    }
    setBacking(false);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleExport = async () => {
    const res = await fetch("/admin/api/stats");
    const data = await res.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clickypizza-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-brand text-2xl sm:text-3xl text-white mb-1">
          Configuración
        </h1>
        <p className="text-sm text-white/40">
          Información del negocio y ajustes generales
        </p>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            message.includes("Error")
              ? "bg-red-500/10 border border-red-500/20 text-red-400"
              : "bg-green-500/10 border border-green-500/20 text-green-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* Business info */}
      <div className="bg-[#111111] border border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="font-brand text-lg text-white">Información del negocio</h3>
        {SETTING_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
              {field.label}
            </label>
            <input
              type="text"
              value={settings[field.key] || ""}
              onChange={(e) =>
                setSettings((p) => ({ ...p, [field.key]: e.target.value }))
              }
              placeholder={field.placeholder}
              className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand-red/50"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-brand-red/90 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>

      {/* Backups */}
      <div className="bg-[#111111] border border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="font-brand text-lg text-white">Backups</h3>
        <p className="text-sm text-white/40">
          Creá copias de seguridad de tu catálogo completo.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleBackup}
            disabled={backing}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {backing ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Database className="size-4" />
            )}
            {backing ? "Creando..." : "Crear backup ahora"}
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all"
          >
            <Download className="size-4" />
            Exportar datos (JSON)
          </button>
        </div>
      </div>
    </div>
  );
}
