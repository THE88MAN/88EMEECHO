/**
 * Store veille in-memory (stub process) — simule file persistante + journal.
 * Pas d’écriture Supabase réelle en Phase 3 démo.
 */

import {
  initialVeilleItems,
  initialVeilleJournal,
  initialVeilleRuns,
  veilleCronStubs,
} from "./seed";
import {
  canHumanValidate,
  nextStage,
  shouldBlockAutoPublish,
  statusForStage,
  type PipelineActionResult,
} from "./pipeline";
import type {
  VeilleCronStub,
  VeilleJournalEntry,
  VeilleQueueItem,
  VeilleRun,
} from "./types";

type Store = {
  runs: VeilleRun[];
  items: VeilleQueueItem[];
  journal: VeilleJournalEntry[];
  crons: VeilleCronStub[];
};

const g = globalThis as unknown as { __echoVeilleStore?: Store };

function store(): Store {
  if (!g.__echoVeilleStore) {
    g.__echoVeilleStore = {
      runs: structuredClone(initialVeilleRuns),
      items: structuredClone(initialVeilleItems),
      journal: structuredClone(initialVeilleJournal),
      crons: structuredClone(veilleCronStubs),
    };
  }
  return g.__echoVeilleStore;
}

function log(
  level: VeilleJournalEntry["level"],
  message: string,
  runId: string | null = null,
  itemId: string | null = null,
) {
  store().journal.unshift({
    id: `j-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    runId,
    itemId,
    level,
    message,
    createdAt: new Date().toISOString(),
  });
}

export function listVeilleRuns(): VeilleRun[] {
  return store().runs;
}

export function listVeilleItems(): VeilleQueueItem[] {
  return store().items;
}

export function getVeilleItem(id: string): VeilleQueueItem | undefined {
  return store().items.find((i) => i.id === id);
}

export function listVeilleJournal(limit = 40): VeilleJournalEntry[] {
  return store().journal.slice(0, limit);
}

export function listVeilleCrons(): VeilleCronStub[] {
  return store().crons;
}

export function countItemsByStage(): Record<string, number> {
  const c: Record<string, number> = {};
  for (const i of store().items) {
    c[i.stage] = (c[i.stage] ?? 0) + 1;
  }
  return c;
}

export function startVeilleRun(label?: string): PipelineActionResult {
  const run: VeilleRun = {
    id: `run-${Date.now()}`,
    label: label ?? `Run manuel ${new Date().toISOString().slice(0, 16)}`,
    status: "en_cours",
    scheduledFor: null,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    triggeredBy: "admin-stub",
    statesTargeted: ["SN", "CI", "GH", "NG", "KE", "ZA"],
    languagesMonitored: ["fr"],
    notes:
      "Démarrage stub — veille francophone uniquement (watchLanguages=fr). Aucune collecte réseau réelle.",
  };
  store().runs.unshift(run);
  log("info", `Veille lancée : ${run.label}`, run.id);
  return {
    ok: true,
    message: `Stub : run « ${run.label} » démarré (file locale). Pas d’appel réseau.`,
  };
}

export function suspendVeilleRun(runId: string): PipelineActionResult {
  const run = store().runs.find((r) => r.id === runId);
  if (!run) return { ok: false, message: "Run introuvable." };
  if (run.status !== "en_cours" && run.status !== "planifie") {
    return { ok: false, message: `Impossible de suspendre un run « ${run.status} ».` };
  }
  run.status = "suspendu";
  log("info", `Run suspendu : ${run.label}`, run.id);
  return { ok: true, message: `Stub : run « ${run.label} » suspendu.` };
}

export function resumeVeilleRun(runId: string): PipelineActionResult {
  const run = store().runs.find((r) => r.id === runId);
  if (!run) return { ok: false, message: "Run introuvable." };
  if (run.status !== "suspendu") {
    return { ok: false, message: "Seuls les runs suspendus peuvent reprendre." };
  }
  run.status = "en_cours";
  log("info", `Run repris : ${run.label}`, run.id);
  return { ok: true, message: `Stub : run « ${run.label} » repris.` };
}

export function advanceItemStage(itemId: string): PipelineActionResult {
  const item = store().items.find((i) => i.id === itemId);
  if (!item) return { ok: false, message: "Item introuvable." };
  if (item.stage === "rejete" || item.stage === "publie") {
    return { ok: false, message: "Item terminal — pas d’avancement." };
  }

  const gate = shouldBlockAutoPublish(item);
  if (item.stage === "collecte" && gate.reason?.includes("interdite")) {
    item.stage = "rejete";
    item.autoPublishBlocked = true;
    item.blockReason = gate.reason;
    log("warn", gate.reason, item.runId, item.id);
    return { ok: false, message: gate.reason, item };
  }

  const nxt = nextStage(item.stage);
  if (!nxt) return { ok: false, message: "Fin de pipeline." };

  if (nxt === "publie") {
    return {
      ok: false,
      message:
        "Publication réservée à une validation humaine explicite (pas d’auto-publish).",
      item,
    };
  }

  item.stage = nxt;
  item.publicationStatus = statusForStage(nxt);
  item.updatedAt = new Date().toISOString();
  const block = shouldBlockAutoPublish(item);
  item.autoPublishBlocked = block.blocked;
  item.blockReason = block.reason;
  log("info", `Item avancé → ${nxt}`, item.runId, item.id);
  return {
    ok: true,
    message: `Stub : item passé à « ${nxt} » (statut ${item.publicationStatus}).`,
    item,
  };
}

export function humanValidateItem(itemId: string): PipelineActionResult {
  const item = store().items.find((i) => i.id === itemId);
  if (!item) return { ok: false, message: "Item introuvable." };
  if (!canHumanValidate(item)) {
    return {
      ok: false,
      message:
        "Validation impossible : item hors étape « validation » / À VÉRIFIER, ou source interdite.",
    };
  }
  if (item.uncertainty === "forte") {
    return {
      ok: false,
      message:
        "Incertitude forte : lever les points « à confirmer » avant validation (charte).",
    };
  }
  item.publicationStatus = "VALIDE";
  item.uncertainty = "aucune";
  item.sections.aConfirmer = "Néant — validé (stub humain).";
  item.autoPublishBlocked = false;
  item.blockReason = null;
  item.updatedAt = new Date().toISOString();
  log("info", "Validation humaine (stub) — statut VALIDE", item.runId, item.id);
  return {
    ok: true,
    message: "Stub : item validé. Publication manuelle encore requise.",
    item,
  };
}

export function humanPublishItem(itemId: string): PipelineActionResult {
  const item = store().items.find((i) => i.id === itemId);
  if (!item) return { ok: false, message: "Item introuvable." };
  if (item.publicationStatus !== "VALIDE" && item.publicationStatus !== "A_VERIFIER") {
    return { ok: false, message: "Publier uniquement depuis VALIDE (ou re-valider)." };
  }
  if (item.uncertainty !== "aucune") {
    return {
      ok: false,
      message: "Pas de publication tant que l’incertitude n’est pas levée.",
    };
  }
  if (item.publicationStatus === "A_VERIFIER") {
    const v = humanValidateItem(itemId);
    if (!v.ok) return v;
  }
  item.stage = "publie";
  item.publicationStatus = "PUBLIE";
  item.autoPublishBlocked = false;
  item.blockReason = null;
  item.updatedAt = new Date().toISOString();
  log("info", "Publication humaine (stub) — PUBLIÉ", item.runId, item.id);
  return {
    ok: true,
    message:
      "Stub : item marqué PUBLIÉ. Pas d’écriture Supabase — démo locale uniquement.",
    item,
  };
}

export function markCorrectionNeeded(itemId: string): PipelineActionResult {
  const item = store().items.find((i) => i.id === itemId);
  if (!item) return { ok: false, message: "Item introuvable." };
  item.publicationStatus = "CORRECTION_NECESSAIRE";
  item.autoPublishBlocked = true;
  item.blockReason = "Correction nécessaire — republier interdit tant que non traité.";
  item.updatedAt = new Date().toISOString();
  log("warn", "Statut CORRECTION NÉCESSAIRE", item.runId, item.id);
  return { ok: true, message: "Stub : correction nécessaire signalée.", item };
}
