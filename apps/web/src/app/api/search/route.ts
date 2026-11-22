import { NextRequest, NextResponse } from "next/server";
import { searchIndex } from "@/lib/cms";
import { isForbiddenEditorialSource } from "@/lib/editorial";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({ query: q, results: [], warning: null });
  }

  if (isForbiddenEditorialSource(q)) {
    return NextResponse.json({
      query: q,
      results: [],
      warning:
        "Requête liée à une source journalistique interdite (RFI, Le Monde, Jeune Afrique, Nofi). Aucun résultat éditorial servi.",
    });
  }

  return NextResponse.json({
    query: q,
    results: searchIndex(q),
    warning: null,
  });
}
