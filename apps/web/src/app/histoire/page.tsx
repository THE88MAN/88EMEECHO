import type { Metadata } from "next";
import { RubricPage } from "@/components/cms/RubricPage";

export const metadata: Metadata = { title: "Histoire" };

export default function HistoirePage() {
  return <RubricPage slug="histoire" />;
}
