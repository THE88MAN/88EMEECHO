# EDITORIAL_RULES — LE 88ÈME ÉCHO

**Document opérationnel.** La source normative reste `content/editorial-charter.md` et `content/editorial-policy.json`. Ce fichier ne les remplace pas et ne doit pas les contredire.

## Règles d’application Phase 1+

1. Ne jamais modifier la charte, la policy ou la liste des sources interdites sans autorisation explicite du directeur éditorial.
2. Étiqueter tout contenu selon : fait historique établi | information contemporaine vérifiée | interprétation historique | hypothèse documentaire | analyse géopolitique | opinion éditoriale.
3. Statuts : BROUILLON → À VÉRIFIER → VALIDÉ → PUBLIÉ (ou CORRECTION NÉCESSAIRE).
4. Pas d’auto-publication. Qualité > quantité ; ne pas inventer pour remplir un calendrier.
5. Sources journalistiques **interdites** comme sources éditoriales : **RFI**, **Le Monde**, **Jeune Afrique**, **Nofi** (marque entière : domaines, miroirs, agrégateurs, comptes officiels). Sources antillaises / caribéennes internes autorisées (évaluées). Veille francophone (`watchLanguages: ["fr"]`).
6. Images IA : mention obligatoire « Reconstitution historique générée par intelligence artificielle. » + fiche de traçabilité.
7. Géopolitique : distinguer faits, déclarations officielles et interprétations ; jamais d’intention d’État sans preuve.
8. Contenu démo Phase 1 : toujours signalé comme fictif / placeholder.

## Implémentation technique

- Filtre TS : `apps/web/src/lib/editorial/forbidden-sources.ts`
- Seed SQL + trigger : `supabase/migrations/001_initial_schema.sql`
- API search : rejet explicite si la requête pointe une source interdite
