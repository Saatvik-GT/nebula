import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Section header band, shared by every evaluator page. Same language as the
 * dashboard mosaic: pitch-black ground, a mono uppercase kicker, a display
 * title, and a single hairline sweep separating it from the content below.
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
}) {
  const kicker =
    breadcrumbs && breadcrumbs.length > 0
      ? breadcrumbs
      : [{ label: "Evaluator workspace" }];

  return (
    <header className="relative bg-[#0b0b0b] px-4 pb-5 pt-6 sm:px-8">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/35">
        {kicker.map((b, i) => (
          <span key={i} className="flex items-center gap-2">
            {b.href ? (
              <Link href={b.href} className="transition-colors hover:text-white">
                {b.label}
              </Link>
            ) : (
              <span className={i === kicker.length - 1 ? "text-white/55" : undefined}>
                {b.label}
              </span>
            )}
            {i < kicker.length - 1 && <span className="text-white/20">/</span>}
          </span>
        ))}
      </nav>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold uppercase leading-[1.05] tracking-[-0.01em] text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-[70ch] text-[13px] leading-relaxed text-white/50">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-white/12">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent-bright/60 to-transparent"
          style={{ animation: "epd-rule-sweep 6s ease-in-out infinite" }}
        />
      </div>
    </header>
  );
}
