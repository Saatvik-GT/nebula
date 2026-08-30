"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, CircleDashed, Loader2, Play, RotateCcw, X } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/badges";
import { cn } from "@/lib/cn";

type QualificationStatus = "pending" | "running" | "passed" | "failed";
type StepState = "passed" | "running" | "failed" | "pending";
type Step = { id: string; label: string; description: string };

const stepMeta: Record<
  StepState,
  { Icon: typeof Check; ring: string; icon: string }
> = {
  passed: {
    Icon: Check,
    ring: "border-success/50 bg-[color-mix(in_oklab,var(--success)_18%,transparent)]",
    icon: "text-success",
  },
  running: {
    Icon: Loader2,
    ring: "border-warning/50 bg-[color-mix(in_oklab,var(--warning)_16%,transparent)]",
    icon: "text-warning animate-spin",
  },
  failed: {
    Icon: X,
    ring: "border-danger/50 bg-[color-mix(in_oklab,var(--danger)_16%,transparent)]",
    icon: "text-danger",
  },
  pending: {
    Icon: CircleDashed,
    ring: "border-border bg-surface-raised",
    icon: "text-muted",
  },
};

const overallTone: Record<
  QualificationStatus,
  Parameters<typeof Pill>[0]["tone"]
> = {
  pending: "neutral",
  running: "active",
  passed: "success",
  failed: "danger",
};

const overallLabel: Record<QualificationStatus, string> = {
  pending: "Pending",
  running: "Running",
  passed: "Passed",
  failed: "Failed",
};

function seedStates(
  steps: Step[],
  status: QualificationStatus,
  failingStepId: string,
): StepState[] {
  return steps.map((s, i) => {
    if (status === "passed") return "passed";
    if (status === "pending") return "pending";
    if (status === "running") return i < 2 ? "passed" : i === 2 ? "running" : "pending";
    const failIdx = steps.findIndex((x) => x.id === failingStepId);
    if (i < failIdx) return "passed";
    if (i === failIdx) return "failed";
    return "pending";
  });
}

export function QualificationRunner({
  steps,
  status,
  reason,
  snapshotId,
  digest,
  createdLabel,
}: {
  steps: Step[];
  status: QualificationStatus;
  reason?: string;
  snapshotId: string;
  digest: string;
  createdLabel: string;
}) {
  const failingStepId = reason === "baseline_tests_failed" ? "baseline_tests" : "baseline_tests";
  const [states, setStates] = useState<StepState[]>(() =>
    seedStates(steps, status, failingStepId),
  );
  const [phase, setPhase] = useState<"idle" | "running" | "done" | "failed">(
    status === "passed" ? "done" : status === "failed" ? "failed" : "idle",
  );
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const run = useCallback(
    (fromIdx: number) => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setPhase("running");
      let delay = 0;
      for (let i = fromIdx; i < steps.length; i++) {
        const idx = i;
        timers.current.push(
          setTimeout(() => {
            setStates((prev) => prev.map((s, j) => (j === idx ? "running" : s)));
          }, delay),
        );
        delay += 850;
        timers.current.push(
          setTimeout(() => {
            setStates((prev) => prev.map((s, j) => (j === idx ? "passed" : s)));
            if (idx === steps.length - 1) setPhase("done");
          }, delay),
        );
        delay += 250;
      }
    },
    [steps.length],
  );

  const currentStatus: QualificationStatus =
    phase === "done" ? "passed" : phase === "failed" ? "failed" : phase === "running" ? "running" : "pending";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Pill tone={overallTone[currentStatus]}>{overallLabel[currentStatus]}</Pill>
        {phase === "idle" && (
          <button
            type="button"
            onClick={() => run(0)}
            className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-accent-bright/55 bg-accent px-4 text-[13px] font-medium text-text transition-colors hover:bg-accent-bright/85"
          >
            <Play className="h-4 w-4" strokeWidth={2} />
            Run qualification pipeline
          </button>
        )}
        {phase === "running" && (
          <span className="inline-flex items-center gap-2 text-[12.5px] text-muted">
            <Loader2 className="h-4 w-4 animate-spin text-warning" />
            Running qualification…
          </span>
        )}
        {phase === "failed" && (
          <button
            type="button"
            onClick={() => {
              setStates(seedStates(steps, "pending", failingStepId));
              run(0);
            }}
            className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-border px-4 text-[13px] font-medium text-text transition-colors hover:bg-surface-raised"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2} />
            Re-run qualification
          </button>
        )}
      </div>

      <Panel className="p-6">
        <ol className="relative">
          <span
            aria-hidden
            className="absolute bottom-6 left-[15px] top-6 w-px bg-border"
          />
          {steps.map((step, i) => {
            const state = states[i];
            const { Icon, ring, icon } = stepMeta[state];
            return (
              <li key={step.id} className="relative flex gap-4 pb-7 last:pb-0">
                <span
                  className={cn(
                    "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors",
                    ring,
                  )}
                >
                  <Icon className={cn("h-4 w-4", icon)} strokeWidth={2} />
                </span>
                <div className="pt-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-[14px] font-medium text-text">
                      {step.label}
                    </h3>
                    {state === "failed" && reason && (
                      <span className="font-mono text-[11px] text-danger">
                        {reason}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 max-w-[56ch] text-[12.5px] leading-[1.55] text-muted">
                    {step.description}
                  </p>
                  {state === "passed" && (
                    <p className="mt-1.5 font-mono text-[11px] text-muted">
                      receipt recorded · {createdLabel}
                    </p>
                  )}
                  {state === "running" && (
                    <p className="mt-1.5 font-mono text-[11px] text-warning">
                      executing…
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Panel>

      {phase === "done" && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-success/40 bg-[color-mix(in_oklab,var(--success)_10%,var(--surface))] p-4">
          <p className="text-[13px] text-muted">
            Snapshot <span className="font-mono text-text">{snapshotId}</span> (
            <span className="font-mono text-text">{digest}</span>) is ready for
            defense surface review.
          </p>
          <Link
            href={`/snapshots/${snapshotId}/atlas`}
            className="inline-flex h-9 shrink-0 items-center rounded-[8px] border border-border px-3.5 text-[13px] font-medium text-text transition-colors hover:bg-surface-raised"
          >
            Open Atlas
          </Link>
        </div>
      )}
    </div>
  );
}
