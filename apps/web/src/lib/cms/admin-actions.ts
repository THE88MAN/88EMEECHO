/**
 * Actions CMS stub — pas de persistance réelle.
 * Simule publier / modifier / archiver / changer de statut.
 */

import type { PublicationStatus } from "./types";
import { STATUS_FR } from "./labels";

export type AdminActionResult = {
  ok: boolean;
  message: string;
  nextStatus?: PublicationStatus;
};

const transitions: Partial<
  Record<PublicationStatus, PublicationStatus[]>
> = {
  BROUILLON: ["A_VERIFIER", "BROUILLON"],
  A_VERIFIER: ["VALIDE", "BROUILLON", "CORRECTION_NECESSAIRE"],
  VALIDE: ["PUBLIE", "A_VERIFIER"],
  PUBLIE: ["CORRECTION_NECESSAIRE", "BROUILLON"],
  CORRECTION_NECESSAIRE: ["A_VERIFIER", "BROUILLON"],
};

export function canTransition(
  from: PublicationStatus,
  to: PublicationStatus,
): boolean {
  return transitions[from]?.includes(to) ?? false;
}

export function stubChangeStatus(
  articleTitle: string,
  from: PublicationStatus,
  to: PublicationStatus,
): AdminActionResult {
  if (!canTransition(from, to)) {
    return {
      ok: false,
      message: `Transition interdite : ${STATUS_FR[from]} → ${STATUS_FR[to]} (stub).`,
    };
  }
  return {
    ok: true,
    nextStatus: to,
    message: `Stub : « ${articleTitle} » passerait de ${STATUS_FR[from]} à ${STATUS_FR[to]}. Aucune écriture DB (Phase 2 sans Supabase réel).`,
  };
}

export function stubArchive(articleTitle: string): AdminActionResult {
  return {
    ok: true,
    nextStatus: "BROUILLON",
    message: `Stub : « ${articleTitle} » serait archivé (retour brouillon / hors Une). Pas d’écriture DB.`,
  };
}
