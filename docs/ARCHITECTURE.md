# ARCHITECTURE — LE 88ÈME ÉCHO

Voir aussi la synthèse Context : architecture projet.

## Stack Phase 1

| Couche | Choix |
|--------|--------|
| Frontend | Next.js 15 App Router + TypeScript (`apps/web`) |
| UI | Tailwind CSS — noir / or vieilli / blanc cassé / anthracite / rouge sombre |
| Fonts | Cormorant Garamond (display) + Source Sans 3 (UI) |
| Données | PostgreSQL via Supabase — migrations dans `supabase/migrations/` |
| Auth | Stub admin ; Supabase Auth prévu Phase 2 |
| Déploiement cible | Vercel → 88emeecho.com (après autorisation) |
| Preview | Cursor publish-app / preview locale |

## Arborescence

```
apps/web/
  src/app/           # Routes publiques + /admin stub + /api/search
  src/components/    # Header, hero, UNE, sections, footer…
  src/lib/editorial/ # Charte, policy JSON, filtre sources interdites
  src/lib/db/        # Types + client stub Supabase
  src/lib/demo/      # Contenu fictif Phase 1
content/
  editorial-charter.md
  editorial-policy.json
docs/
supabase/migrations/
```

## Sécurité Phase 1

- Pas de secrets dans le dépôt.
- `robots: noindex` sur le site public Phase 1 et l’admin.
- Trigger SQL : refuse l’attachement d’une source `is_forbidden` à un article.
- Module TS `isForbiddenEditorialSource` pour les pipelines futurs.

## Hors scope Phase 1

Agents ÉCHO, veille 54 États, CMS complet, Storage, SEO production, déploiement 88emeecho.com.
