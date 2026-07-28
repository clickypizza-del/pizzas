import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  try {
    const [
      productsResult,
      categoriesResult,
      promotionsResult,
      recentActivity,
      topProducts,
    ] = await Promise.all([
      supabase
        .from("products")
        .select("id, visible, featured, sold_out, category_id, view_count, whatsapp_clicks, order_clicks, price, discount_percent"),
      supabase.from("categories").select("id, label"),
      supabase.from("promotions").select("id, status"),
      supabase
        .from("activity_log")
        .select("*, admin_users(name)")
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("products")
        .select("id, name, view_count, whatsapp_clicks, order_clicks")
        .order("view_count", { ascending: false })
        .limit(10),
    ]);

    const products = productsResult.data || [];
    const categories = categoriesResult.data || [];
    const promotions = promotionsResult.data || [];

    const stats = {
      totalProducts: products.length,
      visibleProducts: products.filter((p) => p.visible).length,
      hiddenProducts: products.filter((p) => !p.visible).length,
      featuredProducts: products.filter((p) => p.featured).length,
      soldOutProducts: products.filter((p) => p.sold_out).length,
      totalCategories: categories.length,
      activePromotions: promotions.filter((p) => p.status === "active").length,
      inactivePromotions: promotions.filter((p) => p.status === "inactive").length,
      scheduledPromotions: promotions.filter((p) => p.status === "scheduled").length,
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

    return NextResponse.json({
      stats,
      recentActivity: recentActivity.data || [],
      topProducts: topProducts.data || [],
    });
  } catch {
    return NextResponse.json(
      { error: "Error al cargar las estadísticas" },
      { status: 500 }
    );
  }
}
