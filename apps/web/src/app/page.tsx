import { HomeHero } from "@/components/HomeHero";
import { HomeSections } from "@/components/HomeSections";
import { HomeUne } from "@/components/HomeUne";
import { HomeVideos } from "@/components/HomeVideos";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeUne />
      <HomeSections />
      <HomeVideos />
    </>
  );
}
