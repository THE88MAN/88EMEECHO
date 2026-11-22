"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { easeOutSoft, fadeIn, fadeUp, goldLine } from "@/lib/motion";

export function HomeIntro() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Intro immersive — Mémoire vivante" className="bg-ink">
      {/* C : carton / seuil logo */}
      <div className="relative flex min-h-[88svh] flex-col items-center justify-center px-[4vw] py-20 text-center md:min-h-[100svh]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(184,151,74,0.14), transparent 60%), radial-gradient(ellipse 40% 30% at 15% 85%, rgba(92,26,26,0.18), transparent 50%)",
          }}
          aria-hidden
        />
        <h1 className="sr-only">LE 88ÈME ÉCHO</h1>
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          transition={easeOutSoft}
          className="relative z-10"
        >
          <Image
            src="/logo-88eme-echo.png"
            alt="LE 88ÈME ÉCHO"
            width={280}
            height={280}
            className="mx-auto h-40 w-40 object-contain sm:h-52 sm:w-52 md:h-60 md:w-60"
            priority
          />
        </motion.div>
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={goldLine}
          transition={{ ...easeOutSoft, delay: reduce ? 0 : 0.25 }}
          className="relative z-10 mt-8 h-px w-24 origin-center bg-gold/80"
        />
        <motion.p
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          transition={{ ...easeOutSoft, delay: reduce ? 0 : 0.35 }}
          className="relative z-10 mt-6 max-w-xl font-serif text-base leading-relaxed text-parchment/90 sm:text-lg text-balance"
        >
          Documenter l’histoire africaine, les diasporas et les mémoires
          oubliées — à partir de sources vérifiables.
        </motion.p>
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          transition={{ ...easeOutSoft, delay: reduce ? 0 : 0.45 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#afrique-aujourdhui"
            className="bg-gold px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-gold-soft"
          >
            Entrer dans les salles
          </Link>
          <Link
            href="/a-propos"
            className="border border-parchment/50 px-6 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-parchment transition hover:border-gold hover:text-gold"
          >
            La charte
          </Link>
        </motion.div>
      </div>

      {/* C : plan documentaire + carton-titre */}
      <div className="letterbox bg-anthracite">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeIn}
          transition={easeOutSoft}
          className="relative flex min-h-[58svh] items-end md:min-h-[70svh]"
          style={{
            background:
              "linear-gradient(180deg, transparent 25%, rgba(12,11,10,0.94) 100%), radial-gradient(ellipse at 42% 38%, #4a3828 0%, #1a1410 55%, #0c0b0a 100%)",
          }}
        >
          <div className="salle-pad w-full pb-10 md:pb-14">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ambre">
              00:00:01 · Plan documentaire · placeholder
            </p>
            <h2 className="mt-3 max-w-[18ch] font-carton text-2xl uppercase tracking-[0.14em] text-parchment sm:text-3xl md:text-4xl">
              Mémoire vivante
            </h2>
            <p className="mt-3 max-w-xl font-serif text-base text-parchment/75 md:text-lg">
              Ce que les silences documentaires refusent encore de dire —
              titre fort de démonstration, aucun fait affirmé.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
