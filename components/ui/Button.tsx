import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[8px] font-medium " +
  "transition-[background-color,border-color,box-shadow,color] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright " +
  "disabled:cursor-not-allowed disabled:opacity-45 aria-disabled:cursor-not-allowed aria-disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast border border-accent hover:bg-accent-bright " +
    "hover:border-accent-bright",
  outline:
    "bg-transparent text-text border border-border hover:bg-surface-raised hover:border-[color-mix(in_oklab,var(--border)_60%,var(--muted))]",
  ghost: "bg-transparent text-muted border border-transparent hover:text-text hover:bg-surface-raised",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[12.5px]",
  md: "h-9 px-3.5 text-[13px]",
  lg: "h-12 px-5 text-[14.5px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
