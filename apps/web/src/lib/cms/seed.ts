/**
 * Seed CMS Phase 2 — contenu clairement fictif / démo.
 * Ne constitue pas des faits vérifiés.
 */

import type {
  AdminRoleStub,
  CmsArticle,
  CmsCorrection,
  CmsSource,
  LibraryDossier,
  LibraryFacet,
} from "./types";

export const cmsSources: CmsSource[] = [
  {
    id: "src-forbidden-rfi",
    name: "RFI",
    url: "https://www.rfi.fr",
    category: "forbidden_editorial",
    isForbidden: true,
    isPublic: false,
    description: "Source journalistique interdite (charte).",
    country: null,
  },
  {
    id: "src-forbidden-lemonde",
    name: "Le Monde",
    url: "https://www.lemonde.fr",
    category: "forbidden_editorial",
    isForbidden: true,
    isPublic: false,
    description: "Source journalistique interdite (charte).",
    country: null,
  },
  {
    id: "src-forbidden-ja",
    name: "Jeune Afrique",
    url: "https://www.jeuneafrique.com",
    category: "forbidden_editorial",
    isForbidden: true,
    isPublic: false,
    description: "Source journalistique interdite (charte).",
    country: null,
  },
  {
    id: "src-forbidden-nofi",
    name: "Nofi",
    url: "https://www.nofi.media",
    category: "forbidden_editorial",
    isForbidden: true,
    isPublic: false,
    description:
      "Marque Nofi entière interdite (domaines, sous-marques, miroirs, agrégateurs, comptes officiels).",
    country: null,
  },
  {
    id: "src-archives-demo",
    name: "Archives nationales (démo)",
    url: null,
    category: "archive_nationale_africaine",
    isForbidden: false,
    isPublic: true,
    description: "Placeholder institution — fictif.",
    country: "Sénégal",
  },
  {
    id: "src-univ-demo",
    name: "Université démo — département d’histoire",
    url: null,
    category: "universite_africaine",
    isForbidden: false,
    isPublic: true,
    description: "Source académique fictive.",
    country: "Ghana",
  },
  {
    id: "src-agence-demo",
    name: "Agence de presse africaine (démo)",
    url: null,
    category: "agence_presse_africaine",
    isForbidden: false,
    isPublic: true,
    description: "Placeholder agence.",
    country: null,
  },
  {
    id: "src-fonds-demo",
    name: "Fonds privé consultable (démo)",
    url: null,
    category: "archive_primaire_hors_afrique_provenance_indiquee",
    isForbidden: false,
    isPublic: true,
    description: "Provenance indiquée — démo.",
    country: null,
  },
  {
    id: "src-antilles-media",
    name: "Média antillais (démo)",
    url: null,
    category: "media_antillais_interne",
    isForbidden: false,
    isPublic: true,
    description: "Placeholder média local antillais — fictif.",
    country: "Martinique (démo)",
  },
  {
    id: "src-caraibe-media",
    name: "Média caribéen (démo)",
    url: null,
    category: "media_caraibe_interne",
    isForbidden: false,
    isPublic: true,
    description: "Placeholder média caribéen interne — fictif.",
    country: "Haïti (démo)",
  },
  {
    id: "src-antilles-archives",
    name: "Archives antillaises (démo)",
    url: null,
    category: "archive_antillaise_caraibe",
    isForbidden: false,
    isPublic: true,
    description: "Fonds d’archives fictif — provenance démo.",
    country: "Guadeloupe (démo)",
  },
  {
    id: "src-antilles-chercheur",
    name: "Chercheur antillais-caribéen (démo)",
    url: null,
    category: "chercheur_historien_antillais_caraibe",
    isForbidden: false,
    isPublic: true,
    description: "Profil académique fictif.",
    country: null,
  },
  {
    id: "src-antilles-institution",
    name: "Institution publique antillaise (démo)",
    url: null,
    category: "institution_publique_antillaise_caraibe",
    isForbidden: false,
    isPublic: true,
    description: "Institution publique fictive — Caraïbe.",
    country: null,
  },
];

