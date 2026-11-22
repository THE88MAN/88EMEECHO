import type { Metadata } from "next";
import type { CmsArticle } from "@/lib/cms/types";
import type { LibraryDossier } from "@/lib/cms/types";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./site";

export function buildOpenGraph(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string;
  authors?: string[];
}): NonNullable<Metadata["openGraph"]> {
  return {
    type: opts.type ?? "website",
    locale: "fr_FR",
    url: absoluteUrl(opts.path),
    siteName: SITE_NAME,
    title: opts.title,
    description: opts.description,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
    ...(opts.type === "article"
      ? {
          publishedTime: opts.publishedTime ?? undefined,
          modifiedTime: opts.modifiedTime,
          authors: opts.authors,
        }
      : {}),
  };
}

export function buildTwitter(opts: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  };
}

export function articleMetadata(article: CmsArticle): Metadata {
  const path = `/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: buildOpenGraph({
      title: article.title,
      description: article.dek,
      path,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.authorName],
    }),
    twitter: buildTwitter({
      title: article.title,
      description: article.dek,
    }),
  };
}

export function dossierMetadata(dossier: LibraryDossier): Metadata {
  const path = `/bibliotheque/${dossier.slug}`;
  return {
    title: dossier.title,
    description: dossier.summary,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: buildOpenGraph({
      title: dossier.title,
      description: dossier.summary,
      path,
    }),
    twitter: buildTwitter({
      title: dossier.title,
      description: dossier.summary,
    }),
  };
}

/** JSON-LD NewsMediaOrganization */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    description: SITE_DESCRIPTION,
    publishingPrinciples: absoluteUrl("/a-propos"),
    sameAs: [],
  };
}

export function articleJsonLd(article: CmsArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(DEFAULT_OG_IMAGE),
      },
    },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    inLanguage: "fr",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
