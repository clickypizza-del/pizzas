"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Loader2,
  X,
  Upload,
} from "lucide-react";

type Promotion = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  start_date: string;
  end_date: string;
  button_text: string;
  button_url: string;
  badge: string;
  accent_color: string;
  status: "active" | "inactive" | "scheduled";
  featured: boolean;
  sort_order: number;
};

const DEFAULT_PROMO: Partial<Promotion> = {
  title: "",
  subtitle: "",
  description: "",
  image_url: "",
  button_text: "Ver más",
  button_url: "",
  badge: "",
  accent_color: "#C1121F",
  status: "active",
  featured: false,
};

const STATUS_LABELS: Record<string, string> = {
  active: "Activa",
  inactive: "Inactiva",
  scheduled: "Programada",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  inactive: "bg-white/10 text-white/40",
  scheduled: "bg-blue-500/20 text-blue-400",
};

export default function PromotionsPage() {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Promotion> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchPromos = () => {
    fetch("/admin/api/promotions")
      .then((r) => r.json())
      .then(setPromos)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "promotions");
    const res = await fetch("/admin/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setEditing((p) => ({ ...p, image_url: data.url }));
    setUploading(false);
  };

  const handleSave = async () => {
    if (!editing?.title) return;
    setSaving(true);

    const isNew = !editing.id;
    const url = isNew
      ? "/admin/api/promotions"
      : `/admin/api/promotions/${editing.id}`;
    const method = isNew ? "POST" : "PUT";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    setSaving(false);
    fetchPromos();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar la promoción "${title}"?`)) return;
    await fetch(`/admin/api/promotions/${id}`, { method: "DELETE" });
    fetchPromos();
  };

  const toggleStatus = async (promo: Promotion) => {
    const next =
      promo.status === "active"
        ? "inactive"
        : promo.status === "inactive"
          ? "active"
          : promo.status;
    await fetch(`/admin/api/promotions/${promo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    fetchPromos();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-brand text-2xl sm:text-3xl text-white mb-1">
            Promociones
          </h1>
          <p className="text-sm text-white/40">{promos.length} promociones</p>
        </div>
        <button
          onClick={() => setEditing({ ...DEFAULT_PROMO })}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-red text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-brand-red/90 transition-all"
        >
          <Plus className="size-4" />
          Nueva promoción
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-lg space-y-4 my-8">
            <div className="flex items-center justify-between">
              <h3 className="font-brand text-lg text-white">
                {editing.id ? "Editar promoción" : "Nueva promoción"}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="text-white/40 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Image */}
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                  Imagen
                </label>
                {editing.image_url ? (
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={editing.image_url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white cursor-pointer hover:bg-white/10">
                  {uploading ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <Upload className="size-3" />
                  )}
                  {uploading ? "Subiendo..." : "Subir imagen"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={editing.title || ""}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={editing.subtitle || ""}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, subtitle: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                  Descripción
                </label>
                <textarea
                  value={editing.description || ""}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                    Texto botón
                  </label>
                  <input
                    type="text"
                    value={editing.button_text || ""}
                    onChange={(e) =>
                      setEditing((p) => ({
                        ...p,
                        button_text: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                    URL botón
                  </label>
                  <input
                    type="text"
                    value={editing.button_url || ""}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, button_url: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={editing.badge || ""}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, badge: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                    Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editing.accent_color || "#C1121F"}
                      onChange={(e) =>
                        setEditing((p) => ({
                          ...p,
                          accent_color: e.target.value,
                        }))
                      }
                      className="w-10 h-10 rounded border border-white/10 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editing.accent_color || ""}
                      onChange={(e) =>
                        setEditing((p) => ({
                          ...p,
                          accent_color: e.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                    Fecha inicio
                  </label>
                  <input
                    type="date"
                    value={editing.start_date || ""}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, start_date: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                    Fecha fin
                  </label>
                  <input
                    type="date"
                    value={editing.end_date || ""}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, end_date: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                  Estado
                </label>
                <select
                  value={editing.status || "active"}
                  onChange={(e) =>
                    setEditing((p) => ({
                      ...p,
                      status: e.target.value as Promotion["status"],
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                >
                  <option value="active">Activa</option>
                  <option value="inactive">Inactiva</option>
                  <option value="scheduled">Programada</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.featured ?? false}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, featured: e.target.checked }))
                  }
                  className="rounded border-white/20"
                />
                <span className="text-sm text-white/70">Destacada</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editing.title}
                className="inline-flex items-center gap-2 px-5 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:bg-brand-red/90 disabled:opacity-50"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin size-8 border-2 border-brand-red border-t-transparent rounded-full" />
        </div>
      ) : promos.length === 0 ? (
        <div className="text-center py-12 text-white/30">
          No hay promociones creadas
        </div>
      ) : (
        <div className="space-y-3">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="bg-[#111111] border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-white/20 transition-colors"
            >
              {promo.image_url ? (
                <Image
                  src={promo.image_url}
                  alt={promo.title}
                  width={80}
                  height={45}
                  className="rounded-lg object-cover hidden sm:block"
                />
              ) : (
                <div className="w-20 h-12 rounded-lg bg-white/5 hidden sm:flex items-center justify-center text-white/20 text-xs">
                  IMG
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    {promo.title}
                  </span>
                  {promo.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-red/20 text-brand-red">
                      {promo.badge}
                    </span>
                  )}
                </div>
                {promo.subtitle && (
                  <div className="text-xs text-white/30 mt-0.5">
                    {promo.subtitle}
                  </div>
                )}
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-medium ${STATUS_COLORS[promo.status]}`}
              >
                {STATUS_LABELS[promo.status]}
              </span>

              {promo.start_date && (
                <span className="text-xs text-white/20 hidden md:block">
                  {promo.start_date}
                  {promo.end_date ? ` → ${promo.end_date}` : ""}
                </span>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleStatus(promo)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                >
                  {promo.status === "active" ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </button>
                <button
                  onClick={() => setEditing(promo)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(promo.id, promo.title)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
