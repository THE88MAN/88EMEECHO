/**
 * Modèle et contrôle de la fiche de traçabilité des images IA.
 * Champs obligatoires = charte, section « Reconstitutions visuelles » :
 * sujet, période, références, éléments établis, éléments reconstitués,
 * incertitudes, modèle utilisé — plus la mention obligatoire exacte.
 *
 * Le contrôle vérifie que la fiche est REMPLIE, pas qu'elle est VRAIE :
 * la validation du contenu reste humaine.
 */

import editorialPolicy from "@/lib/editorial/editorial-policy.json";
import { AI_IMAGE_LABEL } from "./policy";
import type { VisuelSheet } from "./types";

type CharterField = keyof Pick<
  VisuelSheet,
  | "subject"
  | "period"
  | "referencesText"
  | "establishedElements"
  | "reconstructedElements"
  | "uncertainties"
  | "modelUsed"
>;

export const VISUEL_SHEET_FIELDS: { key: CharterField; label: string; hint: string }[] = [
  { key: "subject", label: "Sujet", hint: "Ce que l'image représente." },
  { key: "period", label: "Période", hint: "Datation, même approximative — dire si elle est incertaine." },
  { key: "referencesText", label: "Références", hint: "Sources documentaires qui fondent la reconstitution (cote, fonds, ouvrage)." },
  { key: "establishedElements", label: "Éléments établis", hint: "Ce qui est attesté par les références." },
  { key: "reconstructedElements", label: "Éléments reconstitués", hint: "Ce que le modèle a inventé ou extrapolé." },
  { key: "uncertainties", label: "Incertitudes", hint: "Ce qui reste douteux ; « aucune » n'est presque jamais vrai." },
  { key: "modelUsed", label: "Modèle utilisé", hint: "Nom et version exacts du modèle (ex. checkpoint ComfyUI)." },
];

export const AI_IMAGE_FORMATS: readonly string[] =
  editorialPolicy.aiGeneratedImagery.formats;

export function emptyVisuelSheet(id: string, taskId: string): VisuelSheet {
  return {
    id,
    taskId,
    subject: "",
    period: "",
    referencesText: "",
    establishedElements: "",
    reconstructedElements: "",
    uncertainties: "",
    modelUsed: "",
    mandatoryLabel: AI_IMAGE_LABEL,
  };
}

export type VisuelSheetCheck = {
  /** Fiche complète au sens de la charte (prérequis, pas autorisation de publier). */
  complete: boolean;
  problems: string[];
  /** Points non bloquants pour la charte mais à corriger. */
  warnings: string[];
};

export function checkVisuelSheet(sheet: VisuelSheet): VisuelSheetCheck {
  const problems: string[] = [];
  const warnings: string[] = [];

  for (const f of VISUEL_SHEET_FIELDS) {
    if (!sheet[f.key]?.trim()) problems.push(`Champ vide : ${f.label}`);
  }
  if (sheet.mandatoryLabel !== AI_IMAGE_LABEL) {
    problems.push(`Mention obligatoire absente ou modifiée (attendu : « ${AI_IMAGE_LABEL} »)`);
  }

  const g = sheet.generation;
  if (!g) {
    warnings.push("Aucun paramètre de génération : image non reproductible.");
  } else {
    if (!g.prompt.trim()) warnings.push("Prompt non renseigné.");
    if (g.seed === null) warnings.push("Seed non renseigné : image non reproductible.");
    if (!AI_IMAGE_FORMATS.includes(g.format)) {
      problems.push(`Format « ${g.format} » hors politique (${AI_IMAGE_FORMATS.join(", ")})`);
    }
  }

  return { complete: problems.length === 0, problems, warnings };
}
