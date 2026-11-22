import { DEMO_BANNER } from "@/lib/demo/content";

export function DemoBanner() {
  return (
    <div
      role="status"
      className="border-b border-gold/25 bg-crimson/90 px-4 py-2 text-center text-[11px] tracking-wide text-parchment"
    >
      {DEMO_BANNER}
    </div>
  );
}
