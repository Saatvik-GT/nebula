"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { DashboardDto } from "@/lib/contracts/dashboard";
import { api } from "@/lib/api/client";
import { StatTile } from "@/components/dashboard/StatTile";
import { ValidationOverviewChart } from "@/components/dashboard/ValidationOverviewChart";
import {
  InfraHealthStrip,
  QuickActionsPanel,
  RecentSessionsPanel,
  RecentValidationsPanel,
  SystemActivityPanel,
  SystemRemindersPanel,
} from "@/components/dashboard/panels";

export function DashboardView({ initial }: { initial: DashboardDto }) {
  const [data, setData] = useState(initial);
  const [pending, startTransition] = useTransition();

  function changeWindow(window: "day" | "week") {
    if (window === data.validationOverview.window) return;
    startTransition(async () => {
      const next = await api.getDashboard(window);
      setData(next);
    });
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-text">
            Dashboard
          </h1>
          <p className="mt-1 text-[13.5px] text-muted">
            Overview of your projects, challenges, and defense sessions.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/projects/new"
            className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-accent-bright/55 bg-accent px-3.5 text-[13px] font-medium text-text transition-colors hover:bg-accent-bright/85"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Project
          </Link>
          <Link
            href="/projects/new"
            className="inline-flex h-9 items-center rounded-[8px] border border-border px-3.5 text-[13px] font-medium text-text transition-colors hover:bg-surface-raised"
          >
            Import Project
          </Link>
        </div>
      </header>

      {/* Stat tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((tile, i) => (
          <StatTile key={tile.id} tile={tile} highlighted={i === 0} />
        ))}
      </div>

      {/* Chart · Reminders · Quick actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ValidationOverviewChart
            data={data.validationOverview}
            onWindowChange={changeWindow}
            loading={pending}
          />
        </div>
        {data.systemReminder && (
          <div className="lg:col-span-3">
            <SystemRemindersPanel
              reminder={data.systemReminder}
              viewAllHref="/audit"
            />
          </div>
        )}
        <div className={data.systemReminder ? "lg:col-span-3" : "lg:col-span-6"}>
          <QuickActionsPanel actions={data.quickActions} />
        </div>
      </div>

      {/* Recent validations · Recent sessions · System activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <RecentValidationsPanel
            rows={data.recentValidations}
            viewAllHref="/validation"
            loading={pending}
          />
        </div>
        <div className="lg:col-span-4">
          <RecentSessionsPanel
            rows={data.recentSessions}
            viewAllHref="/sessions"
            loading={pending}
          />
        </div>
        <div className="lg:col-span-3">
          <SystemActivityPanel rows={data.systemActivity} viewAllHref="/audit" />
        </div>
      </div>

      {/* Infrastructure health */}
      <InfraHealthStrip health={data.infraHealth} loading={pending} />
    </div>
  );
}
