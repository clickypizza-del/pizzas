/**
 * Central content for the Click & Pizza landing page.
 * Keeping copy + structure here makes the section components declarative
 * and lets non-devs update messaging in a single place.
 */

export const SITE = {
  name: "Click & Pizza",
  phone: "542612545724", // E.164 without "+"
  phoneDisplay: "+54 9 261 254-5724",
  instagram: "cklic_y_pizza",
  instagramUrl: "https://instagram.com/cklic_y_pizza",
  whatsappText:
    "¡Hola Click & Pizza! Quería hacer una consulta sobre las pizzas.",
  qrUrl: "https://i.postimg.cc/N5x2nk1P/qr-code.png",
  logoUrl: "https://i.postimg.cc/QFxKZKbn/logo-click.png",
} as const;

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "#filosofia", label: "Filosofía" },
  { href: "#menu", label: "Menú" },
  { href: "#freezer", label: "Catálogo" },
  { href: "#suscripcion", label: "Suscripción" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#zonas", label: "Zonas" },
  { href: "#pedidos", label: "Pedidos" },
  { href: "#faq", label: "FAQ" },
];

export type Feature = {
  title: string;
  description: string;
  icon:
    | "clock"
    | "sparkles"
    | "snowflake"
    | "truck"
    | "leaf"
    | "wallet";
};

export const FEATURES: Feature[] = [
  {
    title: "Lista en 15 minutos",
    description:
      "Del congelador al horno. Sin descongelar, sin esperar. Pizza perfecta en menos de 15 minutos.",
    icon: "clock",
  },
  {
    title: "Ingredientes premium",
    description:
      "Mozzarella fresca, tomates naturales, fiambres de calidad e ingredientes 100% naturales.",
    icon: "sparkles",
  },
  {
    title: "Congelación flash",
    description:
      "Tecnología IQF que preserva sabor, textura y nutrientes como si recién saliera del horno.",
    icon: "snowflake",
  },
  {
    title: "Envío refrigerado",
    description:
      "Cadena de frío garantizada hasta tu puerta. Embalaje ecológico y sostenible.",
    icon: "truck",
  },
  {
    title: "Sin conservantes",
    description:
      "Libre de conservantes artificiales, colorantes y aditivos. Solo ingredientes reales.",
    icon: "leaf",
  },
  {
    title: "Precios accesibles",
    description:
      "Calidad de restaurante italiano a precio justo. Suscripciones con beneficios exclusivos.",
    icon: "wallet",
  },
];

export type PizzaCategory = "clasica" | "especial";

export type Pizza = {
  id: string;
  name: string;
  description: string;
  category: PizzaCategory;
  /** Short stability note shown as a freezer badge on the card. */
  freezerNote: string;
  /** Real product photo URL. */
  image: string;
};

export type PizzaCategoryMeta = {
  id: PizzaCategory;
  label: string;
  emoji: string;
  /** Warm accent hue used for the card gradient + badge. */
  accent: string;
  /** Tailwind text color class for the accent. */
  textClass: string;
};

export const PIZZA_CATEGORIES: PizzaCategoryMeta[] = [
  {
    id: "clasica",
    label: "Clásicas",
    emoji: "🍕",
    accent: "#c81009", // brand red
    textClass: "text-[#c81009]",
  },
  {
    id: "especial",
    label: "Especiales",
    emoji: "⭐",
    accent: "#f59e0b", // amber
    textClass: "text-[#f59e0b]",
  },
];

/**
 * Production-optimized catalog: 8 curated varieties that share ingredients
 * (simplified purchasing + consistent stock) and all withstand long-term
 * freezing. Curated for a subscription D2C operation.
 */
