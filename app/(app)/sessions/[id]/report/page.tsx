import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { SessionStateBadge } from "@/components/ui/badges";
import { ReportView } from "@/components/app/ReportView";
import {
  checkRuns,
  diffHunks,
  getChallenge,
  getReportForSession,
  getSession,
  getSnapshot,
  reportFindings,
} from "@/lib/api/mock/resources";

export const metadata: Metadata = {
  title: "Report · Executable Project Defense",
};

export default async function SessionReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = getSession(id);

  const report =
    getReportForSession(session.id) ?? {
      id: `report_${session.id}`,
      sessionId: session.id,
      groupOrProjectLabel: session.groupOrProjectLabel,
      reportVersion: "v1",
      factsDigest: "sha256:pending",
      createdAt: session.createdAt,
    };

  const challenge = getChallenge(session.challengeId);
  const snapshot = challenge ? getSnapshot(challenge.snapshotId) : undefined;

  return (
    <>
      <PageHeader
        title={`${session.displayLabel} — report`}
        description={`${session.groupOrProjectLabel} · challenge_${session.challengeId} · report ${report.reportVersion}`}
        breadcrumbs={[
          { label: "Sessions", href: "/sessions" },
          { label: session.id },
          { label: "Report" },
        ]}
        actions={<SessionStateBadge state={session.state} />}
      />
      <ReportView
        session={session}
        report={report}
        checkRuns={checkRuns}
        findings={reportFindings}
        diffHunks={diffHunks}
        snapshotDigest={snapshot?.digest ?? "sha256:—"}
      />
    </>
  );
}
