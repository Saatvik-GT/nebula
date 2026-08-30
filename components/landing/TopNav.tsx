"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/brand/Logo";

const NAV = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Capabilities", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "Product", href: "#docs" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-page/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <BrandLockup />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Landing navigation">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="text-[13px] text-muted transition-colors hover:text-text">{item.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="hidden h-9 items-center rounded-[8px] border border-border bg-surface px-3.5 text-[13px] font-medium text-text transition-colors hover:bg-surface-raised sm:inline-flex">Evaluator workspace</Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="grid h-9 w-9 place-items-center rounded-[8px] border border-border bg-surface text-text lg:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-surface px-5 py-3 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-[1200px] flex-col">
            {NAV.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="border-b border-border px-1 py-3 text-[14px] text-muted last:border-0 hover:text-text">{item.label}</a>
            ))}
            <Link href="/dashboard" className="mt-3 inline-flex h-10 items-center justify-center rounded-[8px] bg-accent px-4 text-[13px] font-medium text-accent-contrast">Evaluator workspace</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
