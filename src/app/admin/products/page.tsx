"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Eye,
  EyeOff,
  Star,
  Trash2,
  Pencil,
  Copy,
  Loader2,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  visible: boolean;
  featured: boolean;
  sold_out: boolean;
  badge: string | null;
  sort_order: number;
  view_count: number;
  whatsapp_clicks: number;
  categories: { label: string; slug: string } | null;
};

type Category = {
  id: string;
  label: string;
  slug: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterVisible, setFilterVisible] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterCategory !== "all") params.set("category", filterCategory);
    if (filterVisible !== "all") params.set("visible", filterVisible);

    const res = await fetch(`/admin/api/products?${params}`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, [filterCategory, filterVisible]);

  useEffect(() => {
    fetch("/admin/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`))
      return;
    setDeleting(id);
    await fetch(`/admin/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const handleDuplicate = async (product: Product) => {
    const { id, ...rest } = product;
    const res = await fetch("/admin/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...rest,
        name: `${product.name} (copia)`,
        slug: `${product.slug}-copia-${Date.now()}`,
        visible: false,
      }),
    });
    if (res.ok) fetchProducts();
  };

  const toggleVisibility = async (product: Product) => {
    const res = await fetch(`/admin/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !product.visible }),
    });
    if (res.ok) fetchProducts();
  };

  const toggleFeatured = async (product: Product) => {
    const res = await fetch(`/admin/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !product.featured }),
    });
    if (res.ok) fetchProducts();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-brand text-2xl sm:text-3xl text-white mb-1">
            Productos
          </h1>
          <p className="text-sm text-white/40">
            {products.length} productos en total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-red text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-brand-red/90 transition-all"
        >
          <Plus className="size-4" />
          Nuevo producto
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/30" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-red/50"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          value={filterVisible}
          onChange={(e) => setFilterVisible(e.target.value)}
          className="px-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50"
        >
          <option value="all">Todos</option>
          <option value="true">Visibles</option>
          <option value="false">Ocultos</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin size-8 border-2 border-brand-red border-t-transparent rounded-full" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-white/30">
          No se encontraron productos
        </div>
      ) : (
        <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wider hidden sm:table-cell">
                    Categoría
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wider hidden md:table-cell">
                    Estado
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/20 text-xs">
                            IMG
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-white">
                            {product.name}
                          </div>
                          {product.badge && (
                            <span className="text-[10px] text-brand-amber">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs text-white/40">
                        {product.categories?.label || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-bold text-white">
                        ${product.price.toLocaleString("es-AR")}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        {!product.visible && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/40">
                            OCULTO
                          </span>
                        )}
                        {product.sold_out && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400">
                            AGOTADO
                          </span>
                        )}
                        {product.featured && (
                          <Star className="size-3.5 text-brand-amber fill-brand-amber" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleVisibility(product)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                          title={product.visible ? "Ocultar" : "Mostrar"}
                        >
                          {product.visible ? (
                            <Eye className="size-4" />
                          ) : (
                            <EyeOff className="size-4" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleFeatured(product)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-brand-amber transition-colors"
                          title="Destacar"
                        >
                          <Star
                            className={`size-4 ${product.featured ? "fill-brand-amber text-brand-amber" : ""}`}
                          />
                        </button>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(product)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                          title="Duplicar"
                        >
                          <Copy className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deleting === product.id}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors disabled:opacity-50"
                          title="Eliminar"
                        >
                          {deleting === product.id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
