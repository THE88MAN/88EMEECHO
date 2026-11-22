import policy from "./editorial-policy.json";

export type ForbiddenSource = {
  name: string;
  match: string[];
  scope?: string;
  notes?: string;
};

export const forbiddenEditorialSources: ForbiddenSource[] =
  policy.forbiddenEditorialSources as ForbiddenSource[];

/**
 * Indique si une chaîne (URL, nom de média, citation) correspond
 * à une source journalistique interdite comme source éditoriale.
 * Sources : RFI, Le Monde, Jeune Afrique, Nofi (marque entière).
 */
export function isForbiddenEditorialSource(input: string): boolean {
  const haystack = input.trim().toLowerCase();
  if (!haystack) return false;

  return forbiddenEditorialSources.some((source) => {
    const name = source.name.toLowerCase();
    if (haystack === name || haystack.includes(name)) return true;

    return source.match.some((pattern) =>
      matchesForbiddenPattern(haystack, pattern),
    );
  });
}

/**
 * Patterns :
 * - `nofi.*` → tout domaine / sous-domaine dont le label est nofi
 * - sinon inclusion littérale (URL, handle, agrégateur)
 */
function matchesForbiddenPattern(haystack: string, pattern: string): boolean {
  const p = pattern.trim().toLowerCase();
  if (!p) return false;

  if (p.endsWith(".*")) {
    const root = p.slice(0, -2);
    if (!root) return false;
    // nofi.anything / www.nofi.anything / sub.nofi.tld
    const domainLike = new RegExp(
      `(^|[^a-z0-9])${escapeRegExp(root)}\\.[a-z0-9.-]+`,
      "i",
    );
    if (domainLike.test(haystack)) return true;
    if (haystack.includes(`${root}.`)) return true;
    return false;
  }

  return haystack.includes(p);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function listForbiddenSourceNames(): string[] {
  return forbiddenEditorialSources.map((s) => s.name);
}
