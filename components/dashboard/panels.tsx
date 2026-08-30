import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Clock,
  Download,
  FileText,
  Gauge,
  Lock,
  MinusCircle,
  SlidersHorizontal,
  SquarePlus,
  Video,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import {
  OutcomePill,
  SessionStateBadge,
  StatusDot,
  healthLabel,
  healthTone,
} from "@/components/ui/badges";
import type {
  InfraHealthDto,
  QuickActionDto,
  RecentSessionRowDto,
  RecentValidationRowDto,
  SystemActivityRowDto,
  ValidationOutcome,
} from "@/lib/contracts/dashboard";
import { relativeTime, relativeTimeShort, timeRange } from "@/lib/format";
import { cn } from "@/lib/cn";

/* ============================================================
   Recent Validations
   ============================================================ */

export interface RecentValidationsPanelProps {
  rows: RecentValidationRowDto[];
  viewAllHref: string;
  loading?: boolean;
  empty?: boolean;
}

const outcomeIcon: Record<
  ValidationOutcome,
  { Icon: LucideIcon; className: string }
> = {
  passed: { Icon: CheckCircle2, className: "text-success" },
  in_progress: { Icon: Clock, className: "text-warning" },
  failed: { Icon: XCircle, className: "text-danger" },
  not_run: { Icon: MinusCircle, className: "text-muted" },
};

