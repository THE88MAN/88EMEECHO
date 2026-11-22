/**
 * Seed agents ÉCHO Phase 4 — démo fictif.
 * Ne constitue pas des recherches ou vérifications réelles.
 */

import { AI_IMAGE_LABEL } from "./policy";
import type {
  EchoAgent,
  EchoAgentJournalEntry,
  EchoAgentRun,
  EchoAgentTask,
  EditorialMemoryEntry,
  VisuelSheet,
} from "./types";

export const echoAgents: EchoAgent[] = [
  {
    kind: "veille",
    displayName: "ÉCHO VEILLE",
    description:
      "Veille actualités africaines francophones (Phase 3) — pas d’auto-publish.",
    mustRespectCharter: true,
    canModifyCharter: false,
    canAutoPublish: false,
    enabled: true,
  },
  {
    kind: "archives",
    displayName: "ÉCHO ARCHIVES",
    description:
      "Recherche historique persistante — reprises, journal, pas de contournement d’accès.",
    mustRespectCharter: true,
    canModifyCharter: false,
    canAutoPublish: false,
    enabled: true,
  },
  {
    kind: "fact_check",
    displayName: "ÉCHO FACT-CHECK",
    description: "Vérification dates, citations, références.",
    mustRespectCharter: true,
    canModifyCharter: false,
    canAutoPublish: false,
    enabled: true,
  },
  {
    kind: "visuel",
    displayName: "ÉCHO VISUEL",
    description:
      "Reconstitutions documentées + label IA obligatoire + fiche de traçabilité.",
    mustRespectCharter: true,
    canModifyCharter: false,
    canAutoPublish: false,
    enabled: true,
  },
  {
    kind: "edition",
    displayName: "ÉCHO ÉDITION",
    description:
      "Propositions de titres / chapôs conformes à la charte — validation humaine.",
    mustRespectCharter: true,
    canModifyCharter: false,
    canAutoPublish: false,
    enabled: true,
  },
];

export const initialAgentRuns: EchoAgentRun[] = [
  {
    id: "arun-archives-1",
    agentKind: "archives",
    label: "Recherche démo — inventaires Ouest (fictif)",
    status: "attente_humain",
    triggeredBy: "admin-stub",
    startedAt: "2026-11-22T06:00:00Z",
    finishedAt: null,
    notes: "File persistante — reprise possible. Aucun accès contourné.",
  },
  {
    id: "arun-fact-1",
    agentKind: "fact_check",
    label: "Fact-check démo — dates brief SN",
    status: "termine",
    triggeredBy: "admin-stub",
    startedAt: "2026-11-22T05:30:00Z",
    finishedAt: "2026-11-22T05:45:00Z",
    notes: "Vérification fictive terminée — revue humaine recommandée.",
  },
  {
    id: "arun-visuel-1",
    agentKind: "visuel",
    label: "Reconstitution démo — salle d’archives",
    status: "attente_humain",
    triggeredBy: "admin-stub",
    startedAt: "2026-11-22T05:50:00Z",
    finishedAt: null,
    notes: "Fiche traçabilité générée — label IA obligatoire.",
  },
  {
    id: "arun-edition-1",
    agentKind: "edition",
    label: "Propositions titres démo — brief SN",
    status: "termine",
    triggeredBy: "admin-stub",
    startedAt: "2026-11-22T05:20:00Z",
    finishedAt: "2026-11-22T05:25:00Z",
    notes: "Propositions non publiées automatiquement.",
  },
];

export const initialAgentTasks: EchoAgentTask[] = [
  {
    id: "atask-arch-1",
    runId: "arun-archives-1",
    agentKind: "archives",
    status: "needs_review",
    title: "Piste inventaire INV. 88-DEMO-014 (fictif)",
    payload: {
      query: "inventaires silences documentaires Ouest (démo)",
      resumeToken: "resume-demo-014",
      accessNote: "Sources ouvertes uniquement — pas de contournement",
    },
    resultSummary:
      "3 pistes documentaires fictives listées. Lacunes notées. Attente validation humaine.",
    charterCheckPassed: true,
    blockedReason: null,
    isDemo: true,
    createdAt: "2026-11-22T06:05:00Z",
    updatedAt: "2026-11-22T06:10:00Z",
  },
  {
    id: "atask-arch-blocked",
    runId: "arun-archives-1",
    agentKind: "archives",
    status: "blocked_charte",
    title: "Requête rejetée — source interdite dans le brief",
    payload: {
      query: "relayer une dépêche Nofi (démo rejet)",
      proposeAutoPublish: false,
    },
    resultSummary: null,
    charterCheckPassed: false,
    blockedReason:
      "Source journalistique interdite détectée (RFI / Le Monde / Jeune Afrique / Nofi).",
    isDemo: true,
    createdAt: "2026-11-22T06:06:00Z",
    updatedAt: "2026-11-22T06:06:10Z",
  },
  {
    id: "atask-fc-1",
    runId: "arun-fact-1",
    agentKind: "fact_check",
    status: "done",
    title: "Vérifier dates & citations — brief Sénégal (démo)",
    payload: {
      articleSlug: "veille-continentale-breve-demo",
      checks: ["dates", "citations", "references"],
    },
    resultSummary:
      "Démo : 0 citation inventée détectée ; 1 date à confirmer (marquée « à confirmer »).",
    charterCheckPassed: true,
    blockedReason: null,
    isDemo: true,
    createdAt: "2026-11-22T05:32:00Z",
    updatedAt: "2026-11-22T05:44:00Z",
  },
  {
    id: "atask-vis-1",
    runId: "arun-visuel-1",
    agentKind: "visuel",
    status: "needs_review",
    title: "Reconstitution salle d’archives (démo)",
    payload: {
      format: "16:9",
      presentAsArchivePhoto: false,
      label: AI_IMAGE_LABEL,
    },
    resultSummary:
      "Proposition visuelle fictive + fiche traçabilité. Jamais présentée comme photo d’archive.",
    charterCheckPassed: true,
    blockedReason: null,
    isDemo: true,
    createdAt: "2026-11-22T05:52:00Z",
    updatedAt: "2026-11-22T05:58:00Z",
  },
  {
    id: "atask-vis-blocked",
    runId: "arun-visuel-1",
    agentKind: "visuel",
    status: "rejected",
    title: "Tentative illicite — image IA comme archive",
    payload: {
      presentAsArchivePhoto: true,
      inventFacts: false,
    },
    resultSummary: null,
    charterCheckPassed: false,
    blockedReason:
      "Interdit : présenter une image IA comme photographie authentique.",
    isDemo: true,
    createdAt: "2026-11-22T05:53:00Z",
    updatedAt: "2026-11-22T05:53:30Z",
  },
  {
    id: "atask-ed-1",
    runId: "arun-edition-1",
    agentKind: "edition",
    status: "done",
    title: "Propositions titre / chapô (démo)",
    payload: {
      variants: [
        "Mémoires d’archives (démo) : relire les silences",
        "Inventaires et lacunes — note de structure (démo)",
      ],
      proposeAutoPublish: false,
    },
    resultSummary:
      "2 propositions fictives. Publication réservée à validation humaine.",
    charterCheckPassed: true,
    blockedReason: null,
    isDemo: true,
    createdAt: "2026-11-22T05:21:00Z",
    updatedAt: "2026-11-22T05:24:00Z",
  },
];

