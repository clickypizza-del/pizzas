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
  { href: "#freezer", label: "Freezer" },
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

export type PizzaCategory = "clasica" | "especial" | "gourmet";

export type Pizza = {
  id: string;
  name: string;
  description: string;
  category: PizzaCategory;
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
  {
    id: "gourmet",
    label: "Gourmet",
    emoji: "👨‍🍳",
    accent: "#b45309", // amber-700 / copper
    textClass: "text-[#b45309]",
  },
];

export const PIZZAS: Pizza[] = [
  // ── Clásicas ──────────────────────────────────────────────
  {
    id: "muzzarella",
    name: "Muzzarella",
    description:
      "Mozzarella premium, salsa de tomate natural y orégano fresco. La favorita de siempre.",
    category: "clasica",
  },
  {
    id: "muzzarella-aceitunas",
    name: "Muzzarella y aceitunas",
    description:
      "La clásica muzza con aceitunas verdes y negras fileteadas sobre mozzarella fundida.",
    category: "clasica",
  },
  {
    id: "jamon-muzzarella",
    name: "Jamón y muzzarella",
    description: "Jamón natural seleccionado y mozzarella cremosa. Sabor de toda la vida.",
    category: "clasica",
  },
  {
    id: "salame-muzzarella",
    name: "Salame y muzzarella",
    description:
      "Salame artesanal en rodajas, mozzarella y un toque de ají molido.",
    category: "clasica",
  },
  {
    id: "napolitana",
    name: "Napolitana",
    description:
      "Mozzarella, rodajas de tomate fresco, ajo y orégano. Homenaje a la original.",
    category: "clasica",
  },
  {
    id: "fugazzeta",
    name: "Fugazzeta",
    description:
      "Masa rellena de mozzarella cubierta con cebolla caramelizada previamente cocida.",
    category: "clasica",
  },
  // ── Especiales ────────────────────────────────────────────
  {
    id: "panceta-muzzarella",
    name: "Panceta y muzzarella",
    description: "Panceta crocante y mozzarella fundida. El crujiente que enamora.",
    category: "especial",
  },
  {
    id: "panceta-choclo",
    name: "Panceta y choclo",
    description: "Panceta ahumada y granos de choclo dulce sobre mozzarella.",
    category: "especial",
  },
  {
    id: "provolone-oregano",
    name: "Provolone y orégano",
    description:
      "Provolone picante fundido con orégano fresco. Para los amantes del queso fuerte.",
    category: "especial",
  },
  {
    id: "queso-azul-roquefort",
    name: "Queso azul (Roquefort)",
    description:
      "Queso azul desmenuzado y mozzarella. Sabor intenso e inconfundible.",
    category: "especial",
  },
  {
    id: "cuatro-quesos",
    name: "Cuatro quesos",
    description:
      "Mozzarella, provolone, parmesano y queso azul. La explosión de quesos.",
    category: "especial",
  },
  {
    id: "jamon-morrones-asados",
    name: "Jamón y morrones asados",
    description: "Jamón natural y morrones asados al horno sobre mozzarella.",
    category: "especial",
  },
  // ── Gourmet ───────────────────────────────────────────────
  {
    id: "cebolla-caramelizada-provolone",
    name: "Cebolla caramelizada y provolone",
    description:
      "Cebolla caramelizada lentamente y provolone fundido. Dulzura y carácter.",
    category: "gourmet",
  },
  {
    id: "panceta-ahumada-provolone",
    name: "Panceta ahumada y provolone",
    description: "Panceta ahumada en cubos y provolone. Ahumado intenso.",
    category: "gourmet",
  },
  {
    id: "champignones-muzzarella",
    name: "Champiñones salteados y muzzarella",
    description:
      "Champiñones salteados con ajo y perejil sobre mozzarella fundida.",
    category: "gourmet",
  },
  {
    id: "morrones-asados-queso-azul",
    name: "Morrones asados y queso azul",
    description:
      "Morrones asados y queso azul. Dulzor y potencia en cada bocado.",
    category: "gourmet",
  },
  {
    id: "criolla",
    name: "Criolla",
    description:
      "Chorizo colorado en rodajas y morrones asados. Sabor bien argentino.",
    category: "gourmet",
  },
];

/**
 * The 6 pizzas that best survive long-term freezing, with their stability
 * notes. Surfaced in a dedicated "freezer champions" section to reassure
 * subscription customers about stockpiling.
 */
export type FreezerChampion = {
  id: string;
  name: string;
  note: string;
  /** Medal label shown next to the champion. */
  rank: 1 | 2 | 3 | 4 | 5 | 6;
};

export const FREEZER_CHAMPIONS: FreezerChampion[] = [
  {
    id: "fc-muzza-aceitunas",
    name: "Muzzarella + Aceitunas",
    note: "Muy estable. Puede conservar excelente calidad varios meses.",
    rank: 1,
  },
  {
    id: "fc-salame",
    name: "Especial Salame",
    note: "El salame soporta muy bien el congelado. Prácticamente no pierde textura.",
    rank: 2,
  },
  {
    id: "fc-queso-azul",
    name: "Queso Azul",
    note: "El queso azul congela muy bien. Mantiene su sabor intenso.",
    rank: 3,
  },
  {
    id: "fc-provolone-oregano",
    name: "Provolone y Orégano",
    note: "Ingredientes muy estables. Ideal para almacenamiento prolongado.",
    rank: 4,
  },
  {
    id: "fc-cuatro-quesos",
    name: "Cuatro Quesos",
    note: "Excelente comportamiento si usás quesos semiduros.",
    rank: 5,
  },
  {
    id: "fc-panceta-ahumada",
    name: "Panceta Ahumada",
    note: "La panceta congelada conserva muy bien el sabor.",
    rank: 6,
  },
];

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
