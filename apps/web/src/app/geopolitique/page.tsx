import type { Metadata } from "next";
import { RubricPage } from "@/components/cms/RubricPage";

export const metadata: Metadata = { title: "Géopolitique" };

export default function GeopolitiquePage() {
  return <RubricPage slug="geopolitique" />;
}
