import type { Metadata } from "next";
import { RubricPage } from "@/components/cms/RubricPage";

export const metadata: Metadata = { title: "Archives" };

export default function ArchivesPage() {
  return <RubricPage slug="archives" />;
}
