import { cn } from "@/lib/cn";
import type {
  SessionState,
  ValidationOutcome,
  HealthStatus,
} from "@/lib/contracts/dashboard";

/* ---------- generic pill ---------- */

type Tone = "neutral" | "success" | "warning" | "danger" | "active";

const toneClass: Record<Tone, string> = {
  neutral: "border-border bg-surface-raised text-muted",
  active:
    "border-accent-bright/35 bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-accent",
  success:
    "border-success/30 bg-[color-mix(in_oklab,var(--success)_9%,transparent)] text-success",
  warning:
    "border-warning/30 bg-[color-mix(in_oklab,var(--warning)_9%,transparent)] text-warning",
  danger:
    "border-danger/30 bg-[color-mix(in_oklab,var(--danger)_9%,transparent)] text-danger",
};

export function Pill({
  tone = "neutral",
  mono,
  className,
  children,
}: {
  tone?: Tone;
  mono?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[11px] font-medium leading-none",
        mono && "font-mono uppercase tracking-[0.04em] text-[10.5px]",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- session state ---------- */

const stateTone: Record<SessionState, Tone> = {
  CREATED: "neutral",
  BRIEFING: "neutral",
  MAP: "active",
  WORK_INITIAL: "active",
  VERIFY_INITIAL: "active",
  STRESS: "active",
  WORK_REVISION: "active",
  VERIFY_REVISION: "active",
  DEFEND: "active",
  SUBMITTED: "success",
  REPORTED: "success",
  SUBMITTED_INCOMPLETE: "warning",
  INVALIDATED: "danger",
  EXPIRED: "danger",
  CANCELLED: "danger",
};

/** Renders the exact SessionState string — never shortened or renamed. */
export function SessionStateBadge({ state }: { state: SessionState }) {
  return (
    <Pill tone={stateTone[state]} mono>
      {state}
    </Pill>
  );
}

/* ---------- validation outcome ---------- */

const outcomeMeta: Record<
  ValidationOutcome,
  { label: string; tone: Tone }
> = {
  passed: { label: "Passed", tone: "success" },
  in_progress: { label: "In Progress", tone: "warning" },
  failed: { label: "Failed", tone: "danger" },
  not_run: { label: "Not Run", tone: "neutral" },
};

export function OutcomePill({ outcome }: { outcome: ValidationOutcome }) {
  const m = outcomeMeta[outcome];
  return <Pill tone={m.tone}>{m.label}</Pill>;
}

export function outcomeLabel(outcome: ValidationOutcome): string {
  return outcomeMeta[outcome].label;
}

/* ---------- status dot ---------- */

const dotColor: Record<Tone, string> = {
  neutral: "var(--muted)",
  active: "var(--accent-bright)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

export function StatusDot({
  tone = "success",
  pulse,
  size = 8,
}: {
  tone?: Tone;
  pulse?: boolean;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className="relative inline-flex shrink-0"
      style={{ width: size, height: size }}
    >
      {pulse && (
        <span
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: dotColor[tone],
            animation: "epd-pulse-dot 2.4s ease-in-out infinite",
          }}
        />
      )}
      <span
        className="relative inline-block rounded-full"
        style={{
          width: size,
          height: size,
          background: dotColor[tone],
          boxShadow: `0 0 0 3px color-mix(in oklab, ${dotColor[tone]} 22%, transparent)`,
        }}
      />
    </span>
  );
}

export const healthTone: Record<HealthStatus, Tone> = {
  healthy: "success",
  degraded: "warning",
  down: "danger",
};

export const healthLabel: Record<HealthStatus, string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
};
