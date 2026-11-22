import type { ContentLabel, PublicationStatus, UserRole } from "./types";

export const CONTENT_LABEL_FR: Record<ContentLabel, string> = {
  fait_historique_etabli: "Fait historique établi",
  information_contemporaine_verifiee: "Information contemporaine vérifiée",
  interpretation_historique: "Interprétation historique",
  hypothese_documentaire: "Hypothèse documentaire",
  analyse_geopolitique: "Analyse géopolitique",
  opinion_editoriale: "Opinion éditoriale",
};

export const STATUS_FR: Record<PublicationStatus, string> = {
  BROUILLON: "Brouillon",
  A_VERIFIER: "À vérifier",
  VALIDE: "Validé",
  PUBLIE: "Publié",
  CORRECTION_NECESSAIRE: "Correction nécessaire",
};

export const ROLE_FR: Record<UserRole, string> = {
  directeur: "Directeur éditorial",
  redacteur: "Rédacteur",
  validateur: "Validateur",
  lecteur_admin: "Lecteur admin",
};

export const FACET_KIND_FR = {
  pays: "Pays",
  region: "Région",
  siecle: "Siècle",
  periode: "Période",
  personnalite: "Personnalité",
  evenement: "Événement",
  thematique: "Thématique",
  type_document: "Type de document",
} as const;
