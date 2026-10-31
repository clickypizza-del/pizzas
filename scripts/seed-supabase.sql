-- =============================================
-- SEED COMPLETO - Click & Pizza Supabase
-- Copiar TODO y pegar en SQL Editor de Supabase
-- =============================================

-- 1. Borrar tablas si existen y recrear con todas las columnas
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- 2. Crear tablas
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  emoji TEXT DEFAULT '🍕',
  accent_color TEXT DEFAULT '#c81009',
  sort_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description_short TEXT DEFAULT '',
  description_full TEXT DEFAULT '',
  ingredients TEXT[] DEFAULT '{}',
  price NUMERIC NOT NULL,
  previous_price NUMERIC DEFAULT 0,
  discount_percent NUMERIC DEFAULT 0,
  badge TEXT,
  available BOOLEAN DEFAULT true,
  sold_out BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  visible BOOLEAN DEFAULT true,
  stock INT DEFAULT 100,
  image_url TEXT DEFAULT '/pizzas/muzza.webp',
  prep_time_minutes INT DEFAULT 15,
  sort_order INT DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE promotions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC,
  image_url TEXT,
  badge TEXT,
  badge_color TEXT,
  cta TEXT DEFAULT 'Pedir por WhatsApp',
  whatsapp_message TEXT,
  link TEXT,
  featured BOOLEAN DEFAULT false,
  visible BOOLEAN DEFAULT true,
  combo JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Insertar admin
INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
  'admin@clickypizza.com.ar',
  '$2b$10$e9leZudKTFrrJ/01SoHkf.6kA5tDJ8/ajgiqCPibqeTpk4O0qh5uW',
  'Admin Clicky',
  'admin'
);

-- 4. Insertar categorías
INSERT INTO categories (slug, label, subtitle, emoji, accent_color, sort_order) VALUES
('clasica', 'Clásica & Tradicional', 'Alta rotación y sabores familiares', '🍕', '#c81009', 1),
('gourmet', 'Especiales', 'Sabores intensos y quesos premium', '⭐', '#f59e0b', 2),
('premium', 'Premium', 'Máxima complejidad y cocción lenta', '🏆', '#8b5cf6', 3),
('individual', 'Pizza Individual', 'Una porción perfecta para uno', '🍽️', '#f59e0b', 4),
('mini-pizzeta', 'Mini Pizzetas', 'Bocados perfectos para picar', '🫓', '#c81009', 5);

-- 5. Insertar productos (usando los IDs de categoría generados)
-- Primero obtener los UUIDs de categorías
DO $$
DECLARE
  cat_clasica UUID;
  cat_gourmet UUID;
  cat_premium UUID;
  cat_individual UUID;
