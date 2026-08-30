"use client";

import { ChevronDown, HelpCircle, Bell, Menu, Search } from "lucide-react";

export function Topbar({
  onOpenNav,
  unreadCount = 3,
  accountName = "Aditya Prashar",
  accountRole = "Evaluator",
}: {
  onOpenNav: () => void;
  unreadCount?: number;
  accountName?: string;
  accountRole?: string;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-border text-muted hover:text-text lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <label className="relative flex h-10 min-w-0 flex-1 items-center sm:max-w-[520px]">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted" />
        <input
          type="search"
          placeholder="Search projects, sessions, challenges..."
          className="h-full w-full rounded-[8px] border border-border bg-surface pl-9 pr-16 text-[13px] text-text outline-none transition-colors placeholder:text-muted focus:border-accent-bright/60"
        />
        <kbd className="absolute right-2.5 hidden items-center gap-0.5 rounded-[5px] border border-border bg-surface-raised px-1.5 py-0.5 font-mono text-[10.5px] text-muted sm:flex">
          ⌘K
        </kbd>
      </label>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          aria-label={`Notifications, ${unreadCount} unread`}
          className="relative grid h-9 w-9 place-items-center rounded-[8px] border border-border text-muted transition-colors hover:text-text"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full border border-page bg-accent-bright px-1 text-[10px] font-semibold leading-none text-page">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          type="button"
          aria-label="Help"
          className="grid h-9 w-9 place-items-center rounded-[8px] border border-border text-muted transition-colors hover:text-text"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-[8px] border border-border py-1 pl-1 pr-2 text-left transition-colors hover:bg-surface-raised"
        >
          <span
            aria-hidden
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-semibold text-text"
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
          <ChevronDown className="hidden h-3.5 w-3.5 text-muted sm:block" />
        </button>
      </div>
    </header>
  );
}
