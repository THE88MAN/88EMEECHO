export type EchoAgentKind =
  | "veille"
  | "archives"
  | "fact_check"
  | "visuel"
  | "edition";

export type EchoJobStatus =
  | "planifie"
  | "en_cours"
  | "suspendu"
  | "termine"
  | "echec"
  | "attente_humain";

export type EchoTaskStatus =
  | "queued"
  | "running"
  | "blocked_charte"
  | "needs_review"
  | "done"
  | "rejected";

export type EchoAgent = {
  kind: EchoAgentKind;
  displayName: string;
  description: string;
  mustRespectCharter: true;
  canModifyCharter: false;
  canAutoPublish: false;
  enabled: boolean;
};

export type EchoAgentRun = {
  id: string;
  agentKind: EchoAgentKind;
  label: string;
  status: EchoJobStatus;
  triggeredBy: string;
  startedAt: string | null;
  finishedAt: string | null;
  notes: string;
};

export type EchoAgentTask = {
  id: string;
  runId: string | null;
  agentKind: EchoAgentKind;
  status: EchoTaskStatus;
  title: string;
  payload: Record<string, string | string[] | boolean | null>;
  resultSummary: string | null;
  charterCheckPassed: boolean | null;
  blockedReason: string | null;
  isDemo: true;
  createdAt: string;
  updatedAt: string;
};

export type EchoAgentJournalEntry = {
  id: string;
  agentKind: EchoAgentKind | null;
  runId: string | null;
  taskId: string | null;
  level: "info" | "warn" | "error";
  message: string;
  createdAt: string;
};

export type EditorialMemoryEntry = {
  id: string;
  kind: "sujet" | "recherche" | "source_note" | "angle" | "image_ref";
  title: string;
  body: string;
  agentKind: EchoAgentKind | null;
  tags: string[];
  isDemo: true;
  createdAt: string;
};

export type VisuelSheet = {
  id: string;
  taskId: string;
  subject: string;
  period: string;
  referencesText: string;
  establishedElements: string;
  reconstructedElements: string;
  uncertainties: string;
  modelUsed: string;
  mandatoryLabel: string;
};
