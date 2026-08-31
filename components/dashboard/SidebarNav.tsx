"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLockup } from "@/components/brand/Logo";
import { StatusDot, healthLabel, healthTone } from "@/components/ui/badges";
import type { HealthStatus } from "@/lib/contracts/dashboard";
import { NAV_GROUPS } from "@/components/dashboard/nav-config";
import { cn } from "@/lib/cn";

export interface SidebarNavProps {
  activeRoute?: string;
  systemStatus: HealthStatus;
  systemStatusLabel: string;
  platformVersion: string;
}

export function SidebarNav({
  activeRoute,
  systemStatus,
  systemStatusLabel,
  platformVersion,
}: SidebarNavProps) {
  const pathname = usePathname();
  const active = activeRoute ?? pathname;

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-[18px]">
        <BrandLockup href="/dashboard" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.heading} className="mb-6 last:mb-0">
            <p className="px-3 pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              {group.heading}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  active === item.href ||
                  (item.href !== "/dashboard" && active?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-[8px] px-3 py-2 text-[13px] font-medium transition-colors",
                        isActive
                          ? "bg-surface text-text"
                          : "text-muted hover:bg-surface-raised hover:text-text",
                      )}
                    >
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent-bright"
                        />
                      )}
                      <item.icon
                        className={cn(
                          "h-[17px] w-[17px] shrink-0",
                          isActive
                            ? "text-accent"
                            : "text-muted group-hover:text-text",
                        )}
                        strokeWidth={1.75}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <StatusDot tone={healthTone[systemStatus]} pulse={systemStatus === "healthy"} />
          <div className="leading-tight">
            <p className="text-[12.5px] font-medium text-text">System Status</p>
            <p className="text-[11px] text-muted">
              {systemStatusLabel || healthLabel[systemStatus]}
            </p>
          </div>
        </div>
        <p className="mt-3 font-mono text-[10.5px] text-muted">{platformVersion}</p>
      </div>
    </div>
  );
}
