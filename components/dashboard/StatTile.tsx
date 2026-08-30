import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { StatTileDto } from "@/lib/contracts/dashboard";
import { cn } from "@/lib/cn";
import { signed } from "@/lib/format";

export interface StatTileProps {
  tile: StatTileDto;
  loading?: boolean;
  className?: string;
}

export function StatTile({ tile, loading, className }: StatTileProps) {
  return (
    <Link
      href={tile.linkHref}
      className={cn(
        "group relative min-w-0 px-5 py-5 transition-colors hover:bg-surface-raised/70",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[12px] font-medium text-muted">{tile.label}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="tnum text-[30px] font-semibold leading-none tracking-[-0.025em] text-text">
          {loading ? "—" : tile.value}
        </span>
        <span className="text-[11.5px] text-muted">
          <span className="tnum font-medium text-success">{signed(tile.deltaValue)}</span>{" "}
          {tile.deltaPeriodLabel}
        </span>
      </div>
    </Link>
  );
}
