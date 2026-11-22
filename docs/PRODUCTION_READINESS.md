# Production readiness — LE 88ÈME ÉCHO

**Phase 6 — préparation uniquement. Ne pas déployer sur 88emeecho.com.**

Date de référence : 2026-11-22.  
Branche : `cursor/phase6-production-prep`.

## Verdict

| Décision | Statut |
|----------|--------|
| Déploiement prod `88emeecho.com` | **BLOQUÉ** — autorisation directeur requise |
| Contenu démo fictif | Encore présent (bannière) |
| Charte / Nofi / monogramme 88 | Vérifiés sync + tests verts |

## Suites de tests

Dans `apps/web` :

```bash
npm test
```

Couvre :

1. Sources interdites (RFI, Le Monde, Jeune Afrique, **Nofi marque entière**)
2. Gate charte agents (invention, IA-photo, auto-publish, Nofi)
3. Distribution (domaine, newsletter stub)
4. Audit readiness automatisé (`productionDeployAllowed: false`)

## Checklists

### Sécurité

- [x] `poweredByHeader: false`
- [x] Headers XFO / nosniff / Referrer-Policy / Permissions-Policy / CSP de base
- [ ] Auth admin Supabase réelle
- [ ] Rate-limit API publiques
- [ ] Secrets uniquement hors dépôt + revue manuelle
- [ ] Policies RLS opérationnelles (pas seulement `enable`)

### Performance

- [x] Fonts via `next/font`
- [x] Images locales / monogramme
- [x] Cache RSS
- [ ] Budget JS home (Framer Motion) validé sous trafic réel
- [ ] `npm run build` + smoke sur preview hébergeur

### Éditorial

- [x] Sync `content/` ↔ `apps/web/src/lib/editorial/`
- [x] Nofi marque entière
- [x] Veille `francophoneOnly`
- [x] `autoPublish.allowed = false`
- [x] Monogramme `logo-88-mark.png`
- [ ] Retrait contenu démo avant ouverture publique

### Domaine 88emeecho.com

- [ ] DNS (A/AAAA ou CNAME)
- [ ] TLS
- [ ] Redirect www
- [ ] `NEXT_PUBLIC_SITE_URL=https://88emeecho.com`
- [ ] Search Console — **après** autorisation prod

## UI admin

`/admin/readiness` — tableau de bord checklist (aucun bouton déployer).

## Autorisation go-live

Seul le directeur éditorial peut lever le blocage prod. Cette doc et la Phase 6 **ne constituent pas** une autorisation.
