import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { Pill } from "@/components/ui/badges";
import { projects, type Project, type QualificationStatus } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Projects · Executable Project Defense" };

const qualTone: Record<QualificationStatus, Parameters<typeof Pill>[0]["tone"]> = {
  pending: "neutral",
  running: "active",
  passed: "success",
  failed: "danger",
};
const qualLabel: Record<QualificationStatus, string> = {
  pending: "Pending",
  running: "Running",
  passed: "Passed",
  failed: "Failed",
};

const columns: Column<Project>[] = [
  {
    key: "name",
    header: "Project",
    render: (p) => (
      <span className="font-medium text-text">{p.displayName}</span>
    ),
  },
  {
    key: "source",
    header: "Source",
    render: (p) => (
      <span className="font-mono text-[12px] text-muted uppercase">{p.sourceKind}</span>
    ),
  },
  {
    key: "qualification",
    header: "Qualification",
    render: (p) => (
      <span className="flex items-center gap-2">
        <Pill tone={qualTone[p.qualificationStatus]}>
          {qualLabel[p.qualificationStatus]}
        </Pill>
        {p.qualificationReason && (
          <span className="font-mono text-[11px] text-danger">
            {p.qualificationReason}
          </span>
        )}
      </span>
    ),
  },
  {
    key: "created",
    header: "Created",
    className: "text-muted",
    render: (p) => relativeTime(p.createdAt),
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Submitted projects and their qualification status. A project must qualify before a defense surface can be approved."
        actions={
          <Link
            href="/projects/new"
            className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-accent-bright/55 bg-accent px-3.5 text-[13px] font-medium text-text transition-colors hover:bg-accent-bright/85"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Project
          </Link>
        }
      />
      <DataList
        columns={columns}
        rows={projects}
        getKey={(p) => p.id}
        rowHref={(p) => `/projects/${p.id}/qualification`}
      />
    </>
  );
}
