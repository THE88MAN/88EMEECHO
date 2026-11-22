import type { Metadata } from "next";
import Link from "next/link";
import { runReadinessAudit } from "@/lib/readiness";
import type { CheckStatus } from "@/lib/readiness";

export const metadata: Metadata = {
  title: "Admin · Readiness Phase 6",
  robots: { index: false, follow: false },
};

const STATUS_FR: Record<CheckStatus, string> = {
  pass: "OK",
  warn: "Attention",
  fail: "Échec",
  blocked: "Bloqué",
  manual: "Manuel",
};

const STATUS_CLASS: Record<CheckStatus, string> = {
  pass: "text-gold border-gold/50",
  warn: "text-parchment border-parchment/40",
  fail: "text-crimson border-crimson/50",
  blocked: "text-crimson border-crimson/70",
  manual: "text-parchment/70 border-anthracite-light",
};

const CAT_FR: Record<string, string> = {
  tests: "Tests",
  security: "Sécurité",
  performance: "Performance",
  editorial: "Éditorial",
  domain: "Domaine",
  deploy: "Déploiement",
};

export default function AdminReadinessPage() {
  const report = runReadinessAudit();
  const byCat = report.checks.reduce<Record<string, typeof report.checks>>(
    (acc, c) => {
      (acc[c.category] ??= []).push(c);
      return acc;
    },
    {},
  );

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Administration · Phase 6</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        Readiness production
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-parchment/70">
        Checklist tests, sécurité, perf, vérif éditoriale (Nofi / charte),
        domaine {report.domain}.{" "}
        <span className="text-crimson">
          Déploiement 88.com interdit dans cette phase.
        </span>
      </p>

      <div className="mt-6 border border-crimson/50 bg-ink-soft px-5 py-4">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-crimson">
          productionDeployAllowed = false
        </p>
        <p className="mt-2 font-serif text-sm text-parchment/75">
          Généré {new Date(report.generatedAt).toLocaleString("fr-FR")} — aucun
          bouton de déploiement. Autorisation directeur requise pour toute
          mise en ligne.
        </p>
      </div>

      <nav className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/admin"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold"
        >
          ← Dashboard
        </Link>
        <Link
          href="/admin/distribution"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-parchment/50 hover:text-gold"
        >
          Distribution
        </Link>
      </nav>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(
          [
            ["pass", report.summary.pass],
            ["warn", report.summary.warn],
            ["fail", report.summary.fail],
            ["blocked", report.summary.blocked],
            ["manual", report.summary.manual],
          ] as const
        ).map(([k, v]) => (
          <div
            key={k}
            className={`border bg-ink-soft px-4 py-3 ${STATUS_CLASS[k]}`}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.18em]">
              {STATUS_FR[k]}
            </p>
            <p className="mt-1 font-display text-3xl">{v}</p>
          </div>
        ))}
      </div>

      {Object.entries(byCat).map(([cat, items]) => (
        <section key={cat} className="mt-12">
          <h2 className="font-display text-2xl text-parchment">
            {CAT_FR[cat] ?? cat}
          </h2>
          <ul className="mt-4 divide-y divide-anthracite-light border border-anthracite-light">
            {items.map((c) => (
              <li
                key={c.id}
                className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-serif text-parchment">{c.title}</p>
                  <p className="mt-1 font-serif text-sm text-parchment/55">
                    {c.detail}
                  </p>
                </div>
                <span
                  className={`shrink-0 border px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.16em] ${STATUS_CLASS[c.status]}`}
                >
                  {STATUS_FR[c.status]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
