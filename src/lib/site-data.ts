/**
 * Central content for the Click & Pizza landing page.
 * Keeping copy + structure here makes the section components declarative
 * and lets non-devs update messaging in a single place.
 */

export const SITE = {
  name: "Click & Pizza",
  phone: "542612545724", // E.164 without "+"
  phoneDisplay: "+54 9 261 254-5724",
  instagram: "click_y_pizza",
  instagramUrl: "https://instagram.com/click_y_pizza",
  whatsappText:
    "¡Hola Click & Pizza! Quiero hacer una consulta sobre las pizzas.",
  qrUrl: "/qr-whatsapp.png",
  logoUrl: "/logo-click.png",
  shareUrl: "https://clickypizza.com.ar",
} as const;

export type NavLink = { href: string; label: string };

export type NavGroup = {
  label: string;
  items: NavLink[];
};

export type NavItem = NavLink | NavGroup;

function isNavGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}

export { isNavGroup };

export const NAV_ITEMS: NavLink[] = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/menu", label: "Catálogo" },
  { href: "/suscripcion", label: "Suscripción" },
  { href: "/club-clicky", label: "Club Clicky" },
  { href: "/revendedores", label: "Revendedores" },
  { href: "/panificados", label: "Panificados" },
  { href: "/faq", label: "FAQ" },
];

export const NAV_LINKS: NavLink[] = NAV_ITEMS;

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

export type PizzaCategory = "clasica" | "gourmet" | "premium" | "mini-pizzeta" | "individual";

export type Pizza = {
  id: string;
  name: string;
  description: string;
  category: PizzaCategory;
  freezerNote: string;
  image: string;
  detail?: string;
  price?: string;
  badge?: "mas-vendida" | "nueva" | "premium";
  cookTime?: string;
  portions?: string;
  ingredients?: string[];
};

export const PIZZA_PRICES: Record<PizzaCategory, string> = {
  clasica: "$8.000",
  gourmet: "$9.000",
  premium: "$10.300",
  "mini-pizzeta": "$5.500",
  individual: "$10.000",
};

export type PizzaCategoryMeta = {
  id: PizzaCategory;
  label: string;
  shortLabel?: string;
  subtitle: string;
  emoji: string;
  accent: string;
  textClass: string;
};

export const PIZZA_CATEGORIES: PizzaCategoryMeta[] = [
  {
    id: "clasica",
    label: "Clásica & Tradicional",
    shortLabel: "Clásica",
    subtitle: "Alta rotación y sabores familiares",
    emoji: "🍕",
    accent: "#c81009",
    textClass: "text-[#c81009]",
  },
  {
    id: "gourmet",
    label: "Gourmet & Selección de Quesos",
    shortLabel: "Gourmet",
    subtitle: "Sabores intensos y quesos premium",
    emoji: "⭐",
    accent: "#f59e0b",
    textClass: "text-[#f59e0b]",
  },
  {
    id: "premium",
    label: "Premium & Especialidades de Autor",
    shortLabel: "Premium",
    subtitle: "Máxima complejidad y cocción lenta",
    emoji: "🏆",
    accent: "#8b5cf6",
    textClass: "text-[#8b5cf6]",
  },
  {
    id: "individual",
    label: "Pizza Individual",
    shortLabel: "Individual",
    subtitle: "Una porción perfecta para uno",
    emoji: "🍽️",
    accent: "#f59e0b",
    textClass: "text-[#f59e0b]",
  },
  {
    id: "mini-pizzeta",
    label: "Mini Pizzetas",
    shortLabel: "Mini",
    subtitle: "Bocados perfectos para picar",
    emoji: "🫓",
    accent: "#c81009",
    textClass: "text-[#c81009]",
  },
];

/**
 * Production-optimized catalog: 20 varieties across 5 lines that share
 * ingredients (simplified purchasing + consistent stock) and all withstand
 * long-term freezing. Optimized for a subscription D2C operation.
 */
