/** Types alignés sur supabase/migrations/001_initial_schema.sql — Phase 1 stubs */

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

export type Article = {
  id: string;
  slug: string;
  title: string;
  dek: string | null;
  body: string | null;
  rubric_slug: string;
  status: PublicationStatus;
  content_label: ContentLabel | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};
