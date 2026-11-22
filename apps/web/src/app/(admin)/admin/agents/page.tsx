import type { Metadata } from "next";
import Link from "next/link";
import {
  AgentRunControls,
  RunStatusButtons,
} from "@/components/admin/AgentControls";
import {
  AGENT_KIND_FR,
  agentsCannotModifyAlone,
  listAgentJournal,
  listAgentRuns,
  listAgentTasks,
  listEchoAgents,
  listEditorialMemory,
  TASK_STATUS_FR,
} from "@/lib/agents";
import type { EchoAgentKind } from "@/lib/agents";
import { listForbiddenSourceNames } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Admin · Agents ÉCHO",
  robots: { index: false, follow: false },
};

export default function AdminAgentsPage() {
  const agents = listEchoAgents();
  const runs = listAgentRuns();
  const tasks = listAgentTasks();
  const journal = listAgentJournal(10);
  const memory = listEditorialMemory();
  const forbidden = listForbiddenSourceNames();

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Phase 4 · Agents</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        Agents ÉCHO
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-parchment/70">
        ARCHIVES, FACT-CHECK, VISUEL, ÉDITION — plus VEILLE (Phase 3). Politique
        commune : respect charte, pas d’auto-publish, pas de modification seule
        de {agentsCannotModifyAlone().join(", ")}. Sources interdites :{" "}
        {forbidden.join(", ")}.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <div
            key={a.kind}
            className="border border-anthracite-light bg-ink-soft p-5"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-gold/80">
              {a.enabled ? "Actif" : "Off"} · auto-publish non
            </p>
            <h2 className="mt-2 font-display text-xl text-parchment">
              {a.displayName}
            </h2>
            <p className="mt-2 font-serif text-sm text-parchment/60">
              {a.description}
            </p>
            <div className="mt-4">
              {a.kind === "veille" ? (
                <Link
                  href="/admin/veille"
                  className="font-sans text-[11px] uppercase tracking-[0.16em] text-gold"
                >
                  Ouvrir VEILLE →
                </Link>
              ) : (
                <>
                  <Link
                    href={`/admin/agents/${a.kind}`}
                    className="font-sans text-[11px] uppercase tracking-[0.16em] text-gold"
                  >
                    File {AGENT_KIND_FR[a.kind]} →
                  </Link>
                  <div className="mt-3">
                    <AgentRunControls
                      agentKind={
                        a.kind as Exclude<EchoAgentKind, "veille">
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">Runs récents</h2>
        <ul className="mt-4 divide-y divide-anthracite-light border-y border-anthracite-light">
          {runs.map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-3 py-4"
            >
              <div>
                <p className="font-display text-lg text-parchment">{r.label}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-wider text-parchment/40">
                  {AGENT_KIND_FR[r.agentKind]} · {r.status} · {r.triggeredBy}
                </p>
              </div>
              <RunStatusButtons runId={r.id} status={r.status} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">
          File (aperçu)
        </h2>
        <ul className="mt-4 space-y-3">
          {tasks.slice(0, 8).map((t) => (
            <li
              key={t.id}
              className="border border-anthracite-light px-4 py-3"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-gold/70">
                {AGENT_KIND_FR[t.agentKind]} · {TASK_STATUS_FR[t.status]}
              </p>
              <Link
                href={`/admin/agents/tache/${t.id}`}
                className="mt-1 block font-display text-lg text-parchment hover:text-gold"
              >
                {t.title}
              </Link>
              {t.blockedReason && (
                <p className="mt-1 font-serif text-xs text-ambre">
                  {t.blockedReason}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="font-display text-xl text-parchment">Journal</h2>
          <ul className="mt-4 space-y-3">
            {journal.map((e) => (
              <li
                key={e.id}
                className="border-l border-gold/40 pl-3 font-serif text-sm text-parchment/65"
              >
                <span className="font-sans text-[9px] uppercase tracking-wider text-parchment/40">
                  {e.level}
                  {e.agentKind ? ` · ${AGENT_KIND_FR[e.agentKind as EchoAgentKind]}` : ""}
                </span>
                <p className="mt-0.5">{e.message}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-parchment">
            Mémoire éditoriale
          </h2>
          <ul className="mt-4 space-y-3">
            {memory.map((m) => (
              <li key={m.id} className="border border-anthracite-light p-3">
                <p className="font-sans text-[9px] uppercase tracking-wider text-gold/70">
                  {m.kind}
                  {m.agentKind ? ` · ${AGENT_KIND_FR[m.agentKind]}` : ""}
                </p>
                <p className="mt-1 font-display text-base text-parchment">
                  {m.title}
                </p>
                <p className="mt-1 font-serif text-xs text-parchment/55">
                  {m.body}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/admin/agents/memoire"
            className="mt-4 inline-block font-sans text-[10px] uppercase tracking-[0.16em] text-gold"
          >
            Toute la mémoire →
          </Link>
        </section>
      </div>

      <Link
        href="/admin"
        className="mt-12 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Tableau de bord
      </Link>
    </div>
  );
}