export const initialVisuelSheets: VisuelSheet[] = [
  {
    id: "vs-1",
    taskId: "atask-vis-1",
    subject: "Salle d’inventaire (reconstitution démo)",
    period: "XXe siècle (indicatif — démo)",
    referencesText: "Inventaire fictif INV. 88-DEMO-014 ; fonds démo.",
    establishedElements: "Typologie de salle ; absence de personnages identifiés.",
    reconstructedElements: "Éclairage, rayonnages, atmosphère — générés.",
    uncertainties: "Période précise non établie ; mobilier hypothétique.",
    modelUsed: "modèle-démo (stub)",
    mandatoryLabel: AI_IMAGE_LABEL,
  },
];

export const initialEditorialMemory: EditorialMemoryEntry[] = [
  {
    id: "mem-1",
    kind: "sujet",
    title: "Silences documentaires — Afrique de l’Ouest (mémoire)",
    body: "Sujet récurrent démo — lier dossiers bibliothèque et briefs veille.",
    agentKind: "archives",
    tags: ["archives", "ouest", "démo"],
    isDemo: true,
    createdAt: "2026-11-20T10:00:00Z",
  },
  {
    id: "mem-2",
    kind: "angle",
    title: "Angle proposé : inventaire vs reconstitution",
    body: "Suggestion ÉDITION — distinguer clairement archive et IA.",
    agentKind: "edition",
    tags: ["angle", "visuel", "démo"],
    isDemo: true,
    createdAt: "2026-11-21T12:00:00Z",
  },
  {
    id: "mem-3",
    kind: "recherche",
    title: "Recherche en cours — INV. 88-DEMO-014",
    body: "Token de reprise archives. Pas de contournement d’accès.",
    agentKind: "archives",
    tags: ["recherche", "persistante", "démo"],
    isDemo: true,
    createdAt: "2026-11-22T06:10:00Z",
  },
  {
    id: "mem-4",
    kind: "source_note",
    title: "Note : privilégier sources africaines + antillaises FR",
    body: "Mémoire éditoriale — rappel policy francophone / Caraïbes.",
    agentKind: null,
    tags: ["sources", "fr", "caraibes"],
    isDemo: true,
    createdAt: "2026-11-22T06:40:00Z",
  },
];

export const initialAgentJournal: EchoAgentJournalEntry[] = [
  {
    id: "aj-1",
    agentKind: "archives",
    runId: "arun-archives-1",
    taskId: "atask-arch-1",
    level: "info",
    message: "Tâche archives mise en revue humaine (démo).",
    createdAt: "2026-11-22T06:10:00Z",
  },
  {
    id: "aj-2",
    agentKind: "archives",
    runId: "arun-archives-1",
    taskId: "atask-arch-blocked",
    level: "warn",
    message: "Blocage charte : Nofi / source interdite dans la requête.",
    createdAt: "2026-11-22T06:06:10Z",
  },
  {
    id: "aj-3",
    agentKind: "visuel",
    runId: "arun-visuel-1",
    taskId: "atask-vis-blocked",
    level: "error",
    message: "Rejet : image IA présentée comme archive — interdit.",
    createdAt: "2026-11-22T05:53:30Z",
  },
  {
    id: "aj-4",
    agentKind: "fact_check",
    runId: "arun-fact-1",
    taskId: "atask-fc-1",
    level: "info",
    message: "Fact-check démo terminé — une date à confirmer.",
    createdAt: "2026-11-22T05:44:00Z",
  },
  {
    id: "aj-5",
    agentKind: null,
    runId: null,
    taskId: null,
    level: "info",
    message:
      "Politique commune : mustRespectCharter=true ; canAutoPublish=false ; cannotModifyAlone charte/sources.",
    createdAt: "2026-11-22T06:00:00Z",
  },
];
