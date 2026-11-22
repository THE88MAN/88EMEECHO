import { CONTENT_LABEL_FR } from "@/lib/cms/labels";
import type { ContentLabel } from "@/lib/cms/types";

export function ContentLabelBadge({
  label,
  demo = true,
}: {
  label: ContentLabel;
  demo?: boolean;
}) {
  return (
    <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold/80">
      {CONTENT_LABEL_FR[label]}
      {demo ? " · démo" : ""}
    </p>
  );
}
