/**
 * Contenu démo fictif — placeholders Mémoire vivante.
 * Ces textes ne constituent pas des faits vérifiés ni une publication éditoriale.
 */

export const DEMO_BANNER =
  "Contenu démo fictif — placeholders. Ne constitue pas des faits vérifiés.";

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

export const afriqueAujourdhui = {
  lead: {
    title: "Veille continentale (démo) — une salle, pas un flux",
    dek: "Structure de Une contemporaine. Aucune information réelle n’est affirmée.",
    label: "Information contemporaine vérifiée (démo)",
    href: "/actualites",
  },
  briefs: [
    {
      id: "b1",
      title: "Note de suivi A",
      label: "Brève · démo",
      href: "/actualites",
    },
    {
      id: "b2",
      title: "Note de suivi B",
      label: "Brève · démo",
      href: "/actualites",
    },
    {
      id: "b3",
      title: "Note de suivi C",
      label: "Brève · démo",
      href: "/actualites",
    },
  ],
};

export const histoiresOubliees = {
  title: "Relire les inventaires sans combler les trous",
  dek: "L’absence de preuve n’est jamais une preuve. Texte muséal et image documentaire en tension — démo fictive.",
  label: "Interprétation historique (démo)",
  inventory: "INV. 88-DEMO-014",
  href: "/histoire",
};

export const archivesPieces = [
  {
    id: "a1",
    kind: "archive" as const,
    title: "Fonds A",
    note: "Provenance indiquée",
  },
  {
    id: "a2",
    kind: "archive" as const,
    title: "Fonds B",
    note: "Lacune notée",
  },
  {
    id: "a3",
    kind: "reconstitution" as const,
    title: "Reconstitution IA",
    note: "Reconstitution historique générée par intelligence artificielle.",
  },
  {
    id: "a4",
    kind: "archive" as const,
    title: "Fonds C",
    note: "Date incertaine",
  },
];

export const geopolitiqueTriptyque = [
  {
    id: "g1",
    kind: "FAIT",
    text: "Élément documenté (placeholder démo).",
  },
  {
    id: "g2",
    kind: "DÉCLARATION",
    text: "Parole officielle (placeholder démo).",
  },
  {
    id: "g3",
    kind: "ANALYSE",
    text: "Lecture étiquetée — jamais une intention inventée.",
  },
];

export const diasporasDemo = {
  quote: "La mémoire circule — elle ne se résume pas.",
  attribution: "Témoignage · démo",
  title: "Transmissions & trajectoires",
  dek: "Section Diasporas : frise de mémoires en circulation. Contenu fictif.",
  href: "/diasporas",
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
    ratio: "16/9" as const,
  },
  {
    id: "vid-2",
    title: "Entretien fictif — historiens (démo)",
    duration: "08:15",
    rubric: "Histoire",
    ratio: "9/16" as const,
  },
  {
    id: "vid-3",
    title: "Série maquette — mémoires diasporiques",
    duration: "15:02",
    rubric: "Diasporas",
    ratio: "1/1" as const,
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
  { href: "/bibliotheque", label: "Bibliothèque" },
  { href: "/a-propos", label: "À propos" },
] as const;

export const rubricsMeta: Record<
  string,
  { title: string; description: string; salle: string }
> = {
  actualites: {
    title: "Actualités",
    description:
      "Veille et informations contemporaines (structure — contenus démo).",
    salle: "L’Afrique aujourd’hui",
  },
  histoire: {
    title: "Histoire",
    description:
      "Récits historiques documentés, archives et interprétations clairement étiquetées.",
    salle: "Les histoires oubliées",
  },
  geopolitique: {
    title: "Géopolitique",
    description:
      "Analyses fondées sur des faits et déclarations documentés — jamais d’intention inventée.",
    salle: "Géopolitique",
  },
  diasporas: {
    title: "Diasporas",
    description:
      "Mémoires, trajectoires et transmissions des diasporas africaines et afrodescendantes.",
    salle: "Diasporas",
  },
  documentaires: {
    title: "Documentaires",
    description: "Formats longs et audiovisuels (placeholders).",
    salle: "Documentaires",
  },
  archives: {
    title: "Archives",
    description:
      "Inventaires, fonds et lacunes documentaires — provenance indiquée.",
    salle: "Les archives parlent",
  },
};
