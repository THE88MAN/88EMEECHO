import type { Metadata } from "next";
import { RubricStub } from "@/components/RubricStub";
import { rubricsMeta, sectionArticles, une } from "@/lib/demo/content";

export const metadata: Metadata = { title: "Histoire" };

export default function HistoirePage() {
  const meta = rubricsMeta.histoire;
  const articles = [
    une,
    ...sectionArticles.filter((a) => a.rubric === "Histoire"),
  ];
  return (
    <RubricStub
      title={meta.title}
      description={meta.description}
      salle={meta.salle}
      articles={articles}
    />
  );
}
