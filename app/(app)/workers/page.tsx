import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { StatusDot, Pill, healthLabel, healthTone } from "@/components/ui/badges";
import { jobs, workerPool, type Job } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Workers · Executable Project Defense" };

const jobStateTone: Record<Job["state"], Parameters<typeof Pill>[0]["tone"]> = {
  queued: "neutral",
  running: "active",
  succeeded: "success",
  failed: "danger",
};

const columns: Column<Job>[] = [
  {
    key: "id",
    header: "Job",
    render: (j) => (
      <span>
        <span className="block font-mono text-[12.5px] text-text">{j.id}</span>
        <span className="block font-mono text-[11px] text-muted">{j.kind}</span>
      </span>
    ),
  },
  { key: "worker", header: "Worker", className: "font-mono text-muted", render: (j) => j.worker },
  {
    key: "state",
    header: "State",
    render: (j) => <Pill tone={jobStateTone[j.state]}>{j.state}</Pill>,
  },
  { key: "updated", header: "Updated", className: "text-muted", render: (j) => relativeTime(j.updatedAt) },
];

export default function WorkersPage() {
  return (
    <>
      <PageHeader
        title="Workers"
        description="Worker and infrastructure health telemetry, plus the live job queue for snapshots, validations, check runs, and reports."
      />

      <div className="border-b border-white/12 bg-[#0b0b0b] px-4 py-5 sm:px-8">
        <h2 className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/40">
          Component health
        </h2>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {workerPool.components.map((c) => (
            <div key={c.id} className="flex items-center gap-2.5">
              <StatusDot tone={healthTone[c.status]} />
              <div className="leading-tight">
                <p className="text-[13px] font-medium text-text">{c.label}</p>
                <p className="text-[11.5px] text-muted">
                  {healthLabel[c.status]} · {c.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DataList columns={columns} rows={jobs} getKey={(j) => j.id} />
    </>
  );
}
