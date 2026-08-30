import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { SnapshotAtlas } from "@/components/app/SnapshotAtlas";
import { atlasModules, getSnapshot } from "@/lib/api/mock/resources";

export const metadata: Metadata = {
  title: "Snapshot Atlas · Executable Project Defense",
};

export default async function SnapshotAtlasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const modules = atlasModules[id] ?? atlasModules["snap_demo"];
  const snapshot =
    getSnapshot(id) ??
    ({
      id,
      projectId: id,
      projectName: id.replace(/^snap_/, "").replace(/_/g, "-"),
      createdAt: new Date().toISOString(),
      moduleCount: modules.length,
      digest: "sha256:pending",
    } as const);

  return (
    <>
      <PageHeader
        title={`Atlas — ${snapshot.projectName}`}
        description="Module list, dependency graph, and per-module detail for the immutable snapshot. Modules inside the proposed defense surface are highlighted."
        breadcrumbs={[
          { label: "Atlas", href: "/atlas" },
          { label: snapshot.id },
        ]}
      />
      <SnapshotAtlas snapshot={snapshot} modules={modules} />
    </>
  );
}
