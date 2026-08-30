import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { reports, type Report } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Reports · Executable Project Defense" };

const columns: Column<Report>[] = [
  {
    key: "id",
    header: "Report",
    render: (r) => (
      <span>
        <span className="block font-mono text-[12.5px] text-text">{r.id}</span>
        <span className="block text-[11px] text-muted">{r.groupOrProjectLabel}</span>
      </span>
    ),
  },
  {
    key: "session",
    header: "Session",
    render: (r) => (
      <span className="font-mono text-[12px] text-muted">{r.sessionId}</span>
    ),
  },
  { key: "version", header: "Version", className: "font-mono text-muted", render: (r) => r.reportVersion },
  {
    key: "digest",
    header: "Facts digest",
    render: (r) => (
      <span className="font-mono text-[11.5px] text-muted">{r.factsDigest}</span>
    ),
  },
  { key: "created", header: "Generated", className: "text-muted", render: (r) => relativeTime(r.createdAt) },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Generated defense reports. Every report is versioned and carries a facts digest over the check runs and diffs it was assembled from."
      />
      <DataList
        columns={columns}
        rows={reports}
        getKey={(r) => r.id}
        rowHref={(r) => `/sessions/${r.sessionId}/report`}
      />
    </>
  );
}
