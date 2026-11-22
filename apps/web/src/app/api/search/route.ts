import { NextRequest, NextResponse } from "next/server";
import { sectionArticles, une, demoVideos } from "@/lib/demo/content";
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
        "Requête liée à une source journalistique interdite (RFI, Le Monde, Jeune Afrique). Aucun résultat éditorial servi.",
    });
  }

  const needle = q.toLowerCase();
  const articles = [une, ...sectionArticles]
    .filter(
      (a) =>
        a.title.toLowerCase().includes(needle) ||
        a.dek.toLowerCase().includes(needle) ||
        a.rubric.toLowerCase().includes(needle),
    )
    .map((a) => ({ type: "article" as const, ...a }));

  const videos = demoVideos
    .filter(
      (v) =>
        v.title.toLowerCase().includes(needle) ||
        v.rubric.toLowerCase().includes(needle),
    )
    .map((v) => ({ type: "video" as const, ...v }));

  return NextResponse.json({
    query: q,
    results: [...articles, ...videos],
    warning: null,
  });
}
