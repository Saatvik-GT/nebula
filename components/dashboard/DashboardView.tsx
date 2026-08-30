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
  RecentSessionsPanel,
  RecentValidationsPanel,
  SystemActivityPanel,
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
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-text">
            Dashboard
          </h1>
          <p className="mt-1 text-[13.5px] text-muted">
            Overview of your projects, challenges, and defense sessions.
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <Link
            href="/projects/new"
            className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-accent bg-accent px-3.5 text-[13px] font-medium text-accent-contrast transition-colors hover:border-accent-bright hover:bg-accent-bright"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Import Project
          </Link>
        </div>
      </header>

      <section aria-label="Workspace summary" className="grid grid-cols-2 overflow-hidden rounded-[12px] border border-border bg-surface md:grid-cols-4">
        {data.stats.map((tile, i) => (
          <StatTile
            key={tile.id}
            tile={tile}
            className={`${i % 2 ? "border-l border-border" : "md:border-l md:border-border"} ${i > 1 ? "border-t border-border md:border-t-0" : ""}`}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ValidationOverviewChart
            data={data.validationOverview}
            onWindowChange={changeWindow}
            loading={pending}
          />
        </div>
        <div className="lg:col-span-5">
          <RecentSessionsPanel
            rows={data.recentSessions}
            viewAllHref="/sessions"
            loading={pending}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <RecentValidationsPanel
            rows={data.recentValidations}
            viewAllHref="/validation"
            loading={pending}
          />
        </div>
        <div className="lg:col-span-5">
          <SystemActivityPanel rows={data.systemActivity} viewAllHref="/audit" />
        </div>
      </div>

      <InfraHealthStrip health={data.infraHealth} loading={pending} />
    </div>
  );
}
