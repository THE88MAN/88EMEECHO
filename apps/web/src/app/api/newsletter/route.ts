import { NextRequest, NextResponse } from "next/server";
import {
  confirmSubscriber,
  subscribeNewsletter,
  unsubscribeByEmail,
} from "@/lib/distribution";

export async function POST(request: NextRequest) {
  let body: {
    action?: "subscribe" | "confirm" | "unsubscribe";
    email?: string;
    source?: string;
    id?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide" }, { status: 400 });
  }

  const action = body.action ?? "subscribe";

  if (action === "subscribe") {
    if (!body.email) {
      return NextResponse.json({ ok: false, message: "E-mail requis" }, { status: 400 });
    }
    return NextResponse.json(
      subscribeNewsletter(body.email, body.source ?? "api"),
    );
  }
  if (action === "confirm") {
    if (!body.id) {
      return NextResponse.json({ ok: false, message: "id requis" }, { status: 400 });
    }
    return NextResponse.json(confirmSubscriber(body.id));
  }
  if (action === "unsubscribe") {
    if (!body.email) {
      return NextResponse.json({ ok: false, message: "E-mail requis" }, { status: 400 });
    }
    return NextResponse.json(unsubscribeByEmail(body.email));
  }

  return NextResponse.json({ ok: false, message: "Action inconnue" }, { status: 400 });
}
