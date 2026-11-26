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
import {
  enforceRateLimit,
  readJsonLimited,
  requireApiViewer,
} from "@/lib/security/api-guard";

type Action =
  | "start_run"
  | "suspend_run"
  | "resume_run"
  | "advance_item"
  | "validate_item"
  | "publish_item"
  | "correction_item";

export async function POST(request: NextRequest) {
  const auth = await requireApiViewer(request);
  if (auth instanceof Response) return auth;

  const limited = enforceRateLimit(request, { key: "veille", limit: 60 });
  if (limited) return limited;

  const parsed = await readJsonLimited<{
    action?: Action;
    runId?: string;
    itemId?: string;
    label?: string;
  }>(request);
  if (!parsed.ok) return parsed.response;

  const { action, runId, itemId, label } = parsed.body;
  let result;

  switch (action) {
    case "start_run":
      result = startVeilleRun(label);
      break;
    case "suspend_run":
      if (!runId)
        return NextResponse.json({ ok: false, message: "runId requis" }, { status: 400 });
      result = suspendVeilleRun(runId);
      break;
    case "resume_run":
      if (!runId)
        return NextResponse.json({ ok: false, message: "runId requis" }, { status: 400 });
      result = resumeVeilleRun(runId);
      break;
    case "advance_item":
      if (!itemId)
        return NextResponse.json({ ok: false, message: "itemId requis" }, { status: 400 });
      result = advanceItemStage(itemId);
      break;
    case "validate_item":
      if (!itemId)
        return NextResponse.json({ ok: false, message: "itemId requis" }, { status: 400 });
      result = humanValidateItem(itemId);
      break;
    case "publish_item":
      if (!itemId)
        return NextResponse.json({ ok: false, message: "itemId requis" }, { status: 400 });
      result = humanPublishItem(itemId);
      break;
    case "correction_item":
      if (!itemId)
        return NextResponse.json({ ok: false, message: "itemId requis" }, { status: 400 });
      result = markCorrectionNeeded(itemId);
      break;
    default:
      return NextResponse.json({ ok: false, message: "Action inconnue" }, { status: 400 });
  }

  return NextResponse.json(result);
}
