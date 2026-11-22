-- LE 88ÈME ÉCHO — Phase 2 CMS + bibliothèque historique
-- Enrichit 001_initial_schema.sql. Seed démo clairement fictif.
-- Pas de prod. RLS stubs — Auth réelle optionnelle.

-- Taxonomies bibliothèque
create type public.library_facet_kind as enum (
  'pays',
  'region',
  'siecle',
  'periode',
  'personnalite',
  'evenement',
  'thematique',
  'type_document'
);

create type public.media_asset_kind as enum (
  'photo',
  'document',
  'carte',
  'video',
  'audio',
  'autre'
);

-- Articles : champs éditoriaux enrichis
alter table public.articles
  add column if not exists reading_time_min int,
  add column if not exists hero_caption text,
  add column if not exists is_demo boolean not null default false,
  add column if not exists scheduled_for timestamptz;

-- Sources : catégories charte + consultation publique
alter table public.sources
  add column if not exists description text,
  add column if not exists is_public boolean not null default true,
  add column if not exists country text,
  add column if not exists verified_at timestamptz;

-- Corrections publiques
alter table public.corrections
  add column if not exists is_public boolean not null default true,
  add column if not exists corrected_by uuid references public.profiles (id) on delete set null;

-- Facettes bibliothèque (classement multi-axes)
create table if not exists public.library_facets (
  id uuid primary key default gen_random_uuid(),
  kind public.library_facet_kind not null,
  slug text not null,
  label text not null,
  description text,
  unique (kind, slug)
);

-- Dossiers bibliothèque historique
create table if not exists public.library_dossiers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  presentation text,
  status public.publication_status not null default 'BROUILLON',
  is_demo boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.library_dossier_facets (
  dossier_id uuid not null references public.library_dossiers (id) on delete cascade,
  facet_id uuid not null references public.library_facets (id) on delete cascade,
  primary key (dossier_id, facet_id)
);

-- Chronologie d’un dossier
create table if not exists public.library_timeline_events (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references public.library_dossiers (id) on delete cascade,
  event_date text,
  title text not null,
  body text,
  sort_order int not null default 0
);

-- Médias liés à un dossier
create table if not exists public.library_assets (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references public.library_dossiers (id) on delete cascade,
  kind public.media_asset_kind not null default 'document',
  title text not null,
  caption text,
  url text,
  provenance text,
  is_ai_reconstitution boolean not null default false,
  sort_order int not null default 0
);

-- Bibliographie
create table if not exists public.library_biblio (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references public.library_dossiers (id) on delete cascade,
  citation text not null,
  url text,
  sort_order int not null default 0
);

-- Liens dossier ↔ articles / sources
create table if not exists public.library_dossier_articles (
  dossier_id uuid not null references public.library_dossiers (id) on delete cascade,
  article_id uuid not null references public.articles (id) on delete cascade,
  primary key (dossier_id, article_id)
);

create table if not exists public.library_dossier_sources (
  dossier_id uuid not null references public.library_dossiers (id) on delete cascade,
  source_id uuid not null references public.sources (id) on delete restrict,
  primary key (dossier_id, source_id)
);

-- Empêcher source interdite sur dossier
create or replace function public.reject_forbidden_dossier_source()
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

drop trigger if exists trg_reject_forbidden_dossier_source on public.library_dossier_sources;
create trigger trg_reject_forbidden_dossier_source
  before insert or update on public.library_dossier_sources
  for each row execute function public.reject_forbidden_dossier_source();

create index if not exists library_dossiers_status_idx on public.library_dossiers (status);
create index if not exists library_facets_kind_idx on public.library_facets (kind);
create index if not exists articles_demo_idx on public.articles (is_demo);

alter table public.library_facets enable row level security;
alter table public.library_dossiers enable row level security;
alter table public.library_dossier_facets enable row level security;
alter table public.library_timeline_events enable row level security;
alter table public.library_assets enable row level security;
alter table public.library_biblio enable row level security;
alter table public.library_dossier_articles enable row level security;
alter table public.library_dossier_sources enable row level security;

-- ---------------------------------------------------------------------------
-- Seed démo fictif (ne constitue pas des faits vérifiés)
-- ---------------------------------------------------------------------------

insert into public.library_facets (kind, slug, label, description) values
  ('pays', 'senegal', 'Sénégal', 'Facettes démo — pays'),
  ('pays', 'ghana', 'Ghana', 'Facettes démo — pays'),
  ('region', 'afrique-ouest', 'Afrique de l’Ouest', null),
  ('region', 'afrique-centrale', 'Afrique centrale', null),
  ('siecle', 'xixe', 'XIXe siècle', null),
  ('siecle', 'xxe', 'XXe siècle', null),
  ('periode', 'independances', 'Indépendances', 'Période démo'),
  ('personnalite', 'figure-demo-a', 'Figure démo A', 'Personnalité fictive'),
  ('evenement', 'evenement-demo-1', 'Événement démo 1', 'Événement fictif'),
  ('thematique', 'memoires', 'Mémoires', null),
  ('thematique', 'archives', 'Archives', null),
  ('type_document', 'fonds-archive', 'Fonds d’archives', null),
  ('type_document', 'carte', 'Carte', null)
on conflict (kind, slug) do nothing;

-- Sources autorisées (démo)
insert into public.sources (name, url, category, is_forbidden, is_public, description, notes)
values
  ('Archives nationales (démo)', null, 'archive_nationale_africaine', false, true, 'Placeholder institution — fictif.', 'Seed Phase 2'),
  ('Université démo — département d’histoire', null, 'universite_africaine', false, true, 'Source académique fictive.', 'Seed Phase 2'),
  ('Agence de presse africaine (démo)', null, 'agence_presse_africaine', false, true, 'Placeholder agence.', 'Seed Phase 2'),
  ('Fonds privé consultable (démo)', null, 'archive_primaire_hors_afrique_provenance_indiquee', false, true, 'Provenance indiquée — démo.', 'Seed Phase 2')
on conflict (name) do nothing;

comment on table public.library_dossiers is 'Dossiers bibliothèque historique — Phase 2. Seed démo fictif uniquement.';
