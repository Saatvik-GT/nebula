import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { evidenceEvents, type EvidenceEvent } from "@/lib/api/mock/resources";

export const metadata: Metadata = {
  title: "Audit Logs · Executable Project Defense",
};

const columns: Column<EvidenceEvent>[] = [
  {
    key: "when",
    header: "Timestamp",
    className: "font-mono text-[11.5px] text-muted whitespace-nowrap",
    render: (e) => new Date(e.occurredAt).toISOString().replace("T", " ").slice(0, 19),
  },
  {
    key: "type",
    header: "Event",
    render: (e) => <span className="font-mono text-[12.5px] text-text">{e.eventType}</span>,
  },
  { key: "actor", header: "Actor", className: "font-mono text-muted", render: (e) => e.actor },
  { key: "target", header: "Target", render: (e) => e.target },
];

export default function AuditLogsPage() {
  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Chronological view of the evidence trail for compliance review. Same source as Evidence and System Activity — never a separate feed."
      />
      <DataList columns={columns} rows={evidenceEvents} getKey={(e) => e.id} />
    </>
  );
}
