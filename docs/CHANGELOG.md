# CHANGELOG — LE 88ÈME ÉCHO

## [Non publié] — 2026-11-24 — Fiche de traçabilité images IA

### Ajouté
- `checkVisuelSheet()` (`apps/web/src/lib/agents/visuel-sheet.ts`) : refuse une fiche dont un des 7 champs charte est vide, dont la mention obligatoire est modifiée, ou dont le format sort de la policy.
- Paramètres de génération facultatifs (prompt, seed, format, workflow) pour la reproductibilité.
- Statut de complétude affiché sur `/admin/agents/tache/[id]`.
- Migration `008_visuel_sheet_generation.sql` (colonnes génération, contraintes label + format).
- Modèle manuel `docs/templates/fiche-tracabilite-image-ia.md`.
- Test `visuel-sheet.test.ts` dans `npm test`.

## [0.6.0] — 2026-11-22 — Phase 6 production prep

### Ajouté
- Suite `npm test` (Nofi, gate charte, distribution, readiness).
- Admin `/admin/readiness` — `productionDeployAllowed=false`.
- Headers sécurité Next.js ; doc `PRODUCTION_READINESS.md`.
- Migration SQL `007_phase6_readiness_audit.sql`.

### Non fait
- **Aucun déploiement** sur 88.com.

## [0.2.0] — 2026-11-21 — Refonte Mémoire vivante (hybride A+B+C)

### Ajouté / modifié
- Accueil reconstruit : intro (logo → plan → carton), L’Afrique aujourd’hui, Histoires oubliées, Archives parlent, Géopolitique, Diasporas, Documentaires.
- Framer Motion + respect `prefers-reduced-motion`.
- Tokens / typo hybride (Fraunces, Cinzel, Instrument Sans, Source Serif 4).
- Distinction visuelle Archive vs Reconstitution IA.

### Non modifié
- Charte, policy, sources interdites, SQL, API search, admin stub, navigation.

## [0.1.0] — 2026-11-21 — Phase 1 Fondations

### Ajouté
- Application Next.js (`apps/web`) : accueil immersif, navigation, recherche, stubs rubriques, à propos, admin stub.
- Identité visuelle noir / or / blanc cassé / anthracite / rouge sombre ; logo + hero.
- Charte et policy dans `content/` + module d’exclusion RFI / Le Monde / Jeune Afrique.
- Migration SQL Supabase initiale (rubriques, articles, sources, trigger anti-sources interdites).
- Documentation : PROJECT_MEMORY, TASKS, ARCHITECTURE, EDITORIAL_RULES, RESEARCH_LOG, CHANGELOG.

### Notes
- Contenu public = démo fictive clairement signalée.
- Pas de déploiement production.
