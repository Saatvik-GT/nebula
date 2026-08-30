"use client";

import { RotateCcw } from "lucide-react";

export default function AppError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-[520px] py-20 text-center">
      <h1 className="text-[20px] font-semibold text-text">This page could not be loaded</h1>
      <p className="mt-2 text-[13px] leading-[1.6] text-muted">Your recorded work is unchanged. Retry the request, or return to the dashboard if the problem continues.</p>
      <button onClick={reset} className="mt-5 inline-flex h-9 items-center gap-2 rounded-[8px] border border-border bg-surface px-4 text-[13px] font-medium text-text hover:bg-surface-raised">
        <RotateCcw className="h-4 w-4" /> Retry
      </button>
    </div>
  );
}
