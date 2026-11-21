import type { Metadata } from "next";
import Link from "next/link";
import { demoVideos } from "@/lib/demo/content";
import { rubricsMeta } from "@/lib/demo/content";

export const metadata: Metadata = { title: "Documentaires" };

export default function DocumentairesPage() {
  const meta = rubricsMeta.documentaires;
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <p className="section-kicker">Rubrique</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        {meta.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-parchment/70">
        {meta.description}
      </p>

      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {demoVideos.map((video) => (
          <li key={video.id}>
            <div className="relative aspect-video bg-anthracite">
              <div className="absolute inset-0 flex items-center justify-center text-gold">
                ▶
              </div>
              <span className="absolute bottom-3 right-3 bg-ink/80 px-2 py-0.5 text-[11px]">
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
        className="mt-10 inline-block text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Retour à l’accueil
      </Link>
    </div>
  );
}