function humanizeReason(code: string): string {
  const s = code.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function validationSubtitle(row: RecentValidationRowDto): string {
  if (row.status === "failed")
    return row.reasonCode ? humanizeReason(row.reasonCode) : "Validation failed";
  if (row.status === "in_progress")
    return row.reasonCode
      ? humanizeReason(row.reasonCode)
      : "Running validation suite";
  if (row.status === "passed") return "Validation completed";
  return "Not started";
}

export function RecentValidationsPanel({
  rows,
  viewAllHref,
  loading,
  empty,
}: RecentValidationsPanelProps) {
  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="Recent Validations"
        action={{ label: "View All", href: viewAllHref }}
      />
      <ul className="flex-1 divide-y divide-border border-t border-border">
        {empty || rows.length === 0 ? (
          <EmptyRow label="No validation runs yet" />
        ) : (
          rows.map((row) => {
            const { Icon, className } = outcomeIcon[row.status];
            return (
              <li key={row.validationRunId}>
                <Link
                  href={row.detailHref}
                  className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-raised"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-surface-raised">
                    <Icon className={cn("h-[15px] w-[15px]", className)} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-mono text-[12px] text-text">
                      {row.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted">
                      {validationSubtitle(row)} ·{" "}
                      {loading ? "—" : relativeTime(row.updatedAt)}
                    </span>
                  </span>
                  <OutcomePill outcome={row.status} />
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </Panel>
  );
}

/* ============================================================
   Recent Sessions
   ============================================================ */

export interface RecentSessionsPanelProps {
  rows: RecentSessionRowDto[];
  viewAllHref: string;
  loading?: boolean;
  empty?: boolean;
}

export function RecentSessionsPanel({
  rows,
  viewAllHref,
  loading,
  empty,
}: RecentSessionsPanelProps) {
  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="Recent Sessions"
        action={{ label: "View All", href: viewAllHref }}
      />
      <ul className="flex-1 divide-y divide-border border-t border-border">
        {empty || rows.length === 0 ? (
          <EmptyRow label="No sessions yet" />
        ) : (
          rows.map((row) => (
            <li key={row.sessionId}>
              <Link
                href={row.detailHref}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-raised"
              >
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-semibold text-accent-contrast"
                >
                  {initials(row.groupOrProjectLabel)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-text">
                    {row.displayLabel}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-muted">
                    {row.groupOrProjectLabel}
                  </span>
                </span>
                <span className="flex flex-col items-end gap-1">
                  <SessionStateBadge state={row.state} />
                  <span className="text-[11px] text-muted">
                    {loading ? "—" : relativeTime(row.updatedAt)}
                  </span>
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </Panel>
  );
}

/* ============================================================
   Quick Actions
   ============================================================ */

export interface QuickActionsPanelProps {
  actions: QuickActionDto[];
}

const quickActionIcon: Record<string, LucideIcon> = {
  import_project: Download,
  create_challenge: CircleDashed,
  start_session: SquarePlus,
  view_reports: FileText,
  run_validation: Gauge,
};

export function QuickActionsPanel({ actions }: QuickActionsPanelProps) {
  return (
    <Panel className="flex flex-col">
      <PanelHeader title="Quick Actions" />
      <ul className="flex-1 border-t border-border p-2">
        {actions.map((action) => {
          const Icon = quickActionIcon[action.id] ?? SquarePlus;
          const inner = (
            <>
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border",
                  action.enabled
                    ? "border-accent-bright/35 bg-[color-mix(in_oklab,var(--accent)_40%,transparent)] text-accent-bright"
                    : "border-border bg-surface-raised text-muted",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[13px] font-medium text-text">
                  {action.label}
                  {!action.enabled && (
                    <Lock className="h-3 w-3 text-muted" strokeWidth={2} />
                  )}
                </span>
                <span className="mt-0.5 block truncate text-[11.5px] text-muted">
                  {action.sublabel}
                </span>
              </span>
              {action.enabled && (
                <ChevronRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </>
          );

          return (
            <li key={action.id}>
              {action.enabled ? (
                <Link
                  href={action.href}
                  className="group flex items-center gap-3 rounded-[8px] px-3 py-2.5 transition-colors hover:bg-surface-raised"
                >
                  {inner}
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  tabIndex={0}
                  title={action.disabledReason}
                  className="group flex cursor-not-allowed items-center gap-3 rounded-[8px] px-3 py-2.5 opacity-60"
                >
                  {inner}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ============================================================
   System Reminders (rendered only when a real reminder exists)
   ============================================================ */

export function SystemRemindersPanel({
  reminder,
  viewAllHref,
}: {
  reminder: NonNullable<
    import("@/lib/contracts/dashboard").DashboardDto["systemReminder"]
  >;
  viewAllHref: string;
}) {
  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="System Reminders"
        action={{ label: "View All", href: viewAllHref }}
      />
      <div className="border-t border-border p-4">
        <div className="rounded-[10px] border border-border bg-surface-raised p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-border bg-surface">
              <CalendarClock className="h-4 w-4 text-accent-bright" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-medium text-text">{reminder.title}</p>
              <p className="mt-0.5 text-[12px] text-muted">{reminder.subtitle}</p>
            </div>
          </div>
          <p className="mt-3 text-[12px] text-muted">
            <span className="text-text">Today</span> ·{" "}
            {timeRange(reminder.startsAt, reminder.endsAt)}
          </p>
          {reminder.joinHref && (
            <a
              href={reminder.joinHref}
              className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-accent bg-accent text-[13px] font-medium text-accent-contrast transition-colors hover:bg-accent-bright"
            >
              <Video className="h-4 w-4" strokeWidth={1.75} />
              Join Meeting
            </a>
          )}
        </div>
      </div>
    </Panel>
  );
}

/* ============================================================
   Infrastructure Health strip
   ============================================================ */

export interface InfraHealthStripProps {
  health: InfraHealthDto;
  loading?: boolean;
}

export function InfraHealthStrip({ health, loading }: InfraHealthStripProps) {
  return (
    <Panel>
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pt-4 pb-2">
        <h2 className="text-[13.5px] font-semibold tracking-[-0.01em] text-text">
          Infrastructure Health
        </h2>
        <Link
          href={health.detailHref}
          className="rounded-[8px] border border-border px-3 py-1.5 text-[12px] font-medium text-muted transition-colors hover:bg-surface-raised hover:text-text"
        >
          View Details
        </Link>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-border px-5 py-4">
        {health.components.map((c) => (
          <div key={c.id} className="flex items-center gap-2.5">
            <StatusDot tone={healthTone[c.status]} />
            <div className="leading-tight">
              <p className="flex items-center gap-1.5 text-[13px] font-medium text-text">
                {c.label}
                {c.id === "sandbox_pool" && (
                  <SlidersHorizontal className="h-3.5 w-3.5 text-muted" />
                )}
              </p>
              <p className="text-[11.5px] text-muted">
                {loading ? "—" : (c.detail ?? healthLabel[c.status])}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ============================================================
   System Activity timeline
   ============================================================ */

export interface SystemActivityPanelProps {
  rows: SystemActivityRowDto[];
  viewAllHref: string;
}

function activityIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes("import")) return Download;
  if (l.includes("approv")) return CheckCircle2;
  if (l.includes("session")) return SquarePlus;
  if (l.includes("report")) return FileText;
  return CircleDashed;
}

export function SystemActivityPanel({
  rows,
  viewAllHref,
}: SystemActivityPanelProps) {
  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="System Activity"
        action={{ label: "View All", href: viewAllHref }}
      />
      <ol className="relative flex-1 border-t border-border p-5">
        <span
          aria-hidden
          className="absolute bottom-8 left-[34px] top-9 w-px bg-border"
        />
        {rows.map((row) => {
          const Icon = activityIcon(row.label);
          return (
            <li key={row.id} className="relative flex items-start gap-3 pb-5 last:pb-0">
              <span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-surface text-muted">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[13px] font-medium text-text">{row.label}</p>
                <p className="mt-0.5 truncate text-[11.5px] text-muted">
                  {row.sublabel} · {relativeTimeShort(row.occurredAt)}
                </p>
              </div>
              <StatusDot tone="success" size={6} />
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}

/* ============================================================ */

function EmptyRow({ label }: { label: string }) {
  return (
    <li className="px-5 py-10 text-center text-[12.5px] text-muted">{label}</li>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
