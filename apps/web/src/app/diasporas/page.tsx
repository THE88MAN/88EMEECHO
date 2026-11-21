import type { Metadata } from "next";
import { RubricStub } from "@/components/RubricStub";
import { rubricsMeta, sectionArticles } from "@/lib/demo/content";

export const metadata: Metadata = { title: "Diasporas" };

export default function DiasporasPage() {
  const meta = rubricsMeta.diasporas;
  return (
    <RubricStub
      title={meta.title}
      description={meta.description}
      articles={sectionArticles.filter((a) => a.rubric === "Diasporas")}
    />
  );
}
