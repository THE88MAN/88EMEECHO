import policy from "./editorial-policy.json";

export type ForbiddenSource = {
  name: string;
  match: string[];
};

export const forbiddenEditorialSources: ForbiddenSource[] =
  policy.forbiddenEditorialSources;

/**
 * Indique si une chaîne (URL, nom de média, citation) correspond
 * à une source journalistique interdite comme source éditoriale.
 * Sources : RFI, Le Monde, Jeune Afrique.
 */
export function isForbiddenEditorialSource(input: string): boolean {
  const haystack = input.trim().toLowerCase();
  if (!haystack) return false;

  return forbiddenEditorialSources.some((source) => {
    const name = source.name.toLowerCase();
    if (haystack === name || haystack.includes(name)) return true;
    return source.match.some((pattern) =>
      haystack.includes(pattern.toLowerCase()),
    );
  });
}

export function listForbiddenSourceNames(): string[] {
  return forbiddenEditorialSources.map((s) => s.name);
}
