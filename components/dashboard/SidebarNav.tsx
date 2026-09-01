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
    <div className="flex h-full flex-col bg-[#0b0b0b]">
      <div className="flex h-14 shrink-0 items-center border-b border-white/10 bg-black px-5">
        <BrandLockup href="/" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.heading} className={cn(gi > 0 && "mt-7")}>
            <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
              {group.heading}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  active === item.href ||
                  (item.href !== "/dashboard" &&
                    Boolean(active?.startsWith(item.href)));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-[9px] px-3 py-[9px] text-[13px] font-medium transition-colors",
                        isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-white/55 hover:bg-white/[0.035] hover:text-white/90",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-accent-bright transition-opacity",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {item.iconSrc ? (
                        <span
                          aria-hidden
                          className={cn(
                            "h-[17px] w-[17px] shrink-0 bg-current transition-colors",
                            isActive
                              ? "text-accent-bright"
                              : "text-white/40 group-hover:text-white/70",
                          )}
                          style={{
                            maskImage: `url(${item.iconSrc})`,
                            WebkitMaskImage: `url(${item.iconSrc})`,
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center",
                          }}
                        />
                      ) : (
                        <item.icon
                          className={cn(
                            "h-[17px] w-[17px] shrink-0 transition-colors",
                            isActive
                              ? "text-accent-bright"
                              : "text-white/40 group-hover:text-white/70",
                          )}
                          strokeWidth={1.75}
                        />
                      )}
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-3">
        <div className="rounded-[10px] border border-white/10 bg-white/[0.02] px-3.5 py-3">
          <div className="flex items-center gap-2.5">
            <StatusDot
              tone={healthTone[systemStatus]}
              pulse={systemStatus === "healthy"}
            />
            <p className="text-[12px] font-medium text-white/85">System status</p>
          </div>
          <p className="mt-1 pl-[18px] text-[11px] text-white/45">
            {systemStatusLabel || healthLabel[systemStatus]}
          </p>
          <p className="mt-2.5 pl-[18px] font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
            {platformVersion}
          </p>
        </div>
      </div>
    </div>
  );
}