export const cmsArticles: CmsArticle[] = [
  {
    id: "art-une",
    slug: "memoires-d-archives-fictives",
    title: "Mémoires d’archives (démo) : relire les silences documentaires",
    dek: "Placeholder éditorial. Illustration de la UNE — aucun événement réel n’est affirmé ici.",
    body: `## Contenu démo

Ce texte est **fictif**. Il sert à valider la maquette article Phase 2.

### Distinctions

- Les faits établis doivent être étiquetés.
- Les interprétations ne sont pas des certitudes.
- L’absence de preuve n’est jamais une preuve.

### Suite

Paragraphes de démonstration pour la lecture mobile et desktop. Aucune source réelle n’est citée comme vérité historique.`,
    rubricSlug: "histoire",
    status: "PUBLIE",
    contentLabel: "interpretation_historique",
    readingTimeMin: 8,
    authorName: "Rédaction démo",
    sourceIds: ["src-archives-demo", "src-univ-demo"],
    publishedAt: "2026-11-18T10:00:00Z",
    updatedAt: "2026-11-20T12:00:00Z",
    isDemo: true,
  },
  {
    id: "art-1",
    slug: "routes-commerciales-placeholder",
    title: "Routes et échanges (placeholder) : cartographier sans simplifier",
    dek: "Article fictif pour tester la grille Actualités / Histoire.",
    body: `## Démo

Cartographie fictive des échanges. Aucun fait historique affirmé.

Les hypothèses documentaires restent marquées comme telles.`,
    rubricSlug: "histoire",
    status: "PUBLIE",
    contentLabel: "hypothese_documentaire",
    readingTimeMin: 6,
    authorName: "Rédaction démo",
    sourceIds: ["src-fonds-demo"],
    publishedAt: "2026-11-15T09:00:00Z",
    updatedAt: "2026-11-15T09:00:00Z",
    isDemo: true,
  },
  {
    id: "art-2",
    slug: "diasporas-liens-placeholder",
    title: "Diasporas (placeholder) : liens, mémoires, transmissions",
    dek: "Texte de démonstration — aucune source réelle citée.",
    body: `## Démo diasporas

Mémoires en circulation — structure de page article. Contenu fictif.`,
    rubricSlug: "diasporas",
    status: "PUBLIE",
    contentLabel: "interpretation_historique",
    readingTimeMin: 5,
    authorName: "Rédaction démo",
    sourceIds: ["src-univ-demo"],
    publishedAt: "2026-11-14T11:00:00Z",
    updatedAt: "2026-11-14T11:00:00Z",
    isDemo: true,
  },
  {
    id: "art-3",
    slug: "geopolitique-fictive-placeholder",
    title: "Géopolitique (placeholder) : distinguer faits et lectures",
    dek: "Structure de maquette pour la rubrique Géopolitique.",
    body: `## Triptyque (rappel)

1. Fait documenté (placeholder)
2. Déclaration (placeholder)
3. Analyse étiquetée — jamais une intention inventée.`,
    rubricSlug: "geopolitique",
    status: "PUBLIE",
    contentLabel: "analyse_geopolitique",
    readingTimeMin: 7,
    authorName: "Rédaction démo",
    sourceIds: ["src-agence-demo"],
    publishedAt: "2026-11-12T08:00:00Z",
    updatedAt: "2026-11-16T08:00:00Z",
    isDemo: true,
  },
  {
    id: "art-4",
    slug: "archives-ouvertes-placeholder",
    title: "Archives (placeholder) : inventaires et lacunes",
    dek: "Exemple de chapô pour une entrée Archives.",
    body: `## Inventaire démo

Fonds A, B, C — lacunes notées. Provenance indiquée.`,
    rubricSlug: "archives",
    status: "PUBLIE",
    contentLabel: "fait_historique_etabli",
    readingTimeMin: 4,
    authorName: "Rédaction démo",
    sourceIds: ["src-archives-demo"],
    publishedAt: "2026-11-10T14:00:00Z",
    updatedAt: "2026-11-10T14:00:00Z",
    isDemo: true,
  },
  {
    id: "art-5",
    slug: "veille-continentale-breve-demo",
    title: "Veille continentale (démo) — brève de structure",
    dek: "Information contemporaine de démonstration. Aucun événement réel.",
    body: `## Brève démo

Structure Actualités. Validation humaine requise avant toute pub réelle.`,
    rubricSlug: "actualites",
    status: "PUBLIE",
    contentLabel: "information_contemporaine_verifiee",
    readingTimeMin: 3,
    authorName: "Desk veille démo",
    sourceIds: ["src-agence-demo"],
    publishedAt: "2026-11-19T07:00:00Z",
    updatedAt: "2026-11-19T07:00:00Z",
    isDemo: true,
  },
  {
    id: "art-6",
    slug: "documentaire-archives-sonores-demo",
    title: "Documentaire (démo) : archives sonores et silences",
    dek: "Format long placeholder pour la salle Documentaires.",
    body: `## Format long

Chapô et corps fictifs pour le player / page documentaire.`,
    rubricSlug: "documentaires",
    status: "PUBLIE",
    contentLabel: "interpretation_historique",
    readingTimeMin: 12,
    authorName: "Studio démo",
    sourceIds: ["src-archives-demo", "src-fonds-demo"],
    publishedAt: "2026-11-08T16:00:00Z",
    updatedAt: "2026-11-08T16:00:00Z",
    isDemo: true,
  },
  {
    id: "art-draft",
    slug: "brouillon-editorial-demo",
    title: "Brouillon éditorial (démo) — non publié",
    dek: "Article en statut BROUILLON pour le CMS admin.",
    body: "Corps brouillon — ne pas exposer en public.",
    rubricSlug: "histoire",
    status: "BROUILLON",
    contentLabel: "hypothese_documentaire",
    readingTimeMin: 5,
    authorName: "Rédacteur démo",
    sourceIds: [],
    publishedAt: null,
    updatedAt: "2026-11-21T09:00:00Z",
    isDemo: true,
  },
  {
    id: "art-review",
    slug: "a-verifier-demo",
    title: "À vérifier (démo) — file éditoriale",
    dek: "Statut À VÉRIFIER pour le tableau de bord admin.",
    body: "En attente de validation humaine.",
    rubricSlug: "actualites",
    status: "A_VERIFIER",
    contentLabel: "information_contemporaine_verifiee",
    readingTimeMin: 4,
    authorName: "Desk veille démo",
    sourceIds: ["src-agence-demo"],
    publishedAt: null,
    updatedAt: "2026-11-21T18:00:00Z",
    isDemo: true,
  },
  {
    id: "art-correction",
    slug: "correction-necessaire-demo",
    title: "Correction nécessaire (démo)",
    dek: "Article marqué CORRECTION NÉCESSAIRE — historique public associé.",
    body: "Version corrigée en cours. Voir historique public des corrections.",
    rubricSlug: "geopolitique",
    status: "CORRECTION_NECESSAIRE",
    contentLabel: "analyse_geopolitique",
    readingTimeMin: 6,
    authorName: "Rédaction démo",
    sourceIds: ["src-agence-demo"],
    publishedAt: "2026-11-05T10:00:00Z",
    updatedAt: "2026-11-21T20:00:00Z",
    isDemo: true,
  },
];

