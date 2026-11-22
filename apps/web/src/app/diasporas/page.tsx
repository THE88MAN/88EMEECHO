import type { Metadata } from "next";
import { RubricPage } from "@/components/cms/RubricPage";

export const metadata: Metadata = { title: "Diasporas" };

export default function DiasporasPage() {
  return <RubricPage slug="diasporas" />;
}
