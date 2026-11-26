/**
 * Garde API — identité Cursor (privé/équipe) + rate-limit mémoire.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireIdentity } from "../../../cursor/identity";

type Bucket = { count: number; resetAt: number };

const g = globalThis as unknown as { __echoRateBuckets?: Map<string, Bucket> };

function buckets(): Map<string, Bucket> {
  if (!g.__echoRateBuckets) g.__echoRateBuckets = new Map();
  return g.__echoRateBuckets;
}

export async function requireApiViewer(
  request: NextRequest,
): Promise<Response | { ok: true }> {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) {
    return NextResponse.json(
      { ok: false, message: "Authentification requise." },
      { status: 401 },
    );
  }
  return { ok: true };
}

/** Rate-limit simple par IP + route (fenêtre 60s). */
export function enforceRateLimit(
  request: NextRequest,
  opts: { key: string; limit: number; windowMs?: number },
): NextResponse | null {
  const windowMs = opts.windowMs ?? 60_000;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";
  const id = `${opts.key}:${ip}`;
  const now = Date.now();
  const map = buckets();
  let b = map.get(id);
  if (!b || now >= b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    map.set(id, b);
  }
  b.count += 1;
  if (b.count > opts.limit) {
    return NextResponse.json(
      { ok: false, message: "Trop de requêtes — réessayez plus tard." },
      { status: 429 },
    );
  }
  return null;
}

/** Limite taille corps JSON (octets). */
export async function readJsonLimited<T>(
  request: NextRequest,
  maxBytes = 32_768,
): Promise<{ ok: true; body: T } | { ok: false; response: NextResponse }> {
  const len = Number(request.headers.get("content-length") || 0);
  if (len > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, message: "Corps trop volumineux." },
        { status: 413 },
      ),
    };
  }
  try {
    const text = await request.text();
    if (text.length > maxBytes) {
      return {
        ok: false,
        response: NextResponse.json(
          { ok: false, message: "Corps trop volumineux." },
          { status: 413 },
        ),
      };
    }
    return { ok: true, body: JSON.parse(text) as T };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, message: "JSON invalide" },
        { status: 400 },
      ),
    };
  }
}
