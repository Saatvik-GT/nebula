"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

export function BeginSession({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [ack, setAck] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <div className="mt-4 rounded-[12px] border border-border bg-surface p-5">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={ack}
          onChange={(e) => setAck(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent-bright)]"
        />
        <span className="text-[12.5px] leading-[1.55] text-muted">
          I have read the policy disclosure and understand that the snapshot is
          immutable, hidden checks are opaque, and the deadline is fixed.
        </span>
      </label>
      <button
        type="button"
        disabled={busy}
        onClick={() => {
          setBusy(true);
          setTimeout(() => router.push(`/sessions/${sessionId}`), 600);
        }}
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-[8px] border border-accent-bright/55 bg-accent px-5 text-[13.5px] font-medium text-text transition-colors hover:bg-accent-bright/85 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        )}
        Begin session
      </button>
    </div>
  );
}
