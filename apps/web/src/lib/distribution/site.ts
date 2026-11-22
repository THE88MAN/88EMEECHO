/** Constantes site — Phase 5 distribution. Domaine cible, pas de prod. */

import editorialPolicy from "@/lib/editorial/editorial-policy.json";

export const SITE_NAME = editorialPolicy.media.officialName;
export const SITE_DOMAIN = editorialPolicy.media.domain;
export const SITE_LANG = editorialPolicy.media.primaryLanguage;

/** URL canonique (stubs locaux utilisent ce host pour sitemap / OG / RSS). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  `https://${SITE_DOMAIN}`;

export const SITE_TAGLINE =
  "Histoire, mémoire et actualités africaines";

export const SITE_DESCRIPTION =
  "Média documentaire indépendant — histoire africaine, diasporas, mémoires oubliées, géopolitique.";

/** Titre HTML / OG officiel (accueil). */
export const SITE_TITLE_FULL = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const DEFAULT_OG_IMAGE = "/logo-88-mark.png";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
