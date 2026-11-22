import type { MetadataRoute } from "next";
import {
  listPublishedArticles,
  listPublishedDossiers,
} from "@/lib/cms";
import { SITE_URL } from "@/lib/distribution";

const STATIC_PATHS = [
  "/",
  "/actualites",
  "/histoire",
  "/geopolitique",
  "/diasporas",
  "/documentaires",
  "/archives",
  "/bibliotheque",
  "/a-propos",
  "/sources",
  "/corrections",
  "/recherche",
  "/newsletter",
  "/abonnement",
  "/feed.xml",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const articles: MetadataRoute.Sitemap = listPublishedArticles().map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const dossiers: MetadataRoute.Sitemap = listPublishedDossiers().map((d) => ({
    url: `${SITE_URL}/bibliotheque/${d.slug}`,
    lastModified: new Date(d.publishedAt ?? now.toISOString()),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticEntries, ...articles, ...dossiers];
}
