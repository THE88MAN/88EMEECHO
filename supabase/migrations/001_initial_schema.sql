-- LE 88ÈME ÉCHO — schéma initial Phase 1
-- PostgreSQL / Supabase. RLS à activer avant production.
-- Ne pas déployer en production sans autorisation du directeur éditorial.

create extension if not exists "pgcrypto";

-- Rôles applicatifs (profil lié à auth.users côté Supabase)
create type public.user_role as enum (
  'directeur',
  'redacteur',
  'validateur',
  'lecteur_admin'
);

create type public.publication_status as enum (
  'BROUILLON',
  'A_VERIFIER',
  'VALIDE',
  'PUBLIE',
  'CORRECTION_NECESSAIRE'
);

create type public.content_label as enum (
  'fait_historique_etabli',
  'information_contemporaine_verifiee',
  'interpretation_historique',
  'hypothese_documentaire',
  'analyse_geopolitique',
  'opinion_editoriale'
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role public.user_role not null default 'lecteur_admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rubrics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  dek text,
  body text,
  rubric_id uuid references public.rubrics (id) on delete set null,
  status public.publication_status not null default 'BROUILLON',
  content_label public.content_label,
  author_id uuid references public.profiles (id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  url text,
  category text,
  is_forbidden boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

-- Sources journalistiques interdites (charte) — seed
insert into public.sources (name, url, category, is_forbidden, notes)
values
  ('RFI', 'https://www.rfi.fr', 'forbidden_editorial', true, 'Charte : source journalistique interdite'),
  ('Le Monde', 'https://www.lemonde.fr', 'forbidden_editorial', true, 'Charte : source journalistique interdite'),
  ('Jeune Afrique', 'https://www.jeuneafrique.com', 'forbidden_editorial', true, 'Charte : source journalistique interdite')
on conflict (name) do nothing;

create table if not exists public.article_sources (
  article_id uuid not null references public.articles (id) on delete cascade,
  source_id uuid not null references public.sources (id) on delete restrict,
  primary key (article_id, source_id)
);

create table if not exists public.corrections (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  summary text not null,
  body text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.editorial_actions_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_rubric_idx on public.articles (rubric_id);
create index if not exists sources_forbidden_idx on public.sources (is_forbidden);

-- Rubriques Phase 1
insert into public.rubrics (slug, title, description, sort_order) values
  ('actualites', 'Actualités', 'Informations contemporaines vérifiées', 1),
  ('histoire', 'Histoire', 'Récits historiques documentés', 2),
  ('geopolitique', 'Géopolitique', 'Analyses géopolitiques documentées', 3),
  ('diasporas', 'Diasporas', 'Mémoires et transmissions diasporiques', 4),
  ('documentaires', 'Documentaires', 'Formats longs audiovisuels', 5),
  ('archives', 'Archives', 'Fonds et inventaires documentaires', 6)
on conflict (slug) do nothing;

-- Empêcher l'attachement d'une source interdite à un article
create or replace function public.reject_forbidden_article_source()
returns trigger
language plpgsql
as $$
begin
  if exists (
    select 1 from public.sources s
    where s.id = new.source_id and s.is_forbidden = true
  ) then
    raise exception 'Source journalistique interdite (charte éditoriale)';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_reject_forbidden_article_source on public.article_sources;
create trigger trg_reject_forbidden_article_source
  before insert or update on public.article_sources
  for each row execute function public.reject_forbidden_article_source();

-- RLS stubs (à affiner Phase 2 avec policies Auth)
alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.sources enable row level security;
alter table public.rubrics enable row level security;
alter table public.corrections enable row level security;
alter table public.editorial_actions_log enable row level security;
alter table public.article_sources enable row level security;

comment on table public.sources is 'Inclut le seed des sources interdites RFI / Le Monde / Jeune Afrique';
