"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

async function postAction(payload: Record<string, string>) {
  const res = await fetch("/api/veille/actions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<{ ok: boolean; message: string }>;
}

export function StartVeilleButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await postAction({ action: "start_run" });
            setMsg(r.message);
            router.refresh();
          })
        }
        className="bg-gold px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.18em] text-ink disabled:opacity-50"
      >
        {pending ? "…" : "Lancer une veille"}
      </button>
      {msg && <p className="mt-2 font-serif text-xs text-parchment/55">{msg}</p>}
    </div>
  );
}

export function RunActionButtons({
  runId,
  status,
}: {
  runId: string;
  status: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function act(action: string) {
    start(async () => {
      const r = await postAction({ action, runId });
      setMsg(r.message);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {(status === "en_cours" || status === "planifie") && (
        <button
          type="button"
          disabled={pending}
          onClick={() => act("suspend_run")}
          className="border border-anthracite-light px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-parchment/70 hover:border-gold hover:text-gold"
        >
          Suspendre
        </button>
      )}
      {status === "suspendu" && (
        <button
          type="button"
          disabled={pending}
          onClick={() => act("resume_run")}
          className="border border-gold/50 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-gold"
        >
          Reprendre
        </button>
      )}
      {msg && <span className="font-serif text-xs text-parchment/50">{msg}</span>}
    </div>
  );
}

export function ItemActionButtons({
  itemId,
  stage,
  publicationStatus,
  uncertainty,
}: {
  itemId: string;
  stage: string;
  publicationStatus: string;
  uncertainty: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function act(action: string) {
    start(async () => {
      const r = await postAction({ action, itemId });
      setMsg(r.message);
      router.refresh();
    });
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap gap-2">
        {stage !== "publie" && stage !== "rejete" && stage !== "validation" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => act("advance_item")}
            className="border border-anthracite-light px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-parchment/70 hover:border-gold hover:text-gold"
          >
            Avancer l’étape
          </button>
        )}
        {stage === "validation" && publicationStatus === "A_VERIFIER" && (
          <button
            type="button"
            disabled={pending || uncertainty === "forte"}
            onClick={() => act("validate_item")}
            className="border border-gold/60 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-gold disabled:opacity-40"
          >
            Valider
          </button>
        )}
        {(publicationStatus === "VALIDE" ||
          (stage === "validation" && uncertainty === "aucune")) && (
          <button
            type="button"
            disabled={pending}
            onClick={() => act("publish_item")}
            className="bg-gold px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-ink disabled:opacity-40"
          >
            Publier (humain)
          </button>
        )}
        {publicationStatus === "PUBLIE" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => act("correction_item")}
            className="border border-crimson/50 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-parchment/60"
          >
            Correction nécessaire
          </button>
        )}
      </div>
      {msg && <p className="font-serif text-xs text-parchment/55">{msg}</p>}
    </div>
  );
}
