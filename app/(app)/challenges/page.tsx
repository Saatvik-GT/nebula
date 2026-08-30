import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { DataList, type Column } from "@/components/app/DataList";
import { Pill } from "@/components/ui/badges";
import { challenges, type Challenge, type ChallengeStatus } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Challenges · Executable Project Defense" };

const statusTone: Record<ChallengeStatus, Parameters<typeof Pill>[0]["tone"]> = {
  draft: "neutral",
  validating: "warning",
  validated: "active",
  approved: "success",
  rejected: "danger",
  invalidated: "danger",
};

const columns: Column<Challenge>[] = [
  {
    key: "id",
    header: "Challenge",
    render: (c) => (
      <span>
        <span className="block font-mono text-[12.5px] text-text">
          {c.family} – challenge_{c.id}
        </span>
        <span className="block text-[11px] text-muted">{c.projectName}</span>
      </span>
    ),
  },
  {
    key: "rank",
    header: "Surface rank",
    className: "tnum text-muted",
    render: (c) => `#${c.surfaceRank}`,
  },
  {
    key: "status",
    header: "Status",
    render: (c) => <Pill tone={statusTone[c.status]}>{c.status}</Pill>,
  },
  {
    key: "created",
    header: "Created",
    className: "text-muted",
    render: (c) => relativeTime(c.createdAt),
  },
];

export default function ChallengesPage() {
  return (
    <>
      <PageHeader
        title="Challenges"
        description="Compiled conditions from the duplicate_delivery_v1 family. A challenge must pass every validation gate before it can be approved for a session."
      />
      <DataList
        columns={columns}
        rows={challenges}
        getKey={(c) => c.id}
        rowHref={(c) => `/challenges/${c.id}`}
      />
    </>
  );
}
