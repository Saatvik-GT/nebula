import Link from "next/link";
import { ArrowUpRight, MoveDownRight, MoveUpRight } from "lucide-react";
import type { StatTileDto } from "@/lib/contracts/dashboard";
import { cn } from "@/lib/cn";
import { signed } from "@/lib/format";

export interface StatTileProps {
  tile: StatTileDto;
  loading?: boolean;
  highlighted?: boolean;
}

export function StatTile({ tile, loading, highlighted }: StatTileProps) {
  const up = tile.deltaValue >= 0;
  const DeltaIcon = up ? MoveUpRight : MoveDownRight;

  return (
    <Link
      href={tile.linkHref}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[12px] border bg-surface p-5 transition-colors",
        highlighted
          ? "border-accent-bright/45 bg-[color-mix(in_oklab,var(--accent)_16%,var(--surface))]"
          : "border-border hover:border-[color-mix(in_oklab,var(--border)_55%,var(--muted))]",
      )}
    >
      {highlighted && <TileSparkline />}

      <div className="relative flex items-start justify-between">
        <span className="text-[13px] font-medium text-muted">{tile.label}</span>
        <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-text" />
      </div>

      <div className="relative mt-3 flex items-end gap-3">
        <span className="tnum text-[34px] font-semibold leading-none tracking-[-0.02em] text-text">
          {loading ? "—" : tile.value}
        </span>
      </div>

      <div className="relative mt-4 flex items-center gap-1.5 text-[12px]">
        <DeltaIcon
          className={cn("h-3.5 w-3.5", up ? "text-success" : "text-danger")}
          strokeWidth={2.25}
        />
        <span
          className={cn(
            "tnum font-medium",
            up ? "text-[color-mix(in_oklab,var(--success)_78%,white)]" : "text-danger",
          )}
        >
          {signed(tile.deltaValue)}
        </span>
        <span className="text-muted">{tile.deltaPeriodLabel}</span>
      </div>
    </Link>
  );
}

/** Decorative trend curve behind the lead tile — matches the reference. */
function TileSparkline() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full opacity-70"
      viewBox="0 0 240 64"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="epd-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent-bright)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 52 C 30 46, 44 30, 72 34 S 120 52, 150 38 S 200 10, 240 22 L240 64 L0 64 Z"
        fill="url(#epd-spark)"
      />
      <path
        d="M0 52 C 30 46, 44 30, 72 34 S 120 52, 150 38 S 200 10, 240 22"
        stroke="var(--accent-bright)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
    </svg>
  );
}
