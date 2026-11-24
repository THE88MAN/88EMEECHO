import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentTaskControls } from "@/components/admin/AgentControls";
import {
  AGENT_KIND_FR,
  checkVisuelSheet,
  getAgentTask,
  getVisuelSheetForTask,
  listAgentTasks,
  TASK_STATUS_FR,
} from "@/lib/agents";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listAgentTasks().map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = getAgentTask(id);
  return {
    title: t ? `Tâche · ${t.title}` : "Tâche",
    robots: { index: false, follow: false },
  };
}

export default async function AgentTaskPage({ params }: Props) {
  const { id } = await params;
  const task = getAgentTask(id);
  if (!task) notFound();
  const sheet =
    task.agentKind === "visuel" ? getVisuelSheetForTask(task.id) : undefined;
  const sheetCheck = sheet ? checkVisuelSheet(sheet) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-[4vw] py-14 md:py-20">
      <p className="section-kicker">
        {AGENT_KIND_FR[task.agentKind]} · {TASK_STATUS_FR[task.status]}
      </p>
      <h1 className="mt-3 font-display text-3xl text-parchment md:text-4xl text-balance">
        {task.title}
      </h1>

      {task.blockedReason && (
        <p className="mt-4 border border-ambre/40 bg-ink-soft p-4 font-serif text-sm text-parchment/75">
          {task.blockedReason}
        </p>
      )}

      <AgentTaskControls taskId={task.id} status={task.status} />

      {task.resultSummary && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-parchment">Résultat</h2>
          <p className="mt-3 font-serif text-parchment/75">{task.resultSummary}</p>
        </section>
      )}

      <section className="mt-10 border-t border-anthracite-light pt-6">
        <h2 className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
          Payload
        </h2>
        <dl className="mt-4 space-y-3">
          {Object.entries(task.payload).map(([k, v]) => (
            <div key={k}>
              <dt className="font-sans text-[10px] uppercase tracking-wider text-parchment/40">
                {k}
              </dt>
              <dd className="font-serif text-sm text-parchment/75">
                {Array.isArray(v) ? v.join(" · ") : String(v)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {sheet && (
        <section className="mt-10 border border-crimson/40 bg-ink-soft p-6">
          <h2 className="font-display text-xl text-parchment">
            Fiche reconstitution
          </h2>
          <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.16em] text-gold">
            {sheet.mandatoryLabel}
          </p>
          <ul className="mt-4 space-y-2 font-serif text-sm text-parchment/70">
            <li>
              <strong className="text-parchment">Sujet :</strong> {sheet.subject}
            </li>
            <li>
              <strong className="text-parchment">Période :</strong> {sheet.period}
            </li>
            <li>
              <strong className="text-parchment">Références :</strong>{" "}
              {sheet.referencesText}
            </li>
            <li>
              <strong className="text-parchment">Établis :</strong>{" "}
              {sheet.establishedElements}
            </li>
            <li>
              <strong className="text-parchment">Reconstitués :</strong>{" "}
              {sheet.reconstructedElements}
            </li>
            <li>
              <strong className="text-parchment">Incertitudes :</strong>{" "}
              {sheet.uncertainties}
            </li>
            <li>
              <strong className="text-parchment">Modèle :</strong>{" "}
              {sheet.modelUsed}
            </li>
            {sheet.generation && (
              <li>
                <strong className="text-parchment">Génération :</strong>{" "}
                {sheet.generation.format} · seed{" "}
                {sheet.generation.seed ?? "non renseigné"}
                {sheet.generation.workflowRef
                  ? ` · ${sheet.generation.workflowRef}`
                  : ""}
              </li>
            )}
          </ul>
          {sheetCheck && (
            <div className="mt-5 border-t border-anthracite-light pt-4 font-sans text-xs">
              <p className={sheetCheck.complete ? "text-gold" : "text-ambre"}>
                {sheetCheck.complete
                  ? "Fiche complète (charte) — contenu à valider par un humain."
                  : "Fiche incomplète — image non publiable."}
              </p>
              <ul className="mt-2 space-y-1 text-parchment/60">
                {sheetCheck.problems.map((p) => (
                  <li key={p}>✕ {p}</li>
                ))}
                {sheetCheck.warnings.map((w) => (
                  <li key={w}>! {w}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <Link
        href={`/admin/agents/${task.agentKind}`}
        className="mt-12 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← File agent
      </Link>
    </div>
  );
}
