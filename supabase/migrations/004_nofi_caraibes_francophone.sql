-- Directive éditoriale Karamba 2026-11-22
-- + Nofi interdit ; sources antillaises/caribéennes internes autorisées ;
--   veille francophone (watchLanguages = fr).

insert into public.sources (name, url, category, is_forbidden, notes)
values
  (
    'Nofi',
    'https://www.nofi.media',
    'forbidden_editorial',
    true,
    'Charte : marque Nofi entière interdite (domaines, sous-marques, miroirs, agrégateurs, comptes officiels)'
  )
on conflict (name) do update
  set is_forbidden = true,
      category = 'forbidden_editorial',
      notes = excluded.notes;

-- Sources antillaises & caribéennes internes (seed démo fictif)
insert into public.sources (name, url, category, is_forbidden, is_public, description, notes)
values
  (
    'Média antillais (démo)',
    null,
    'media_antillais_interne',
    false,
    true,
    'Placeholder média local antillais — fictif.',
    'Seed directive Caraïbes 2026-11-22'
  ),
  (
    'Média caribéen (démo)',
    null,
    'media_caraibe_interne',
    false,
    true,
    'Placeholder média caribéen interne — fictif.',
    'Seed directive Caraïbes 2026-11-22'
  ),
  (
    'Archives antillaises (démo)',
    null,
    'archive_antillaise_caraibe',
    false,
    true,
    'Fonds d’archives fictif — provenance démo.',
    'Seed directive Caraïbes 2026-11-22'
  ),
  (
    'Chercheur antillais-caribéen (démo)',
    null,
    'chercheur_historien_antillais_caraibe',
    false,
    true,
    'Profil académique fictif.',
    'Seed directive Caraïbes 2026-11-22'
  ),
  (
    'Institution publique antillaise (démo)',
    null,
    'institution_publique_antillaise_caraibe',
    false,
    true,
    'Institution publique fictive — Caraïbe.',
    'Seed directive Caraïbes 2026-11-22'
  )
on conflict (name) do nothing;

comment on table public.sources is
  'Sources éditoriales — interdites : RFI, Le Monde, Jeune Afrique, Nofi. Autorisées : africaines + antillaises/caribéennes internes.';
