const META_API_BASE = "https://graph.facebook.com/v19.0";

type MetaConfig = {
  accessToken: string;
  businessId: string;
  catalogId: string;
  pixelId?: string;
  appId?: string;
  appSecret?: string;
};

function getConfig(): MetaConfig {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const businessId = process.env.META_BUSINESS_ID;
  const catalogId = process.env.META_CATALOG_ID;

  if (!accessToken || !businessId || !catalogId) {
    throw new Error(
      "Faltan variables de entorno: META_ACCESS_TOKEN, META_BUSINESS_ID, META_CATALOG_ID"
    );
  }

  return {
    accessToken,
    businessId,
    catalogId,
    pixelId: process.env.META_PIXEL_ID,
    appId: process.env.META_APP_ID,
    appSecret: process.env.META_APP_SECRET,
  };
}

async function metaFetch(path: string, options: RequestInit = {}) {
  const config = getConfig();
  const url = `${META_API_BASE}${path}${path.includes("?") ? "&" : "?"}access_token=${config.accessToken}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (data.error) {
    const err = data.error as { code: number; message: string; type: string };
    throw new MetaApiError(err.code, err.message, err.type);
  }

  return data;
}

export class MetaApiError extends Error {
  code: number;
  type: string;

  constructor(code: number, message: string, type: string) {
    super(message);
    this.code = code;
    this.type = type;
    this.name = "MetaApiError";
  }

  get isRetryable() {
    return [429, 500, 502, 503, 504].includes(this.code);
  }
}

export type MetaProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  availability: string;
  image_url: string;
  category: string;
  url: string;
  retailer_id: string;
};

export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  slug: string;
  available: boolean;
}) {
  const config = getConfig();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clickypizza.com.ar";

  return metaFetch(`/${config.catalogId}/products`, {
    method: "POST",
    body: JSON.stringify({
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
      retailer_id: product.slug,
    }),
  });
}

export async function updateProduct(
  metaProductId: string,
  updates: Record<string, unknown>
) {
  return metaFetch(`/${metaProductId}`, {
    method: "POST",
    body: JSON.stringify(updates),
  });
}

export async function deleteProduct(metaProductId: string) {
  return metaFetch(`/${metaProductId}`, {
    method: "DELETE",
  });
}

export async function getCatalogProducts() {
  const config = getConfig();
  const data = await metaFetch(
    `/${config.catalogId}/products?fields=id,name,retailer_id,price,availability,image_url,category,url,updated_time`
  );
  return data.data || [];
}

export async function verifyConnection() {
  try {
    const config = getConfig();
    const data = await metaFetch(`/${config.catalogId}?fields=id,name`);
    return { connected: true, catalog: data };
  } catch (err) {
    return {
      connected: false,
      error: err instanceof Error ? err.message : "Error desconocido",
    };
  }
}

export async function refreshAccessToken() {
  const config = getConfig();
  if (!config.appId || !config.appSecret) {
    throw new Error("Falta META_APP_ID o META_APP_SECRET para refrescar el token");
  }

  const res = await fetch(
    `${META_API_BASE}/oauth/access_token?grant_type=fb_exchange_token&client_id=${config.appId}&client_secret=${config.appSecret}&fb_exchange_token=${config.accessToken}`
  );
  const data = await res.json();

  if (data.error) {
    throw new MetaApiError(data.error.code, data.error.message, data.error.type);
  }

  return data.access_token;
}

export { getConfig, META_API_BASE };
