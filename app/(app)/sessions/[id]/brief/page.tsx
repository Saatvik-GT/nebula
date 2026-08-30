import type { Metadata } from "next";
import { FileLock2, Timer, Eye, Activity } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SessionStateBadge } from "@/components/ui/badges";
import { BeginSession } from "@/components/app/BeginSession";
import { getChallenge, getSession } from "@/lib/api/mock/resources";

export const metadata: Metadata = {
  title: "Session brief · Executable Project Defense",
};

const POLICY = [
  {
    icon: FileLock2,
    title: "Immutable snapshot",
    body: "You are working against a frozen copy of the submitted project. Your edits never touch the original submission.",
  },
  {
    icon: Eye,
    title: "Visible checks",
    body: "A visible check suite runs on demand and after each verification. You see its results in full.",
  },
  {
    icon: Activity,
    title: "Progressive verification",
    body: "Verification may introduce an overlapping-delivery condition after the sequential case passes. You receive the outcome and can revise your work.",
  },
  {
    icon: Timer,
    title: "Deadline",
    body: "The session has a fixed deadline. If it lapses before submission the session is recorded as SUBMITTED_INCOMPLETE.",
  },
];

export default async function SessionBriefPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = getSession(id);
  const challenge = getChallenge(session.challengeId);

  return (
    <div className="mx-auto max-w-[760px]">
      <PageHeader
        title={`${session.displayLabel} — brief`}
        description={`${session.groupOrProjectLabel} · challenge_${session.challengeId}`}
        breadcrumbs={[
          { label: "Sessions", href: "/sessions" },
          { label: session.id },
          { label: "Brief" },
        ]}
        actions={<SessionStateBadge state={session.state} />}
      />

      {challenge && (
        <Panel className="mb-4 p-5">
          <h2 className="text-[13px] font-semibold text-text">The condition</h2>
          <p className="mt-3 rounded-[8px] border border-border bg-surface-raised p-4 text-[13px] leading-[1.65] text-text">
            {challenge.studentPrompt}
          </p>
        </Panel>
      )}

      <Panel className="p-5">
        <h2 className="text-[13px] font-semibold text-text">
          Policy disclosure
        </h2>
        <ul className="mt-4 space-y-4">
          {POLICY.map((p) => (
            <li key={p.title} className="flex gap-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border border-border bg-surface-raised">
                <p.icon className="h-4 w-4 text-accent-bright" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[13px] font-medium text-text">{p.title}</p>
                <p className="mt-0.5 max-w-[62ch] text-[12.5px] leading-[1.55] text-muted">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <BeginSession sessionId={session.id} />
    </div>
  );
}
