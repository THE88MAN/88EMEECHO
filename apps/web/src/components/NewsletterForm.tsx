"use client";

import { useState, useTransition } from "react";

export function NewsletterForm({
  source = "newsletter-page",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      className={compact ? "mt-3 space-y-2" : "mt-6 max-w-md space-y-3"}
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, source }),
          });
          const data = (await res.json()) as { ok: boolean; message: string };
          setOk(data.ok);
          setMsg(data.message);
          if (data.ok) setEmail("");
        });
      }}
    >
      <label className="block">
        <span className="sr-only">E-mail</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@adresse.email"
          className="w-full border border-anthracite-light bg-ink px-3 py-2 font-serif text-sm text-parchment placeholder:text-parchment/35 focus:border-gold focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="bg-gold px-4 py-2 font-sans text-[11px] uppercase tracking-[0.16em] text-ink disabled:opacity-50"
      >
        {pending ? "Envoi…" : "S’inscrire"}
      </button>
      {msg && (
        <p
          className={`font-serif text-xs ${ok ? "text-parchment/60" : "text-crimson"}`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
