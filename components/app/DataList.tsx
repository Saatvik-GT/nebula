import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { cn } from "@/lib/cn";

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
};

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
      <Panel className="grid place-items-center px-6 py-16 text-center text-[13px] text-muted">
        {empty}
      </Panel>
    );
  }

  return (
    <Panel className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted",
                    c.className,
                  )}
                >
                  {c.header}
                </th>
              ))}
              {rowHref && <th className="w-10 px-4 py-3" aria-hidden />}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => {
              const href = rowHref?.(row);
              return (
                <tr
                  key={getKey(row)}
                  className={cn(
                    "group transition-colors",
                    href && "hover:bg-surface-raised",
                  )}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={cn(
                        "px-4 py-3.5 align-middle text-[13px] text-text",
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
                    <td className="px-4 py-3.5 text-right">
                      {href && (
                        <Link href={href} aria-label="Open" className="block">
                          <ChevronRight className="ml-auto h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
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
    </Panel>
  );
}
