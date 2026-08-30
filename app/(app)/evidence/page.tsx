import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { evidenceEvents, type EvidenceEvent } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Evidence · Executable Project Defense" };

const columns: Column<EvidenceEvent>[] = [
  {
    key: "type",
    header: "Event",
    render: (e) => (
      <span className="font-mono text-[12.5px] text-text">{e.eventType}</span>
    ),
  },
  { key: "target", header: "Target", render: (e) => <span className="text-text">{e.target}</span> },
  { key: "actor", header: "Actor", className: "font-mono text-muted", render: (e) => e.actor },
  { key: "when", header: "Occurred", className: "text-muted", render: (e) => relativeTime(e.occurredAt) },
];

export default function EvidencePage() {
  return (
    <>
      <PageHeader
        title="Evidence"
        description="The append-only evidence trail. Dashboard activity, report facts, and audit logs are all views onto this one stream of recorded events."
      />
      <DataList columns={columns} rows={evidenceEvents} getKey={(e) => e.id} />
    </>
  );
}
