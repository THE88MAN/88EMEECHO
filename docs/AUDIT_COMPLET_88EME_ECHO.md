# AUDIT COMPLET — LE 88ÈME ÉCHO

Date : 2026-11-22 (Europe/Paris)  
Branche travail : `cursor/audit-refonte-tech-11df`  
Public : https://88eme-echo.apps.grok.bot  
Local : http://127.0.0.1:3000  
Tip audité avant correctifs : `87349fe` (main)

## Synthèse

| Indicateur | Valeur |
|------------|--------|
| Erreurs / constats majeurs | 8 |
| Correctifs appliqués (cette branche) | 5 |
| Restants / partiels | 3 |
| Refonte DA globale | **En attente** du choix parmi 3 propositions |

## Constats (reproduits)

### E1 — Titre public « An app made with Cursor » — **GRAVE / plateforme**

- **Description :** Fetch anonyme de https://88eme-echo.apps.grok.bot renvoie ~840 o HTML, `<title>An app made with Cursor</title>`, `robots: noindex`, page « Open this app ».
- **Fichier :** N/A (gate hébergeur Cursor) — l’app Next.js locale sert déjà `LE 88ÈME ÉCHO`.
- **Cause :** Shell d’accès privé Cursor pour visiteurs non authentifiés ; ce n’est pas le HTML Next.js.
- **Correction proposée :** Titre app → `LE 88ÈME ÉCHO — Histoire, mémoire et actualités africaines` + republish ; le gate peut toujours masquer le HTML aux crawlers anonymes.
- **Correction appliquée :** Oui (metadata Next.js).
- **Test :** Local après rebuild — titre attendu. Public anonyme — gate Cursor (documenté).

### E2 — Auth manquante API agents / veille — **MOYEN**

- **Fichiers :** `api/agents/actions`, `api/veille/actions`
- **Cause :** POST sans vérification d’identité.
- **Correction appliquée :** `requireIdentity` (Cursor identity) + rate-limit.
- **Test :** Local simule viewer via `identity.dev.ts`.

### E3 — XSS article `dangerouslySetInnerHTML` — **FAIBLE→MOYEN**

- **Fichier :** `articles/[slug]/page.tsx`
- **Correction appliquée :** `formatArticleParagraph` échappe HTML avant gras/BR.
- **Test :** `rich-text.test.ts` OK.

### E4 — Pas de rate-limit newsletter/share — **FAIBLE**

- **Correction appliquée :** Rate-limit + plafond taille JSON.
- **Test :** Build + lint OK.

### E5 — Veille « 54 États » non opérationnelle en live — **MOYEN (scope connu)**

- **Description :** Pipeline stub in-memory, seed démo, pas de cron/RSS réel.
- **Cause :** Architecture Phase 3 volontairement stub.
- **Correction :** Non (nécessite backend + sources réelles + autorisation). Documenté dans améliorations.

### E6 — Recherche historique persistante — **MOYEN (stub)**

- Agents ARCHIVES stubs ; file mémoire process, pas Postgres live.
- **Correction :** Non dans ce lot (non destructif partiel seulement via auth API).

### E7 — Images historiques / label IA — **PARTIEL OK**

- Module VISUEL + label obligatoire en seed ; pas de génération LLM réelle.
- **Statut :** Conforme à la charte côté stubs ; génération réelle non branchée.

### E8 — Design « template » vs ambition Mémoire vivante — **UX**

- Accueil hybride A+B+C fonctionnel mais pas encore la DA cible (palette #101010 / #F0E9DC…).
- **Correction :** 3 propositions HTML préparées — **attendre choix** avant refonte globale.

## Vérifications automatisées

| Check | Résultat |
|-------|----------|
| `npm test` | OK (dont rich-text, Nofi, charte, readiness) |
| `npm run lint` | OK |
| Routes locales clés | 200 |
| Playwright 375–1920 | Pas d’overflow ; pas d’erreur JS sur pages testées |
| Public anonyme | Gate Cursor (titre générique) |

## Charte

Nofi / RFI / Le Monde / JA inchangés. `autoPublish=false`. Domaine cible **88.com**. Pas de déploiement 88.com.