export const libraryFacets: LibraryFacet[] = [
  { id: "f-sn", kind: "pays", slug: "senegal", label: "Sénégal" },
  { id: "f-gh", kind: "pays", slug: "ghana", label: "Ghana" },
  { id: "f-ao", kind: "region", slug: "afrique-ouest", label: "Afrique de l’Ouest" },
  { id: "f-ac", kind: "region", slug: "afrique-centrale", label: "Afrique centrale" },
  { id: "f-19", kind: "siecle", slug: "xixe", label: "XIXe siècle" },
  { id: "f-20", kind: "siecle", slug: "xxe", label: "XXe siècle" },
  { id: "f-ind", kind: "periode", slug: "independances", label: "Indépendances" },
  { id: "f-fig", kind: "personnalite", slug: "figure-demo-a", label: "Figure démo A" },
  { id: "f-ev", kind: "evenement", slug: "evenement-demo-1", label: "Événement démo 1" },
  { id: "f-mem", kind: "thematique", slug: "memoires", label: "Mémoires" },
  { id: "f-arch", kind: "thematique", slug: "archives", label: "Archives" },
  { id: "f-fonds", kind: "type_document", slug: "fonds-archive", label: "Fonds d’archives" },
  { id: "f-carte", kind: "type_document", slug: "carte", label: "Carte" },
];

