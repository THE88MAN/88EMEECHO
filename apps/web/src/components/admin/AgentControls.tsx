"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { EchoAgentKind } from "@/lib/agents";

async function post(payload: Record<string, string>) {
  const res = await fetch("/api/agents/actions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<{ ok: boolean; message: string }>;
}

export function AgentRunControls({
  agentKind,
}: {
  agentKind: Exclude<EchoAgentKind, "veille">;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await post({ action: "start_run", agentKind });
            setMsg(r.message);
            router.refresh();
          })
        }
        className="bg-gold px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-ink disabled:opacity-50"
      >
        Lancer run
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await post({ action: "enqueue_task", agentKind });
            setMsg(r.message);
            router.refresh();
          })
        }
        className="border border-anthracite-light px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-parchment/70 hover:border-gold hover:text-gold"
      >
        + Tâche démo
      </button>
      {msg && <p className="w-full font-serif text-xs text-parchment/55">{msg}</p>}
    </div>
  );
}

export function AgentTaskControls({
  taskId,
  status,
}: {
  taskId: string;
  status: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function act(action: string) {
    start(async () => {
      const r = await post({ action, taskId });
      setMsg(r.message);
      router.refresh();
    });
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap gap-2">
        {status !== "done" &&
          status !== "rejected" &&
          status !== "blocked_charte" && (
            <button
              type="button"
              disabled={pending}
              onClick={() => act("advance_task")}
              className="border border-anthracite-light px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-parchment/70 hover:border-gold hover:text-gold"
            >
              Avancer
            </button>
          )}
        {status === "needs_review" && (
          <>
            <button
              type="button"
              disabled={pending}
              onClick={() => act("approve_task")}
              className="bg-gold px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-ink"
            >
              Approuver
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => act("reject_task")}
              className="border border-crimson/50 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-parchment/60"
            >
              Rejeter
            </button>
          </>
        )}
      </div>
      {msg && <p className="font-serif text-xs text-parchment/55">{msg}</p>}
    </div>
  );
}

export function RunStatusButtons({
  runId,
  status,
}: {
  runId: string;
  status: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <div className="flex gap-2">
      {(status === "en_cours" || status === "planifie") && (
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              await post({ action: "suspend_run", runId });
              router.refresh();
            })
          }
          className="border border-anthracite-light px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-parchment/60"
        >
          Suspendre
        </button>
      )}
      {status === "suspendu" && (
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              await post({ action: "resume_run", runId });
              router.refresh();
            })
          }
          className="border border-gold/50 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-gold"
        >
          Reprendre
        </button>
      )}
    </div>
  );
}
