import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentLabelBadge } from "@/components/cms/ContentLabelBadge";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { ShareButtons } from "@/components/ShareButtons";
import {
  getPublishedArticleBySlug,
  getSourcesByIds,
  listPublishedArticles,
  listPublicCorrections,
  rubricTitle,
} from "@/lib/cms";
import { formatArticleParagraph } from "@/lib/cms/rich-text";
import {
  articleJsonLd,
  articleMetadata,
  breadcrumbJsonLd,
} from "@/lib/distribution";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return listPublishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);
  if (!article) return { title: "Article" };
  return articleMetadata(article);
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);
  if (!article) notFound();

  const sources = getSourcesByIds(article.sourceIds);
  const corrections = listPublicCorrections().filter(
    (c) => c.articleId === article.id,
  );
  const paragraphs = article.body.split(/\n\n+/);

  const path = `/articles/${article.slug}`;

  return (
    <article className="bg-ink">
      <SeoJsonLd
        data={[
          articleJsonLd(article),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            {
              name: rubricTitle(article.rubricSlug),
              path: `/${article.rubricSlug}`,
            },
            { name: article.title, path },
          ]),
        ]}
      />
      <header className="border-b border-anthracite-light">
        <div className="mx-auto max-w-3xl px-[4vw] py-14 md:py-20">
          <ContentLabelBadge label={article.contentLabel} />
          <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.2em] text-parchment/45">
            {rubricTitle(article.rubricSlug)} · {article.readingTimeMin} min ·{" "}
            {article.authorName}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight text-parchment md:text-5xl text-balance">
            {article.title}
          </h1>
          <p className="mt-5 font-serif text-lg text-parchment/75 md:text-xl">
            {article.dek}
          </p>
          <div className="mt-6 h-px w-16 bg-gold/70" />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-[4vw] py-12 md:py-16">
        <div className="space-y-5 font-serif text-base leading-relaxed text-parchment/85 md:text-lg">
          {paragraphs.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="pt-4 font-display text-2xl text-parchment"
                >
                  {block.replace(/^##\s+/, "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="font-display text-xl text-parchment/90"
                >
                  {block.replace(/^###\s+/, "")}
                </h3>
              );
            }
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: formatArticleParagraph(block),
                }}
              />
            );
          })}
        </div>

        {sources.length > 0 && (
          <section className="mt-14 border-t border-anthracite-light pt-8">
            <h2 className="section-kicker">Sources consultées</h2>
            <ul className="mt-4 space-y-3">
              {sources.map((s) => (
                <li key={s.id} className="font-serif text-sm text-parchment/70">
                  <span className="text-parchment">{s.name}</span>
                  <span className="text-parchment/45"> — {s.category}</span>
                  {s.description ? (
                    <span className="block text-parchment/50">
                      {s.description}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            <Link
              href="/sources"
              className="mt-4 inline-block font-sans text-[11px] uppercase tracking-[0.18em] text-gold"
            >
              Catalogue des sources →
            </Link>
          </section>
        )}

        {corrections.length > 0 && (
          <section className="mt-10 border border-crimson/40 bg-ink-soft p-5">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.2em] text-parchment/70">
              Corrections publiques
            </h2>
            <ul className="mt-3 space-y-3">
              {corrections.map((c) => (
                <li key={c.id}>
                  <p className="font-serif text-sm text-parchment">{c.summary}</p>
                  <p className="mt-1 font-sans text-[10px] uppercase tracking-widest text-parchment/40">
                    {new Date(c.publishedAt).toLocaleDateString("fr-FR")}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/corrections"
              className="mt-3 inline-block font-sans text-[11px] uppercase tracking-[0.18em] text-gold"
            >
              Historique complet →
            </Link>
          </section>
        )}

        <div className="mt-14">
          <ShareButtons path={path} title={article.title} />
        </div>

        <nav className="mt-10 flex flex-wrap gap-6 border-t border-anthracite-light pt-8">
          <Link
            href={`/${article.rubricSlug}`}
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
          >
            ← {rubricTitle(article.rubricSlug)}
          </Link>
          <Link
            href="/bibliotheque"
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-parchment/50 hover:text-gold"
          >
            Bibliothèque
          </Link>
          <Link
            href="/feed.xml"
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-parchment/50 hover:text-gold"
          >
            RSS
          </Link>
        </nav>
      </div>
    </article>
  );
}
