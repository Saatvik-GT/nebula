"use client";

import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { Topbar } from "@/components/dashboard/Topbar";
import type { HealthStatus } from "@/lib/contracts/dashboard";
import { cn } from "@/lib/cn";

const SYSTEM_STATUS: HealthStatus = "healthy";
const SYSTEM_STATUS_LABEL = "All Systems Operational";
const PLATFORM_VERSION = "v0.2.0 · Phase 2 Prototype";

export function AppShell({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black p-2 sm:p-3">
      <div className="flex min-h-[calc(100vh-16px)] overflow-hidden rounded-[16px] border border-border bg-page sm:min-h-[calc(100vh-24px)]">
        {/* desktop sidebar */}
        <aside className="hidden w-[260px] shrink-0 border-r border-border bg-surface lg:block">
          <SidebarNav
            systemStatus={SYSTEM_STATUS}
            systemStatusLabel={SYSTEM_STATUS_LABEL}
            platformVersion={PLATFORM_VERSION}
          />
        </aside>

        {/* mobile drawer */}
        {navOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setNavOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 left-0 w-[280px] border-r border-border bg-surface">
              <button
                type="button"
                onClick={() => setNavOpen(false)}
                aria-label="Close navigation"
                className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-[8px] border border-border text-muted"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarNav
                systemStatus={SYSTEM_STATUS}
                systemStatusLabel={SYSTEM_STATUS_LABEL}
                platformVersion={PLATFORM_VERSION}
              />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onOpenNav={() => setNavOpen(true)} />
          <main className="flex-1 overflow-y-auto">
            <div className={cn("mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8")}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