export const PIZZAS: Pizza[] = [
  // ── Clásica & Tradicional ──────────────────────────────────
  {
    id: "musa-suprema",
    name: "Muzzarella Clásica",
    description:
      "Masa artesanal, salsa de tomate, abundante muzzarella, aderezo especial y aceitunas verdes descarozadas.",
    category: "clasica",
    freezerNote: "Muy estable. Excelente calidad varios meses.",
    image: "/pizzas/muzza.png",
    price: "$7.700",
    badge: "mas-vendida",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Muzzarella", "Aderezo especial", "Aceitunas verdes"],
    detail:
      "El equilibrio perfecto entre tradición y sabor. Preparada con una masa artesanal de fermentación cuidada, salsa de tomate elaborada con ingredientes seleccionados, una abundante capa de muzzarella de excelente calidad, nuestro aderezo especial y aceitunas verdes descarozadas. Cada pizza se gratina hasta alcanzar una textura irresistible y un sabor auténtico, convirtiéndose en la elección ideal para disfrutar del clásico que nunca pasa de moda.",
  },
  {
    id: "clasica-salame",
    name: "Clásica de Salame",
    description:
      "Mozzarella cremosa, salsa de tomate, generosas fetas de salame seleccionado y aceitunas negras descarozadas. Un clásico de sabor intenso que conquista desde el primer bocado.",
    category: "clasica",
    freezerNote: "El salame congela bien si está bien sellado. Sabor intacto.",
    image: "/pizzas/salame.png",
    price: "$8.500",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Salame seleccionado", "Aceitunas negras"],
    detail:
      "Una combinación que nunca falla: una base de salsa de tomate, abundante mozzarella cremosa, generosas fetas de salame seleccionado y aceitunas negras descarozadas que aportan el equilibrio perfecto entre intensidad y frescura.\n\n**Maridaje de aceitunas:** Aceituna verde descarozada con jamón crudo, palmito y morrón. El salame ya aporta salinidad y grasa animal en niveles altos — repetir esa nota en la picada sería redundante. La aceituna verde ofrece contraste ácido, el morrón asado suma dulzor ahumado que dialoga con las especias del embutido, el jamón crudo aporta umami liviano y el palmito la frescura vegetal que refresca el conjunto.",
  },
  {
    id: "queso-azul",
    name: "Queso Azul (Roquefort)",
    description:
      "Mozzarella cremosa, salsa de tomate y queso azul (Roquefort), que aporta un sabor intenso, cremoso y lleno de personalidad para los paladares más exigentes.",
    detail:
      "Una combinación irresistible de abundante mozzarella cremosa y queso azul (Roquefort), cuidadosamente distribuido para lograr un equilibrio perfecto entre suavidad e intensidad. Al hornearse, el queso se funde sobre la pizza, creando una textura cremosa y un sabor profundo que conquista desde el primer bocado.\n\n**Maridaje de aceitunas:** Aceituna verde descarozada con jamón crudo, almendra y palmito. El roquefort es pungente y domina el paladar por sí solo — por eso la aceituna verde actúa como agente de limpieza entre porciones. El jamón crudo aporta salinidad y umami sin agregar otro componente graso que compita. La almendra suma crocancia — textura que la pizza blanda no tiene — y el palmito cierra con frescura vegetal. El resultado acompaña sin competir, siempre limpia y prepara el paladar para el próximo bocado.",
    category: "clasica",
    freezerNote: "El queso azul congela excelente. Conserva toda su intensidad.",
    image: "/pizzas/azul.png",
    price: "$8.500",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Queso azul (Roquefort)"],
  },
  {
    id: "especial-jamon",
    name: "Clásica de Jamón",
    description:
      "Masa artesanal, salsa de tomate, muzzarella, abundante jamón cocido, aderezo especial y aceitunas verdes descarozadas.",
    category: "clasica",
    freezerNote: "El jamón cocido congela bien si está bien sellado.",
    image: "/pizzas/jamon.webp",
    price: "$8.000",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Muzzarella", "Jamón cocido", "Aderezo especial", "Aceitunas verdes"],
    detail:
      "Masa artesanal de fermentación cuidada, salsa de tomate, generosa capa de muzzarella y abundante jamón cocido. Se completa con aderezo especial y aceitunas verdes, logrando una combinación clásica y equilibrada.\n\n**Maridaje de aceitunas:** Aceituna negra con carozo con salame, provolone y morrón. El jamón es la pizza de perfil más noble pero más plano: no tiene intensidad especiada ni picante. Acá la estrategia es completar, no contrastar. La aceituna negra, de carácter intenso y ligeramente amargo, sirve de base para un trío que le inyecte personalidad. El salame aporta especias y curado, el provolone suma cremosidad y punto picante-láctico que el jamón no tiene, y el morrón redondea con dulzor asado.",
  },
  // ── Gourmet & Selección de Quesos ───────────────────────────
  {
    id: "provolone-oregano",
    name: "Provolone y Orégano",
    description:
      "Provolone picante fundido con orégano fresco. Para los amantes del queso fuerte con personalidad.",
    category: "gourmet",
    freezerNote: "Ingredientes muy estables. Ideal para almacenamiento prolongado.",
    image: "/pizzas/provolone-oregano.jpg",
    price: "$9.000",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Provolone picante", "Orégano fresco"],
  },
  {
    id: "lomito",
    name: "Lomito",
    description:
      "Lomito en cubos sobre mozzarella fundida. Ahumado intenso y crocante que conquista.",
    detail:
      "Lomito en cubos generosos sobre mozzarella fundida y salsa de tomate. Alta en proteína, grasa y sabor concentrado — es la pizza más robusta y \"carnosa\" del menú.\n\n**Maridaje de aceitunas:** Aceituna rellena con roquefort, panceta y morrón. Una picada liviana o ácida se perdería frente a esta pizza. Se aplica el principio de intensidad proporcional: el trío tiene que igualar la potencia de la pizza, no suavizarla. El roquefort aporta pungencia de queso azul, la panceta suma ahumado y grasa crocante, y el morrón cumple su función de contrapeso dulce para que el conjunto no se vuelva unidimensional de sal y grasa.",
    category: "gourmet",
    freezerNote: "El lomito congelado conserva muy bien el sabor.",
    image: "/pizzas/lomito.jpg",
    price: "$9.400",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Lomito"],
  },
  {
    id: "cantimpalo",
    name: "Cantimpalo",
    description:
      "Embutido español curado con pimentón, en rodajas sobre mozzarella. Picante, ahumado y contundente.",
    detail:
      "Cantimpalo — embutido español curado y con pimentón — en rodajas generosas sobre mozzarella cremosa y salsa de tomate. Aporta picante, ahumado y grasa animal en niveles altos, en un registro similar al del salame pero con la personalidad del pimentón español.\n\n**Maridaje de aceitunas:** Aceituna verde descarozada con jamón cocido, almendra y palmito. El cantimpalo ya tiene curado y salazón de sobra, por eso se usa jamón cocido (más suave, más dulce) en lugar de jamón crudo — sumar jamón crudo hubiera duplicado el registro curado-salado. La almendra y el palmito aportan crocancia y frescura que frenan el picor del pimentón.",
    category: "gourmet",
    freezerNote: "El cantimpalo soporta muy bien el congelado. Sabor intacto.",
    image: "/pizzas/cantimpalo.png",
    price: "$9.400",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Cantimpalo"],
  },
  {
    id: "queso-azul-gourmet",
    name: "Queso Azul Gourmet",
    description:
      "Queso azul desmenuzado sobre mozzarella con un toque de miel. Sabor intenso e inconfundible, solo en la línea Gourmet.",
    category: "gourmet",
    freezerNote: "El queso azul congela muy bien. Mantiene su sabor intenso.",
    image: "/pizzas/azul.png",
    price: "$9.400",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Queso azul", "Miel"],
  },
  // ── Premium & Especialidades de Autor ───────────────────────
  {
    id: "cuatro-quesos",
    name: "Cuatro Quesos (Selección técnica)",
    description:
      "Mozzarella, provolone, parmesano y queso azul. La explosión de quesos semiduros en su máxima expresión.",
    category: "premium",
    freezerNote: "Excelente comportamiento con quesos semiduros.",
    image: "/pizzas/cuatro-quesos.jpg",
    price: "$10.300",
    badge: "premium",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Provolone", "Parmesano", "Queso azul"],
  },
  {
    id: "napolitana-asada",
    name: "Napolitana Asada (Tomates asados)",
    description:
      "Tomates asados lentamente, ajo confitado y mozzarella sobre masa artesanal. La Napolitana, reinventada.",
    category: "premium",
    freezerNote: "Los tomates asados mantienen su textura al congelar.",
    image: "/pizzas/muzza.png",
    price: "$10.300",
    badge: "nueva",
    cookTime: "15 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Tomates asados", "Ajo confitado", "Mozzarella"],
  },
  {
    id: "pollo-verdeo",
    name: "Pollo al Verdeo (Reducción espesa)",
    description:
      "Pollo desmenuzado con verdeo salteado y reducción espesa sobre mozzarella cremosa. Elegancia en cada porción.",
    category: "premium",
    freezerNote: "El pollo cocido congela muy bien. Sabor intacto.",
    image: "/pizzas/muzza.png",
    price: "$11.000",
    badge: "premium",
    cookTime: "18 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Pollo desmenuzado", "Verdeo salteado", "Reducción espesa"],
  },
  {
    id: "carne-desmenuzada",
    name: "Carne Desmenuzada (Cocción lenta)",
    description:
      "Carne desmenuzada a cocción lenta con cebolla caramelizada y especias sobre mozzarella. La más contundente del catálogo.",
    category: "premium",
    freezerNote: "La carne desmenuzada congela excelente. Textura preservada.",
    image: "/pizzas/muzza.png",
    price: "$11.000",
    badge: "premium",
    cookTime: "18 min",
    portions: "4-6 porciones",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Carne desmenuzada", "Cebolla caramelizada", "Especias"],
  },
  // ── Pizza Individual ──────────────────────────────────────
  {
    id: "ind-muzzarella",
    name: "Individual Muzzarella",
    description:
      "Pizza individual de mozzarella premium con salsa de tomate natural. Una porción perfecta para uno.",
    category: "individual",
    freezerNote: "Porción individual. Se hornea en 12 minutos directo del freezer.",
    image: "/pizzas/invividual1.png",
    cookTime: "12 min",
    portions: "1 porción",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella"],
  },
  {
    id: "ind-especial-jamon",
    name: "Individual Especial Jamón",
    description:
      "Pizza individual con jamón natural y mozzarella cremosa. El clásico en tamaño personal.",
    category: "individual",
    freezerNote: "El jamón congela perfecto en formato individual.",
    image: "/pizzas/invividual1.png",
    cookTime: "12 min",
    portions: "1 porción",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Jamón natural"],
  },
  {
    id: "ind-cuatro-quesos",
    name: "Individual Cuatro Quesos",
    description:
      "Pizza individual de mozzarella, provolone, parmesano y queso azul. Explosión de quesos para uno solo.",
    category: "individual",
    freezerNote: "Los quesos semiduros se comportan excelente congelados.",
    image: "/pizzas/invividual1.png",
    cookTime: "12 min",
    portions: "1 porción",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Provolone", "Parmesano", "Queso azul"],
  },
  {
    id: "ind-lomito",
    name: "Individual Lomito",
    description:
      "Pizza individual de lomito en cubos sobre mozzarella fundida. Sabor intenso, porción perfecta.",
    category: "individual",
    freezerNote: "El lomito congela muy bien. Sabor intacto.",
    image: "/pizzas/invividual1.png",
    cookTime: "12 min",
    portions: "1 porción",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Lomito"],
  },
  // ── Mini Pizzetas ─────────────────────────────────────────
  {
    id: "mini-pizzetas",
    name: "Mini Pizzetas (4 sabores)",
    description:
      "Bandeja de 6 mini pizzas en 4 sabores: Mozzarella, Salame, Jamón y Queso Azul. Elegí la combinación que más te guste.",
    category: "mini-pizzeta",
    freezerNote: "Ideales para freezer. Se hornean directo del congelado en 10 minutos.",
    image: "/pizzas/mini-pizzetas2.png",
    cookTime: "10 min",
    portions: "6 unidades",
    ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Salame", "Jamón natural", "Queso azul"],
  },
];

