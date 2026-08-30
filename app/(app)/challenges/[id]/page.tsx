import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, MinusCircle, XCircle } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/badges";
import { ChallengeDecision } from "@/components/app/ChallengeDecision";
import { getChallenge } from "@/lib/api/mock/resources";
import type { GateStatus } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Challenge · Executable Project Defense",
};

const gateIcon: Record<GateStatus, { Icon: typeof CheckCircle2; cls: string }> = {
  passed: { Icon: CheckCircle2, cls: "text-success" },
  in_progress: { Icon: Clock, cls: "text-warning" },
  failed: { Icon: XCircle, cls: "text-danger" },
  not_run: { Icon: MinusCircle, cls: "text-muted" },
};

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const challenge = getChallenge(id);

  const gatesPassed = challenge.gates.filter((g) => g.status === "passed").length;

  return (
    <>
      <PageHeader
        title={`challenge_${challenge.id}`}
        description={`${challenge.family} · surface rank #${challenge.surfaceRank} · created ${relativeTime(challenge.createdAt)}`}
        breadcrumbs={[
          { label: "Challenges", href: "/challenges" },
          { label: `challenge_${challenge.id}` },
        ]}
        actions={<Pill tone="active">{challenge.status}</Pill>}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Panel className="p-5">
            <h2 className="text-[13px] font-semibold text-text">Summary</h2>
            <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-[12.5px] sm:grid-cols-3">
              <Meta label="Family" value={challenge.family} mono />
              <Meta label="Project" value={challenge.projectName} />
              <Meta label="Snapshot" value={challenge.snapshotId} mono />
              <Meta label="Validation run" value={challenge.validationRunId} mono />
              <Meta label="Surface rank" value={`#${challenge.surfaceRank}`} />
              <Meta label="Status" value={challenge.status} />
            </dl>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[13px] font-semibold text-text">Student prompt</h2>
            <p className="mt-3 rounded-[8px] border border-border bg-surface-raised p-4 text-[13px] leading-[1.65] text-text">
              {challenge.studentPrompt}
            </p>
          </Panel>

          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="text-[13px] font-semibold text-text">
                Validation gates
              </h2>
              <span className="tnum text-[12px] text-muted">
                {gatesPassed} / {challenge.gates.length} passed
              </span>
            </div>
            <ul className="divide-y divide-border">
              {challenge.gates.map((g) => {
                const { Icon, cls } = gateIcon[g.status];
                return (
                  <li
                    key={g.gate}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", cls)} strokeWidth={2} />
                    <span className="flex-1">
                      <span className="block text-[13px] text-text">{g.label}</span>
                      <span className="block font-mono text-[11px] text-muted">
                        {g.gate}
                        {g.reasonCode && (
                          <span className="text-danger"> · {g.reasonCode}</span>
                        )}
                      </span>
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.04em] text-muted">
                      {g.status.replace("_", " ")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>

        <div className="space-y-4">
          <ChallengeDecision
            gatesPassed={gatesPassed}
            gatesTotal={challenge.gates.length}
            initialStatus={challenge.status}
          />
          <Panel className="p-5">
            <h2 className="text-[13px] font-semibold text-text">Linked</h2>
            <div className="mt-3 space-y-2 text-[12.5px]">
              <Link
                href={`/snapshots/${challenge.snapshotId}/atlas`}
                className="block text-accent-bright hover:text-text"
              >
                Snapshot Atlas →
              </Link>
              <Link
                href={`/validation`}
                className="block text-accent-bright hover:text-text"
              >
                Validation run {challenge.validationRunId} →
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Meta({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className={cn("mt-0.5 text-text", mono && "font-mono text-[12px]")}>
        {value}
      </dd>
    </div>
  );
}
