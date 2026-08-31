"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { DashboardDto, StatTileDto } from "@/lib/contracts/dashboard";
import { api } from "@/lib/api/client";
import { signed } from "@/lib/format";
import { ValidationOverviewChart } from "@/components/dashboard/ValidationOverviewChart";
import { DialClock } from "@/components/dashboard/DialClock";
import {
  InfraHealthStrip,
  RecentSessionsPanel,
  RecentValidationsPanel,
  SystemActivityPanel,
} from "@/components/dashboard/panels";

const KICKER = "font-mono text-[10.5px] uppercase tracking-[0.22em]";

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

  const { passRate, validations } = useMemo(() => {
    const t = data.validationOverview.buckets.reduce(
      (acc, b) => {
        const bucket =
          b.counts.passed +
          b.counts.in_progress +
          b.counts.failed +
          b.counts.not_run;
        return { passed: acc.passed + b.counts.passed, total: acc.total + bucket };
      },
      { passed: 0, total: 0 },
    );
    return {
      passRate: t.total ? Math.round((t.passed / t.total) * 100) : 0,
      validations: t.total,
    };
  }, [data]);

  return (
    <section
      aria-label="Workspace overview"
      className="relative grid grid-cols-1 gap-px border-b border-white/12 bg-white/12 md:grid-cols-2 lg:h-[calc(100vh-3.5rem)] lg:grid-cols-12 lg:grid-rows-[minmax(0,0.55fr)_minmax(0,1.28fr)_minmax(0,1.17fr)] lg:overflow-hidden"
    >
      <Link
        href="/projects/new"
        className="group absolute right-4 top-4 z-10 hidden items-center gap-2 rounded-[8px] border border-accent-bright/40 bg-accent-bright/10 px-3.5 py-2 text-[12.5px] font-medium text-accent-bright backdrop-blur-sm transition-colors hover:bg-accent-bright hover:text-accent-contrast lg:inline-flex"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
        Import project
      </Link>

      {data.stats.map((tile) => (
        <NumTile key={tile.id} tile={tile} loading={pending} />
      ))}

      <Cell className="lg:col-span-5">
        <ValidationOverviewChart
          data={data.validationOverview}
          onWindowChange={changeWindow}
          loading={pending}
        />
      </Cell>

      <div className="relative flex flex-col gap-2 bg-[#0b0b0b] p-4 text-text lg:col-span-3 lg:p-5">
        <span className={`${KICKER} text-muted`}>Defense time</span>
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <DialClock className="h-full max-h-[150px] w-auto text-text" />
        </div>
        <dl className="grid grid-cols-2 gap-x-4 border-t border-border pt-3">
          <Metric label="Pass rate" value={`${passRate}%`} />
          <Metric label="Validations" value={validations} />
        </dl>
      </div>

      <Cell className="lg:col-span-4">
        <RecentSessionsPanel
          rows={data.recentSessions.slice(0, 4)}
          viewAllHref="/sessions"
          loading={pending}
        />
      </Cell>

      <Cell className="lg:col-span-5">
        <RecentValidationsPanel
          rows={data.recentValidations.slice(0, 4)}
          viewAllHref="/validation"
          loading={pending}
        />
      </Cell>

      <Cell className="lg:col-span-4">
        <SystemActivityPanel
          rows={data.systemActivity.slice(0, 4)}
          viewAllHref="/audit"
        />
      </Cell>

      <Cell className="lg:col-span-3">
        <InfraHealthStrip health={data.infraHealth} loading={pending} />
      </Cell>
    </section>
  );
}

function Cell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`dashboard-flush flex min-h-0 flex-col overflow-hidden bg-[#0b0b0b] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function NumTile({ tile, loading }: { tile: StatTileDto; loading?: boolean }) {
  return (
    <Link
      href={tile.linkHref}
      className="group relative flex min-w-0 flex-col justify-between gap-2 bg-[#0b0b0b] p-4 transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-3 lg:p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`${KICKER} truncate text-muted`}>{tile.label}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <p className="tnum font-sans text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-[0.82] tracking-[-0.045em] text-text">
          {loading ? "—" : tile.value}
        </p>
        <p className="mt-1.5 text-[11.5px] text-muted">
          <span className="tnum font-medium text-success">
            {signed(tile.deltaValue)}
          </span>{" "}
          {tile.deltaPeriodLabel}
        </p>
      </div>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0">
      <dd className="tnum text-[20px] font-semibold leading-none tracking-[-0.02em] text-text">
        {value}
      </dd>
      <dt className={`${KICKER} mt-1.5 text-muted`}>{label}</dt>
    </div>
  );
}
