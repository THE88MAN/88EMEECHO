import type { Metadata } from "next";
import { RubricStub } from "@/components/RubricStub";
import { rubricsMeta, sectionArticles } from "@/lib/demo/content";

export const metadata: Metadata = { title: "Archives" };

export default function ArchivesPage() {
  const meta = rubricsMeta.archives;
  return (
    <RubricStub
      title={meta.title}
      description={meta.description}
      salle={meta.salle}
      articles={sectionArticles.filter((a) => a.rubric === "Archives")}
    />
  );
}
