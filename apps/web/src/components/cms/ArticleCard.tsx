import Link from "next/link";
import { articleHref, rubricTitle } from "@/lib/cms";
import type { CmsArticle } from "@/lib/cms/types";
import { ContentLabelBadge } from "./ContentLabelBadge";

export function ArticleCard({ article }: { article: CmsArticle }) {
  return (
    <li className="cartel-frame py-6">
      <ContentLabelBadge label={article.contentLabel} />
      <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.18em] text-parchment/45">
        {rubricTitle(article.rubricSlug)} · {article.readingTimeMin} min
      </p>
      <h2 className="mt-2 font-display text-2xl text-parchment">
        <Link
          href={articleHref(article)}
          className="transition hover:text-gold"
        >
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 max-w-2xl font-serif text-sm text-parchment/60">
        {article.dek}
      </p>
    </li>
  );
}
