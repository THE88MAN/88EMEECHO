import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section
      aria-label="Hero — LE 88ÈME ÉCHO"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink"
    >
      {/* Plan atmosphérique full-bleed : bibliothèque / archive nocturne */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 35%, rgba(196,163,90,0.16), transparent 58%),
            radial-gradient(ellipse 50% 40% at 15% 80%, rgba(107,30,30,0.22), transparent 55%),
            radial-gradient(ellipse 45% 35% at 85% 75%, rgba(42,42,42,0.9), transparent 50%),
            linear-gradient(180deg, #141414 0%, #0a0a0a 45%, #050505 100%)
          `,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
        <Image
          src="/logo-88eme-echo.png"
          alt="88 — 88ÈME ÉCHO"
          width={280}
          height={280}
          className="h-36 w-36 object-contain sm:h-48 sm:w-48 md:h-56 md:w-56 animate-fade-up"
          priority
        />
        <h1 className="mt-6 font-display text-4xl leading-none tracking-wide text-gold sm:text-5xl md:text-6xl animate-fade-up-delay">
          LE 88ÈME ÉCHO
        </h1>
        <div className="mt-5 h-px w-24 origin-center bg-gold/80 animate-gold-line" />
        <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment/90 sm:text-lg animate-fade-up-late text-balance">
          Documenter l’histoire africaine, les diasporas et les mémoires
          oubliées — à partir de sources vérifiables.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up-late">
          <Link
            href="#une"
            className="bg-gold px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-gold-soft"
          >
            Lire la Une
          </Link>
          <Link
            href="/a-propos"
            className="border border-parchment/50 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-parchment transition hover:border-gold hover:text-gold"
          >
            La charte
          </Link>
        </div>
      </div>
    </section>
  );
}
