import Link from "next/link";
import { cn } from "@/lib/cn";

/** Landing wordmark — concentric lens mark + two-line lockup. */
export function BrandLockup({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Executable Project Defense — home"
    >
      <LensMark className="h-8 w-8 shrink-0" />
      <span className="font-mono text-[11px] font-medium uppercase leading-[1.25] tracking-[0.18em] text-text">
        Executable
        <br />
        Project Defense
      </span>
    </Link>
  );
}

export function LensMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="epd-lens" cx="38%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#e8efe9" />
          <stop offset="45%" stopColor="#7fae91" />
          <stop offset="100%" stopColor="#1c2a22" />
        </radialGradient>
        <clipPath id="epd-lens-clip">
          <circle cx="16" cy="16" r="11" />
        </clipPath>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="14.25"
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="16" r="11" fill="url(#epd-lens)" />
      <g clipPath="url(#epd-lens-clip)">
        <circle cx="22.5" cy="10" r="10.5" fill="var(--page)" opacity="0.92" />
      </g>
    </svg>
  );
}

/** App shell mark — shield + check, green family. */
export function ShieldMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="epd-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5f9b78" />
          <stop offset="100%" stopColor="#2f4b3c" />
        </linearGradient>
      </defs>
      <path
        d="M16 2.5 4.5 6.8v8.4c0 7.1 4.7 12.1 11.5 14.3 6.8-2.2 11.5-7.2 11.5-14.3V6.8L16 2.5Z"
        fill="url(#epd-shield)"
        stroke="var(--accent-bright)"
        strokeWidth="0.75"
      />
      <path
        d="m10.8 16.2 3.6 3.6 6.8-7.2"
        fill="none"
        stroke="#f2f6f2"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppBrand({ className }: { className?: string }) {
  return (
    <Link
      href="/dashboard"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Defense — dashboard"
    >
      <ShieldMark className="h-8 w-8 shrink-0" />
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-[-0.01em] text-text">
          Defense
        </span>
        <span className="block text-[10.5px] text-muted">
          Executable Project Defense
        </span>
      </span>
    </Link>
  );
}