export const libraryDossiers: LibraryDossier[] = [
  {
    id: "dos-1",
    slug: "silences-documentaires-ouest",
    title: "Silences documentaires — Afrique de l’Ouest (démo)",
    summary:
      "Dossier fictif : inventaires, lacunes et transmissions. Aucun fait historique affirmé.",
    presentation: `Ce dossier de démonstration illustre la structure « bibliothèque historique » :

- présentation,
- chronologie,
- documents / photos / cartes,
- bibliographie,
- sources consultables,
- articles liés,
- vidéos.

Tout le contenu est **placeholder**.`,
    status: "PUBLIE",
    facetIds: ["f-ao", "f-sn", "f-20", "f-mem", "f-arch", "f-fonds"],
    timeline: [
      {
        id: "tl-1",
        eventDate: "≈ 1900 (démo)",
        title: "Ouverture de fonds (fictif)",
        body: "Événement chronologique placeholder.",
      },
      {
        id: "tl-2",
        eventDate: "≈ 1960 (démo)",
        title: "Reclassement d’inventaire (fictif)",
        body: "Aucune date réelle affirmée.",
      },
      {
        id: "tl-3",
        eventDate: "2026 (démo)",
        title: "Relève éditoriale — LE 88ÈME ÉCHO",
        body: "Point d’entrée maquette.",
      },
    ],
    assets: [
      {
        id: "as-1",
        kind: "document",
        title: "Inventaire fictif INV. 88-DEMO-014",
        caption: "Page d’inventaire — démo",
        provenance: "Archives nationales (démo)",
        isAiReconstitution: false,
      },
      {
        id: "as-2",
        kind: "photo",
        title: "Cliché placeholder",
        caption: "Photo documentaire fictive",
        provenance: "Fonds privé (démo)",
        isAiReconstitution: false,
      },
      {
        id: "as-3",
        kind: "carte",
        title: "Carte des routes (placeholder)",
        caption: "Schéma — non géoréférencé",
        provenance: "Université démo",
        isAiReconstitution: false,
      },
      {
        id: "as-4",
        kind: "photo",
        title: "Reconstitution de salle d’archives",
        caption: "Reconstitution historique générée par intelligence artificielle.",
        provenance: "ÉCHO VISUEL (démo)",
        isAiReconstitution: true,
      },
    ],
    biblio: [
      {
        id: "bib-1",
        citation: "Auteur fictif, Titre inventé, Lieu, année (démo).",
        url: null,
      },
      {
        id: "bib-2",
        citation: "Collectif, Inventaires et silences, éd. démo, 20XX.",
        url: null,
      },
    ],
    articleIds: ["art-une", "art-4", "art-1"],
    sourceIds: ["src-archives-demo", "src-univ-demo", "src-fonds-demo"],
    videoTitles: ["Documentaire placeholder — archives sonores"],
    publishedAt: "2026-11-17T10:00:00Z",
    isDemo: true,
  },
  {
    id: "dos-2",
    slug: "trajectoires-diasporiques-demo",
    title: "Trajectoires diasporiques (démo)",
    summary:
      "Second dossier fictif — thématique mémoires / personnalités.",
    presentation:
      "Présentation courte pour tester filtres pays / thématique / personnalité.",
    status: "PUBLIE",
    facetIds: ["f-gh", "f-ao", "f-fig", "f-mem", "f-ind"],
    timeline: [
      {
        id: "tl-a",
        eventDate: "Période démo",
        title: "Transmission familiale (fictif)",
        body: "Placeholder chronologie.",
      },
    ],
    assets: [
      {
        id: "as-b1",
        kind: "document",
        title: "Lettre fictive",
        caption: "Document de démonstration",
        provenance: "Fonds privé (démo)",
        isAiReconstitution: false,
      },
    ],
    biblio: [
      {
        id: "bib-b1",
        citation: "Référence bibliographique inventée (démo).",
        url: null,
      },
    ],
    articleIds: ["art-2"],
    sourceIds: ["src-univ-demo"],
    videoTitles: ["Série maquette — mémoires diasporiques"],
    publishedAt: "2026-11-16T12:00:00Z",
    isDemo: true,
  },
  {
    id: "dos-draft",
    slug: "dossier-brouillon-demo",
    title: "Dossier brouillon (démo)",
    summary: "Non publié — visible côté admin uniquement.",
    presentation: "Stub admin.",
    status: "BROUILLON",
    facetIds: ["f-ac", "f-19"],
    timeline: [],
    assets: [],
    biblio: [],
    articleIds: [],
    sourceIds: [],
    videoTitles: [],
    publishedAt: null,
    isDemo: true,
  },
];

export const cmsCorrections: CmsCorrection[] = [
  {
    id: "corr-1",
    articleId: "art-correction",
    articleSlug: "correction-necessaire-demo",
    articleTitle: "Correction nécessaire (démo)",
    summary: "Précision de libellé sur une formulation ambiguë (démo).",
    body: "Correction publique fictive : le passage X a été reformulé pour distinguer fait et analyse. Aucun contenu réel modifié.",
    publishedAt: "2026-11-21T21:00:00Z",
    isPublic: true,
  },
  {
    id: "corr-2",
    articleId: "art-3",
    articleSlug: "geopolitique-fictive-placeholder",
    articleTitle: "Géopolitique (placeholder) : distinguer faits et lectures",
    summary: "Ajout d’un étiquetage « analyse » manquant (démo).",
    body: "Historique public — démonstration de transparence éditoriale.",
    publishedAt: "2026-11-16T09:30:00Z",
    isPublic: true,
  },
];

export const adminRoles: AdminRoleStub[] = [
  { id: "u-dir", displayName: "Karamba (stub)", role: "directeur" },
  { id: "u-red", displayName: "Rédacteur démo", role: "redacteur" },
  { id: "u-val", displayName: "Validateur démo", role: "validateur" },
  { id: "u-lec", displayName: "Lecteur admin démo", role: "lecteur_admin" },
];
