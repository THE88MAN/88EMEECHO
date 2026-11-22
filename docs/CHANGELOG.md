# CHANGELOG — LE 88ÈME ÉCHO

## [0.6.0] — 2026-11-22 — Phase 6 production prep

### Ajouté
- Suite `npm test` (Nofi, gate charte, distribution, readiness).
- Admin `/admin/readiness` — `productionDeployAllowed=false`.
- Headers sécurité Next.js ; doc `PRODUCTION_READINESS.md`.
- Migration SQL `007_phase6_readiness_audit.sql`.

### Non fait
- **Aucun déploiement** sur 88emeecho.com.

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