BEGIN
  SELECT id INTO cat_clasica FROM categories WHERE slug = 'clasica';
  SELECT id INTO cat_gourmet FROM categories WHERE slug = 'gourmet';
  SELECT id INTO cat_premium FROM categories WHERE slug = 'premium';
  SELECT id INTO cat_individual FROM categories WHERE slug = 'individual';

  -- Clásica & Tradicional
  INSERT INTO products (slug, name, description_short, description_full, ingredients, price, badge, featured, visible, image_url, prep_time_minutes, sort_order, category_id) VALUES
  ('musa-suprema', 'Muzzarella Clásica', 'Masa artesanal, salsa de tomate, abundante muzzarella, aderezo especial y aceitunas verdes descarozadas.', 'El equilibrio perfecto entre tradición y sabor. Preparada con una masa artesanal de fermentación cuidada, salsa de tomate elaborada con ingredientes seleccionados, una abundante capa de muzzarella de excelente calidad, nuestro aderezo especial y aceitunas verdes descarozadas.', ARRAY['Masa artesanal','Salsa de tomate','Muzzarella','Aderezo especial','Aceitunas verdes'], 8500, 'mas-vendida', true, true, '/pizzas/muzza.webp', 15, 1, cat_clasica),

  ('clasica-salame', 'Clásica de Salame', 'Mozzarella cremosa, salsa de tomate, generosas fetas de salame seleccionado y aceitunas negras descarozadas.', 'Una combinación que nunca falla: una base de salsa de tomate, abundante mozzarella cremosa, generosas fetas de salame seleccionado y aceitunas negras descarozadas.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Salame seleccionado','Aceitunas negras'], 9500, NULL, true, true, '/pizzas/salame.webp', 15, 2, cat_clasica),

  ('queso-azul', 'Queso Azul (Roquefort)', 'Mozzarella cremosa, salsa de tomate y queso azul (Roquefort), que aporta un sabor intenso y cremoso.', 'Una combinación irresistible de abundante mozzarella cremosa y queso azul (Roquefort), cuidadosamente distribuido para lograr un equilibrio perfecto entre suavidad e intensidad.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Queso azul (Roquefort)'], 9500, NULL, true, true, '/pizzas/azul.webp', 15, 3, cat_clasica),

  ('clasica-jamon', 'Clásica de Jamón', 'Masa artesanal, salsa de tomate, muzzarella, abundante jamón cocido, aderezo especial y aceitunas verdes descarozadas.', 'Masa artesanal de fermentación cuidada, salsa de tomate, generosa capa de muzzarella y abundante jamón cocido. Se completa con aderezo especial y aceitunas verdes.', ARRAY['Masa artesanal','Salsa de tomate','Muzzarella','Jamón cocido','Aderezo especial','Aceitunas verdes'], 9500, NULL, true, true, '/pizzas/jamon.webp', 15, 4, cat_clasica),

  -- Gourmet
  ('especial-muzza', 'Especial Muzzarella', 'Muzzarella con Morrón Asado + Mix Gourmet de Aceitunas Rellenas.', 'Una pizza gourmet elaborada con abundante muzzarella, morrones rojos asados y un exclusivo mix de aceitunas verdes rellenas.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Morrones rojos asados','Aceitunas verdes rellenas','Orégano'], 10500, NULL, true, true, '/pizzas/especial-muzza.webp', 15, 5, cat_gourmet),

  ('gourmet-jamon', 'Especial Jamón', 'Jamón en cubos sobre mozzarella fundida. Sabor intenso y crocante que conquista.', 'Jamón en cubos generosos sobre mozzarella fundida y salsa de tomate. Alta en proteína, grasa y sabor concentrado.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Jamón'], 10500, NULL, true, true, '/pizzas/panceta-ahumada.webp', 15, 6, cat_gourmet),

  ('cantimpalo', 'Cantimpalo', 'Embutido español curado con pimentón, en rodajas sobre mozzarella. Picante, ahumado y contundente.', 'Cantimpalo — embutido español curado y con pimentón — en rodajas generosas sobre mozzarella cremosa y salsa de tomate.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Cantimpalo'], 10500, NULL, true, true, '/pizzas/especial-salame.webp', 15, 7, cat_gourmet),

  -- Premium
  ('cuatro-quesos', 'Cuatro Quesos (Selección técnica)', 'Mozzarella, provolone, parmesano y queso azul. La explosión de quesos semiduros en su máxima expresión.', 'La máxima expresión del catálogo. Cuatro quesos técnicos: mozzarella, provolone, parmesano y queso azul.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Provolone','Parmesano','Queso azul'], 15000, 'premium', true, true, '/pizzas/cuatro_quesos.webp', 15, 8, cat_premium),

  ('pera-roquefort', 'Pera & Roquefort Premium', 'Base de muzzarela fundida, coronada con peras y cebollas moradas caramelizadas, contrastadas con roquefort.', 'Descubre una experiencia de sabor única con nuestra pizza de autor. Sobre una base crujiente y una generosa capa de muzzarela derretida, combinamos la suavidad de las peras seleccionadas y la frescura de la cebolla morada.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Pera caramelizada','Roquefort'], 15000, 'premium', true, true, '/pizzas/pera-roquefort-v2.webp', 18, 9, cat_premium),

  ('carne-desmenuzada', 'Carne Desmenuzada (Cocción lenta)', 'Carne desmenuzada a cocción lenta con cebolla caramelizada y especias sobre mozzarella.', 'La más contundente del catálogo. Carne desmenuzada a cocción lenta con cebolla caramelizada y especias sobre mozzarella.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Carne desmenuzada','Cebolla caramelizada','Especias'], 15000, 'premium', true, true, '/pizzas/fugazzeta.webp', 18, 10, cat_premium),

  -- Individual
  ('ind-muzzarella', 'Individual Muzzarella Clásica', 'Pizza individual de mozzarella premium con salsa de tomate natural. Una porción perfecta para uno.', 'Pizza individual de mozzarella premium con salsa de tomate natural.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella'], 4500, NULL, false, true, '/pizzas/invividual1.webp', 12, 11, cat_individual),

  ('ind-clasica-salame', 'Individual Clásica de Salame', 'Pizza individual con salame seleccionado y mozzarella cremosa. El clásico en tamaño personal.', 'Pizza individual con salame seleccionado y mozzarella cremosa.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Salame seleccionado'], 4500, NULL, false, true, '/pizzas/invividual1.webp', 12, 12, cat_individual),

  ('ind-queso-azul', 'Individual Queso Azul', 'Pizza individual de mozzarella y queso azul. Explosión de sabor para uno solo.', 'Pizza individual de mozzarella y queso azul.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Queso azul (Roquefort)'], 4500, NULL, false, true, '/pizzas/invividual1.webp', 12, 13, cat_individual),

  ('ind-especial-jamon', 'Individual Clásica de Jamón', 'Pizza individual con jamón cocido y mozzarella cremosa. Sabor intenso, porción perfecta.', 'Pizza individual con jamón cocido y mozzarella cremosa.', ARRAY['Masa artesanal','Salsa de tomate','Mozzarella','Jamón cocido'], 4500, NULL, false, true, '/pizzas/invividual1.webp', 12, 14, cat_individual);
