import { readJSON, writeJSON, generateId } from "@/lib/db";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getCatalogProducts,
  MetaApiError,
} from "@/lib/meta-client";
import { PIZZAS } from "@/lib/site-data";

type SyncLog = {
  id: string;
  productId: string;
  productName: string;
  action: "create" | "update" | "delete" | "sync_all" | "error";
  status: "pending" | "success" | "error";
  metaResponse?: Record<string, unknown>;
  errorMessage?: string;
  httpCode?: number;
  durationMs: number;
  createdAt: string;
};

type SyncStatus = {
  connected: boolean;
  lastSync: string | null;
  totalSynced: number;
  pendingCount: number;
  errorCount: number;
};

async function getSyncLogs(): Promise<SyncLog[]> {
  return readJSON<SyncLog>("sync-logs.json");
}

async function saveSyncLogs(logs: SyncLog[]): Promise<void> {
  await writeJSON("sync-logs.json", logs.slice(0, 500));
}

async function addLog(log: Omit<SyncLog, "id" | "createdAt">): Promise<SyncLog> {
  const logs = await getSyncLogs();
  const entry: SyncLog = {
    ...log,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  logs.unshift(entry);
  await saveSyncLogs(logs);
  return entry;
}

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (err instanceof MetaApiError && !err.isRetryable) {
        throw err;
      }

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  throw lastError!;
}

export async function syncProduct(
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    available: boolean;
  },
  metaProductId?: string
): Promise<SyncLog> {
  const start = Date.now();

  try {
    if (metaProductId) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clickypizza.com.ar";
      await withRetry(() =>
        updateProduct(metaProductId, {
          name: product.name,
          description: product.description,
          price: product.price * 100,
          currency: "ARS",
          availability: product.available ? "in stock" : "out of stock",
          image_url: product.image_url.startsWith("http")
            ? product.image_url
            : `${siteUrl}${product.image_url}`,
          category: product.category,
          url: `${siteUrl}/menu?cat=${product.category}`,
        })
      );
    } else {
      await withRetry(() => createProduct(product));
    }

    return addLog({
      productId: product.id,
      productName: product.name,
      action: metaProductId ? "update" : "create",
      status: "success",
      durationMs: Date.now() - start,
    });
  } catch (err) {
    const metaErr = err instanceof MetaApiError ? err : null;

    return addLog({
      productId: product.id,
      productName: product.name,
      action: metaProductId ? "update" : "create",
      status: "error",
      errorMessage: err instanceof Error ? err.message : String(err),
      httpCode: metaErr?.code,
      durationMs: Date.now() - start,
    });
  }
}

export async function syncDelete(
  productId: string,
  productName: string,
  metaProductId: string
): Promise<SyncLog> {
  const start = Date.now();

  try {
    await withRetry(() => deleteProduct(metaProductId));

    return addLog({
      productId,
      productName,
      action: "delete",
      status: "success",
      durationMs: Date.now() - start,
    });
  } catch (err) {
    return addLog({
      productId,
      productName,
      action: "delete",
      status: "error",
      errorMessage: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - start,
    });
  }
}

export async function syncAllProducts(): Promise<SyncLog[]> {
  const start = Date.now();
  const logs: SyncLog[] = [];

  try {
    const metaProducts = await getCatalogProducts();
    const metaMap = new Map(
      metaProducts.map((p: Record<string, unknown>) => [
        String(p.retailer_id),
        p,
      ])
    );

    const categories = await readJSON<{ id: string; slug: string; label: string }>(
      "categories.json"
    );
    const catMap = new Map(categories.map((c) => [c.id, c.slug]));

    const products = await readJSON<{
      id: string;
      name: string;
      slug: string;
      description_short: string;
      price: number;
      image_url: string;
      category_id: string;
      available: boolean;
      visible: boolean;
    }>("products.json");

    for (const product of products) {
      if (!product.visible) continue;

      const category = catMap.get(product.category_id) || "clasica";
      const existingMeta = metaMap.get(product.slug);

      const log = await syncProduct(
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description_short,
          price: product.price,
          image_url: product.image_url,
          category,
          available: product.available,
        },
        existingMeta ? String(existingMeta.id) : undefined
      );

      logs.push(log);
    }

    const deletedSlugs = new Set(products.map((p) => p.slug));
    for (const [slug, metaProduct] of metaMap.entries()) {
      if (!deletedSlugs.has(slug)) {
        const log = await syncDelete(
          String((metaProduct as Record<string, unknown>).id),
          String((metaProduct as Record<string, unknown>).name || slug),
          String((metaProduct as Record<string, unknown>).id)
        );
        logs.push(log);
      }
    }

    await addLog({
      productId: "all",
      productName: "Sincronización completa",
      action: "sync_all",
      status: "success",
      durationMs: Date.now() - start,
    });

    return logs;
  } catch (err) {
    await addLog({
      productId: "all",
      productName: "Sincronización completa",
      action: "sync_all",
      status: "error",
      errorMessage: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - start,
    });

    return logs;
  }
}

export async function getSyncStatus(): Promise<SyncStatus> {
  const { verifyConnection } = await import("@/lib/meta-client");
  const connection = await verifyConnection();

  const logs = await getSyncLogs();
  const lastSuccess = logs.find((l) => l.status === "success" && l.action === "sync_all");
  const synced = logs.filter((l) => l.status === "success" && l.action !== "sync_all");
  const errors = logs.filter((l) => l.status === "error");
  const pending = logs.filter((l) => l.status === "pending");

  return {
    connected: connection.connected,
    lastSync: lastSuccess?.createdAt || null,
    totalSynced: synced.length,
    pendingCount: pending.length,
    errorCount: errors.length,
  };
}

export { getSyncLogs, addLog };
