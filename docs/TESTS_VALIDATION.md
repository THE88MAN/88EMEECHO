# TESTS VALIDATION — LE 88ÈME ÉCHO

| Suite | Statut | Notes |
|-------|--------|-------|
| `npm test` | **Vérifié** | forbidden-sources, policy, distribution, readiness, rich-text |
| `npm run lint` | **Vérifié** | 0 warning |
| `npm run build` | À rejouer sur la branche avant PR | |
| Playwright multi-viewport | **Vérifié** (local) | 375/390/768/1440/1920 — pages /, actualités, article, à-propos, readiness |
| Overflow horizontal | **Vérifié** — aucun sur pages smoke |
| Erreurs JS page | **Vérifié** — aucune sur smoke |
| Public crawl anonyme | **Vérifié** — gate Cursor « An app made with Cursor » |
| Auth API locale | **Partiellement vérifié** — identity.dev simule un viewer |
| Veille live 54 États | **Non testé / non opérationnel** (stub) |
| Génération images IA | **Non testé** (stub) |
| Connexion admin réelle | **Défectueux / stub** — pas Supabase Auth |

Légende demandée : vérifié / partiellement vérifié / non testé / défectueux.
