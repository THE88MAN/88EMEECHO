/**
 * Types alignés sur supabase/migrations/001 + 002 — réexport CMS.
 * Conservé pour compatibilité Phase 1.
 */

export type {
  PublicationStatus,
  ContentLabel,
  UserRole,
  CmsArticle as Article,
  RubricSlug,
  LibraryFacetKind,
  MediaAssetKind,
} from "@/lib/cms/types";
