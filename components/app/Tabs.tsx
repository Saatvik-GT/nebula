"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tabs({
  tabs,
  initial = 0,
}: {
  tabs: { id: string; label: string; content: ReactNode }[];
  initial?: number;
}) {
  const [active, setActive] = useState(initial);

  return (
    <div>
      <div
        role="tablist"
        className="flex items-center gap-1 rounded-[10px] border border-border bg-surface p-1"
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 rounded-[7px] px-4 py-2 text-[13px] font-medium transition-colors",
              active === i
                ? "bg-surface-raised text-text shadow-[0_1px_0_rgba(255,255,255,0.03)_inset]"
                : "text-muted hover:text-text",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-4">
        {tabs[active]?.content}
      </div>
    </div>
  );
}
