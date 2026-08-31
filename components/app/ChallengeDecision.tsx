"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShieldX } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/badges";
import { sessions } from "@/lib/api/mock/resources";
import { cn } from "@/lib/cn";

export function ChallengeDecision({
  gatesPassed,
  gatesTotal,
  initialStatus,
  challengeId,
}: {
  gatesPassed: number;
  gatesTotal: number;
  initialStatus: string;
  challengeId: string;
}) {
  const router = useRouter();
  const allGreen = gatesPassed === gatesTotal;
  const [creating, setCreating] = useState(false);
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(
    initialStatus === "approved"
      ? "approved"
      : initialStatus === "rejected"
        ? "rejected"
        : null,
  );
  const [confirming, setConfirming] = useState<"approve" | "reject" | null>(null);
  const [reason, setReason] = useState("");

  function approveAndCreate() {
    setDecision("approved");
    setCreating(true);
    const target =
      sessions.find((s) => s.challengeId === challengeId) ?? sessions[0];
    setTimeout(() => router.push(`/sessions/${target.id}/brief`), 500);
  }

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
          {decision === "approved" && (
            <button
              type="button"
              disabled={creating}
              onClick={approveAndCreate}
              className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-accent bg-accent text-[13px] font-medium text-accent-contrast transition-colors hover:bg-accent-bright disabled:opacity-50"
            >
              {creating ? "Opening session…" : "Open defense session →"}
            </button>
          )}
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
          {confirming === "approve" ? (
            <div className="rounded-[8px] border border-accent-bright/35 bg-surface-raised p-3">
              <p className="text-[12px] leading-[1.5] text-muted">Create a session from this validated challenge?</p>
              <div className="mt-3 flex gap-2">
                <button type="button" disabled={creating} onClick={approveAndCreate} className="h-8 flex-1 rounded-[8px] bg-accent text-[12px] font-medium text-accent-contrast disabled:opacity-50">{creating ? "Creating session…" : "Approve and create"}</button>
                <button type="button" onClick={() => setConfirming(null)} className="h-8 px-3 text-[12px] text-muted hover:text-text">Cancel</button>
              </div>
            </div>
          ) : confirming === "reject" ? (
            <div className="space-y-2 rounded-[8px] border border-danger/25 bg-surface-raised p-3">
              <label className="block text-[11.5px] text-muted">Reason for rejection
                <textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} className="mt-1.5 w-full resize-none rounded-[8px] border border-border bg-surface px-3 py-2 text-[12px] text-text outline-none focus:border-danger/50" />
              </label>
              <div className="flex gap-2">
                <button type="button" disabled={!reason.trim()} onClick={() => setDecision("rejected")} className="h-8 flex-1 rounded-[8px] border border-danger/40 text-[12px] font-medium text-danger disabled:opacity-40">Record rejection</button>
                <button type="button" onClick={() => setConfirming(null)} className="h-8 px-3 text-[12px] text-muted hover:text-text">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                disabled={!allGreen}
                title={allGreen ? undefined : "Every validation gate must pass before approval."}
                onClick={() => setConfirming("approve")}
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-accent bg-accent text-[13px] font-medium text-accent-contrast transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Check className="h-4 w-4" strokeWidth={2} />
                Approve and create session
              </button>
              <button
                type="button"
                onClick={() => setConfirming("reject")}
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-border text-[13px] font-medium text-text transition-colors hover:border-danger/50 hover:bg-[color-mix(in_oklab,var(--danger)_12%,transparent)]"
              >
                <ShieldX className="h-4 w-4" strokeWidth={2} />
                Reject candidate
              </button>
            </>
          )}
        </div>
      )}
    </Panel>
  );
}
