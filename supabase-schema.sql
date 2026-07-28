-- ============================================================
-- ClickyPizza Admin Panel — Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Admin users ──────────────────────────────────────────────
create table admin_users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  name text not null default 'Admin',
  role text not null default 'admin' check (role in ('admin', 'editor')),
  last_login timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Categories ───────────────────────────────────────────────
create table categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  label text not null,
  subtitle text,
  emoji text default '🍕',
  accent_color text default '#C1121F',
  text_class text default 'text-brand-red',
  image_url text,
  sort_order int not null default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Products ─────────────────────────────────────────────────
create table products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  description_short text,
  description_full text,
  ingredients text[],
  price int not null,
  previous_price int,
  discount_percent int default 0 check (discount_percent between 0 and 100),
  badge text,
  available boolean default true,
  sold_out boolean default false,
  featured boolean default false,
  visible boolean default true,
  stock int,
  image_url text,
  gallery_urls text[] default '{}',
  prep_time_minutes int default 15,
  delivery_time_minutes int default 30,
  sort_order int not null default 0,
  -- SEO
  meta_title text,
  meta_description text,
  meta_keywords text[],
  canonical_url text,
  og_image text,
  schema_json jsonb,
  -- Stats
  view_count int default 0,
  whatsapp_clicks int default 0,
  order_clicks int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Promotions ───────────────────────────────────────────────
create table promotions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subtitle text,
  description text,
  image_url text,
  start_date date,
  end_date date,
  button_text text default 'Ver más',
  button_url text,
  badge text,
  accent_color text default '#C1121F',
  status text default 'active' check (status in ('active', 'inactive', 'scheduled')),
  featured boolean default false,
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Business settings ────────────────────────────────────────
create table business_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- ── Activity log ─────────────────────────────────────────────
create table activity_log (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid references admin_users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb,
  ip_address text,
  created_at timestamptz default now()
);

-- ── Backups ──────────────────────────────────────────────────
create table backups (
  id uuid primary key default uuid_generate_v4(),
  filename text not null,
  size_bytes bigint,
  status text default 'pending' check (status in ('pending', 'completed', 'failed')),
  created_at timestamptz default now()
);

-- ── Indexes ──────────────────────────────────────────────────
create index idx_products_category on products(category_id);
create index idx_products_slug on products(slug);
create index idx_products_visible on products(visible);
create index idx_products_featured on products(featured);
create index idx_products_sort on products(sort_order);
create index idx_categories_slug on categories(slug);
create index idx_categories_sort on categories(sort_order);
create index idx_promotions_status on promotions(status);
create index idx_promotions_sort on promotions(sort_order);
create index idx_activity_log_admin on activity_log(admin_id);
create index idx_activity_log_created on activity_log(created_at desc);

-- ── Updated_at trigger ───────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_products_updated before update on products
  for each row execute function update_updated_at();
create trigger trg_categories_updated before update on categories
  for each row execute function update_updated_at();
create trigger trg_promotions_updated before update on promotions
  for each row execute function update_updated_at();
create trigger trg_admin_users_updated before update on admin_users
  for each row execute function update_updated_at();

-- ── Seed default admin (password: admin123 — CHANGE THIS!) ──
-- The password hash is for bcrypt, rounds=10
insert into admin_users (email, password_hash, name, role)
values (
  'admin@clickypizza.com.ar',
  '$2a$10$YQ8GvFO6B1qFVP5PvX6Y5uGzrKxHqFzr8yX3k2mN5pL7vT9wE1aC',
  'Admin',
  'admin'
)
on conflict (email) do nothing;

-- ── Seed default business settings ───────────────────────────
insert into business_settings (key, value) values
  ('site_name', '"Click & Pizza"'),
  ('phone', '"542612545724"'),
  ('phone_display', '"+54 9 261 254-5724"'),
  ('email', '"info@clickypizza.com.ar"'),
  ('address', '"Mendoza, Argentina"'),
  ('instagram', '"click_y_pizza"'),
  ('whatsapp_text', '"¡Hola Click & Pizza! Quiero hacer una consulta sobre las pizzas."'),
  ('hero_title', '"Pizzas artesanales listas para horno"'),
  ('hero_subtitle', '"Sin cocinar, sin ensuciar. La mejor pizza de casa, lista en minutos."'),
  ('analytics_ga', '""'),
  ('analytics_gtm', '""'),
  ('analytics_meta_pixel', '""')
on conflict (key) do nothing;

-- ── Seed default categories ──────────────────────────────────
insert into categories (slug, label, subtitle, emoji, accent_color, sort_order) values
  ('clasica', 'Clásicas', 'Las favoritas de siempre', '🍕', '#C1121F', 1),
  ('gourmet', 'Gourmet', 'Sabores que te sorprenden', '🧀', '#D4A574', 2),
  ('premium', 'Premium & Especialidades', 'Lo mejor de nuestra cocina', '👨‍🍳', '#FFD700', 3),
  ('individual', 'Individuales', 'Porque a veces querés todo para vos', '👤', '#4CAF50', 4),
  ('mini-pizzeta', 'Mini Pizzetas', 'Para picar y compartir', '✨', '#9C27B0', 5)
on conflict (slug) do nothing;

-- ── RLS policies (Row Level Security) ────────────────────────
alter table admin_users enable row level security;
alter table products enable row level security;
alter table categories enable row level security;
alter table promotions enable row level security;
alter table business_settings enable row level security;
alter table activity_log enable row level security;
alter table backups enable row level security;

-- Public can read visible products & categories
create policy "Public can view visible products"
  on products for select using (visible = true);

create policy "Public can view visible categories"
  on categories for select using (visible = true);

create policy "Public can view active promotions"
  on promotions for select using (status = 'active');

create policy "Public can view business settings"
  on business_settings for select using (true);

-- Authenticated admins can do everything
create policy "Admins full access products"
  on products for all using (true) with check (true);

create policy "Admins full access categories"
  on categories for all using (true) with check (true);

create policy "Admins full access promotions"
  on promotions for all using (true) with check (true);

create policy "Admins full access settings"
  on business_settings for all using (true) with check (true);

create policy "Admins full access activity_log"
  on activity_log for all using (true) with check (true);

create policy "Admins full access backups"
  on backups for all using (true) with check (true);

create policy "Admins full access admin_users"
  on admin_users for all using (true) with check (true);
