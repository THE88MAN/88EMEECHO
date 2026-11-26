import { NextRequest, NextResponse } from "next/server";
import { recordShare, type ShareChannel } from "@/lib/distribution";
import { enforceRateLimit, readJsonLimited } from "@/lib/security/api-guard";

const CHANNELS: ShareChannel[] = [
  "copy",
  "email",
  "x",
  "linkedin",
  "whatsapp",
  "facebook",
];

export async function POST(request: NextRequest) {
  const limited = enforceRateLimit(request, { key: "share", limit: 40 });
  if (limited) return limited;

  const parsed = await readJsonLimited<{
    channel?: ShareChannel;
    path?: string;
    title?: string;
  }>(request);
  if (!parsed.ok) return parsed.response;
  const body = parsed.body;

  if (!body.channel || !CHANNELS.includes(body.channel)) {
    return NextResponse.json({ ok: false, message: "channel invalide" }, { status: 400 });
  }
  if (!body.path || !body.title) {
    return NextResponse.json(
      { ok: false, message: "path et title requis" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    recordShare({
      channel: body.channel,
      path: body.path,
      title: body.title,
    }),
  );
}
