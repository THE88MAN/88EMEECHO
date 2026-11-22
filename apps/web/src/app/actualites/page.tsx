import type { Metadata } from "next";
import { RubricPage } from "@/components/cms/RubricPage";

export const metadata: Metadata = { title: "Actualités" };

export default function ActualitesPage() {
  return <RubricPage slug="actualites" />;
}
