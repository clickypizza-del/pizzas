"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Upload, Loader2, Save } from "lucide-react";

type Category = { id: string; label: string };

type ProductData = {
  name: string;
  category_id: string;
  description_short: string;
  description_full: string;
  ingredients: string;
  price: number;
  previous_price: number;
  discount_percent: number;
  badge: string;
  available: boolean;
  sold_out: boolean;
  featured: boolean;
  visible: boolean;
  stock: number;
  image_url: string;
  prep_time_minutes: number;
  delivery_time_minutes: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
};

const DEFAULT: ProductData = {
  name: "",
  category_id: "",
  description_short: "",
  description_full: "",
  ingredients: "",
  price: 0,
  previous_price: 0,
  discount_percent: 0,
  badge: "",
  available: true,
  sold_out: false,
  featured: false,
  visible: true,
  stock: 0,
  image_url: "",
  prep_time_minutes: 15,
  delivery_time_minutes: 30,
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
};

export default function ProductFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();

  const [form, setForm] = useState<ProductData>(DEFAULT);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/admin/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    if (!isNew) {
      fetch(`/admin/api/products/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({
            name: data.name || "",
            category_id: data.category_id || "",
            description_short: data.description_short || "",
            description_full: data.description_full || "",
            ingredients: (data.ingredients || []).join(", "),
            price: data.price || 0,
            previous_price: data.previous_price || 0,
            discount_percent: data.discount_percent || 0,
            badge: data.badge || "",
            available: data.available ?? true,
            sold_out: data.sold_out ?? false,
            featured: data.featured ?? false,
            visible: data.visible ?? true,
            stock: data.stock || 0,
            image_url: data.image_url || "",
            prep_time_minutes: data.prep_time_minutes || 15,
            delivery_time_minutes: data.delivery_time_minutes || 30,
            meta_title: data.meta_title || "",
            meta_description: data.meta_description || "",
            meta_keywords: (data.meta_keywords || []).join(", "),
          });
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "products");

    const res = await fetch("/admin/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      setForm((prev) => ({ ...prev, image_url: data.url }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      ingredients: form.ingredients
        ? form.ingredients.split(",").map((s: string) => s.trim())
        : [],
      meta_keywords: form.meta_keywords
        ? form.meta_keywords.split(",").map((s: string) => s.trim())
        : [],
    };

    const url = isNew ? "/admin/api/products" : `/admin/api/products/${id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Error al guardar");
      setSaving(false);
      return;
    }

    router.push("/admin/products");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin size-8 border-2 border-brand-red border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div>
          <h1 className="font-brand text-2xl text-white">
            {isNew ? "Nuevo producto" : "Editar producto"}
          </h1>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
          <h3 className="font-brand text-lg text-white mb-4">Imagen</h3>
          <div className="flex items-start gap-4">
            {form.image_url ? (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-white/5 shrink-0">
                <Image
                  src={form.image_url}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-xl bg-white/5 flex items-center justify-center text-white/20 text-xs shrink-0">
                Sin imagen
              </div>
            )}
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white cursor-pointer hover:bg-white/10 transition-colors">
                {uploading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
                {uploading ? "Subiendo..." : "Subir imagen"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-white/30 mt-2">
                JPG, PNG o WebP. Se convertirá automáticamente a WebP.
              </p>
              {form.image_url && (
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, image_url: "" }))}
                  className="text-xs text-red-400 hover:text-red-300 mt-2"
                >
                  Eliminar imagen
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="font-brand text-lg text-white">Información básica</h3>

          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
              Nombre *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
            />
          </div>

          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
              Categoría
            </label>
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm((p) => ({ ...p, category_id: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
            >
              <option value="">Sin categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
              Descripción corta
            </label>
            <input
              type="text"
              value={form.description_short}
              onChange={(e) =>
                setForm((p) => ({ ...p, description_short: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
              placeholder="Una línea descriptiva"
            />
          </div>

          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
              Descripción completa
            </label>
            <textarea
              value={form.description_full}
              onChange={(e) =>
                setForm((p) => ({ ...p, description_full: e.target.value }))
              }
              rows={3}
              className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
              Ingredientes (separados por coma)
            </label>
            <input
              type="text"
              value={form.ingredients}
              onChange={(e) =>
                setForm((p) => ({ ...p, ingredients: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
              placeholder="Mozzarella, tomate, albahaca"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
          <h3 className="font-brand text-lg text-white mb-4">Precios</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Precio actual *
              </label>
              <input
                type="number"
                required
                min={0}
                value={form.price}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    price: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Precio anterior
              </label>
              <input
                type="number"
                min={0}
                value={form.previous_price}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    previous_price: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Descuento %
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={form.discount_percent}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    discount_percent: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
          <h3 className="font-brand text-lg text-white mb-4">Estado</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: "visible", label: "Visible" },
              { key: "available", label: "Disponible" },
              { key: "featured", label: "Destacado" },
              { key: "sold_out", label: "Agotado" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 px-3 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg cursor-pointer hover:border-white/20 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={form[key as keyof ProductData] as boolean}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      [key]: e.target.checked,
                    }))
                  }
                  className="rounded border-white/20"
                />
                <span className="text-sm text-white/70">{label}</span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Badge
              </label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) =>
                  setForm((p) => ({ ...p, badge: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                placeholder="nueva, popular, etc."
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Stock
              </label>
              <input
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    stock: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Tiempo preparación (min)
              </label>
              <input
                type="number"
                min={0}
                value={form.prep_time_minutes}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    prep_time_minutes: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
          <h3 className="font-brand text-lg text-white mb-4">SEO</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Meta Title
              </label>
              <input
                type="text"
                value={form.meta_title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, meta_title: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                placeholder="Título para buscadores"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Meta Description
              </label>
              <textarea
                value={form.meta_description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, meta_description: e.target.value }))
                }
                rows={2}
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50 resize-none"
                placeholder="Descripción para buscadores (150-160 chars)"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Keywords (separadas por coma)
              </label>
              <input
                type="text"
                value={form.meta_keywords}
                onChange={(e) =>
                  setForm((p) => ({ ...p, meta_keywords: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
                placeholder="pizza, mendoza, gourmet"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-red text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-brand-red/90 transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
