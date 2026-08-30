import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { snapshots, type Snapshot } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Atlas · Executable Project Defense" };

const columns: Column<Snapshot>[] = [
  {
    key: "project",
    header: "Snapshot",
    render: (s) => (
      <span>
        <span className="block font-medium text-text">{s.projectName}</span>
        <span className="block font-mono text-[11px] text-muted">{s.id}</span>
      </span>
    ),
  },
  {
    key: "modules",
    header: "Modules",
    className: "tnum text-muted",
    render: (s) => s.moduleCount,
  },
  {
    key: "digest",
    header: "Digest",
    render: (s) => (
      <span className="font-mono text-[11.5px] text-muted">{s.digest}</span>
    ),
  },
  {
    key: "created",
    header: "Created",
    className: "text-muted",
    render: (s) => relativeTime(s.createdAt),
  },
];

export default function AtlasIndexPage() {
  return (
    <>
      <PageHeader
        title="Atlas"
        description="Immutable project snapshots and their indexed module graphs. Open a snapshot to inspect modules, dependencies, and the proposed defense surface."
      />
      <DataList
        columns={columns}
        rows={snapshots}
        getKey={(s) => s.id}
        rowHref={(s) => `/snapshots/${s.id}/atlas`}
      />
    </>
  );
}
