import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { SessionStateBadge } from "@/components/ui/badges";
import { sessions, type Session } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Sessions · Executable Project Defense" };

const columns: Column<Session>[] = [
  {
    key: "label",
    header: "Session",
    render: (s) => (
      <span>
        <span className="block font-medium text-text">{s.displayLabel}</span>
        <span className="block text-[11px] text-muted">
          {s.groupOrProjectLabel}
        </span>
      </span>
    ),
  },
  {
    key: "challenge",
    header: "Challenge",
    render: (s) => (
      <span className="font-mono text-[12px] text-muted">
        challenge_{s.challengeId}
      </span>
    ),
  },
  {
    key: "state",
    header: "State",
    render: (s) => <SessionStateBadge state={s.state} />,
  },
  {
    key: "created",
    header: "Started",
    className: "text-muted",
    render: (s) => relativeTime(s.createdAt),
  },
];

export default function SessionsPage() {
  return (
    <>
      <PageHeader
        title="Sessions"
        description="Defense sessions and their current state in the session state machine. Open a session to see its brief, workspace, or report."
      />
      <DataList
        columns={columns}
        rows={sessions}
        getKey={(s) => s.id}
        rowHref={(s) =>
          s.state === "REPORTED" || s.state === "SUBMITTED"
            ? `/sessions/${s.id}/report`
            : `/sessions/${s.id}/brief`
        }
      />
    </>
  );
}
