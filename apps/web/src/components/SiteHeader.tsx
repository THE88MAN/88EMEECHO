"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { navItems } from "@/lib/demo/content";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setOpen(false);
    router.push(`/recherche?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-anthracite-light/80 bg-ink/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-salle items-center justify-between gap-4 px-[4vw] py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="LE 88ÈME ÉCHO — Accueil"
        >
          <Image
            src="/logo-88eme-echo.png"
            alt="LE 88ÈME ÉCHO"
            width={56}
            height={56}
            className="h-10 w-10 object-contain md:h-11 md:w-11"
            priority
          />
          <span className="hidden font-display text-sm tracking-[0.18em] text-parchment sm:inline">
            LE 88ÈME ÉCHO
          </span>
        </Link>

        <nav
          className="hidden items-center gap-x-4 gap-y-1 lg:flex xl:gap-x-5"
          aria-label="Navigation principale"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? "text-gold" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <form
            onSubmit={onSearch}
            className="hidden items-center border border-anthracite-light bg-ink-soft/80 md:flex"
            role="search"
          >
            <label htmlFor="site-search" className="sr-only">
              Rechercher
            </label>
            <input
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher…"
              className="w-36 bg-transparent px-3 py-1.5 font-sans text-sm text-parchment outline-none placeholder:text-parchment/40 lg:w-44"
            />
            <button
              type="submit"
              className="border-l border-anthracite-light px-3 py-1.5 font-sans text-[11px] uppercase tracking-widest text-gold hover:bg-gold/10"
            >
              OK
            </button>
          </form>

          <button
            type="button"
            className="border border-anthracite-light px-3 py-2 font-sans text-[11px] uppercase tracking-widest text-parchment lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-anthracite-light bg-ink px-[4vw] py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Navigation mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link py-1"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form
            onSubmit={onSearch}
            className="mt-4 flex border border-anthracite-light"
            role="search"
          >
            <label htmlFor="mobile-search" className="sr-only">
              Rechercher
            </label>
            <input
              id="mobile-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher…"
              className="flex-1 bg-transparent px-3 py-2 font-sans text-sm text-parchment outline-none"
            />
            <button
              type="submit"
              className="border-l border-anthracite-light px-4 font-sans text-[11px] uppercase tracking-widest text-gold"
            >
              OK
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
