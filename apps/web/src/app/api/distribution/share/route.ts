import { NextRequest, NextResponse } from "next/server";
import { recordShare, type ShareChannel } from "@/lib/distribution";

const CHANNELS: ShareChannel[] = [
  "copy",
  "email",
  "x",
  "linkedin",
  "whatsapp",
  "facebook",
];

export async function POST(request: NextRequest) {
  let body: { channel?: ShareChannel; path?: string; title?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide" }, { status: 400 });
  }

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
