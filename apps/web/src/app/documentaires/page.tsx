import type { Metadata } from "next";
import { RubricPage } from "@/components/cms/RubricPage";

export const metadata: Metadata = { title: "Documentaires" };

export default function DocumentairesPage() {
  return <RubricPage slug="documentaires" />;
}
