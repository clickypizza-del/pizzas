"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  Loader2,
  X,
} from "lucide-react";

type Category = {
  id: string;
  slug: string;
  label: string;
  subtitle: string;
  emoji: string;
  accent_color: string;
  sort_order: number;
  visible: boolean;
};

const DEFAULT_CAT: Partial<Category> = {
  label: "",
  subtitle: "",
  emoji: "🍕",
  accent_color: "#C1121F",
  visible: true,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Category> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchCategories = () => {
    fetch("/admin/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!editing?.label) return;
    setSaving(true);

    const isNew = !editing.id;
    const url = isNew
      ? "/admin/api/categories"
      : `/admin/api/categories/${editing.id}`;
    const method = isNew ? "POST" : "PUT";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    setSaving(false);
    fetchCategories();
  };

  const handleDelete = async (id: string, label: string) => {
    if (
      !confirm(
        `¿Eliminar la categoría "${label}"? Los productos no se eliminarán.`
      )
    )
      return;
    await fetch(`/admin/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  const toggleVisibility = async (cat: Category) => {
    await fetch(`/admin/api/categories/${cat.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !cat.visible }),
    });
    fetchCategories();
  };

  const moveCategory = async (cat: Category, direction: "up" | "down") => {
    const idx = categories.findIndex((c) => c.id === cat.id);
    const target = direction === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= categories.length) return;

    const updated = [...categories];
    const [moved] = updated.splice(idx, 1);
    updated.splice(target, 0, moved);

    // Update sort orders
    const patches = updated.map((c, i) =>
      fetch(`/admin/api/categories/${c.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: i }),
      })
    );
    await Promise.all(patches);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-brand text-2xl sm:text-3xl text-white mb-1">
            Categorías
          </h1>
          <p className="text-sm text-white/40">
            {categories.length} categorías
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...DEFAULT_CAT })}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-red text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-brand-red/90 transition-all"
        >
          <Plus className="size-4" />
          Nueva categoría
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-brand text-lg text-white">
                {editing.id ? "Editar categoría" : "Nueva categoría"}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="text-white/40 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={editing.label || ""}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, label: e.target.value }))
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">
                    Emoji
                  </label>
                  <input
                    type="text"
                    value={editing.emoji || ""}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, emoji: e.target.value }))
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
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.visible ?? true}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, visible: e.target.checked }))
                  }
                  className="rounded border-white/20"
                />
                <span className="text-sm text-white/70">Visible</span>
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
                disabled={saving || !editing.label}
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
      ) : (
        <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="flex items-center gap-4 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
            >
              <GripVertical className="size-4 text-white/20 shrink-0" />

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => moveCategory(cat, "up")}
                  disabled={i === 0}
                  className="text-white/20 hover:text-white disabled:opacity-20 text-xs"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveCategory(cat, "down")}
                  disabled={i === categories.length - 1}
                  className="text-white/20 hover:text-white disabled:opacity-20 text-xs"
                >
                  ▼
                </button>
              </div>

              <span className="text-xl">{cat.emoji}</span>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">{cat.label}</div>
                {cat.subtitle && (
                  <div className="text-xs text-white/30">{cat.subtitle}</div>
                )}
              </div>

              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: cat.accent_color }}
              />

              <button
                onClick={() => toggleVisibility(cat)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                {cat.visible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOff className="size-4" />
                )}
              </button>

              <button
                onClick={() => setEditing(cat)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <Pencil className="size-4" />
              </button>

              <button
                onClick={() => handleDelete(cat.id, cat.label)}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
