/**
 * Client Supabase — stub Phase 1.
 * Aucune credential réelle dans le dépôt. Brancher via variables d'environnement
 * (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) en Phase 2+.
 */

export type SupabaseStub = {
  configured: boolean;
  url: string | null;
};

export function getSupabaseStub(): SupabaseStub {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null;
  return {
    configured: Boolean(url && anon),
    url,
  };
}
