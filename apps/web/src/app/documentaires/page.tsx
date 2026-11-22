import type { Metadata } from "next";
import Link from "next/link";
import { demoVideos, rubricsMeta } from "@/lib/demo/content";

export const metadata: Metadata = { title: "Documentaires" };

export default function DocumentairesPage() {
  const meta = rubricsMeta.documentaires;
  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">{meta.salle}</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        {meta.title}
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-base text-parchment/70">
        {meta.description}
      </p>

      <ul className="mt-12 grid items-end gap-8 md:grid-cols-3">
        {demoVideos.map((video) => (
          <li key={video.id}>
            <div
              className={`relative bg-anthracite ${
                video.ratio === "9/16"
                  ? "aspect-[9/16] max-h-80"
                  : video.ratio === "1/1"
                    ? "aspect-square"
                    : "aspect-video"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-gold">
                ▶
              </div>
              <span className="absolute bottom-3 right-3 bg-ink/80 px-2 py-0.5 font-sans text-[11px]">
                {video.duration}
              </span>
            </div>
            <h2 className="mt-3 font-display text-xl text-parchment">
              {video.title}
            </h2>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-10 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Retour à l’accueil
      </Link>
    </div>
  );
}
