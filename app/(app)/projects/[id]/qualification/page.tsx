import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { QualificationRunner } from "@/components/app/QualificationRunner";
import { getProject, qualificationSteps } from "@/lib/api/mock/resources";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Qualification · Executable Project Defense",
};

export default async function QualificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  const snapshotId = project.snapshotId ?? `snap_${project.id.replace(/-/g, "_")}`;

  return (
    <div className="mx-auto max-w-[780px]">
      <PageHeader
        title={`Qualification — ${project.displayName}`}
        description="Every project runs the same qualification pipeline before it can host a defense. Each step is executable and writes a receipt."
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.displayName },
          { label: "Qualification" },
        ]}
      />

      <QualificationRunner
        steps={qualificationSteps}
        status={project.qualificationStatus}
        reason={project.qualificationReason}
        snapshotId={snapshotId}
        digest={`sha256:${project.id.slice(0, 6).padEnd(6, "0")}…${project.id.slice(-4).padStart(4, "0")}`}
        createdLabel={relativeTime(project.createdAt)}
      />
    </div>
  );
}
