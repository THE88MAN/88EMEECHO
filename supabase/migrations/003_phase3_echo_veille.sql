-- LE 88ÈME ÉCHO — Phase 3 ÉCHO VEILLE
-- Pipeline veille Afrique : 54 États, file persistante, journal.
-- Pas d’auto-publish si incertitude. Seed démo fictif uniquement.

create type public.veille_job_status as enum (
  'planifie',
  'en_cours',
  'suspendu',
  'termine',
  'echec'
);

create type public.veille_pipeline_stage as enum (
  'recherche',
  'collecte',
  'verification',
  'redaction_fr',
  'validation',
  'publie',
  'rejete'
);

create type public.veille_uncertainty as enum (
  'aucune',
  'faible',
  'forte'
);

-- 54 États africains (couverture continentale)
create table if not exists public.african_states (
  code char(2) primary key,
  name_fr text not null,
  name_local text,
  region text not null,
  official_languages text[] not null default '{}',
  active_veille boolean not null default true,
  notes text
);

-- Runs de veille (jobs planifiés / manuels)
create table if not exists public.veille_runs (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  status public.veille_job_status not null default 'planifie',
  scheduled_for timestamptz,
  started_at timestamptz,
  finished_at timestamptz,
  triggered_by text,
  states_targeted char(2)[] not null default '{}',
  languages_monitored text[] not null default '{fr,en,ar,pt}',
  notes text,
  created_at timestamptz not null default now()
);

