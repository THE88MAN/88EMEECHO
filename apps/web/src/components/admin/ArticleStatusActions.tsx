"use client";

import { useState } from "react";
import {
  canTransition,
  stubArchive,
  stubChangeStatus,
} from "@/lib/cms/admin-actions";
import { STATUS_FR } from "@/lib/cms/labels";
import type { PublicationStatus } from "@/lib/cms/types";
import { StatusBadge } from "@/components/cms/StatusBadge";

const ALL: PublicationStatus[] = [
  "BROUILLON",
  "A_VERIFIER",
  "VALIDE",
  "PUBLIE",
  "CORRECTION_NECESSAIRE",
];

export function ArticleStatusActions({
  title,
  status,
}: {
  title: string;
  status: PublicationStatus;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [current, setCurrent] = useState(status);

  function apply(to: PublicationStatus) {
    const res = stubChangeStatus(title, current, to);
    setMessage(res.message);
    if (res.ok && res.nextStatus) setCurrent(res.nextStatus);
  }

  function archive() {
    const res = stubArchive(title);
    setMessage(res.message);
    if (res.nextStatus) setCurrent(res.nextStatus);
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={current} />
        {ALL.filter((s) => s !== current && canTransition(current, s)).map(
          (s) => (
            <button
              key={s}
              type="button"
              onClick={() => apply(s)}
              className="border border-anthracite-light px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-parchment/70 hover:border-gold hover:text-gold"
            >
              → {STATUS_FR[s]}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={archive}
          className="border border-crimson/40 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-parchment/50 hover:border-crimson hover:text-parchment"
        >
          Archiver
        </button>
      </div>
      {message && (
        <p className="font-serif text-xs text-parchment/55">{message}</p>
      )}
    </div>
  );
}
