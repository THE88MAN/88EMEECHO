-- LE 88ÈME ÉCHO — Phase 5 distribution
-- SEO / newsletter / abonnements / partages / stats stubs.
-- Charte, Nofi, monogramme : inchangés. Pas de prod.

create type public.newsletter_status as enum (
  'pending',
  'confirmed',
  'unsubscribed'
);

create type public.share_channel as enum (
  'copy',
  'email',
  'x',
  'linkedin',
  'whatsapp',
  'facebook'
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status public.newsletter_status not null default 'pending',
  source text,
  is_demo boolean not null default true,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz
);

create table if not exists public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price_label text not null,
  cadence text,
  description text,
  features text[] not null default '{}',
  is_demo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.page_stats (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  title text not null,
  views integer not null default 0,
  shares integer not null default 0,
  is_demo boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.share_events (
  id uuid primary key default gen_random_uuid(),
  channel public.share_channel not null,
  path text not null,
  title text not null,
  is_demo boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists share_events_created_idx
  on public.share_events (created_at desc);
create index if not exists page_stats_views_idx
  on public.page_stats (views desc);

alter table public.newsletter_subscribers enable row level security;
alter table public.subscription_plans enable row level security;
alter table public.page_stats enable row level security;
alter table public.share_events enable row level security;

insert into public.subscription_plans (slug, name, price_label, cadence, description, features)
values
  (
    'lecture-libre',
    'Lecture libre',
    '0 €',
    null,
    'Accès public (stub)',
    array['Articles publiés', 'Bibliothèque', 'RSS', 'Newsletter']
  ),
  (
    'soutien',
    'Soutien (stub)',
    '—',
    'mensuel',
    'Placeholder — aucun paiement',
    array['Accès anticipé (placeholder)', 'Sans publicité (placeholder)']
  )
on conflict (slug) do nothing;

comment on table public.newsletter_subscribers is 'Phase 5 — stubs newsletter, pas d’envoi réel';
comment on table public.page_stats is 'Phase 5 — stats locales stub, pas d’analytics tiers';
