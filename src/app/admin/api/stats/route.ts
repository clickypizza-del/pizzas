import { NextResponse } from "next/server";
import { readJSON } from "@/lib/db";

type Product = {
  id: string;
  category_id: string;
  visible: boolean;
  featured: boolean;
  sold_out: boolean;
  price: number;
  discount_percent: number;
  view_count: number;
  whatsapp_clicks: number;
  order_clicks: number;
};

type Category = {
  id: string;
  label: string;
};

type Activity = {
  id: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, unknown>;
  created_at: string;
};

export async function GET() {
  try {
    const [products, categories, activity] = await Promise.all([
      readJSON<Product>("products.json"),
      readJSON<Category>("categories.json"),
      readJSON<Activity>("activity.json"),
    ]);

    const stats = {
      totalProducts: products.length,
      visibleProducts: products.filter((p) => p.visible).length,
      hiddenProducts: products.filter((p) => !p.visible).length,
      featuredProducts: products.filter((p) => p.featured).length,
      soldOutProducts: products.filter((p) => p.sold_out).length,
      totalCategories: categories.length,
      activePromotions: 0,
      inactivePromotions: 0,
      scheduledPromotions: 0,
      totalViews: products.reduce((sum, p) => sum + (p.view_count || 0), 0),
      totalWhatsappClicks: products.reduce(
        (sum, p) => sum + (p.whatsapp_clicks || 0),
        0
      ),
      totalOrderClicks: products.reduce(
        (sum, p) => sum + (p.order_clicks || 0),
        0
      ),
      averagePrice: products.length
        ? Math.round(
            products.reduce((sum, p) => sum + p.price, 0) / products.length
          )
        : 0,
      discountedProducts: products.filter((p) => p.discount_percent > 0).length,
      categoriesBreakdown: categories.map((c) => ({
        id: c.id,
        label: c.label,
        count: products.filter((p) => p.category_id === c.id).length,
      })),
    };

    // Count promotions from promotions.json
    const promos = await readJSON<{ status: string }>("promotions.json");
    stats.activePromotions = promos.filter((p) => p.status === "active").length;
    stats.inactivePromotions = promos.filter((p) => p.status === "inactive").length;
    stats.scheduledPromotions = promos.filter((p) => p.status === "scheduled").length;

    const topProducts = [...products]
      .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
      .slice(0, 10)
      .map((p) => ({
        id: p.id,
        name: (p as Product & { name: string }).name || "",
        view_count: p.view_count || 0,
        whatsapp_clicks: p.whatsapp_clicks || 0,
        order_clicks: p.order_clicks || 0,
      }));

    return NextResponse.json({
      stats,
      recentActivity: activity.slice(0, 20),
      topProducts,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al cargar las estadísticas" },
      { status: 500 }
    );
  }
}
