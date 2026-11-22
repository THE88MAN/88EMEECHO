import { STATUS_FR } from "@/lib/cms/labels";
import type { PublicationStatus } from "@/lib/cms/types";

const tone: Record<PublicationStatus, string> = {
  BROUILLON: "border-anthracite-light text-parchment/60",
  A_VERIFIER: "border-ambre/60 text-ambre",
  VALIDE: "border-gold/50 text-gold",
  PUBLIE: "border-gold text-gold",
  CORRECTION_NECESSAIRE: "border-crimson text-parchment",
};

export function StatusBadge({ status }: { status: PublicationStatus }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.16em] ${tone[status]}`}
    >
      {STATUS_FR[status]}
    </span>
  );
}
