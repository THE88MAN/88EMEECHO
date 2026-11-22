-- LE 88ÈME ÉCHO — Phase 4 agents ÉCHO
-- ARCHIVES, FACT-CHECK, VISUEL, ÉDITION (+ VEILLE Phase 3).
-- Politique commune : respect charte, pas de contournement sources interdites.
-- Seed démo fictif. Pas de prod.

create type public.echo_agent_kind as enum (
  'veille',
  'archives',
  'fact_check',
  'visuel',
  'edition'
);

create type public.echo_job_status as enum (
  'planifie',
  'en_cours',
  'suspendu',
  'termine',
  'echec',
  'attente_humain'
);

create type public.echo_task_status as enum (
  'queued',
  'running',
  'blocked_charte',
  'needs_review',
  'done',
  'rejected'
);

-- Registre agents
create table if not exists public.echo_agents (
  id uuid primary key default gen_random_uuid(),
  kind public.echo_agent_kind not null unique,
  display_name text not null,
  description text,
  must_respect_charter boolean not null default true,
  can_modify_charter boolean not null default false,
  can_auto_publish boolean not null default false,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- Jobs / runs agent
create table if not exists public.echo_agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent_kind public.echo_agent_kind not null,
  label text not null,
  status public.echo_job_status not null default 'planifie',
  triggered_by text,
  started_at timestamptz,
  finished_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

-- File persistante de tâches
create table if not exists public.echo_agent_tasks (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.echo_agent_runs (id) on delete set null,
  agent_kind public.echo_agent_kind not null,
  status public.echo_task_status not null default 'queued',
  title text not null,
  payload jsonb not null default '{}',
  result_summary text,
  charter_check_passed boolean,
  blocked_reason text,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Journal agents
create table if not exists public.echo_agent_journal (
  id uuid primary key default gen_random_uuid(),
  agent_kind public.echo_agent_kind,
  run_id uuid references public.echo_agent_runs (id) on delete set null,
  task_id uuid references public.echo_agent_tasks (id) on delete set null,
  level text not null default 'info',
  message text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

-- Mémoire éditoriale (sujets, recherches, suggestions d’angles)
create table if not exists public.editorial_memory (
  id uuid primary key default gen_random_uuid(),
  kind text not null, -- sujet | recherche | source_note | angle | image_ref
  title text not null,
  body text,
  related_article_id uuid references public.articles (id) on delete set null,
  related_dossier_id uuid references public.library_dossiers (id) on delete set null,
  agent_kind public.echo_agent_kind,
  tags text[] not null default '{}',
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Fiches reconstitutions VISUEL
create table if not exists public.echo_visuel_sheets (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.echo_agent_tasks (id) on delete cascade,
  subject text not null,
  period text,
  references_text text,
  established_elements text,
  reconstructed_elements text,
  uncertainties text,
  model_used text,
  mandatory_label text not null default 'Reconstitution historique générée par intelligence artificielle.',
  is_demo boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists echo_tasks_agent_status_idx
  on public.echo_agent_tasks (agent_kind, status);
create index if not exists echo_journal_created_idx
  on public.echo_agent_journal (created_at desc);
create index if not exists editorial_memory_kind_idx
  on public.editorial_memory (kind);

alter table public.echo_agents enable row level security;
alter table public.echo_agent_runs enable row level security;
alter table public.echo_agent_tasks enable row level security;
alter table public.echo_agent_journal enable row level security;
alter table public.editorial_memory enable row level security;
alter table public.echo_visuel_sheets enable row level security;

insert into public.echo_agents (kind, display_name, description, can_auto_publish) values
  ('veille', 'ÉCHO VEILLE', 'Veille actualités africaines francophones (Phase 3)', false),
  ('archives', 'ÉCHO ARCHIVES', 'Recherche historique persistante — pas de contournement d’accès', false),
  ('fact_check', 'ÉCHO FACT-CHECK', 'Vérification dates, citations, références', false),
  ('visuel', 'ÉCHO VISUEL', 'Reconstitutions documentées + label IA obligatoire', false),
  ('edition', 'ÉCHO ÉDITION', 'Titres, chapôs, propositions conformes à la charte', false)
on conflict (kind) do nothing;

comment on table public.echo_agents is 'Agents ÉCHO — must_respect_charter=true ; can_auto_publish=false';
