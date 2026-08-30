import type { Metadata } from "next";
import { PageHeader } from "@/components/app/PageHeader";
import { SettingsForm } from "@/components/app/SettingsForm";

export const metadata: Metadata = { title: "Settings · Executable Project Defense" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[760px]">
      <PageHeader
        title="Settings"
        description="Evaluator preferences and defaults for new defense sessions."
      />
      <SettingsForm />
    </div>
  );
}
