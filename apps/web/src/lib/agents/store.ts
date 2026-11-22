/**
 * Store agents ÉCHO — file persistante stub + journal + mémoire.
 */

import { gateTaskPayload } from "./policy";
import {
  echoAgents,
  initialAgentJournal,
  initialAgentRuns,
  initialAgentTasks,
  initialEditorialMemory,
  initialVisuelSheets,
} from "./seed";
import type {
  EchoAgent,
  EchoAgentJournalEntry,
  EchoAgentKind,
  EchoAgentRun,
  EchoAgentTask,
  EditorialMemoryEntry,
  VisuelSheet,
} from "./types";

type Store = {
  agents: EchoAgent[];
  runs: EchoAgentRun[];
  tasks: EchoAgentTask[];
  journal: EchoAgentJournalEntry[];
  memory: EditorialMemoryEntry[];
  visuelSheets: VisuelSheet[];
};

const g = globalThis as unknown as { __echoAgentsStore?: Store };

function store(): Store {
  if (!g.__echoAgentsStore) {
    g.__echoAgentsStore = {
      agents: structuredClone(echoAgents),
      runs: structuredClone(initialAgentRuns),
      tasks: structuredClone(initialAgentTasks),
      journal: structuredClone(initialAgentJournal),
      memory: structuredClone(initialEditorialMemory),
      visuelSheets: structuredClone(initialVisuelSheets),
    };
  }
  return g.__echoAgentsStore;
}

