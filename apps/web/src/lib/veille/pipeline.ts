/**
 * Pipeline ÉCHO VEILLE (stub) :
 * recherche → collecte → vérification → rédaction FR → validation
 * Pas d’auto-publish si incertitude / source interdite / source unique douteuse.
 */

import { isForbiddenEditorialSource } from "@/lib/editorial";
import type { PublicationStatus } from "@/lib/cms/types";
import type {
  VeillePipelineStage,
  VeilleQueueItem,
  VeilleUncertainty,
} from "./types";

export const PIPELINE_ORDER: VeillePipelineStage[] = [
  "recherche",
  "collecte",
  "verification",
  "redaction_fr",
  "validation",
  "publie",
];

export const STAGE_FR: Record<VeillePipelineStage, string> = {
  recherche: "Recherche",
  collecte: "Collecte",
  verification: "Vérification",
  redaction_fr: "Rédaction FR",
  validation: "Validation",
  publie: "Publié",
  rejete: "Rejeté",
};

export const UNCERTAINTY_FR: Record<VeilleUncertainty, string> = {
  aucune: "Aucune",
  faible: "Faible",
  forte: "Forte",
};

export function shouldBlockAutoPublish(item: {
  uncertainty: VeilleUncertainty;
  candidateSourceName: string;
  candidateSourceUrl: string | null;
  sourceIds: string[];
  stage: VeillePipelineStage;
}): { blocked: boolean; reason: string | null } {
  const hay = `${item.candidateSourceName} ${item.candidateSourceUrl ?? ""}`;
  if (isForbiddenEditorialSource(hay)) {
    return {
      blocked: true,
      reason: "Source journalistique interdite (charte) — ÉCHO VEILLE.",
    };
  }
  if (item.uncertainty !== "aucune") {
    return {
      blocked: true,
      reason: `Incertitude « ${item.uncertainty} » — validation humaine obligatoire (pas d’auto-publish).`,
    };
  }
  if (item.sourceIds.length === 0) {
    return {
      blocked: true,
      reason: "Aucune source autorisée attachée.",
    };
  }
  if (item.stage !== "validation" && item.stage !== "publie") {
    return {
      blocked: true,
      reason: "Pipeline non terminé — étape validation requise.",
    };
  }
  return { blocked: false, reason: null };
}

export function nextStage(
  stage: VeillePipelineStage,
): VeillePipelineStage | null {
  const i = PIPELINE_ORDER.indexOf(stage);
  if (i < 0 || i >= PIPELINE_ORDER.length - 1) return null;
  return PIPELINE_ORDER[i + 1];
}

/** Statut CMS suggéré selon l’étape pipeline */
export function statusForStage(
  stage: VeillePipelineStage,
): PublicationStatus {
  switch (stage) {
    case "recherche":
    case "collecte":
    case "verification":
    case "redaction_fr":
      return "BROUILLON";
    case "validation":
      return "A_VERIFIER";
    case "publie":
      return "PUBLIE";
    case "rejete":
      return "BROUILLON";
    default:
      return "BROUILLON";
  }
}

export function canHumanValidate(item: VeilleQueueItem): boolean {
  return (
    item.stage === "validation" &&
    item.publicationStatus === "A_VERIFIER" &&
    !isForbiddenEditorialSource(
      `${item.candidateSourceName} ${item.candidateSourceUrl ?? ""}`,
    )
  );
}

export function canHumanPublish(item: VeilleQueueItem): boolean {
  if (!canHumanValidate(item) && item.publicationStatus !== "VALIDE") {
    return false;
  }
  const gate = shouldBlockAutoPublish({
    ...item,
    uncertainty: item.uncertainty === "forte" ? "forte" : "aucune",
  });
  // Human may publish only if uncertainty resolved to aucune
  return item.uncertainty === "aucune" && !gate.blocked;
}

export type PipelineActionResult = {
  ok: boolean;
  message: string;
  item?: VeilleQueueItem;
};
