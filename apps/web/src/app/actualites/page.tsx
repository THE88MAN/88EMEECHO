import type { Metadata } from "next";
import { RubricStub } from "@/components/RubricStub";
import { rubricsMeta, sectionArticles } from "@/lib/demo/content";

export const metadata: Metadata = { title: "Actualités" };

export default function ActualitesPage() {
  const meta = rubricsMeta.actualites;
  return (
    <RubricStub
      title={meta.title}
      description={meta.description}
      salle={meta.salle}
      articles={sectionArticles.filter((a) => a.rubric === "Actualités")}
    />
  );
}
