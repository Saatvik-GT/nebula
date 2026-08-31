import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
};

/**
 * Flush data table in the dashboard-mosaic language: pitch-black ground,
 * white hairline rules, mono uppercase headers, and a row that lifts a hair
 * on hover with an accent chevron.
 */
export function DataList<T>({
  columns,
  rows,
  rowHref,
  getKey,
  empty = "Nothing here yet.",
}: {
  columns: Column<T>[];
  rows: T[];
  rowHref?: (row: T) => string;
  getKey: (row: T) => string;
  empty?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="grid place-items-center border-y border-white/12 bg-[#0b0b0b] px-6 py-16 text-center text-[13px] text-white/45">
        {empty}
      </div>
    );
  }

  return (
    <div className="border-b border-white/12 bg-[#0b0b0b]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/12 bg-white/[0.02]">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/40 sm:px-6",
                    c.className,
                  )}
                >
                  {c.header}
                </th>
              ))}
              {rowHref && <th className="w-10 px-4 py-3 sm:px-6" aria-hidden />}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => {
              const href = rowHref?.(row);
              return (
                <tr
                  key={getKey(row)}
                  className={cn(
                    "group transition-colors",
                    href && "hover:bg-white/[0.03]",
                  )}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={cn(
                        "px-4 py-3.5 align-middle text-[13px] text-text sm:px-6",
                        c.className,
                      )}
                    >
                      {href ? (
                        <Link href={href} className="block outline-none">
                          {c.render(row)}
                        </Link>
                      ) : (
                        c.render(row)
                      )}
                    </td>
                  ))}
                  {rowHref && (
                    <td className="px-4 py-3.5 text-right sm:px-6">
                      {href && (
                        <Link href={href} aria-label="Open" className="block">
                          <ChevronRight className="ml-auto h-4 w-4 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-accent-bright" />
                        </Link>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
