"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { cn } from "@/lib/cn";

function Toggle({
  label,
  hint,
  defaultOn = false,
}: {
  label: string;
  hint?: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border py-4 last:border-0">
      <div>
        <p className="text-[13px] font-medium text-text">{label}</p>
        {hint && <p className="mt-0.5 text-[12px] text-muted">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative mt-0.5 h-5 w-9 shrink-0 rounded-full border transition-colors",
          on
            ? "border-accent-bright/60 bg-accent"
            : "border-border bg-surface-raised",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-3.5 w-3.5 rounded-full bg-text transition-transform",
            on ? "translate-x-[18px]" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

function SelectRow({
  label,
  hint,
  options,
}: {
  label: string;
  hint?: string;
  options: string[];
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-4 last:border-0">
      <div>
        <p className="text-[13px] font-medium text-text">{label}</p>
        {hint && <p className="mt-0.5 text-[12px] text-muted">{hint}</p>}
      </div>
      <select className="h-9 rounded-[8px] border border-border bg-surface px-3 text-[13px] text-text outline-none focus:border-accent-bright/60">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function SettingsForm() {
  return (
    <div className="space-y-4">
      <Panel className="px-5 py-2">
        <div className="py-3">
          <h2 className="text-[13px] font-semibold text-text">Profile</h2>
        </div>
        <div className="grid gap-4 border-t border-border py-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-text">
              Display name
            </span>
            <input
              defaultValue="Aditya Prashar"
              className="h-9 w-full rounded-[8px] border border-border bg-surface px-3 text-[13px] text-text outline-none focus:border-accent-bright/60"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-text">
              Role
            </span>
            <input
              disabled
              value="Evaluator"
              className="h-9 w-full rounded-[8px] border border-border bg-surface-raised px-3 text-[13px] text-muted"
            />
          </label>
        </div>
      </Panel>

      <Panel className="px-5 py-2">
        <div className="py-3">
          <h2 className="text-[13px] font-semibold text-text">Session defaults</h2>
        </div>
        <div className="border-t border-border">
          <SelectRow
            label="Default deadline"
            hint="Applied to new defense sessions unless overridden."
            options={["2 hours", "4 hours", "8 hours", "24 hours"]}
          />
          <SelectRow
            label="Hidden stress intensity"
            hint="Concurrency level for the hidden suite."
            options={["Standard", "Aggressive"]}
          />
          <Toggle
            label="Auto-open report on submission"
            hint="Jump to the report view when a session reaches REPORTED."
            defaultOn
          />
        </div>
      </Panel>

      <Panel className="px-5 py-2">
        <div className="py-3">
          <h2 className="text-[13px] font-semibold text-text">Notifications</h2>
        </div>
        <div className="border-t border-border">
          <Toggle label="Validation run completes" defaultOn />
          <Toggle label="Session enters DEFEND" defaultOn />
          <Toggle label="Infrastructure component degraded" />
        </div>
      </Panel>
    </div>
  );
}
