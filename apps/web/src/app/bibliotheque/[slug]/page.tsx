import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articleHref,
  getFacetsByIds,
  getPublishedDossierBySlug,
  getSourcesByIds,
  listPublishedDossiers,
  FACET_KIND_FR,
} from "@/lib/cms";
import { cmsArticles } from "@/lib/cms/seed";
import type { CmsArticle } from "@/lib/cms/types";

type Props = { params: Promise<{ slug: string }> };

function articlesForDossier(ids: string[]): CmsArticle[] {
  return ids
    .map((id) => cmsArticles.find((a) => a.id === id && a.status === "PUBLIE"))
    .filter((a): a is CmsArticle => Boolean(a));
}

export async function generateStaticParams() {
  return listPublishedDossiers().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getPublishedDossierBySlug(slug);
  if (!d) return { title: "Dossier" };
  return { title: d.title, description: d.summary };
}

export default async function DossierPage({ params }: Props) {
  const { slug } = await params;
  const dossier = getPublishedDossierBySlug(slug);
  if (!dossier) notFound();

  const facets = getFacetsByIds(dossier.facetIds);
  const sources = getSourcesByIds(dossier.sourceIds);
  const articles = articlesForDossier(dossier.articleIds);

  return (
    <div className="bg-ink">
      <header className="border-b border-anthracite-light">
        <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
          <p className="section-kicker">Dossier bibliothèque · démo</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl text-parchment md:text-5xl text-balance">
            {dossier.title}
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-lg text-parchment/75">
            {dossier.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {facets.map((f) => (
              <li key={f.id}>
                <Link
                  href={`/bibliotheque?kind=${f.kind}&facet=${f.slug}`}
                  className="border border-anthracite-light px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-parchment/70 hover:border-gold hover:text-gold"
                >
                  {FACET_KIND_FR[f.kind]} · {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="mx-auto grid max-w-salle gap-12 px-[4vw] py-12 md:grid-cols-[1fr_18rem] md:py-16">
        <div className="space-y-14">
          <section>
            <h2 className="font-display text-2xl text-parchment">Présentation</h2>
            <div className="mt-4 space-y-4 whitespace-pre-line font-serif text-base leading-relaxed text-parchment/80">
              {dossier.presentation}
            </div>
          </section>

          {dossier.timeline.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-parchment">Chronologie</h2>
              <ol className="mt-6 space-y-6 border-l border-gold/40 pl-6">
                {dossier.timeline.map((ev) => (
                  <li key={ev.id} className="relative">
                    <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-gold/80">
                      {ev.eventDate}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-parchment">
                      {ev.title}
                    </h3>
                    <p className="mt-1 font-serif text-sm text-parchment/65">
                      {ev.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {dossier.assets.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-parchment">
                Documents, photos & cartes
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {dossier.assets.map((a) => (
                  <li
                    key={a.id}
                    className={`border p-4 ${
                      a.isAiReconstitution
                        ? "border-crimson bg-ink-soft"
                        : "border-anthracite-light bg-ink-soft"
                    }`}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-gold/70">
                      {a.kind}
                      {a.isAiReconstitution ? " · reconstitution IA" : ""}
                    </p>
                    <h3 className="mt-2 font-display text-base text-parchment">
                      {a.title}
                    </h3>
                    <p className="mt-2 font-serif text-sm text-parchment/60">
                      {a.caption}
                    </p>
                    <p className="mt-2 font-sans text-[10px] text-parchment/40">
                      Provenance : {a.provenance}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {dossier.biblio.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-parchment">
                Bibliographie
              </h2>
              <ul className="mt-4 space-y-3">
                {dossier.biblio.map((b) => (
                  <li
                    key={b.id}
                    className="font-serif text-sm text-parchment/70"
                  >
                    {b.citation}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {articles.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-parchment">
                Articles liés
              </h2>
              <ul className="mt-4 divide-y divide-anthracite-light border-y border-anthracite-light">
                {articles.map((a) => (
                  <li key={a.id} className="py-4">
                    <Link
                      href={articleHref(a)}
                      className="font-display text-lg text-parchment hover:text-gold"
                    >
                      {a.title}
                    </Link>
                    <p className="mt-1 font-serif text-sm text-parchment/55">
                      {a.dek}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {dossier.videoTitles.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-parchment">Vidéos</h2>
              <ul className="mt-4 space-y-2">
                {dossier.videoTitles.map((t) => (
                  <li key={t}>
                    <Link
                      href="/documentaires"
                      className="font-serif text-parchment/80 hover:text-gold"
                    >
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-8 md:sticky md:top-28 md:self-start">
          <div className="border border-anthracite-light p-5">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
              Sources
            </h2>
            <ul className="mt-3 space-y-3">
              {sources.map((s) => (
                <li key={s.id} className="font-serif text-sm text-parchment/70">
                  {s.name}
                </li>
              ))}
            </ul>
            <Link
              href="/sources"
              className="mt-4 inline-block font-sans text-[10px] uppercase tracking-[0.16em] text-parchment/45 hover:text-gold"
            >
              Catalogue →
            </Link>
          </div>
          <Link
            href="/bibliotheque"
            className="inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
          >
            ← Tous les dossiers
          </Link>
        </aside>
      </div>
    </div>
  );
}