export const PIZZAS: Pizza[] = [
  // ── Clásicas ──────────────────────────────────────────────
  {
    id: "muzzarella-aceitunas",
    name: "Muzzarella + Aceitunas",
    description:
      "Mozzarella premium, salsa de tomate natural, orégano y aceitunas verdes y negras fileteadas. La que nunca falla.",
    category: "clasica",
    freezerNote: "Muy estable. Excelente calidad varios meses.",
    image: "https://i.postimg.cc/xq7y32vY/muzza.png",
  },
  {
    id: "especial-jamon",
    name: "Especial Jamón",
    description:
      "Jamón natural seleccionado y mozzarella cremosa. El clásico de toda la vida, sin trucos.",
    category: "clasica",
    freezerNote: "El jamón cocido congela bien si está bien sellado.",
    image: "https://i.postimg.cc/hhwb1BLt/jamon.png",
  },
  {
    id: "especial-salame",
    name: "Especial Salame",
    description:
      "Salame artesanal en rodajas, mozzarella y un toque de ají molido. Carácter y crocancia.",
    category: "clasica",
    freezerNote: "El salame soporta muy bien el congelado. No pierde textura.",
    image: "https://i.postimg.cc/8s3BmSRP/salame.png",
  },
  {
    id: "fugazzeta",
    name: "Fugazzeta",
    description:
      "Masa rellena de mozzarella cubierta con cebolla previamente cocida. Un ícono argentino.",
    category: "clasica",
    freezerNote: "La cebolla cocida mantiene textura y sabor al descongelar.",
    image: "https://sfile.chatglm.cn/images-ppt/cd39c1c3d1f3.jpg",
  },
  // ── Especiales ────────────────────────────────────────────
  {
    id: "queso-azul",
    name: "Queso Azul",
    description:
      "Queso azul (Roquefort) desmenuzado sobre mozzarella. Sabor intenso e inconfundible.",
    category: "especial",
    freezerNote: "El queso azul congela muy bien. Mantiene su sabor intenso.",
    image: "https://i.postimg.cc/PNczQjWq/azul.png",
  },
  {
    id: "panceta-ahumada",
    name: "Panceta Ahumada",
    description:
      "Panceta ahumada en cubos sobre mozzarella fundida. Ahumado intenso y crocante.",
    category: "especial",
    freezerNote: "La panceta congelada conserva muy bien el sabor.",
    image: "https://sfile.chatglm.cn/images-ppt/e10d51acede9.jpg",
  },
  {
    id: "provolone-oregano",
    name: "Provolone y Orégano",
    description:
      "Provolone picante fundido con orégano fresco. Para los amantes del queso fuerte.",
    category: "especial",
    freezerNote: "Ingredientes muy estables. Ideal para almacenamiento prolongado.",
    image: "https://sfile.chatglm.cn/images-ppt/58c9f51106d9.jpg",
  },
  {
    id: "cuatro-quesos",
    name: "Cuatro Quesos",
    description:
      "Mozzarella, provolone, parmesano y queso azul. La explosión de quesos semiduros.",
    category: "especial",
    freezerNote: "Excelente comportamiento con quesos semiduros.",
    image: "https://sfile.chatglm.cn/images-ppt/dcbd98408d59.jpg",
  },
];

/**
 * Ingredient families shared across the 8-pizza catalog. Surfaced in the
 * "Catálogo optimizado" section to communicate the production logic:
 * fewer SKUs at the supplier level → fresher stock, less waste, consistent
 * quality for the subscriber.
 */
export type IngredientFamily = {
  id: string;
  emoji: string;
  name: string;
  ingredients: string[];
  /** How many of the 8 pizzas use at least one item from this family. */
  usedIn: number;
};

export const CATALOG_FAMILIES: IngredientFamily[] = [
  {
    id: "quesos",
    emoji: "🧀",
    name: "Familia de quesos",
    ingredients: ["Mozzarella", "Provolone", "Parmesano", "Queso azul"],
    usedIn: 8,
  },
  {
    id: "proteinas",
    emoji: "🥩",
    name: "Familia de proteínas",
    ingredients: ["Jamón natural", "Salame artesanal", "Panceta ahumada"],
    usedIn: 3,
  },
  {
    id: "aromaticos",
    emoji: "🌿",
    name: "Base aromática",
    ingredients: ["Salsa de tomate", "Orégano", "Cebolla cocida", "Aceitunas"],
    usedIn: 8,
  },
];

/** Headline stats for the optimized-catalog section. */
export const CATALOG_STATS = [
  { value: "8", label: "Variedades curadas" },
  { value: "3+", label: "Meses en freezer" },
  { value: "1", label: "Base compartida" },
  { value: "∞", label: "Al vacío, más tiempo" },
] as const;

export type Plan = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  popular?: boolean;
  perks: string[];
};

