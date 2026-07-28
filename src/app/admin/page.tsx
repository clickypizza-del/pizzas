"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Tags,
  Megaphone,
  Eye,
  MessageCircle,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Star,
  Clock,
} from "lucide-react";

type Stats = {
  totalProducts: number;
  visibleProducts: number;
  hiddenProducts: number;
  featuredProducts: number;
  soldOutProducts: number;
  totalCategories: number;
  activePromotions: number;
  inactivePromotions: number;
  scheduledPromotions: number;
  totalViews: number;
  totalWhatsappClicks: number;
  totalOrderClicks: number;
  averagePrice: number;
  discountedProducts: number;
  categoriesBreakdown: { id: string; label: string; count: number }[];
};

type Activity = {
  id: string;
  action: string;
  entity_type: string;
  details: Record<string, unknown>;
  created_at: string;
  admin_users: { name: string } | null;
};

type TopProduct = {
  id: string;
  name: string;
  view_count: number;
  whatsapp_clicks: number;
  order_clicks: number;
};

type StatsResponse = {
  stats: Stats;
  recentActivity: Activity[];
  topProducts: TopProduct[];
};

function StatCard({
  label,
  value,
  icon: Icon,
  color = "text-brand-red",
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 sm:p-5 hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <Icon className={`size-5 ${color}`} />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
        {typeof value === "number" ? value.toLocaleString("es-AR") : value}
      </div>
      <div className="text-xs text-white/40 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

function formatAction(action: string) {
  const map: Record<string, string> = {
    create: "Creó",
    update: "Actualizó",
    delete: "Eliminó",
    login: "Inició sesión",
    backup_created: "Creó backup",
  };
  return map[action] || action;
}

function formatEntity(type: string) {
  const map: Record<string, string> = {
    product: "producto",
    category: "categoría",
    promotion: "promoción",
    backup: "backup",
    admin_users: "usuario",
  };
  return map[type] || type;
}

export default function AdminDashboard() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin/api/stats")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin size-8 border-2 border-brand-red border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-white/40">
        Error al cargar estadísticas
      </div>
    );
  }

  const { stats, recentActivity, topProducts } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-brand text-2xl sm:text-3xl text-white mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-white/40">Resumen de tu catálogo</p>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <StatCard
          label="Productos totales"
          value={stats.totalProducts}
          icon={Package}
        />
        <StatCard
          label="Categorías"
          value={stats.totalCategories}
          icon={Tags}
          color="text-purple-400"
        />
        <StatCard
          label="Promos activas"
          value={stats.activePromotions}
          icon={Megaphone}
          color="text-green-400"
        />
        <StatCard
          label="Destacados"
          value={stats.featuredProducts}
          icon={Star}
          color="text-brand-amber"
        />
        <StatCard
          label="Total vistas"
          value={stats.totalViews}
          icon={Eye}
          color="text-blue-400"
        />
        <StatCard
          label="Clicks WhatsApp"
          value={stats.totalWhatsappClicks}
          icon={MessageCircle}
          color="text-green-400"
        />
        <StatCard
          label="Clicks pedidos"
          value={stats.totalOrderClicks}
          icon={ShoppingCart}
          color="text-orange-400"
        />
        <StatCard
          label="Precio promedio"
          value={`$${stats.averagePrice.toLocaleString("es-AR")}`}
          icon={TrendingUp}
          color="text-brand-gold"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Ocultos"
          value={stats.hiddenProducts}
          icon={Eye}
          color="text-white/30"
        />
        <StatCard
          label="Agotados"
          value={stats.soldOutProducts}
          icon={AlertTriangle}
          color="text-red-400"
        />
        <StatCard
          label="En oferta"
          value={stats.discountedProducts}
          icon={TrendingUp}
          color="text-green-400"
        />
        <StatCard
          label="Programadas"
          value={stats.scheduledPromotions}
          icon={Clock}
          color="text-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Categories breakdown */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
          <h3 className="font-brand text-lg text-white mb-4">
            Productos por categoría
          </h3>
          <div className="space-y-3">
            {stats.categoriesBreakdown.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <span className="text-sm text-white/60">{cat.label}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-red rounded-full"
                      style={{
                        width: `${
                          stats.totalProducts
                            ? (cat.count / stats.totalProducts) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white w-6 text-right">
                    {cat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
          <h3 className="font-brand text-lg text-white mb-4">
            Productos más vistos
          </h3>
          <div className="space-y-3">
            {topProducts.length === 0 && (
              <p className="text-sm text-white/30">Sin datos aún</p>
            )}
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs text-white/20 w-5">{i + 1}</span>
                <span className="text-sm text-white/80 flex-1 truncate">
                  {p.name}
                </span>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span title="Vistas">
                    <Eye className="size-3 inline" /> {p.view_count || 0}
                  </span>
                  <span title="WhatsApp">
                    <MessageCircle className="size-3 inline" />{" "}
                    {p.whatsapp_clicks || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
        <h3 className="font-brand text-lg text-white mb-4">
          Actividad reciente
        </h3>
        <div className="space-y-2">
          {recentActivity.length === 0 && (
            <p className="text-sm text-white/30">Sin actividad aún</p>
          )}
          {recentActivity.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 text-sm py-2 border-b border-white/5 last:border-0"
            >
              <span className="text-white/40">
                {formatAction(a.action)} un{" "}
                {formatEntity(a.entity_type)}
              </span>
              {a.admin_users?.name && (
                <span className="text-white/20">por {a.admin_users.name}</span>
              )}
              <span className="text-white/15 ml-auto text-xs">
                {new Date(a.created_at).toLocaleString("es-AR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
