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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
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
            className="h-10 w-10 object-contain md:h-12 md:w-12"
            priority
          />
          <span className="hidden font-display text-sm tracking-[0.2em] text-parchment sm:inline">
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
            className="hidden items-center border border-white/15 bg-ink-soft/80 md:flex"
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
              className="w-36 bg-transparent px-3 py-1.5 text-sm text-parchment outline-none placeholder:text-parchment/40 lg:w-44"
            />
            <button
              type="submit"
              className="border-l border-white/15 px-3 py-1.5 text-[11px] uppercase tracking-widest text-gold hover:bg-gold/10"
            >
              OK
            </button>
          </form>

          <button
            type="button"
            className="border border-white/15 px-3 py-2 text-[11px] uppercase tracking-widest text-parchment lg:hidden"
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
          className="border-t border-white/10 bg-ink px-4 py-4 lg:hidden"
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
            className="mt-4 flex border border-white/15"
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
              className="flex-1 bg-transparent px-3 py-2 text-sm text-parchment outline-none"
            />
            <button
              type="submit"
              className="border-l border-white/15 px-4 text-[11px] uppercase tracking-widest text-gold"
            >
              OK
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
