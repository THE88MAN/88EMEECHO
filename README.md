# LE 88ÈME ÉCHO

Média documentaire indépendant consacré à l’histoire africaine, aux diasporas, aux mémoires oubliées et aux enjeux contemporains du continent.

- **Domaine cible :** [88emeecho.com](https://88emeecho.com) (pas de déploiement production sans autorisation du directeur éditorial)
- **Langue publique :** français
- **Stack Phase 1 :** Next.js (App Router) + TypeScript + Tailwind CSS ; schéma PostgreSQL Supabase

## Démarrage local

```bash
cd apps/web
npm install
npm run dev
```

Ouvrir [http://127.0.0.1:3000](http://127.0.0.1:3000).

Depuis la racine : `npm run dev` / `npm run build`.

## Structure

```
apps/web/          # Application Next.js (public + admin stub)
content/           # Charte éditoriale et policy JSON (source de vérité dépôt)
docs/              # Mémoire projet (PROJECT_MEMORY, TASKS, …)
supabase/          # Migrations SQL
```

## Gouvernance

La charte éditoriale et la liste des sources interdites (RFI, Le Monde, Jeune Afrique) ne doivent **jamais** être modifiées sans autorisation explicite du directeur éditorial.

Phase 1 expose du **contenu démo fictif** clairement signalé — ce ne sont pas des faits vérifiés.