function log(
  level: EchoAgentJournalEntry["level"],
  message: string,
  agentKind: EchoAgentKind | null = null,
  runId: string | null = null,
  taskId: string | null = null,
) {
  store().journal.unshift({
    id: `aj-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    agentKind,
    runId,
    taskId,
    level,
    message,
    createdAt: new Date().toISOString(),
  });
}

export type AgentActionResult = {
  ok: boolean;
  message: string;
};

export function listEchoAgents(): EchoAgent[] {
  return store().agents;
}

export function listAgentRuns(kind?: EchoAgentKind): EchoAgentRun[] {
  const runs = store().runs;
  return kind ? runs.filter((r) => r.agentKind === kind) : runs;
}

export function listAgentTasks(kind?: EchoAgentKind): EchoAgentTask[] {
  const tasks = store().tasks;
  return kind ? tasks.filter((t) => t.agentKind === kind) : tasks;
}

export function getAgentTask(id: string): EchoAgentTask | undefined {
  return store().tasks.find((t) => t.id === id);
}

export function listAgentJournal(limit = 30): EchoAgentJournalEntry[] {
  return store().journal.slice(0, limit);
}

export function listEditorialMemory(): EditorialMemoryEntry[] {
  return store().memory;
}

export function getVisuelSheetForTask(taskId: string): VisuelSheet | undefined {
  return store().visuelSheets.find((s) => s.taskId === taskId);
}

export function countTasksByAgent(): Record<EchoAgentKind, number> {
  const base: Record<EchoAgentKind, number> = {
    veille: 0,
    archives: 0,
    fact_check: 0,
    visuel: 0,
    edition: 0,
  };
  for (const t of store().tasks) base[t.agentKind] += 1;
  // VEILLE tasks live in veille module — mark as linked
  base.veille = -1; // sentinel: see /admin/veille
  return base;
}

export function startAgentRun(
  agentKind: EchoAgentKind,
  label?: string,
): AgentActionResult {
  if (agentKind === "veille") {
    return {
      ok: false,
      message: "ÉCHO VEILLE se pilote depuis /admin/veille (Phase 3).",
    };
  }
  const agent = store().agents.find((a) => a.kind === agentKind);
  if (!agent?.enabled) return { ok: false, message: "Agent désactivé." };

  const run: EchoAgentRun = {
    id: `arun-${Date.now()}`,
    agentKind,
    label: label ?? `Run ${agent.displayName} ${new Date().toISOString().slice(0, 16)}`,
    status: "en_cours",
    triggeredBy: "admin-stub",
    startedAt: new Date().toISOString(),
    finishedAt: null,
    notes: "Stub local — aucune exécution modèle réelle.",
  };
  store().runs.unshift(run);
  log("info", `Run démarré : ${run.label}`, agentKind, run.id);
  return { ok: true, message: `Stub : ${run.label} démarré.` };
}

export function suspendAgentRun(runId: string): AgentActionResult {
  const run = store().runs.find((r) => r.id === runId);
  if (!run) return { ok: false, message: "Run introuvable." };
  if (run.status !== "en_cours" && run.status !== "planifie") {
    return { ok: false, message: `Statut ${run.status} non suspendable.` };
  }
  run.status = "suspendu";
  log("info", `Run suspendu : ${run.label}`, run.agentKind, run.id);
  return { ok: true, message: `Stub : run suspendu.` };
}

export function resumeAgentRun(runId: string): AgentActionResult {
  const run = store().runs.find((r) => r.id === runId);
  if (!run) return { ok: false, message: "Run introuvable." };
  if (run.status !== "suspendu") {
    return { ok: false, message: "Seuls les runs suspendus reprennent." };
  }
  run.status = "en_cours";
  log("info", `Run repris : ${run.label}`, run.agentKind, run.id);
  return { ok: true, message: "Stub : run repris." };
}

export function enqueueDemoTask(agentKind: EchoAgentKind): AgentActionResult {
  if (agentKind === "veille") {
    return { ok: false, message: "Utiliser la file VEILLE Phase 3." };
  }
  const task: EchoAgentTask = {
    id: `atask-${Date.now()}`,
    runId: null,
    agentKind,
    status: "queued",
    title: `Tâche démo ${agentKind} — ${new Date().toISOString().slice(11, 19)}`,
    payload: {
      note: "Tâche créée depuis admin stub",
      proposeAutoPublish: false,
    },
    resultSummary: null,
    charterCheckPassed: null,
    blockedReason: null,
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const gate = gateTaskPayload(task);
  if (!gate.ok) {
    task.status = "blocked_charte";
    task.charterCheckPassed = false;
    task.blockedReason = gate.reason;
  }
  store().tasks.unshift(task);
  log(
    gate.ok ? "info" : "warn",
    gate.ok ? `Tâche enfilée : ${task.title}` : `Tâche bloquée : ${gate.reason}`,
    agentKind,
    null,
    task.id,
  );
  return {
    ok: gate.ok,
    message: gate.ok
      ? "Stub : tâche ajoutée à la file."
      : `Bloqué charte : ${gate.reason}`,
  };
}

export function advanceAgentTask(taskId: string): AgentActionResult {
  const task = store().tasks.find((t) => t.id === taskId);
  if (!task) return { ok: false, message: "Tâche introuvable." };
  if (task.status === "blocked_charte" || task.status === "rejected") {
    return { ok: false, message: "Tâche terminale / bloquée." };
  }
  if (task.status === "done") {
    return { ok: false, message: "Déjà terminée." };
  }

  const gate = gateTaskPayload(task);
  if (!gate.ok) {
    task.status = "blocked_charte";
    task.charterCheckPassed = false;
    task.blockedReason = gate.reason;
    task.updatedAt = new Date().toISOString();
    log("warn", gate.reason ?? "Blocage charte", task.agentKind, task.runId, task.id);
    return { ok: false, message: gate.reason ?? "Blocage charte" };
  }

  if (task.status === "queued") {
    task.status = "running";
  } else if (task.status === "running") {
    task.status = "needs_review";
    task.resultSummary =
      task.resultSummary ??
      "Résultat stub — validation humaine requise avant usage éditorial.";
  } else if (task.status === "needs_review") {
    task.status = "done";
    task.charterCheckPassed = true;
    // mémoire éditoriale
    store().memory.unshift({
      id: `mem-${Date.now()}`,
      kind: "recherche",
      title: `Mémoire : ${task.title}`,
      body: task.resultSummary ?? "Entrée mémoire éditoriale (stub).",
      agentKind: task.agentKind,
      tags: [task.agentKind, "démo"],
      isDemo: true,
      createdAt: new Date().toISOString(),
    });
  }
  task.updatedAt = new Date().toISOString();
  log("info", `Tâche → ${task.status}`, task.agentKind, task.runId, task.id);
  return { ok: true, message: `Stub : statut ${task.status}.` };
}

export function humanApproveTask(taskId: string): AgentActionResult {
  const task = store().tasks.find((t) => t.id === taskId);
  if (!task) return { ok: false, message: "Tâche introuvable." };
  if (task.status !== "needs_review") {
    return { ok: false, message: "Approuver uniquement depuis « revue humaine »." };
  }
  const gate = gateTaskPayload(task);
  if (!gate.ok) {
    return { ok: false, message: gate.reason ?? "Charte non respectée." };
  }
  task.status = "done";
  task.charterCheckPassed = true;
  task.updatedAt = new Date().toISOString();
  log("info", "Approbation humaine (stub)", task.agentKind, task.runId, task.id);
  return {
    ok: true,
    message: "Stub : tâche approuvée. Pas d’auto-publish.",
  };
}

export function humanRejectTask(taskId: string): AgentActionResult {
  const task = store().tasks.find((t) => t.id === taskId);
  if (!task) return { ok: false, message: "Tâche introuvable." };
  task.status = "rejected";
  task.updatedAt = new Date().toISOString();
  log("warn", "Rejet humain (stub)", task.agentKind, task.runId, task.id);
  return { ok: true, message: "Stub : tâche rejetée." };
}