export type MiniPizzetaComboFlavor = {
  name: string;
  qty: number;
};

export type MiniPizzetaComboLabel = "mas-vendida" | "recomendada" | "familiar" | "premium";

export type MiniPizzetaCombo = {
  id: string;
  nombre: string;
  cantidad: number;
  sabores: MiniPizzetaComboFlavor[];
  precio: number;
  etiqueta?: MiniPizzetaComboLabel;
};

export const MINI_PIZZETA_COMBOS: MiniPizzetaCombo[] = [
  {
    id: "combo-clasica",
    nombre: "Combinación Clásica",
    cantidad: 6,
    sabores: [
      { name: "Muzzarella", qty: 3 },
      { name: "Jamón", qty: 3 },
    ],
    precio: 5500,
    etiqueta: "mas-vendida",
  },
  {
    id: "combo-salame",
    nombre: "Combinación Salame",
    cantidad: 6,
    sabores: [
      { name: "Muzzarella", qty: 2 },
      { name: "Salame", qty: 3 },
      { name: "Jamón", qty: 1 },
    ],
    precio: 5500,
  },
  {
    id: "combo-jamon",
    nombre: "Combinación Jamón",
    cantidad: 6,
    sabores: [
      { name: "Muzzarella", qty: 2 },
      { name: "Jamón", qty: 3 },
      { name: "Queso Azul", qty: 1 },
    ],
    precio: 5500,
  },
  {
    id: "combo-azul",
    nombre: "Combinación Queso Azul",
    cantidad: 6,
    sabores: [
      { name: "Muzzarella", qty: 1 },
      { name: "Salame", qty: 1 },
      { name: "Queso Azul", qty: 4 },
    ],
    precio: 5500,
    etiqueta: "premium",
  },
  {
    id: "combo-recomendada",
    nombre: "Combinación Recomendada",
    cantidad: 6,
    sabores: [
      { name: "Muzzarella", qty: 2 },
      { name: "Salame", qty: 2 },
      { name: "Jamón", qty: 1 },
      { name: "Queso Azul", qty: 1 },
    ],
    precio: 5500,
    etiqueta: "recomendada",
  },
  {
    id: "combo-variedad",
    nombre: "Combinación Variedad",
    cantidad: 6,
    sabores: [
      { name: "Muzzarella", qty: 1 },
      { name: "Salame", qty: 2 },
      { name: "Jamón", qty: 2 },
      { name: "Queso Azul", qty: 1 },
    ],
    precio: 5500,
    etiqueta: "familiar",
  },
];

