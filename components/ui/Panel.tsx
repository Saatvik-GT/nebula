import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Panel({
  className,
  children,
  as: As = "section",
}: {
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "article";
}) {
  return (
    <As
      className={cn(
        "rounded-[12px] border border-border bg-surface",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function PanelHeader({
  title,
  action,
  className,
}: {
  title: ReactNode;
  action?: { label: string; href: string } | ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-5 pt-4 pb-3",
        className,
      )}
    >
      <h2 className="text-[13.5px] font-semibold tracking-[-0.01em] text-text">
        {title}
      </h2>
      {action == null ? null : isLinkAction(action) ? (
        <Link
          href={action.href}
          className="shrink-0 text-[12px] font-medium text-accent-bright transition-colors hover:text-text"
        >
          {action.label}
        </Link>
      ) : (
        action
      )}
    </div>
  );
}

function isLinkAction(a: unknown): a is { label: string; href: string } {
  return (
    typeof a === "object" &&
    a !== null &&
    "href" in a &&
    "label" in (a as Record<string, unknown>)
  );
}
