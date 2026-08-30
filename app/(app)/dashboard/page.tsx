import type { Metadata } from "next";
import { api } from "@/lib/api/client";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata: Metadata = { title: "Dashboard · Executable Project Defense" };

export default async function DashboardPage() {
  const initial = await api.getDashboard("week");
  return <DashboardView initial={initial} />;
}