/**
 * Ingredient families shared across the 20-pizza catalog. Surfaced in the
 * "Catálogo optimizado" section to communicate the production logic:
 * fewer SKUs at the supplier level → fresher stock, less waste, consistent
 * quality for the subscriber.
 */
export type IngredientFamily = {
  id: string;
  emoji: string;
  name: string;
  ingredients: string[];
  /** How many of the 20 pizzas use at least one item from this family. */
  usedIn: number;
};

export const CATALOG_FAMILIES: IngredientFamily[] = [
  {
    id: "quesos",
    emoji: "🧀",
    name: "Familia de quesos",
    ingredients: ["Mozzarella", "Provolone", "Parmesano", "Queso azul"],
    usedIn: 12,
  },
  {
    id: "proteinas",
    emoji: "🥩",
    name: "Familia de proteínas",
    ingredients: ["Jamón natural", "Salame de Tandil", "Lomito", "Pollo", "Carne desmenuzada"],
    usedIn: 9,
  },
  {
    id: "aromaticos",
    emoji: "🌿",
    name: "Base aromática",
    ingredients: ["Salsa de tomate", "Orégano", "Cebolla caramelizada", "Morrones asados"],
    usedIn: 12,
  },
];

/** Headline stats for the optimized-catalog section. */
export const CATALOG_STATS = [
  { value: "12", label: "Variedades elegidas" },
  { value: "5", label: "Líneas de producto" },
  { value: "3+", label: "Meses en freezer" },
  { value: "∞", label: "Al vacío, más tiempo" },
] as const;

