import { NextRequest, NextResponse } from "next/server";
import {
  advanceAgentTask,
  enqueueDemoTask,
  humanApproveTask,
  humanRejectTask,
  resumeAgentRun,
  startAgentRun,
  suspendAgentRun,
  type EchoAgentKind,
} from "@/lib/agents";
import {
  enforceRateLimit,
  readJsonLimited,
  requireApiViewer,
} from "@/lib/security/api-guard";

type Action =
  | "start_run"
  | "suspend_run"
  | "resume_run"
  | "enqueue_task"
  | "advance_task"
  | "approve_task"
  | "reject_task";

export async function POST(request: NextRequest) {
  const auth = await requireApiViewer(request);
  if (auth instanceof Response) return auth;

  const limited = enforceRateLimit(request, { key: "agents", limit: 60 });
  if (limited) return limited;

  const parsed = await readJsonLimited<{
    action?: Action;
    agentKind?: EchoAgentKind;
    runId?: string;
    taskId?: string;
    label?: string;
  }>(request);
  if (!parsed.ok) return parsed.response;

  const { action, agentKind, runId, taskId, label } = parsed.body;
  let result;

  switch (action) {
    case "start_run":
      if (!agentKind)
        return NextResponse.json({ ok: false, message: "agentKind requis" }, { status: 400 });
      result = startAgentRun(agentKind, label);
      break;
    case "suspend_run":
      if (!runId)
        return NextResponse.json({ ok: false, message: "runId requis" }, { status: 400 });
      result = suspendAgentRun(runId);
      break;
    case "resume_run":
      if (!runId)
        return NextResponse.json({ ok: false, message: "runId requis" }, { status: 400 });
      result = resumeAgentRun(runId);
      break;
    case "enqueue_task":
      if (!agentKind)
        return NextResponse.json({ ok: false, message: "agentKind requis" }, { status: 400 });
      result = enqueueDemoTask(agentKind);
      break;
    case "advance_task":
      if (!taskId)
        return NextResponse.json({ ok: false, message: "taskId requis" }, { status: 400 });
      result = advanceAgentTask(taskId);
      break;
    case "approve_task":
      if (!taskId)
        return NextResponse.json({ ok: false, message: "taskId requis" }, { status: 400 });
      result = humanApproveTask(taskId);
      break;
    case "reject_task":
      if (!taskId)
        return NextResponse.json({ ok: false, message: "taskId requis" }, { status: 400 });
      result = humanRejectTask(taskId);
      break;
    default:
      return NextResponse.json({ ok: false, message: "Action inconnue" }, { status: 400 });
  }

  return NextResponse.json(result);
}
