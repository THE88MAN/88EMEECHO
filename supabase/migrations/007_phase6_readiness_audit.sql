-- LE 88ÈME ÉCHO — Phase 6 readiness (journal d’audits locaux)
-- Pas de déploiement prod. Charte / Nofi inchangés.

create table if not exists public.readiness_audit_runs (
  id uuid primary key default gen_random_uuid(),
  generated_at timestamptz not null default now(),
  production_deploy_allowed boolean not null default false,
  domain text not null default '88.com',
  summary jsonb not null default '{}',
  checks jsonb not null default '[]',
  notes text,
  is_demo boolean not null default true
);

alter table public.readiness_audit_runs enable row level security;

comment on table public.readiness_audit_runs is
  'Phase 6 — journaux d’audit readiness ; production_deploy_allowed reste false sans autorisation directeur';
