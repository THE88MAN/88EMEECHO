/** Types CMS / bibliothèque — alignés sur migrations 001 + 002 */

export type PublicationStatus =
  | "BROUILLON"
  | "A_VERIFIER"
  | "VALIDE"
  | "PUBLIE"
  | "CORRECTION_NECESSAIRE";

export type ContentLabel =
  | "fait_historique_etabli"
  | "information_contemporaine_verifiee"
  | "interpretation_historique"
  | "hypothese_documentaire"
  | "analyse_geopolitique"
  | "opinion_editoriale";

export type UserRole =
  | "directeur"
  | "redacteur"
  | "validateur"
  | "lecteur_admin";

export type RubricSlug =
  | "actualites"
  | "histoire"
  | "geopolitique"
  | "diasporas"
  | "documentaires"
  | "archives";

export type LibraryFacetKind =
  | "pays"
  | "region"
  | "siecle"
  | "periode"
  | "personnalite"
  | "evenement"
  | "thematique"
  | "type_document";

export type MediaAssetKind =
  | "photo"
  | "document"
  | "carte"
  | "video"
  | "audio"
  | "autre";

export type CmsArticle = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  rubricSlug: RubricSlug;
  status: PublicationStatus;
  contentLabel: ContentLabel;
  readingTimeMin: number;
  authorName: string;
  sourceIds: string[];
  publishedAt: string | null;
  updatedAt: string;
  isDemo: true;
};

export type CmsSource = {
  id: string;
  name: string;
  url: string | null;
  category: string;
  isForbidden: boolean;
  isPublic: boolean;
  description: string;
  country: string | null;
};

export type CmsCorrection = {
  id: string;
  articleId: string;
  articleSlug: string;
  articleTitle: string;
  summary: string;
  body: string;
  publishedAt: string;
  isPublic: boolean;
};

export type LibraryFacet = {
  id: string;
  kind: LibraryFacetKind;
  slug: string;
  label: string;
};

export type LibraryTimelineEvent = {
  id: string;
  eventDate: string;
  title: string;
  body: string;
};

export type LibraryAsset = {
  id: string;
  kind: MediaAssetKind;
  title: string;
  caption: string;
  provenance: string;
  isAiReconstitution: boolean;
};

export type LibraryBiblio = {
  id: string;
  citation: string;
  url: string | null;
};

export type LibraryDossier = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  presentation: string;
  status: PublicationStatus;
  facetIds: string[];
  timeline: LibraryTimelineEvent[];
  assets: LibraryAsset[];
  biblio: LibraryBiblio[];
  articleIds: string[];
  sourceIds: string[];
  videoTitles: string[];
  publishedAt: string | null;
  isDemo: true;
};

export type AdminRoleStub = {
  id: string;
  displayName: string;
  role: UserRole;
};
