"use client";

import { useState } from "react";
import { FileCheck2, Receipt, ShieldCheck, X } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/badges";
import type {
  CheckRun,
  Report,
  Session,
} from "@/lib/api/mock/resources";
import { cn } from "@/lib/cn";

type Finding = {
  id: string;
  title: string;
  severity: "info" | "minor" | "major";
  evidence: string;
  body: string;
};
type DiffHunk = { file: string; lines: { kind: "ctx" | "add" | "del"; text: string }[] };

const severityTone: Record<Finding["severity"], Parameters<typeof Pill>[0]["tone"]> = {
  info: "success",
  minor: "warning",
  major: "danger",
};

const suiteLabel: Record<CheckRun["suite"], string> = {
  visible: "Visible",
  hidden_stress: "Hidden stress",
  regression: "Regression",
};

export function ReportView({
  session,
  report,
  checkRuns,
  findings,
  diffHunks,
  snapshotDigest,
}: {
  session: Session;
  report: Report;
  checkRuns: CheckRun[];
  findings: Finding[];
  diffHunks: DiffHunk[];
  snapshotDigest: string;
}) {
  const [openFinding, setOpenFinding] = useState<Finding | null>(null);

  const passCount = checkRuns.filter((c) => c.result === "pass").length;

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {/* check matrix */}
          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="text-[13px] font-semibold text-text">Check matrix</h2>
              <span className="tnum text-[12px] text-success">
                {passCount} / {checkRuns.length} passed
              </span>
            </div>
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-border text-[10.5px] uppercase tracking-[0.06em] text-muted">
                  <th className="px-5 py-2.5 font-medium">Suite</th>
                  <th className="px-3 py-2.5 font-medium">Check</th>
                  <th className="px-3 py-2.5 font-medium">Result</th>
                  <th className="px-3 py-2.5 font-medium">Duration</th>
                  <th className="px-5 py-2.5 font-medium">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {checkRuns.map((c) => (
                  <tr key={c.id}>
                    <td className="px-5 py-2.5 text-muted">{suiteLabel[c.suite]}</td>
                    <td className="px-3 py-2.5 text-text">{c.name}</td>
                    <td className="px-3 py-2.5">
                      <span
                        className={cn(
                          "font-mono text-[11px] uppercase",
                          c.result === "pass" ? "text-success" : "text-danger",
                        )}
                      >
                        {c.result}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 tnum text-muted">{c.durationMs}ms</td>
                    <td className="px-5 py-2.5">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-accent-bright">
                        <Receipt className="h-3 w-3" />
                        {c.id}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          {/* diff */}
          <Panel className="overflow-hidden">
            <div className="border-b border-border px-5 py-3">
              <h2 className="text-[13px] font-semibold text-text">
                Change under review
              </h2>
            </div>
            {diffHunks.map((h) => (
              <div key={h.file}>
                <p className="border-b border-border bg-surface-raised px-5 py-2 font-mono text-[11px] text-muted">
                  {h.file}
                </p>
                <pre className="overflow-x-auto px-5 py-3 font-mono text-[11.5px] leading-[1.65]">
                  {h.lines.map((l, i) => (
                    <div
                      key={i}
                      className={cn(
                        "whitespace-pre",
                        l.kind === "add" &&
                          "bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-[color-mix(in_oklab,var(--success)_82%,white)]",
                        l.kind === "del" &&
                          "bg-[color-mix(in_oklab,var(--danger)_12%,transparent)] text-[color-mix(in_oklab,var(--danger)_82%,white)]",
                        l.kind === "ctx" && "text-muted",
                      )}
                    >
                      {l.kind === "add" ? "+ " : l.kind === "del" ? "- " : "  "}
                      {l.text}
                    </div>
                  ))}
                </pre>
              </div>
            ))}
          </Panel>

          {/* findings */}
          <Panel className="overflow-hidden">
            <div className="border-b border-border px-5 py-3">
              <h2 className="text-[13px] font-semibold text-text">Findings</h2>
            </div>
            <ul className="divide-y divide-border">
              {findings.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setOpenFinding(f)}
                    className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-surface-raised"
                  >
                    <Pill tone={severityTone[f.severity]}>{f.severity}</Pill>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-text">
                        {f.title}
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] text-muted">
                        {f.evidence}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* integrity rail */}
        <div className="space-y-4">
          <Panel className="p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" strokeWidth={2} />
              <h2 className="text-[13px] font-semibold text-text">Integrity</h2>
            </div>
            <p className="mt-2 text-[12px] leading-[1.55] text-muted">
              Every figure in this report is derived from a recorded check run,
              diff, or receipt. Nothing is entered by hand.
            </p>
            <dl className="mt-4 space-y-2.5 text-[12px]">
              <Row label="Report version" value={report.reportVersion} mono />
              <Row label="Facts digest" value={report.factsDigest} mono />
              <Row label="Snapshot digest" value={snapshotDigest} mono />
              <Row label="Session state" value={session.state} mono />
            </dl>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-accent-bright" strokeWidth={2} />
              <h2 className="text-[13px] font-semibold text-text">Export</h2>
            </div>
            <button className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-[8px] border border-border text-[12.5px] font-medium text-text hover:bg-surface-raised">
              Download signed report
            </button>
          </Panel>
        </div>
      </div>

      {/* evidence drawer */}
      {openFinding && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close evidence"
            onClick={() => setOpenFinding(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border-l border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <h3 className="text-[13px] font-semibold text-text">Evidence</h3>
              <button
                onClick={() => setOpenFinding(null)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-[8px] border border-border text-muted hover:text-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <Pill tone={severityTone[openFinding.severity]}>
                {openFinding.severity}
              </Pill>
              <h4 className="mt-3 text-[14px] font-medium text-text">
                {openFinding.title}
              </h4>
              <p className="mt-2 text-[13px] leading-[1.65] text-muted">
                {openFinding.body}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                Linked evidence
              </p>
              <div className="mt-2 space-y-1.5">
                {openFinding.evidence.split(" · ").map((e) => (
                  <div
                    key={e}
                    className="flex items-center gap-2 rounded-[8px] border border-border bg-surface-raised px-3 py-2 font-mono text-[11.5px] text-text"
                  >
                    <Receipt className="h-3.5 w-3.5 text-accent-bright" />
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-2.5 last:border-0 last:pb-0">
      <dt className="text-muted">{label}</dt>
      <dd className={cn("text-right text-text", mono && "font-mono text-[11px]")}>
        {value}
      </dd>
    </div>
  );
}
