"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Check } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import type {
  ValidationOutcome,
  ValidationOverviewDto,
} from "@/lib/contracts/dashboard";
import { cn } from "@/lib/cn";

export interface ValidationOverviewChartProps {
  data: ValidationOverviewDto;
  onWindowChange: (window: "day" | "week") => void;
  loading?: boolean;
}

const ORDER: ValidationOutcome[] = ["passed", "in_progress", "failed", "not_run"];

const COLOR: Record<ValidationOutcome, string> = {
  passed: "var(--success)",
  in_progress: "var(--warning)",
  failed: "var(--danger)",
  not_run: "var(--surface-raised)",
};

const LEGEND: { key: ValidationOutcome; label: string }[] = [
  { key: "passed", label: "Passed" },
  { key: "in_progress", label: "In Progress" },
  { key: "failed", label: "Failed" },
  { key: "not_run", label: "Not Run" },
];

const WINDOW_LABEL: Record<"day" | "week", string> = {
  week: "This Week",
  day: "This Day",
};

type Row = {
  label: string;
  total: number;
  counts: Record<ValidationOutcome, number>;
};

export function ValidationOverviewChart({
  data,
  onWindowChange,
  loading,
}: ValidationOverviewChartProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const rows: Row[] = useMemo(
    () =>
      data.buckets.map((b) => ({
        label: b.bucketLabel,
        counts: b.counts,
        total:
          b.counts.passed +
          b.counts.in_progress +
          b.counts.failed +
          b.counts.not_run,
      })),
    [data],
  );

  const maxTotal = Math.max(1, ...rows.map((r) => r.total));
  const peakLabel = rows.reduce(
    (best, r) => (r.total > best.total ? r : best),
    rows[0] ?? { label: "", total: 0, counts: {} as Row["counts"] },
  ).label;

  return (
    <Panel className="flex flex-col">
      <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-1">
        <h2 className="text-[13.5px] font-semibold tracking-[-0.01em] text-text">
          Challenge Validation Overview
        </h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            className="flex items-center gap-1.5 rounded-[8px] border border-border bg-surface px-2.5 py-1.5 text-[12px] font-medium text-muted transition-colors hover:text-text"
          >
            {WINDOW_LABEL[data.window]}
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
              <path
                d="M2 3.5 5 6.5 8 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {menuOpen && (
            <ul
              role="listbox"
              className="absolute right-0 z-20 mt-1.5 w-36 overflow-hidden rounded-[8px] border border-border bg-surface-raised py-1 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)]"
            >
              {(["week", "day"] as const).map((w) => (
                <li key={w}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={data.window === w}
                    onClick={() => {
                      onWindowChange(w);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[12.5px] text-text hover:bg-surface"
                  >
                    {WINDOW_LABEL[w]}
                    {data.window === w && (
                      <Check className="h-3.5 w-3.5 text-accent-bright" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={cn("px-3 pt-3", loading && "opacity-40")}>
        <div className="h-[210px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 26, right: 8, bottom: 4, left: 8 }} barCategoryGap="16%">
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted)", fontSize: 12 }}
                dy={8}
              />
              <YAxis hide domain={[0, maxTotal * 1.28]} />
              <Bar
                dataKey="total"
                maxBarSize={48}
                isAnimationActive={!loading}
                shape={(props: unknown) => (
                  <StackedBar {...(props as StackedBarProps)} peakLabel={peakLabel} />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 pb-5 pt-3">
        {LEGEND.map((l) => (
          <span key={l.key} className="flex items-center gap-2 text-[12px] text-muted">
            <span
              aria-hidden
              className={cn("h-2.5 w-2.5 rounded-full", l.key === "not_run" && "border border-border")}
              style={{ background: COLOR[l.key] }}
            />
            {l.label}
          </span>
        ))}
      </div>
    </Panel>
  );
}

type StackedBarProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  payload: Row;
};

function StackedBar({
  x,
  y,
  width,
  height,
  payload,
  peakLabel,
}: StackedBarProps & { peakLabel: string }) {
  const total = payload.total || 0;
  if (total <= 0) return <g />;

  const r = Math.min(8, width / 2);
  const clipId = `epd-bar-${payload.label}-${Math.round(x)}`;
  const bottom = y + height;

  let cursor = bottom;
  const segments = ORDER.filter((k) => payload.counts[k] > 0).map((k) => {
    const h = (payload.counts[k] / total) * height;
    const segY = cursor - h;
    cursor = segY;
    return { k, y: segY, h };
  });

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <path
            d={`M${x},${bottom} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${bottom} Z`}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {segments.map((s) => (
          <rect
            key={s.k}
            x={x}
            y={s.y}
            width={width}
            height={s.h + 0.5}
            fill={COLOR[s.k]}
          />
        ))}
      </g>

      {payload.label === peakLabel && (
        <g transform={`translate(${x + width / 2}, ${y - 14})`}>
          <rect
            x={-14}
            y={-11}
            width={28}
            height={20}
            rx={6}
            fill="var(--surface-raised)"
            stroke="var(--border)"
          />
          <text
            x={0}
            y={3}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill="var(--text)"
          >
            {total}
          </text>
        </g>
      )}
    </g>
  );
}
