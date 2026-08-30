"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "Docs", href: "#docs" },
  { label: "About", href: "#about" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <BrandLockup />

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface/70 p-1 backdrop-blur-md xl:flex">
          {NAV.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={i === 0 ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                i === 0
                  ? "bg-surface-raised text-text shadow-[0_1px_0_rgba(255,255,255,0.03)_inset]"
                  : "text-muted hover:text-text",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/dashboard"
            className="group hidden items-center gap-2 rounded-[8px] border border-border bg-surface/60 px-3.5 py-2 text-[13px] font-medium text-text backdrop-blur-md transition-colors hover:border-accent-bright/60 hover:bg-surface-raised sm:inline-flex"
          >
            Create defense
            <span className="grid h-5 w-5 place-items-center rounded-full border border-border transition-colors group-hover:border-accent-bright/70">
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-[8px] border border-border bg-surface/60 text-text backdrop-blur-md xl:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto max-w-[1400px] px-5 pb-4 sm:px-8 xl:hidden">
          <nav className="flex flex-col gap-1 rounded-[12px] border border-border bg-surface/95 p-2 backdrop-blur-md">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-text"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/dashboard"
              className="mt-1 rounded-[8px] border border-accent-bright/50 bg-accent px-3 py-2 text-sm font-medium text-text"
            >
              Create defense
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
