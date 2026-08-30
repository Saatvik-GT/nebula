"use client";

import { useState } from "react";
import { Check, ShieldX } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/badges";
import { cn } from "@/lib/cn";

export function ChallengeDecision({
  gatesPassed,
  gatesTotal,
  initialStatus,
}: {
  gatesPassed: number;
  gatesTotal: number;
  initialStatus: string;
}) {
  const allGreen = gatesPassed === gatesTotal;
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(
    initialStatus === "approved"
      ? "approved"
      : initialStatus === "rejected"
        ? "rejected"
        : null,
  );

  return (
    <Panel className="p-5">
      <h2 className="text-[13px] font-semibold text-text">Evaluator decision</h2>
      <p className="mt-1 text-[12px] leading-[1.55] text-muted">
        Approving compiles this challenge into a session-ready condition. It
        cannot be approved while any validation gate is unmet.
      </p>

      <div className="mt-4 flex items-center justify-between rounded-[8px] border border-border bg-surface-raised px-3 py-2 text-[12px]">
        <span className="text-muted">Validation gates</span>
        <span className={cn("tnum font-medium", allGreen ? "text-success" : "text-warning")}>
          {gatesPassed} / {gatesTotal} passed
        </span>
      </div>

      {decision ? (
        <div className="mt-4">
          <Pill tone={decision === "approved" ? "success" : "danger"}>
            {decision === "approved" ? "Approved" : "Rejected"}
          </Pill>
          <button
            type="button"
            onClick={() => setDecision(null)}
            className="mt-3 block text-[12px] text-muted underline-offset-2 hover:text-text hover:underline"
          >
            Reset decision
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={() => setDecision("approved")}
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-accent-bright/55 bg-accent text-[13px] font-medium text-text transition-colors hover:bg-accent-bright/85"
          >
            <Check className="h-4 w-4" strokeWidth={2} />
            Approve challenge
          </button>
          <button
            type="button"
            onClick={() => setDecision("rejected")}
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-border text-[13px] font-medium text-text transition-colors hover:border-danger/50 hover:bg-[color-mix(in_oklab,var(--danger)_12%,transparent)]"
          >
            <ShieldX className="h-4 w-4" strokeWidth={2} />
            Reject
          </button>
        </div>
      )}
    </Panel>
  );
}
