-- TENANTS
create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  industry text check (industry in
    ('dental','legal','hospitality','logistics','other')),
  subdomain text unique,
  custom_domain text,
  brand_color text default '#10b981',
  logo_url text,
  primary_language text default 'it',
  plan text default 'starter' check (plan in
    ('starter','professional','enterprise','cancelled')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- AGENT CONFIG
create table public.agent_config (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  agent_name text default 'Sofia',
  vapi_assistant_id text,
  elevenlabs_voice_id text,
  system_prompt text,
  greeting_message text,
  phone_number text,
  is_active boolean default false,
  created_at timestamptz default now()
);

-- CALL LOGS
create table public.call_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  caller_number text,
  duration_seconds integer default 0,
  intent_detected text,
  outcome text check (outcome in
    ('booked','answered','escalated','missed','voicemail')),
  booking_id text,
  transcript text,
  revenue_recovered numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- KNOWLEDGE BASE
create table public.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  document_name text not null,
  pinecone_namespace text,
  file_url text,
  status text default 'processing' check (status in
    ('processing','indexed','error')),
  created_at timestamptz default now()
);

-- ROW LEVEL SECURITY
alter table public.tenants enable row level security;
alter table public.agent_config enable row level security;
alter table public.call_logs enable row level security;
alter table public.knowledge_base enable row level security;

-- RLS POLICIES: tenants
create policy "Users can view own tenant"
  on public.tenants for select
  using (owner_id = auth.uid());

create policy "Users can update own tenant"
  on public.tenants for update
  using (owner_id = auth.uid());

-- RLS POLICIES: agent_config
create policy "Users can view own agent config"
  on public.agent_config for select
  using (tenant_id in (
    select id from public.tenants where owner_id = auth.uid()
  ));

create policy "Users can update own agent config"
  on public.agent_config for update
  using (tenant_id in (
    select id from public.tenants where owner_id = auth.uid()
  ));

-- RLS POLICIES: call_logs
create policy "Users can view own call logs"
  on public.call_logs for select
  using (tenant_id in (
    select id from public.tenants where owner_id = auth.uid()
  ));

-- RLS POLICIES: knowledge_base
create policy "Users can manage own knowledge base"
  on public.knowledge_base for all
  using (tenant_id in (
    select id from public.tenants where owner_id = auth.uid()
  ));

-- SERVICE ROLE INSERT POLICIES (for n8n and webhooks)
create policy "Service role can insert call logs"
  on public.call_logs for insert
  with check (true);

create policy "Service role can insert tenants"
  on public.tenants for insert
  with check (true);

create policy "Service role can insert agent config"
  on public.agent_config for insert
  with check (true);

-- UPDATED AT TRIGGER
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_tenants_updated_at
  before update on public.tenants
  for each row execute function public.handle_updated_at();
