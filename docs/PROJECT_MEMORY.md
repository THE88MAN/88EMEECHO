# PROJECT_MEMORY — LE 88ÈME ÉCHO

## Session initiale (2026-11-21, Europe/Paris)

- Projet démarré dans Cursor Project « 88 EME ECHO ».
- Domaine cible : 88.com.
- Logo officiel déposé dans le Context store.
- Dépôt GitHub : https://github.com/THE88MAN/88EMEECHO.git
- Gouvernance : charte, policy JSON, architecture, project-context (Context + dépôt `content/`).
- Direction artistique : noir profond, or vieilli, blanc cassé, anthracite, rouge sombre ; typographie éditoriale (Cormorant Garamond + Source Sans 3) ; mobile-first.
- Règle d’or : ne jamais modifier la ligne éditoriale sans autorisation du directeur éditorial.

## Phase 1 — Fondations (livrée)

- App Next.js App Router + TypeScript + Tailwind dans `apps/web/`.
- Navigation complète + recherche UI + stubs rubriques + admin stub.
- Accueil immersif : hero brand full-bleed, UNE, sections, vidéos placeholders (démo fictive claire).
- Module d’exclusion technique des sources interdites (RFI, Le Monde, Jeune Afrique).
- Schéma SQL Supabase initial + seed sources interdites + trigger de rejet.
- Docs mémoire : TASKS, ARCHITECTURE, EDITORIAL_RULES, RESEARCH_LOG, CHANGELOG.
- Contenu public Phase 1 = placeholders fictifs uniquement. Pas de production.

## Décisions techniques

- Next.js 15 App Router ; pas de credentials Supabase dans le dépôt.
- Charte et policy copiées dans `content/` (source dépôt) et `apps/web/src/lib/editorial/` (runtime).
- Preview / publish-app Cursor autorisés ; Vercel + 88.com uniquement après feu vert.

## Erreurs connues

- Auth admin non branchée (stub volontaire).
- Recherche = index démo local, pas de full-text DB.
- Images hero / logo locales ; pas encore de Storage Supabase.

## Refonte Mémoire vivante (2026-11-21)

- Karamba valide hybride A+B+C.
- Branche `cursor/refonte-memoire-vivante-hybride` : accueil en salles, Framer Motion, typo/tokens mis à jour.
- Charte / sources interdites / DB inchangées.

## Prochaine priorité

Phase 2 : CMS articles réels, bibliothèque de sources, auth Supabase, pages article.