/**
 * Six business advantages of keeping pizzas frozen, for the D2C brand
 * and its subscribers. Each benefit pairs an emoji + Lucide icon with a
 * short title and a one-line explanation.
 */
export type FreezerAdvantage = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

export const FREEZER_ADVANTAGES: FreezerAdvantage[] = [
  {
    id: "calidad",
    emoji: "🍕",
    title: "Mantiene la calidad",
    description:
      "El frío detiene el crecimiento de bacterias y hongos. Conserva el sabor, la textura y los ingredientes durante más tiempo.",
  },
  {
    id: "duracion",
    emoji: "❄️",
    title: "Mayor duración",
    description:
      "Una pizza congelada correctamente puede mantenerse en buen estado entre 2 y 3 meses, e incluso más si está bien envasada.",
  },
  {
    id: "perdidas",
    emoji: "💰",
    title: "Reduce pérdidas",
    description:
      "Podés producir en cantidad cuando tenés tiempo y vender después. Evitás tirar mercadería por vencimiento rápido.",
  },
  {
    id: "entrega",
    emoji: "⚡",
    title: "Entrega más rápida",
    description:
      "Ya tenés stock listo para hornear. El cliente recibe una pizza recién hecha en pocos minutos.",
  },
  {
    id: "organizacion",
    emoji: "📦",
    title: "Mejor organización",
    description:
      "Permite controlar mejor el inventario. Facilita tener varios sabores disponibles sin preparar todo en el momento.",
  },
  {
    id: "practicidad",
    emoji: "🔥",
    title: "Practicidad para el cliente",
    description:
      "El cliente puede guardar la pizza en su freezer y hornearla cuando quiera. Solución ideal para cenas rápidas o imprevistos.",
  },
];

