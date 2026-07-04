alter table public.tenants
  add column if not exists logo_url text,
  add column if not exists brand_color text default '#10b981',
  add column if not exists brand_color_dark text default '#059669',
  add column if not exists favicon_url text,
  add column if not exists custom_domain text,
  add column if not exists subdomain text unique,
  add column if not exists company_tagline text,
  add column if not exists support_email text;