export const PLANS: Plan[] = [
  {
    id: "kit-semanal",
    emoji: "📦",
    name: "Kit Semanal",
    description:
      "4 pizzas a elección entregadas cada semana. Ideal para familias o amantes de la pizza.",
    price: "$25.000",
    unit: "/semana",
    perks: ["4 pizzas a elección", "Entrega semanal", "Cambio de sabores"],
  },
  {
    id: "kit-premium",
    emoji: "🏆",
    name: "Kit Premium",
    description:
      "6 pizzas de sabores exclusivos, instructivo de cocción y bolsa térmica de regalo.",
    price: "$50.000",
    unit: "/semana",
    popular: true,
    perks: [
      "6 pizzas exclusivas",
      "Bolsa térmica de regalo",
      "Instructivo de cocción",
      "Prioridad en entrega",
    ],
  },
  {
    id: "evento-especial",
    emoji: "🎉",
    name: "Evento Especial",
    description:
      "¿Tenés invitados? Armamos un kit personalizado con la cantidad y sabores que necesites.",
    price: "A consultar",
    unit: "/pedido único",
    perks: ["Kit personalizado", "Sabores a pedido", "Cantidad flexible"],
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const STEPS: Step[] = [
  {
    number: "1",
    title: "Elegí tu plan",
    description:
      "Suscribite al kit semanal o pedí por WhatsApp. Nos adaptamos a tu ritmo de consumo.",
  },
  {
    number: "2",
    title: "Recibí en tu zona",
    description:
      "Entregas programadas por barrio. Packaging térmico que mantiene la cadena de frío.",
  },
  {
    number: "3",
    title: "Horneá y disfrutá",
    description:
      "Instructivo incluido. En 15 minutos tenés una pizza de restaurante en tu mesa.",
  },
];

export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  { value: "50K+", label: "Pizzas producidas" },
  { value: "4.9★", label: "Calificación promedio" },
  { value: "15min", label: "Tiempo de cocción" },
  { value: "100%", label: "Ingredientes naturales" },
];

export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "LM",
    name: "Laura Martínez",
    role: "Mamá de 3 hijos",
    quote:
      "Nunca pensé que una pizza congelada pudiera saber tan bien. La masa es increíble y el queso se derrite perfecto. Mis hijos la aman.",
  },
  {
    initials: "CR",
    name: "Carlos Ramírez",
    role: "Foodie & Chef amateur",
    quote:
      "La calidad es comparable a una pizzería italiana. El envío llegó perfecto, bien refrigerado. Ahora tengo suscripción mensual.",
  },
  {
    initials: "AG",
    name: "Andrea Gómez",
    role: "Ejecutiva ocupada",
    quote:
      "Perfecta para cenas rápidas entre semana. En 15 minutos tengo una pizza de restaurante. La de cuatro quesos es espectacular.",
  },
  {
    initials: "JP",
    name: "Javier Pereyra",
    role: "Padre y cocinero de fin de semana",
    quote:
      "La congelación flash se nota: la masa queda crocante como recién hecha. El Kit Premium nos rinde para toda la semana.",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "¿Necesito descongelar la pizza antes de hornear?",
    a: "No. Nuestras pizzas están diseñadas para ir directo del freezer al horno. Solo retirá el packaging y horneá según el instructivo incluido (aprox. 15 minutos a 200°C).",
  },
  {
    q: "¿Cuánto tiempo duran en el freezer?",
    a: "Hasta 3 meses conservando la cadena de frío, sin perder textura ni sabor. Recomendamos consumirlas dentro de los primeros 60 días para la mejor experiencia.",
  },
  {
    q: "¿En qué zonas entregan?",
    a: "Realizamos entregas programadas en Mendoza (Gran Mendoza y alrededores). Consultá tu zona por WhatsApp — vamos sumando barrios según la demanda.",
  },
  {
    q: "¿Puedo pausar o cancelar mi suscripción?",
    a: "Sí, sin compromiso. Avisanos por WhatsApp 48 hs antes de tu próxima entrega y la pausamos o cancelamos. Sin multas ni penalidades.",
  },
  {
    q: "¿Puedo elegir los sabores del kit?",
    a: "Por supuesto. En el Kit Semanal y Premium armás tu combinación de sabores entre todas nuestras variedades, con la opción de rotar cada semana.",
  },
  {
    q: "¿Cómo viene el packaging?",
    a: "Cada pizza viene sellada al vacío con su instructivo de cocción, dentro de una caja térmica reciclable que mantiene la cadena de frío hasta que llega a tu freezer.",
  },
];

export type Zone = { name: string; schedule: string; available: boolean };

export const ZONES: Zone[] = [
  { name: "Ciudad de Mendoza", schedule: "Martes y Jueves · 18–21 hs", available: true },
  { name: "Godoy Cruz", schedule: "Martes y Jueves · 18–21 hs", available: true },
  { name: "Guaymallén", schedule: "Miércoles y Viernes · 18–21 hs", available: true },
  { name: "Las Heras", schedule: "Miércoles · 18–21 hs", available: true },
  { name: "Luján de Cuyo", schedule: "Viernes · 18–21 hs", available: true },
  { name: "Maipú", schedule: "Viernes · 18–21 hs", available: false },
];
