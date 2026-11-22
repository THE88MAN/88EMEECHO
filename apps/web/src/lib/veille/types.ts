import type { PublicationStatus } from "@/lib/cms/types";

export type VeilleJobStatus =
  | "planifie"
  | "en_cours"
  | "suspendu"
  | "termine"
  | "echec";

export type VeillePipelineStage =
  | "recherche"
  | "collecte"
  | "verification"
  | "redaction_fr"
  | "validation"
  | "publie"
  | "rejete";

export type VeilleUncertainty = "aucune" | "faible" | "forte";

export type VeilleArticleSections = {
  titre: string;
  chapo: string;
  contexte: string;
  faits: string;
  enjeux: string;
  aConfirmer: string;
  sources: string[];
};

export type VeilleQueueItem = {
  id: string;
  runId: string;
  stateCode: string;
  stage: VeillePipelineStage;
  publicationStatus: PublicationStatus;
  uncertainty: VeilleUncertainty;
  sourceLanguage: string;
  sections: VeilleArticleSections;
  autoPublishBlocked: boolean;
  blockReason: string | null;
  candidateSourceName: string;
  candidateSourceUrl: string | null;
  sourceIds: string[];
  isDemo: true;
  createdAt: string;
  updatedAt: string;
};

export type VeilleRun = {
  id: string;
  label: string;
  status: VeilleJobStatus;
  scheduledFor: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  triggeredBy: string;
  statesTargeted: string[];
  languagesMonitored: string[];
  notes: string;
};

export type VeilleJournalEntry = {
  id: string;
  runId: string | null;
  itemId: string | null;
  level: "info" | "warn" | "error";
  message: string;
  createdAt: string;
};

export type VeilleCronStub = {
  id: string;
  name: string;
  cronExpr: string;
  enabled: boolean;
  description: string;
};
