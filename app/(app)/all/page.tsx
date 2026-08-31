import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = { title: "All Pages · Executable Project Defense" };

const GROUPS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Marketing",
    links: [{ label: "Landing", href: "/" }],
  },
  {
    heading: "Evaluator",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/projects" },
      { label: "Atlas", href: "/atlas" },
      { label: "Challenges", href: "/challenges" },
      { label: "Sessions", href: "/sessions" },
      { label: "Reports", href: "/reports" },
      { label: "Evidence", href: "/evidence" },
    ],
  },
  {
    heading: "System",
    links: [
      { label: "Validation", href: "/validation" },
      { label: "Workers", href: "/workers" },
      { label: "Settings", href: "/settings" },
      { label: "Audit Logs", href: "/audit" },
    ],
  },
  {
    heading: "Project flow",
    links: [
      { label: "Import a project", href: "/projects/new" },
      { label: "Qualification — running", href: "/projects/demo-commerce/qualification" },
      { label: "Qualification — passed", href: "/projects/arc-billing-svc/qualification" },
      { label: "Qualification — failed", href: "/projects/invalid_repo/qualification" },
      { label: "Qualification — pending", href: "/projects/arc-web-portal/qualification" },
      { label: "Snapshot Atlas", href: "/snapshots/snap_demo/atlas" },
    ],
  },
  {
    heading: "Challenge review",
    links: [
      { label: "Challenge — validated", href: "/challenges/8f3a2" },
      { label: "Challenge — validating", href: "/challenges/a7b91" },
      { label: "Challenge — approved", href: "/challenges/c1d72" },
      { label: "Challenge — rejected", href: "/challenges/invalid_repo" },
    ],
  },
  {
    heading: "Defense session",
    links: [
      { label: "Session brief", href: "/sessions/DEF-2024-018/brief" },
      { label: "Session workspace (IDE)", href: "/sessions/DEF-2024-018" },
      { label: "Session report", href: "/sessions/DEF-2024-014/report" },
      { label: "Report — pending session", href: "/sessions/DEF-2024-018/report" },
    ],
  },
];

export default function AllPagesIndex() {
  return (
    <>
      <PageHeader
        title="All Pages"
        description="Every surface in this build, including sample IDs for the dynamic routes. Nothing here is gated."
      />
      <div className="grid gap-4 px-4 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <Panel key={g.heading} className="overflow-hidden">
            <p className="border-b border-border px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              {g.heading}
            </p>
            <ul className="divide-y divide-border">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-[13px] text-text transition-colors hover:bg-surface-raised"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </>
  );
}
