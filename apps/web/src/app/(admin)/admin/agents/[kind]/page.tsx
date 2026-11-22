import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AgentRunControls,
  AgentTaskControls,
  RunStatusButtons,
} from "@/components/admin/AgentControls";
import {
  AGENT_KIND_FR,
  listAgentRuns,
  listAgentTasks,
  listEchoAgents,
  TASK_STATUS_FR,
} from "@/lib/agents";
import type { EchoAgentKind } from "@/lib/agents";

type Props = { params: Promise<{ kind: string }> };

const KINDS: EchoAgentKind[] = [
  "archives",
  "fact_check",
  "visuel",
  "edition",
];

export function generateStaticParams() {
  return KINDS.map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind } = await params;
  const k = kind as EchoAgentKind;
  return {
    title: AGENT_KIND_FR[k] ? `Admin · ${AGENT_KIND_FR[k]}` : "Agent",
    robots: { index: false, follow: false },
  };
}

export default async function AgentKindPage({ params }: Props) {
  const { kind } = await params;
  if (kind === "veille") {
    return (
      <div className="mx-auto max-w-3xl px-[4vw] py-20">
        <p className="font-serif text-parchment/70">
          ÉCHO VEILLE se pilote sur{" "}
          <Link href="/admin/veille" className="text-gold">
            /admin/veille
          </Link>
          .
        </p>
      </div>
    );
  }
  if (!KINDS.includes(kind as EchoAgentKind)) notFound();
  const k = kind as Exclude<EchoAgentKind, "veille">;
  const agent = listEchoAgents().find((a) => a.kind === k);
  const runs = listAgentRuns(k);
  const tasks = listAgentTasks(k);

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Agent ÉCHO</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        {AGENT_KIND_FR[k]}
      </h1>
      <p className="mt-3 max-w-2xl font-serif text-parchment/65">
        {agent?.description}
      </p>
      <div className="mt-6">
        <AgentRunControls agentKind={k} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">Runs</h2>
        <ul className="mt-4 divide-y divide-anthracite-light border-y border-anthracite-light">
          {runs.length === 0 ? (
            <li className="py-4 font-serif text-parchment/50">Aucun run</li>
          ) : (
            runs.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div>
                  <p className="font-display text-lg text-parchment">{r.label}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-parchment/40">
                    {r.status}
                  </p>
                </div>
                <RunStatusButtons runId={r.id} status={r.status} />
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">File</h2>
        <ul className="mt-4 space-y-4">
          {tasks.map((t) => (
            <li key={t.id} className="border border-anthracite-light bg-ink-soft p-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-gold/70">
                {TASK_STATUS_FR[t.status]}
              </p>
              <h3 className="mt-2 font-display text-xl text-parchment">
                <Link
                  href={`/admin/agents/tache/${t.id}`}
                  className="hover:text-gold"
                >
                  {t.title}
                </Link>
              </h3>
              {t.resultSummary && (
                <p className="mt-2 font-serif text-sm text-parchment/60">
                  {t.resultSummary}
                </p>
              )}
              {t.blockedReason && (
                <p className="mt-2 font-serif text-sm text-ambre">
                  {t.blockedReason}
                </p>
              )}
              <AgentTaskControls taskId={t.id} status={t.status} />
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/admin/agents"
        className="mt-12 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Tous les agents
      </Link>
    </div>
  );
}