-- File persistante d’items de veille
create table if not exists public.veille_queue_items (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.veille_runs (id) on delete set null,
  state_code char(2) references public.african_states (code) on delete set null,
  stage public.veille_pipeline_stage not null default 'recherche',
  publication_status public.publication_status not null default 'BROUILLON',
  uncertainty public.veille_uncertainty not null default 'forte',
  source_language text,
  title_fr text,
  dek_fr text,
  contexte text,
  faits text,
  enjeux text,
  a_confirmer text,
  auto_publish_blocked boolean not null default true,
  block_reason text,
  candidate_source_name text,
  candidate_source_url text,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Lien item → article CMS (après validation)
alter table public.veille_queue_items
  add column if not exists article_id uuid references public.articles (id) on delete set null;

create table if not exists public.veille_item_sources (
  item_id uuid not null references public.veille_queue_items (id) on delete cascade,
  source_id uuid not null references public.sources (id) on delete restrict,
  primary key (item_id, source_id)
);

-- Empêcher source interdite sur item veille
create or replace function public.reject_forbidden_veille_source()
returns trigger
language plpgsql
as $$
begin
  if exists (
    select 1 from public.sources s
    where s.id = new.source_id and s.is_forbidden = true
  ) then
    raise exception 'Source journalistique interdite (charte éditoriale) — ÉCHO VEILLE';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_reject_forbidden_veille_source on public.veille_item_sources;
create trigger trg_reject_forbidden_veille_source
  before insert or update on public.veille_item_sources
  for each row execute function public.reject_forbidden_veille_source();

-- Journal de veille (audit)
create table if not exists public.veille_journal (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.veille_runs (id) on delete set null,
  item_id uuid references public.veille_queue_items (id) on delete set null,
  level text not null default 'info',
  message text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

-- Cron stubs (planification déclarative — exécution hors app)
create table if not exists public.veille_cron_stubs (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  cron_expr text not null,
  enabled boolean not null default false,
  description text,
  last_planned_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists veille_queue_stage_idx on public.veille_queue_items (stage);
create index if not exists veille_queue_status_idx on public.veille_queue_items (publication_status);
create index if not exists veille_runs_status_idx on public.veille_runs (status);
create index if not exists veille_journal_created_idx on public.veille_journal (created_at desc);

alter table public.african_states enable row level security;
alter table public.veille_runs enable row level security;
alter table public.veille_queue_items enable row level security;
alter table public.veille_item_sources enable row level security;
alter table public.veille_journal enable row level security;
alter table public.veille_cron_stubs enable row level security;

-- Seed cron stubs (désactivés — pas d’exécution prod)
insert into public.veille_cron_stubs (name, cron_expr, enabled, description) values
  ('echo-veille-quotidienne', '0 6 * * *', false, 'Veille continentale quotidienne (stub)'),
  ('echo-veille-urgence', '*/30 * * * *', false, 'Balayage urgence — stub, validation humaine obligatoire')
on conflict (name) do nothing;

comment on table public.veille_queue_items is 'File ÉCHO VEILLE — auto_publish_blocked=true si uncertainty != aucune';
-- Seed 54 États (Phase 3)
insert into public.african_states (code, name_fr, region, official_languages) values
  ('DZ', 'Algérie', 'Afrique du Nord', '{ar,fr}'),
  ('AO', 'Angola', 'Afrique australe', '{pt}'),
  ('BJ', 'Bénin', 'Afrique de l’Ouest', '{fr}'),
  ('BW', 'Botswana', 'Afrique australe', '{en}'),
  ('BF', 'Burkina Faso', 'Afrique de l’Ouest', '{fr}'),
  ('BI', 'Burundi', 'Afrique de l’Est', '{fr,en}'),
  ('CV', 'Cabo Verde', 'Afrique de l’Ouest', '{pt}'),
  ('CM', 'Cameroun', 'Afrique centrale', '{fr,en}'),
  ('CF', 'Centrafrique', 'Afrique centrale', '{fr}'),
  ('TD', 'Tchad', 'Afrique centrale', '{fr,ar}'),
  ('KM', 'Comores', 'Afrique de l’Est', '{ar,fr}'),
  ('CG', 'Congo', 'Afrique centrale', '{fr}'),
  ('CD', 'RD Congo', 'Afrique centrale', '{fr}'),
  ('CI', 'Côte d’Ivoire', 'Afrique de l’Ouest', '{fr}'),
  ('DJ', 'Djibouti', 'Afrique de l’Est', '{fr,ar}'),
  ('EG', 'Égypte', 'Afrique du Nord', '{ar}'),
  ('GQ', 'Guinée équatoriale', 'Afrique centrale', '{es,fr,pt}'),
  ('ER', 'Érythrée', 'Afrique de l’Est', '{en,ar}'),
  ('SZ', 'Eswatini', 'Afrique australe', '{en}'),
  ('ET', 'Éthiopie', 'Afrique de l’Est', '{en}'),
  ('GA', 'Gabon', 'Afrique centrale', '{fr}'),
  ('GM', 'Gambie', 'Afrique de l’Ouest', '{en}'),
  ('GH', 'Ghana', 'Afrique de l’Ouest', '{en}'),
  ('GN', 'Guinée', 'Afrique de l’Ouest', '{fr}'),
  ('GW', 'Guinée-Bissau', 'Afrique de l’Ouest', '{pt}'),
  ('KE', 'Kenya', 'Afrique de l’Est', '{en}'),
  ('LS', 'Lesotho', 'Afrique australe', '{en}'),
  ('LR', 'Liberia', 'Afrique de l’Ouest', '{en}'),
  ('LY', 'Libye', 'Afrique du Nord', '{ar}'),
  ('MG', 'Madagascar', 'Afrique de l’Est', '{fr}'),
  ('MW', 'Malawi', 'Afrique australe', '{en}'),
  ('ML', 'Mali', 'Afrique de l’Ouest', '{fr}'),
  ('MR', 'Mauritanie', 'Afrique de l’Ouest', '{ar,fr}'),
  ('MU', 'Maurice', 'Afrique de l’Est', '{en,fr}'),
  ('MA', 'Maroc', 'Afrique du Nord', '{ar,fr}'),
  ('MZ', 'Mozambique', 'Afrique australe', '{pt}'),
  ('NA', 'Namibie', 'Afrique australe', '{en}'),
  ('NE', 'Niger', 'Afrique de l’Ouest', '{fr}'),
  ('NG', 'Nigeria', 'Afrique de l’Ouest', '{en}'),
  ('RW', 'Rwanda', 'Afrique de l’Est', '{en,fr}'),
  ('ST', 'Sao Tomé-et-Principe', 'Afrique centrale', '{pt}'),
  ('SN', 'Sénégal', 'Afrique de l’Ouest', '{fr}'),
  ('SC', 'Seychelles', 'Afrique de l’Est', '{en,fr}'),
  ('SL', 'Sierra Leone', 'Afrique de l’Ouest', '{en}'),
  ('SO', 'Somalie', 'Afrique de l’Est', '{ar,en}'),
  ('ZA', 'Afrique du Sud', 'Afrique australe', '{en}'),
  ('SS', 'Soudan du Sud', 'Afrique de l’Est', '{en}'),
  ('SD', 'Soudan', 'Afrique du Nord', '{ar,en}'),
  ('TZ', 'Tanzanie', 'Afrique de l’Est', '{en}'),
  ('TG', 'Togo', 'Afrique de l’Ouest', '{fr}'),
  ('TN', 'Tunisie', 'Afrique du Nord', '{ar,fr}'),
  ('UG', 'Ouganda', 'Afrique de l’Est', '{en}'),
  ('ZM', 'Zambie', 'Afrique australe', '{en}'),
  ('ZW', 'Zimbabwe', 'Afrique australe', '{en}')
on conflict (code) do nothing;
