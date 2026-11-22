# CORRECTIONS EFFECTUÉES — LE 88ÈME ÉCHO

Branche : `cursor/audit-refonte-tech-11df`

1. **Métadonnées titre officiel** — `SITE_TITLE_FULL` = « LE 88ÈME ÉCHO — Histoire, mémoire et actualités africaines » (layout + OG/Twitter).
2. **XSS articles** — échappement HTML avant rendu (`lib/cms/rich-text.ts`).
3. **Auth API agents & veille** — `requireIdentity` via `cursor/identity.ts` (app privée Cursor).
4. **Rate-limit + taille corps** — newsletter, share, agents, veille (`lib/security/api-guard.ts`).
5. **Propositions DA** — `/da-propositions/` (A Salle noire, B Broadsheet, C Collage) — pas de refonte globale appliquée.
6. **Tests** — ajout `rich-text.test.ts` au runner `npm test`.

Non modifié : charte, sources interdites, contenus seed (toujours marqués démo).
