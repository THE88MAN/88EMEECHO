import type { Metadata } from "next";
import Link from "next/link";
import { ArticleStatusActions } from "@/components/admin/ArticleStatusActions";
import { ContentLabelBadge } from "@/components/cms/ContentLabelBadge";
import { listAllArticlesForAdmin, rubricTitle } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Admin · Articles",
  robots: { index: false, follow: false },
};

export default function AdminArticlesPage() {
  const articles = listAllArticlesForAdmin();

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">CMS</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">Articles</h1>
      <p className="mt-3 font-serif text-sm text-parchment/60">
        Actions stub : changer de statut, archiver. Pas d’écriture Supabase.
      </p>

      <ul className="mt-10 divide-y divide-anthracite-light border-y border-anthracite-light">
        {articles.map((a) => (
          <li key={a.id} className="py-6">
            <ContentLabelBadge label={a.contentLabel} />
            <h2 className="mt-2 font-display text-xl text-parchment">
              {a.title}
            </h2>
            <p className="mt-1 font-sans text-[10px] uppercase tracking-wider text-parchment/40">
              {rubricTitle(a.rubricSlug)} · /articles/{a.slug}
            </p>
            <ArticleStatusActions title={a.title} status={a.status} />
          </li>
        ))}
      </ul>

      <Link
        href="/admin"
        className="mt-10 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Tableau de bord
      </Link>
    </div>
  );
}
