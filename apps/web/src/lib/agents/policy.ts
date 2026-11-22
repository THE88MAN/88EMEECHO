/**
 * Politique commune des agents ÉCHO.
 * Aucun agent ne peut contourner la charte ni les sources interdites.
 */

import editorialPolicy from "@/lib/editorial/editorial-policy.json";
import { isForbiddenEditorialSource } from "@/lib/editorial";
import type { EchoAgentKind, EchoAgentTask } from "./types";

export const AI_IMAGE_LABEL =
  editorialPolicy.aiGeneratedImagery.mandatoryLabel;

export const AGENT_KIND_FR: Record<EchoAgentKind, string> = {
  veille: "ÉCHO VEILLE",
  archives: "ÉCHO ARCHIVES",
  fact_check: "ÉCHO FACT-CHECK",
  visuel: "ÉCHO VISUEL",
  edition: "ÉCHO ÉDITION",
};

export const TASK_STATUS_FR: Record<string, string> = {
  queued: "En file",
  running: "En cours",
  blocked_charte: "Bloqué charte",
  needs_review: "Revue humaine",
  done: "Terminé",
  rejected: "Rejeté",
};

export type CharterGateResult = {
  ok: boolean;
  reason: string | null;
};

/** Contrôle charte avant toute sortie agent */
export function runCharterGate(input: {
  textBlob: string;
  proposesAutoPublish?: boolean;
  presentsAiAsPhoto?: boolean;
  inventsFacts?: boolean;
}): CharterGateResult {
  if (input.inventsFacts) {
    return {
      ok: false,
      reason: "Interdit : inventer une information (charte).",
    };
  }
  if (input.presentsAiAsPhoto) {
    return {
      ok: false,
      reason:
        "Interdit : présenter une image IA comme photographie authentique.",
    };
  }
  if (input.proposesAutoPublish && !editorialPolicy.autoPublish.allowed) {
    return {
      ok: false,
      reason: "Auto-publish interdit (policy.autoPublish.allowed=false).",
    };
  }
  if (isForbiddenEditorialSource(input.textBlob)) {
    return {
      ok: false,
      reason:
        "Source journalistique interdite détectée (RFI / Le Monde / Jeune Afrique / Nofi).",
    };
  }
  return { ok: true, reason: null };
}

export function gateTaskPayload(task: EchoAgentTask): CharterGateResult {
  const parts = [
    task.title,
    task.resultSummary ?? "",
    ...Object.values(task.payload).map((v) =>
      Array.isArray(v) ? v.join(" ") : String(v ?? ""),
    ),
  ];
  return runCharterGate({
    textBlob: parts.join(" "),
    proposesAutoPublish: task.payload.proposeAutoPublish === true,
    presentsAiAsPhoto: task.payload.presentAsArchivePhoto === true,
    inventsFacts: task.payload.inventFacts === true,
  });
}

export function agentsCannotModifyAlone(): string[] {
  return editorialPolicy.agents.cannotModifyAlone;
}
