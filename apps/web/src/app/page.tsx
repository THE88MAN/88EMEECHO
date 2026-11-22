import { HomeAfriqueAujourdhui } from "@/components/home/HomeAfriqueAujourdhui";
import { HomeArchivesParlent } from "@/components/home/HomeArchivesParlent";
import { HomeDiasporas } from "@/components/home/HomeDiasporas";
import { HomeDocumentaires } from "@/components/home/HomeDocumentaires";
import { HomeGeopolitique } from "@/components/home/HomeGeopolitique";
import { HomeHistoiresOubliees } from "@/components/home/HomeHistoiresOubliees";
import { HomeIntro } from "@/components/home/HomeIntro";

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <HomeAfriqueAujourdhui />
      <HomeHistoiresOubliees />
      <HomeArchivesParlent />
      <HomeGeopolitique />
      <HomeDiasporas />
      <HomeDocumentaires />
    </>
  );
}
