import { rubricsMeta } from "@/lib/demo/content";
import {
  adminRoles,
  cmsArticles,
  cmsCorrections,
  cmsSources,
  libraryDossiers,
  libraryFacets,
} from "./seed";
import type {
  CmsArticle,
  CmsCorrection,
  CmsSource,
  LibraryDossier,
  LibraryFacet,
  LibraryFacetKind,
  PublicationStatus,
  RubricSlug,
} from "./types";

export * from "./types";
export * from "./labels";
export { adminRoles, cmsArticles, cmsCorrections, cmsSources, libraryDossiers, libraryFacets };

/** Articles publiés (front public) */
export function listPublishedArticles(): CmsArticle[] {
  return cmsArticles
    .filter((a) => a.status === "PUBLIE")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function listArticlesByRubric(rubric: RubricSlug): CmsArticle[] {
  return listPublishedArticles().filter((a) => a.rubricSlug === rubric);
}

export function getArticleBySlug(slug: string): CmsArticle | undefined {
  return cmsArticles.find((a) => a.slug === slug);
}

export function getPublishedArticleBySlug(slug: string): CmsArticle | undefined {
  const a = getArticleBySlug(slug);
  return a?.status === "PUBLIE" ? a : undefined;
}

export function listAllArticlesForAdmin(): CmsArticle[] {
  return [...cmsArticles].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
}

export function countArticlesByStatus(): Record<PublicationStatus, number> {
  const base: Record<PublicationStatus, number> = {
    BROUILLON: 0,
    A_VERIFIER: 0,
    VALIDE: 0,
    PUBLIE: 0,
    CORRECTION_NECESSAIRE: 0,
  };
  for (const a of cmsArticles) base[a.status] += 1;
  return base;
}

export function listPublicSources(): CmsSource[] {
  return cmsSources.filter((s) => s.isPublic && !s.isForbidden);
}

export function listForbiddenSources(): CmsSource[] {
  return cmsSources.filter((s) => s.isForbidden);
}

export function getSourcesByIds(ids: string[]): CmsSource[] {
  return ids
    .map((id) => cmsSources.find((s) => s.id === id))
    .filter((s): s is CmsSource => Boolean(s));
}

export function listPublicCorrections(): CmsCorrection[] {
  return cmsCorrections
    .filter((c) => c.isPublic)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function listPublishedDossiers(): LibraryDossier[] {
  return libraryDossiers.filter((d) => d.status === "PUBLIE");
}

export function getDossierBySlug(slug: string): LibraryDossier | undefined {
  return libraryDossiers.find((d) => d.slug === slug);
}

export function getPublishedDossierBySlug(
  slug: string,
): LibraryDossier | undefined {
  const d = getDossierBySlug(slug);
  return d?.status === "PUBLIE" ? d : undefined;
}

export function listFacetsByKind(kind: LibraryFacetKind): LibraryFacet[] {
  return libraryFacets.filter((f) => f.kind === kind);
}

export function getFacetsByIds(ids: string[]): LibraryFacet[] {
  return ids
    .map((id) => libraryFacets.find((f) => f.id === id))
    .filter((f): f is LibraryFacet => Boolean(f));
}

export function filterDossiers(opts: {
  facetSlug?: string;
  kind?: LibraryFacetKind;
  q?: string;
}): LibraryDossier[] {
  let list = listPublishedDossiers();
  const q = opts.q?.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.presentation.toLowerCase().includes(q),
    );
  }
  if (opts.facetSlug) {
    const facet = libraryFacets.find(
      (f) =>
        f.slug === opts.facetSlug &&
        (!opts.kind || f.kind === opts.kind),
    );
    if (!facet) return [];
    list = list.filter((d) => d.facetIds.includes(facet.id));
  }
  return list;
}

export function rubricTitle(slug: RubricSlug): string {
  return rubricsMeta[slug]?.title ?? slug;
}

export function articleHref(article: Pick<CmsArticle, "slug">): string {
  return `/articles/${article.slug}`;
}

export function dossierHref(dossier: Pick<LibraryDossier, "slug">): string {
  return `/bibliotheque/${dossier.slug}`;
}

export type SearchHit =
  | { type: "article"; id: string; title: string; dek: string; href: string; meta: string }
  | { type: "dossier"; id: string; title: string; dek: string; href: string; meta: string }
  | { type: "source"; id: string; title: string; dek: string; href: string; meta: string };

export function searchIndex(query: string): SearchHit[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const hits: SearchHit[] = [];

  for (const a of listPublishedArticles()) {
    if (
      a.title.toLowerCase().includes(needle) ||
      a.dek.toLowerCase().includes(needle) ||
      a.body.toLowerCase().includes(needle) ||
      rubricTitle(a.rubricSlug).toLowerCase().includes(needle)
    ) {
      hits.push({
        type: "article",
        id: a.id,
        title: a.title,
        dek: a.dek,
        href: articleHref(a),
        meta: rubricTitle(a.rubricSlug),
      });
    }
  }

  for (const d of listPublishedDossiers()) {
    if (
      d.title.toLowerCase().includes(needle) ||
      d.summary.toLowerCase().includes(needle)
    ) {
      hits.push({
        type: "dossier",
        id: d.id,
        title: d.title,
        dek: d.summary,
        href: dossierHref(d),
        meta: "Bibliothèque",
      });
    }
  }

  for (const s of listPublicSources()) {
    if (
      s.name.toLowerCase().includes(needle) ||
      s.description.toLowerCase().includes(needle) ||
      s.category.toLowerCase().includes(needle)
    ) {
      hits.push({
        type: "source",
        id: s.id,
        title: s.name,
        dek: s.description,
        href: "/sources",
        meta: "Source",
      });
    }
  }

  return hits;
}
