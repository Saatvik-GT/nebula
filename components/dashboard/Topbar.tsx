"use client";

import { Menu } from "lucide-react";

export function Topbar({
  onOpenNav,
  accountName = "Aditya Prashar",
  accountRole = "Evaluator",
}: {
  onOpenNav: () => void;
  accountName?: string;
  accountRole?: string;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface/80 px-4 sm:px-8">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-border text-muted hover:text-text lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <p className="min-w-0 flex-1 truncate text-[12.5px] text-muted">
        Evaluator workspace
      </p>

      <div className="ml-auto flex items-center gap-2.5" aria-label={`${accountName}, ${accountRole}`}>
          <span
            aria-hidden
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-semibold text-accent-contrast"
          >
            {accountName
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[12.5px] font-medium text-text">
              {accountName}
            </span>
            <span className="block text-[11px] text-muted">{accountRole}</span>
          </span>
      </div>
    </header>
  );
}
