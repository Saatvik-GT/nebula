import Link from "next/link";
import { ArrowRight, Check, FileCheck2, GitBranch, MessageSquareText } from "lucide-react";
import { TopNav } from "@/components/landing/TopNav";
import { LandingSections } from "@/components/landing/LandingSections";

const EVIDENCE_FLOW = [
  { label: "Snapshot isolated", detail: "snap_demo", icon: GitBranch },
  { label: "Challenge validated", detail: "duplicate_delivery_v1", icon: Check },
  { label: "Checks recorded", detail: "4 evidence receipts", icon: FileCheck2 },
  { label: "Defense submitted", detail: "evidence-linked report", icon: MessageSquareText },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-page text-text">
      <TopNav />
      <main>
        <section id="top" className="mx-auto grid min-h-[680px] max-w-[1200px] items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
          <div className="max-w-[680px]">
            <p className="font-mono text-[12px] text-accent-bright">Executable Project Defense</p>
            <h1 className="mt-6 max-w-[12ch] text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance">
              Examine the work, not the explanation.
            </h1>
            <p className="mt-7 max-w-[60ch] text-[16px] leading-7 text-muted text-pretty">
              Introduce a validated condition inside an isolated copy of a submitted project. Review how the student diagnoses, changes, verifies, and defends it—with evidence attached to every finding.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects/new" className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-accent bg-accent px-5 text-[14px] font-medium text-accent-contrast transition-colors hover:border-accent-bright hover:bg-accent-bright">
                Import a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="inline-flex h-11 items-center rounded-[8px] border border-border bg-surface px-5 text-[14px] font-medium text-text transition-colors hover:bg-surface-raised">
                Open evaluator workspace
              </Link>
            </div>
            <p className="mt-8 font-mono text-[11px] leading-5 text-muted">Immutable snapshot · Executable checks · Evidence-linked findings</p>
          </div>

          <div className="border-y border-border bg-surface lg:rounded-[12px] lg:border">
            <div className="flex items-start justify-between gap-6 border-b border-border px-5 py-4">
              <div>
                <p className="text-[13.5px] font-semibold">Defense evidence</p>
                <p className="mt-1 text-[12px] text-muted">Session #DEF-2024-018</p>
              </div>
              <span className="font-mono text-[11px] text-accent-bright">REPORTED</span>
            </div>
            <ol className="divide-y divide-border">
              {EVIDENCE_FLOW.map((item, index) => (
                <li key={item.label} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 px-5 py-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-border bg-surface-raised">
                    <item.icon className="h-3.5 w-3.5 text-accent-bright" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium">{item.label}</span>
                    <span className="mt-0.5 block font-mono text-[10.5px] text-muted">{item.detail}</span>
                  </span>
                  <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-between gap-4 border-t border-border bg-surface-raised px-5 py-4">
              <span className="text-[12px] text-muted">Every conclusion has a receipt.</span>
              <Link href="/sessions/DEF-2024-018/report" className="text-[12px] font-medium text-accent-bright hover:text-text">View report →</Link>
            </div>
          </div>
        </section>
        <LandingSections />
      </main>
    </div>
  );
}
