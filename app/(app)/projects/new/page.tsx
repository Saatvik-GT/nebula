import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { ImportProjectForm } from "@/components/app/ImportProjectForm";

export const metadata: Metadata = {
  title: "Import Project · Executable Project Defense",
};

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-[720px]">
      <PageHeader
        title="Import a project"
        description="Bring a submitted project into an isolated workspace. It is snapshotted immediately; the original source is never modified."
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: "Import" },
        ]}
      />
      <ImportProjectForm />
    </div>
  );
}
