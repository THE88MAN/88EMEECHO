"use client";

import { useState, useTransition } from "react";
import type { ShareChannel } from "@/lib/distribution";
import { absoluteUrl } from "@/lib/distribution/site";

const CHANNELS: {
  id: ShareChannel;
  label: string;
  href?: (url: string, title: string) => string;
}[] = [
  {
    id: "x",
    label: "X",
    href: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    id: "email",
    label: "E-mail",
    href: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

async function postShare(payload: {
  channel: ShareChannel;
  path: string;
  title: string;
}) {
  const res = await fetch("/api/distribution/share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<{ ok: boolean; message: string }>;
}

export function ShareButtons({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const url = absoluteUrl(path);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function track(channel: ShareChannel) {
    start(async () => {
      const r = await postShare({ channel, path, title });
      setMsg(r.message);
    });
  }

  return (
    <div className="border border-anthracite-light bg-ink-soft p-5">
      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-parchment/55">
        Partager
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {CHANNELS.map((c) => (
          <a
            key={c.id}
            href={c.href?.(url, title)}
            target={c.id === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            onClick={() => track(c.id)}
            className="border border-anthracite-light px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-parchment/70 hover:border-gold hover:text-gold"
          >
            {c.label}
          </a>
        ))}
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              try {
                await navigator.clipboard.writeText(url);
                await postShare({ channel: "copy", path, title });
                setMsg("Lien copié (stub).");
              } catch {
                setMsg("Copie impossible dans ce navigateur.");
              }
            })
          }
          className="border border-gold/50 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-gold disabled:opacity-50"
        >
          Copier le lien
        </button>
      </div>
      {msg && (
        <p className="mt-2 font-serif text-xs text-parchment/50">{msg}</p>
      )}
    </div>
  );
}
