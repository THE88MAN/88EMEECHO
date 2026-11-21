import type { Metadata } from "next";
import { RubricStub } from "@/components/RubricStub";
import { rubricsMeta, sectionArticles } from "@/lib/demo/content";

export const metadata: Metadata = { title: "Géopolitique" };

export default function GeopolitiquePage() {
  const meta = rubricsMeta.geopolitique;
  return (
    <RubricStub
      title={meta.title}
      description={meta.description}
      salle={meta.salle}
      articles={sectionArticles.filter((a) => a.rubric === "Géopolitique")}
    />
  );
}
