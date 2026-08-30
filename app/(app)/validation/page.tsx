import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { OutcomePill } from "@/components/ui/badges";
import { validationRuns, type ValidationRun } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Validation · Executable Project Defense" };

const columns: Column<ValidationRun>[] = [
  {
    key: "id",
    header: "Run",
    render: (r) => (
      <span>
        <span className="block font-mono text-[12.5px] text-text">{r.id}</span>
        <span className="block font-mono text-[11px] text-muted">
          {r.family} – challenge_{r.challengeId}
        </span>
      </span>
    ),
  },
  {
    key: "gates",
    header: "Gates",
    className: "tnum text-muted",
    render: (r) => `${r.gatesPassed} / ${r.gatesTotal}`,
  },
  {
    key: "status",
    header: "Status",
    render: (r) => (
      <span className="flex items-center gap-2">
        <OutcomePill outcome={r.status} />
        {r.reasonCode && (
          <span className="font-mono text-[11px] text-danger">{r.reasonCode}</span>
        )}
      </span>
    ),
  },
  {
    key: "started",
    header: "Started",
    className: "text-muted",
    render: (r) => relativeTime(r.startedAt),
  },
];

export default function ValidationPage() {
  return (
    <>
      <PageHeader
        title="Validation"
        description="Backend validation runs across every challenge. A run must clear all gates before its challenge can be approved."
        actions={
          <button className="inline-flex h-9 items-center rounded-[8px] border border-border px-3.5 text-[13px] font-medium text-text transition-colors hover:bg-surface-raised">
            Run all pending
          </button>
        }
      />
      <DataList
        columns={columns}
        rows={validationRuns}
        getKey={(r) => r.id}
        rowHref={(r) => `/challenges/${r.challengeId}`}
      />
      <p className="mt-4 text-[12px] text-muted">
        Full component health is on the{" "}
        <Link href="/workers" className="text-accent-bright hover:text-text">
          Workers
        </Link>{" "}
        page.
      </p>
    </>
  );
}
