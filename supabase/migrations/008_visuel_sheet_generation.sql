-- 008 — Fiche de traçabilité images IA : paramètres de génération + garde-fous
-- Les 7 champs charte restent nullable ici (lignes démo existantes) ;
-- la complétude est contrôlée côté app par checkVisuelSheet().

alter table public.echo_visuel_sheets
  add column if not exists prompt text,
  add column if not exists negative_prompt text,
  add column if not exists seed bigint,
  add column if not exists image_format text,
  add column if not exists workflow_ref text,
  add column if not exists generated_at timestamptz;

-- La mention obligatoire ne peut pas être modifiée.
alter table public.echo_visuel_sheets
  drop constraint if exists echo_visuel_sheets_label_check;
alter table public.echo_visuel_sheets
  add constraint echo_visuel_sheets_label_check
  check (mandatory_label = 'Reconstitution historique générée par intelligence artificielle.');

-- Formats autorisés par editorial-policy.json (aiGeneratedImagery.formats).
alter table public.echo_visuel_sheets
  drop constraint if exists echo_visuel_sheets_format_check;
alter table public.echo_visuel_sheets
  add constraint echo_visuel_sheets_format_check
  check (image_format is null or image_format in ('16:9', '9:16', '1:1', '4:5'));
