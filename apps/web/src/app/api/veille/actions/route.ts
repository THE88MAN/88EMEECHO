import { NextRequest, NextResponse } from "next/server";
import {
  advanceItemStage,
  humanPublishItem,
  humanValidateItem,
  markCorrectionNeeded,
  resumeVeilleRun,
  startVeilleRun,
  suspendVeilleRun,
} from "@/lib/veille";

type Action =
  | "start_run"
  | "suspend_run"
  | "resume_run"
  | "advance_item"
  | "validate_item"
  | "publish_item"
  | "correction_item";

export async function POST(request: NextRequest) {
  let body: { action?: Action; runId?: string; itemId?: string; label?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide" }, { status: 400 });
  }

  const { action, runId, itemId, label } = body;
  let result;

  switch (action) {
    case "start_run":
      result = startVeilleRun(label);
      break;
    case "suspend_run":
      if (!runId) return NextResponse.json({ ok: false, message: "runId requis" }, { status: 400 });
      result = suspendVeilleRun(runId);
      break;
    case "resume_run":
      if (!runId) return NextResponse.json({ ok: false, message: "runId requis" }, { status: 400 });
      result = resumeVeilleRun(runId);
      break;
    case "advance_item":
      if (!itemId) return NextResponse.json({ ok: false, message: "itemId requis" }, { status: 400 });
      result = advanceItemStage(itemId);
      break;
    case "validate_item":
      if (!itemId) return NextResponse.json({ ok: false, message: "itemId requis" }, { status: 400 });
      result = humanValidateItem(itemId);
      break;
    case "publish_item":
      if (!itemId) return NextResponse.json({ ok: false, message: "itemId requis" }, { status: 400 });
      result = humanPublishItem(itemId);
      break;
    case "correction_item":
      if (!itemId) return NextResponse.json({ ok: false, message: "itemId requis" }, { status: 400 });
      result = markCorrectionNeeded(itemId);
      break;
    default:
      return NextResponse.json({ ok: false, message: "Action inconnue" }, { status: 400 });
  }

  return NextResponse.json(result);
}
