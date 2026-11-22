/**
 * Contenu démo fictif — Phase 1 uniquement.
 * Ces textes ne constituent pas des faits vérifiés ni une publication éditoriale.
 */

export const DEMO_BANNER =
  "Contenu démo fictif — placeholders Phase 1. Ne constitue pas des faits vérifiés.";

export type DemoArticle = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  rubric: string;
  rubricHref: string;
  label: string;
  readingTime: string;
};

export const une: DemoArticle = {
  id: "demo-une",
  slug: "memoires-d-archives-fictives",
  title: "Mémoires d’archives (démo) : relire les silences documentaires",
  dek: "Placeholder éditorial. Illustration de la UNE — aucun événement réel n’est affirmé ici.",
  rubric: "Histoire",
  rubricHref: "/histoire",
  label: "Interprétation historique (démo)",
  readingTime: "8 min",
};

export const sectionArticles: DemoArticle[] = [
  {
    id: "demo-1",
    slug: "routes-commerciales-placeholder",
    title: "Routes et échanges (placeholder) : cartographier sans simplifier",
    dek: "Article fictif pour tester la grille Actualités / Histoire.",
    rubric: "Histoire",
    rubricHref: "/histoire",
    label: "Hypothèse documentaire (démo)",
    readingTime: "6 min",
  },
  {
    id: "demo-2",
    slug: "diasporas-liens-placeholder",
    title: "Diasporas (placeholder) : liens, mémoires, transmissions",
    dek: "Texte de démonstration — aucune source réelle citée.",
    rubric: "Diasporas",
    rubricHref: "/diasporas",
    label: "Analyse (démo)",
    readingTime: "5 min",
  },
  {
    id: "demo-3",
    slug: "geopolitique-fictive-placeholder",
    title: "Géopolitique (placeholder) : distinguer faits et lectures",
    dek: "Structure de maquette pour la rubrique Géopolitique.",
    rubric: "Géopolitique",
    rubricHref: "/geopolitique",
    label: "Analyse géopolitique (démo)",
    readingTime: "7 min",
  },
  {
    id: "demo-4",
    slug: "archives-ouvertes-placeholder",
    title: "Archives (placeholder) : inventaires et lacunes",
    dek: "Exemple de chapô pour une entrée Archives.",
    rubric: "Archives",
    rubricHref: "/archives",
    label: "Fait historique établi (démo)",
    readingTime: "4 min",
  },
];

export const demoVideos = [
  {
    id: "vid-1",
    title: "Documentaire placeholder — archives sonores",
    duration: "12:40",
    rubric: "Documentaires",
  },
  {
    id: "vid-2",
    title: "Entretien fictif — historiens (démo)",
    duration: "08:15",
    rubric: "Histoire",
  },
  {
    id: "vid-3",
    title: "Série maquette — mémoires diasporiques",
    duration: "15:02",
    rubric: "Diasporas",
  },
];

export const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/actualites", label: "Actualités" },
  { href: "/histoire", label: "Histoire" },
  { href: "/geopolitique", label: "Géopolitique" },
  { href: "/diasporas", label: "Diasporas" },
  { href: "/documentaires", label: "Documentaires" },
  { href: "/archives", label: "Archives" },
  { href: "/a-propos", label: "À propos" },
] as const;

export const rubricsMeta: Record<
  string,
  { title: string; description: string }
> = {
  actualites: {
    title: "Actualités",
    description:
      "Veille et informations contemporaines (structure Phase 1 — contenus démo).",
  },
  histoire: {
    title: "Histoire",
    description:
      "Récits historiques documentés, archives et interprétations clairement étiquetées.",
  },
  geopolitique: {
    title: "Géopolitique",
    description:
      "Analyses fondées sur des faits et déclarations documentés — jamais d’intention inventée.",
  },
  diasporas: {
    title: "Diasporas",
    description:
      "Mémoires, trajectoires et transmissions des diasporas africaines et afrodescendantes.",
  },
  documentaires: {
    title: "Documentaires",
    description:
      "Formats longs et audiovisuels (placeholders Phase 1).",
  },
  archives: {
    title: "Archives",
    description:
      "Inventaires, fonds et lacunes documentaires — provenance indiquée.",
  },
};
