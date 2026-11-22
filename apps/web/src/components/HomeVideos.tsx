import Link from "next/link";
import { demoVideos } from "@/lib/demo/content";

export function HomeVideos() {
  return (
    <section className="bg-ink-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Audiovisuel</p>
            <h2 className="mt-3 font-display text-3xl text-parchment md:text-4xl">
              Documentaires & formats longs
            </h2>
          </div>
          <Link
            href="/documentaires"
            className="text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-soft"
          >
            Voir la rubrique →
          </Link>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {demoVideos.map((video) => (
            <li key={video.id} className="group">
              <div className="relative aspect-video overflow-hidden bg-anthracite">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-crimson/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center border border-gold/60 text-gold transition group-hover:bg-gold group-hover:text-ink">
                    ▶
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 bg-ink/80 px-2 py-0.5 text-[11px] tracking-wide text-parchment">
                  {video.duration}
                </span>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-gold/70">
                {video.rubric} · placeholder
              </p>
              <h3 className="mt-1 font-display text-lg text-parchment">
                {video.title}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
