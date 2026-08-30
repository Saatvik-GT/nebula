import type { Metadata } from "next";
import { SessionWorkspace } from "@/components/app/SessionWorkspace";
import { getSession, sessionFiles } from "@/lib/api/mock/resources";

export const metadata: Metadata = {
  title: "Workspace · Executable Project Defense",
};

function deadlineLabel(iso: string): string {
  const mins = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
  if (mins <= 0) return "lapsed";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `in ${h}h ${String(m).padStart(2, "0")}m` : `in ${m}m`;
}

export default async function SessionWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = getSession(id);

  return (
    <SessionWorkspace
      sessionId={session.id}
      groupLabel={session.groupOrProjectLabel}
      state={session.state}
      files={sessionFiles}
      deadlineLabel={deadlineLabel(session.deadlineAt)}
    />
  );
}