/** Best-practice tip shown as a highlighted note in the advantages section. */
export const FREEZER_TIP =
  "Para obtener los mejores resultados, conviene congelar las pizzas apenas se enfrían después de la elaboración y usar envases bien sellados para evitar quemaduras por congelación.";

/**
 * Panificados (baked goods) — an expanding line of freezer-friendly breads
 * and pastries beyond pizzas. Each item has a real product photo.
 */
export type Panificado = {
  id: string;
  name: string;
  description: string;
  /** Short stability / usage note shown as a badge on the card. */
  note: string;
  /** Real product photo URL. */
  image: string;
  /** Price label, optional. */
  price?: string;
  /** Whether this item is new on the menu. */
  isNew?: boolean;
};

export const PANIFICADOS: Panificado[] = [
  {
    id: "pan-salvado",
    name: "Pan de Salvado",
    description:
      "Pan artesanal de salvado de trigo, rico en fibra. Ideal para tostadas al desayuno o como acompañamiento. Se congela excelente y se mantiene tierno por semanas.",
    note: "Rico en fibra · Freezer 3+ meses",
    image: "/pan-salvado.jpeg",
    price: "$3.500",
    isNew: true,
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
      "4 pizzas a elección, entregadas cada semana. Ideal para familias o amantes de la pizza.",
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
    price: "Desde $35.000",
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
  since?: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "LM",
    name: "Laura Martínez",
    role: "Mamá de 3 hijos",
    since: "Cliente desde hace 4 meses",
    quote:
      "Nunca pensé que una pizza congelada pudiera saber tan bien. La masa es increíble y el queso se derrite perfecto. Mis hijos la aman.",
  },
  {
    initials: "CR",
    name: "Carlos Ramírez",
    role: "Foodie & Chef amateur",
    since: "Suscripción Premium · 6 meses",
    quote:
      "La calidad es comparable a una pizzería italiana. El envío llegó perfecto, bien refrigerado. Ahora tengo suscripción mensual.",
  },
  {
    initials: "AG",
    name: "Andrea Gómez",
    role: "Ejecutiva ocupada",
    since: "Kit Semanal · 3 meses",
    quote:
      "Perfecta para cenas rápidas entre semana. En 15 minutos tengo una pizza de restaurante. La de cuatro quesos es espectacular.",
  },
  {
    initials: "JP",
    name: "Javier Pereyra",
    role: "Padre y cocinero de fin de semana",
    since: "Cliente desde hace 2 meses",
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

export type FreezerScienceReason = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

export const FREEZER_SCIENCE_REASONS: FreezerScienceReason[] = [
  {
    id: "retrogradacion",
    emoji: "🧬",
    title: "Frena el envejecimiento del almidón",
    description:
      "A temperatura ambiente, los almidones del pan o la masa cocida se reorganizan y se cristalizan, lo que hace que el producto se ponga duro y seco. El frío intenso del congelador detiene este proceso casi por completo. Cuando descongelás correctamente, el almidón vuelve a su estado original, devolviéndole la textura tierna.",
  },
  {
    id: "frescura",
    emoji: "✨",
    title: "Mantiene la frescura original",
    description:
      "Si congelás una pizza o un pan apenas se enfría tras salir del horno, estás \"atrapando\" la humedad interna en su punto óptimo. Al recalentarlo, esa humedad se redistribuye, dando la sensación de que el producto fue horneado hace pocos minutos.",
  },
  {
    id: "sin-quimicos",
    emoji: "🌿",
    title: "Seguridad alimentaria sin químicos",
    description:
      "La mayoría de los panes industriales usan conservantes para que no les salga moho en la despensa. Al congelar tus masas o panes, no necesitás conservantes. Es la forma más natural y saludable de mantener tus alimentos sin que se llenen de hongos o bacterias.",
  },
  {
    id: "versatilidad",
    emoji: "📦",
    title: "Versatilidad operativa",
    description:
      "Las masas de harina son muy agradecidas con el frío. Podés congelar masas crudas (bolas de masa para pizza o galletas), masas pre-cocidas (el secreto de las pizzas de alta calidad: horneas la masa un 70-80%, la congelás, y cuando querés comerla, solo la terminás de hornear con los ingredientes encima), y mucho más.",
  },
];

export type FreezerScienceTip = {
  id: string;
  product: string;
  technique: string;
};

export const FREEZER_SCIENCE_TIPS: FreezerScienceTip[] = [
  {
    id: "pan-hogaza",
    product: "Pan en hogaza",
    technique: "Cortar en rodajas antes de congelar.",
  },
  {
    id: "pre-pizza",
    product: "Pizza (pre-pizza)",
    technique: "Pre-cocinarla, dejar enfriar, envolver en film y luego en bolsa.",
  },
  {
    id: "masas-crudas",
    product: "Masas crudas",
    technique: "Separar por porciones individuales para no tener que descongelar todo el bloque.",
  },
  {
    id: "empanadas",
    product: "Empanadas",
    technique: "Congelar crudas (sin hornear). Al sacarlas, van directo al horno caliente.",
  },
];

export type FreezerScienceTrick = {
  id: string;
  product: string;
  instruction: string;
};

export const FREEZER_SCIENCE_TRICKS: FreezerScienceTrick[] = [
  {
    id: "pan",
    product: "Pan",
    instruction: "Del freezer directo a la tostadora o al horno fuerte (200°C) durante 5 minutos.",
  },
  {
    id: "pizza",
    product: "Pizza",
    instruction: "Del freezer directo al horno caliente. El calor intenso hará que la base se ponga crocante antes de que la miga llegue a ablandarse demasiado.",
  },
];

export const FREEZER_SCIENCE_INTRO =
  "Congelar productos de panadería (panes, pizzas, masas, empanadas, etc.) es, posiblemente, la mejor forma de conservar la calidad artesanal en casa. Cuando hablamos de productos elaborados con harina, el proceso de \"envejecimiento\" ocurre muy rápido debido a un fenómeno químico llamado retrogradación del almidón.";

export const FREEZER_SCIENCE_TRICK_NOTE =
  "El error más común es descongelar a temperatura ambiente, lo que suele hacer que el pan o la pizza queden gomosos o húmedos. La clave es el choque de calor:";

/* ─── Promociones destacadas ──────────────────────────────────────── */

export type Promotion = {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  price?: string;
  cta: string;
  whatsappMessage?: string;
  link?: string;
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "domingo-pizza",
    title: "Domingo de Pizza",
    description:
      "Armá tu caja familiar con 12 variedades artesanales. Todo listo para el horno, directo a tu casa.",
    image: "/pizzas/muzza.png",
    badge: "Popular",
    badgeColor: "bg-brand-amber text-black",
    price: "Desde $25.000",
    cta: "Armar mi caja",
    whatsappMessage:
      "¡Hola Click & Pizza! Quiero armar una caja para el Domingo de Pizza. ¿Cuáles son las opciones?",
  },
  {
    id: "promo-10-1",
    title: "Pack 10 + 1 Gratis",
    description:
      "Comprá 10 pizzas y llevate 1 gratis. Ahorrás una pizza completa. Ideal para familias o eventos.",
    image: "/pizzas/salame.png",
    badge: "Ahorro",
    badgeColor: "bg-brand-green text-white",
    price: "$69.300",
    cta: "Club Clicky",
    link: "/club-clicky",
  },
  {
    id: "suscripcion",
    title: "Suscribite y Ahorrá",
    description:
      "Elegí tu kit semanal o premium. Sin compromiso, pausá cuando quieras. Primer mes con 15% OFF.",
    image: "/pizzas/cuatro-quesos.jpg",
    badge: "Exclusivo",
    badgeColor: "bg-purple-600 text-white",
    price: "-15% primer mes",
    cta: "Ver planes",
    whatsappMessage:
      "¡Hola Click & Pizza! Quiero información sobre la suscripción con 15% de descuento en el primer mes.",
  },
];


