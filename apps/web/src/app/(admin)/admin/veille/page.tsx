import type { Metadata } from "next";
import Link from "next/link";
import {
  ItemActionButtons,
  RunActionButtons,
  StartVeilleButton,
} from "@/components/admin/VeilleControls";
import { StatusBadge } from "@/components/cms/StatusBadge";
import {
  AFRICAN_STATES,
  countItemsByStage,
  listVeilleCrons,
  listVeilleItems,
  listVeilleJournal,
  listVeilleRuns,
  STAGE_FR,
  UNCERTAINTY_FR,
  getStateByCode,
} from "@/lib/veille";
import { listForbiddenSourceNames } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Admin · ÉCHO VEILLE",
  robots: { index: false, follow: false },
};

export default function AdminVeillePage() {
  const runs = listVeilleRuns();
  const items = listVeilleItems();
  const journal = listVeilleJournal(12);
  const crons = listVeilleCrons();
  const stages = countItemsByStage();
  const forbidden = listForbiddenSourceNames();

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">ÉCHO VEILLE · Phase 3</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        Veille actualités africaines
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-parchment/70">
        Pipeline recherche → collecte → vérification → rédaction FR →
        validation. Couverture {AFRICAN_STATES.length} États. Veille{" "}
        <strong className="font-semibold text-parchment">francophone</strong>{" "}
        uniquement (watchLanguages = fr). Pas d’auto-publish si incertitude.
        Sources interdites : {forbidden.join(", ")}. Sources antillaises /
        caribéennes internes autorisées.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <StartVeilleButton />
        <Link
          href="/admin/veille/etats"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold"
        >
          54 États →
        </Link>
        <Link
          href="/admin/sources"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-parchment/50 hover:text-gold"
        >
          Sources
        </Link>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Object.entries(STAGE_FR).map(([k, label]) => (
          <div
            key={k}
            className="border border-anthracite-light bg-ink-soft p-3"
          >
            <p className="font-sans text-[9px] uppercase tracking-[0.14em] text-parchment/45">
              {label}
            </p>
            <p className="mt-1 font-display text-2xl text-gold">
              {stages[k] ?? 0}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">Runs</h2>
        <ul className="mt-4 divide-y divide-anthracite-light border-y border-anthracite-light">
          {runs.map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-4 py-4"
            >
              <div>
                <p className="font-display text-lg text-parchment">{r.label}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-wider text-parchment/40">
                  {r.status} · {r.statesTargeted.length} États · langues{" "}
                  {r.languagesMonitored.join("/")} · {r.triggeredBy}
                </p>
              </div>
              <RunActionButtons runId={r.id} status={r.status} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">File persistante</h2>
        <ul className="mt-4 space-y-4">
          {items.map((item) => {
            const state = getStateByCode(item.stateCode);
            return (
              <li
                key={item.id}
                className="border border-anthracite-light bg-ink-soft p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-gold/70">
                      {state?.nameFr ?? item.stateCode} · {STAGE_FR[item.stage]} ·
                      incertitude {UNCERTAINTY_FR[item.uncertainty]}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-parchment">
                      <Link
                        href={`/admin/veille/${item.id}`}
                        className="hover:text-gold"
                      >
                        {item.sections.titre}
                      </Link>
                    </h3>
                    <p className="mt-2 font-serif text-sm text-parchment/60">
                      {item.sections.chapo}
                    </p>
                    {item.autoPublishBlocked && (
                      <p className="mt-2 font-sans text-[10px] text-ambre">
                        Auto-publish bloqué — {item.blockReason}
                      </p>
                    )}
                  </div>
                  <StatusBadge status={item.publicationStatus} />
                </div>
                <ItemActionButtons
                  itemId={item.id}
                  stage={item.stage}
                  publicationStatus={item.publicationStatus}
                  uncertainty={item.uncertainty}
                />
              </li>
            );
          })}
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
                  {e.level} ·{" "}
                  {new Date(e.createdAt).toLocaleString("fr-FR")}
                </span>
                <p className="mt-0.5">{e.message}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-parchment">Cron stubs</h2>
          <ul className="mt-4 space-y-3">
            {crons.map((c) => (
              <li
                key={c.id}
                className="border border-anthracite-light p-4"
              >
                <p className="font-display text-base text-parchment">{c.name}</p>
                <p className="mt-1 font-mono text-xs text-gold/80">
                  {c.cronExpr}
                </p>
                <p className="mt-2 font-serif text-sm text-parchment/55">
                  {c.description}
                </p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-wider text-parchment/40">
                  {c.enabled ? "Activé" : "Désactivé (défaut)"}
                </p>
              </li>
            ))}
          </ul>
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
