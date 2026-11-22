import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/cms/StatusBadge";
import {
  adminRoles,
  countArticlesByStatus,
  listAllArticlesForAdmin,
  listPublishedDossiers,
  listPublicSources,
  ROLE_FR,
  STATUS_FR,
} from "@/lib/cms";
import { getSupabaseStub } from "@/lib/db/client";
import { listForbiddenSourceNames } from "@/lib/editorial";
import type { PublicationStatus } from "@/lib/cms/types";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

const STATUS_ORDER: PublicationStatus[] = [
  "BROUILLON",
  "A_VERIFIER",
  "VALIDE",
  "PUBLIE",
  "CORRECTION_NECESSAIRE",
];

export default function AdminDashboardPage() {
  const db = getSupabaseStub();
  const counts = countArticlesByStatus();
  const articles = listAllArticlesForAdmin();
  const forbidden = listForbiddenSourceNames();

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Administration · Phase 2–6</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        CMS éditorial
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-parchment/70">
        Publier, modifier, archiver, statuts — stubs locaux. Auth Supabase
        réelle optionnelle ({db.configured ? "configurée" : "non branchée"}).
        Agents ÉCHO + distribution (SEO, newsletter, stats stubs) — sans
        auto-publish ni contournement de charte.
      </p>

      <nav className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/admin/agents"
          className="border border-gold/60 bg-gold/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-ink"
        >
          Agents ÉCHO
        </Link>
        <Link
          href="/admin/distribution"
          className="border border-gold/40 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:border-gold hover:bg-gold/10"
        >
          Distribution
        </Link>
        <Link
          href="/admin/readiness"
          className="border border-crimson/50 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-crimson hover:bg-crimson/10"
        >
          Readiness (pas de prod)
        </Link>
        <Link
          href="/admin/veille"
          className="border border-anthracite-light px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-parchment hover:border-gold hover:text-gold"
        >
          ÉCHO VEILLE
        </Link>
        <Link
          href="/admin/articles"
          className="border border-anthracite-light px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-parchment hover:border-gold hover:text-gold"
        >
          Articles
        </Link>
        <Link
          href="/admin/sources"
          className="border border-anthracite-light px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-parchment hover:border-gold hover:text-gold"
        >
          Sources
        </Link>
        <Link
          href="/admin/bibliotheque"
          className="border border-anthracite-light px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-parchment hover:border-gold hover:text-gold"
        >
          Bibliothèque
        </Link>
      </nav>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STATUS_ORDER.map((s) => (
          <div
            key={s}
            className="border border-anthracite-light bg-ink-soft p-4"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-parchment/50">
              {STATUS_FR[s]}
            </p>
            <p className="mt-2 font-display text-3xl text-gold">{counts[s]}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="border border-anthracite-light p-6">
          <h2 className="font-display text-xl text-gold">Rôles (stubs)</h2>
          <ul className="mt-4 space-y-2">
            {adminRoles.map((u) => (
              <li
                key={u.id}
                className="flex justify-between gap-4 font-serif text-sm text-parchment/75"
              >
                <span>{u.displayName}</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-parchment/45">
                  {ROLE_FR[u.role]}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="border border-anthracite-light p-6">
          <h2 className="font-display text-xl text-gold">Données</h2>
          <ul className="mt-4 space-y-2 font-serif text-sm text-parchment/70">
            <li>Articles seed : {articles.length}</li>
            <li>Dossiers publiés : {listPublishedDossiers().length}</li>
            <li>Sources publiques : {listPublicSources().length}</li>
            <li>
              Exclusion active : {forbidden.join(", ")}
            </li>
            <li>
              SQL :{" "}
              <code className="text-gold/80">002_phase2_cms_bibliotheque.sql</code>
            </li>
          </ul>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-parchment">File récente</h2>
        <ul className="mt-4 divide-y divide-anthracite-light border-y border-anthracite-light">
          {articles.slice(0, 6).map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-3 py-4"
            >
              <div>
                <p className="font-display text-lg text-parchment">{a.title}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-wider text-parchment/40">
                  {a.rubricSlug} · maj{" "}
                  {new Date(a.updatedAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <StatusBadge status={a.status} />
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/"
        className="mt-10 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Site public
      </Link>
    </div>
  );
}