END $$;

-- 6. Insertar promociones
INSERT INTO promotions (slug, title, description, price, image_url, badge, badge_color, cta, whatsapp_message, featured, visible, combo) VALUES
('noche-clicky', 'Noche Clicky', 'Elegí tus sabores favoritos y disfrutá una cena gourmet en casa, lista en minutos y sin complicaciones.', 21000, '/pizzas/muzza.webp', 'Combo especial', 'bg-brand-red text-white', 'Pedir por WhatsApp', '¡Hola Click & Pizza! Quiero armar mi Noche Clicky. ¿Me ayudan a elegir los combos?', true, true, '{"pizzas": 2, "drinks": 1, "drinkOptions": [{"id": "coca-1.5l", "name": "Coca-Cola 1.5L"}, {"id": "coca-zero-1.5l", "name": "Coca-Cola Zero 1.5L"}, {"id": "sprite-1.5l", "name": "Sprite 1.5L"}, {"id": "fanta-1.5l", "name": "Fanta 1.5L"}, {"id": "agua-1.5l", "name": "Agua Mineral 1.5L"}, {"id": "cerveza-1l", "name": "Cerveza Quilmes 1L"}]}'::jsonb),

('mmm-postre', 'MMM Postre!', 'Lemon Pie artesanal con merengue flameado, congelado en su punto justo. El cierre perfecto para tu cena, listo para servir.', 3000, '/postres/lemon-pie.webp', 'Nuevo', 'bg-brand-amber text-black', 'Ver MMM Postre!', '¡Hola Click & Pizza! Quiero consultar por los postres (MMM Postre!). ¿Qué sabores tienen esta semana?', false, true, NULL);
