import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  try {
    const [productsResult, categoriesResult, promosResult, activityResult] =
      await Promise.all([
        supabase.from("products").select("*"),
        supabase.from("categories").select("*"),
        supabase.from("promotions").select("*"),
        supabase
          .from("activity_log")
          .select("*, admin_users(name)")
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

    const products = productsResult.data || [];
    const categories = categoriesResult.data || [];
    const promos = promosResult.data || [];
    const activity = activityResult.data || [];

    const stats = {
      totalProducts: products.length,
      visibleProducts: products.filter((p: Record<string, unknown>) => p.visible).length,
      hiddenProducts: products.filter((p: Record<string, unknown>) => !p.visible).length,
      featuredProducts: products.filter((p: Record<string, unknown>) => p.featured).length,
      soldOutProducts: products.filter((p: Record<string, unknown>) => p.sold_out).length,
      totalCategories: categories.length,
      activePromotions: promos.filter((p: Record<string, unknown>) => p.status === "active").length,
      inactivePromotions: promos.filter((p: Record<string, unknown>) => p.status === "inactive").length,
      scheduledPromotions: promos.filter((p: Record<string, unknown>) => p.status === "scheduled").length,
      totalViews: products.reduce(
        (sum: number, p: Record<string, unknown>) => sum + ((p.view_count as number) || 0),
        0
      ),
      totalWhatsappClicks: products.reduce(
        (sum: number, p: Record<string, unknown>) => sum + ((p.whatsapp_clicks as number) || 0),
        0
      ),
      totalOrderClicks: products.reduce(
        (sum: number, p: Record<string, unknown>) => sum + ((p.order_clicks as number) || 0),
        0
      ),
      averagePrice: products.length
        ? Math.round(
            products.reduce((sum: number, p: Record<string, unknown>) => sum + (p.price as number), 0) /
              products.length
          )
        : 0,
      discountedProducts: products.filter(
        (p: Record<string, unknown>) => (p.discount_percent as number) > 0
      ).length,
      categoriesBreakdown: categories.map((c: Record<string, unknown>) => ({
        id: c.id,
        label: c.label,
        count: products.filter(
          (p: Record<string, unknown>) => p.category_id === c.id
        ).length,
      })),
    };

    const topProducts = [...products]
      .sort(
        (a: Record<string, unknown>, b: Record<string, unknown>) =>
          ((b.view_count as number) || 0) - ((a.view_count as number) || 0)
      )
      .slice(0, 10)
      .map((p: Record<string, unknown>) => ({
        id: p.id,
        name: p.name || "",
        view_count: (p.view_count as number) || 0,
        whatsapp_clicks: (p.whatsapp_clicks as number) || 0,
        order_clicks: (p.order_clicks as number) || 0,
      }));

    return NextResponse.json({
      stats,
      recentActivity: activity,
      topProducts,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al cargar las estadísticas" },
      { status: 500 }
    );
  }
}
