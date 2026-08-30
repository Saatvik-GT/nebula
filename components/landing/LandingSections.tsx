import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Below-the-fold anchor sections for the single landing page. Every item here
 * restates a fact already defined in the Frontend Spec (PART B/D) — the four
 * real state-machine stages, the capability strip, the session flow, and the
 * real product routes. No invented marketing copy, metrics, or testimonials.
 */

const STAGES = [
  {
    name: "Isolate",
    sub: "Project snapshot",
    body: "A read-only snapshot of the submitted project is captured. The original is never touched; every defense runs against the immutable copy.",
    state: "MAP",
    output: "snapshot.tar",
  },
  {
    name: "Inject",
    sub: "Validated condition",
    body: "A challenge from the duplicate_delivery_v1 family is compiled and activated inside the snapshot after its validation gates pass.",
    state: "WORK_INITIAL",
    output: "challenge.lock",
  },
  {
    name: "Evaluate",
    sub: "Evidence-first",
    body: "Sequential and overlapping-delivery checks run in an isolated sandbox. Each run writes a receipt; results drive the session forward or back into revision.",
    state: "VERIFY_INITIAL / STRESS",
    output: "4 receipts",
  },
  {
    name: "Defend",
    sub: "In context",
    body: "In the DEFEND stage the student explains the diagnosis and the change in the project's own context. The report is assembled from linked evidence.",
    state: "DEFEND",
    output: "report.pdf",
  },
];

const FLOW = [
  "CREATED",
  "BRIEFING",
  "MAP",
  "WORK_INITIAL",
  "VERIFY_INITIAL",
  "STRESS",
  "WORK_REVISION",
  "VERIFY_REVISION",
  "DEFEND",
  "SUBMITTED",
  "REPORTED",
];

const CAPABILITIES = [
  {
    title: "Immutable snapshot",
    body: "The examined project is frozen at submission. Diagnosis, edits, and verification all happen against a copy that cannot drift.",
  },
  {
    title: "Executable checks",
    body: "Findings come from executable sequential and overlap checks rather than a static rubric or inferred confidence score.",
  },
  {
    title: "Evidence-linked findings",
    body: "Every line in the report points back to a check run, a diff, or a receipt. Nothing in the verdict is unsourced.",
  },
];

const DOCS = [
  { label: "Import a project", href: "/projects/new" },
  { label: "Qualification timeline", href: "/projects/demo-commerce/qualification" },
  { label: "Snapshot Atlas", href: "/snapshots/snap_demo/atlas" },
  { label: "Challenge review", href: "/challenges/8f3a2" },
  { label: "Session brief", href: "/sessions/DEF-2024-018/brief" },
  { label: "Defense workspace", href: "/sessions/DEF-2024-018" },
  { label: "Defense report", href: "/sessions/DEF-2024-018/report" },
  { label: "Evaluator dashboard", href: "/dashboard" },
];

export function LandingSections() {
  return (
    <div className="relative z-10 border-t border-border bg-page">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* How it works — numbered state ledger */}
        <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
            Lifecycle / four states
          </p>
          <div className="mt-4">
            <SectionHead title="The defense lifecycle is four real states of the session" />
          </div>

          <ol className="mt-14 border-t border-border">
            {STAGES.map((s, i) => {
              const next = STAGES[i + 1];
              return (
                <li
                  key={s.name}
                  className="group relative grid grid-cols-1 gap-x-10 gap-y-4 border-b border-border py-8 md:grid-cols-[7rem_1fr] md:py-9 lg:grid-cols-[7rem_15rem_1fr_9rem]"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 hidden h-full w-px origin-top scale-y-0 bg-accent-bright transition-transform duration-500 group-hover:scale-y-100 md:block"
                  />
                  <div className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-none tabular-nums text-text/15 transition-colors duration-300 group-hover:text-accent-bright/70">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="md:pt-2">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
                      {s.state}
                    </p>
                    <h3 className="mt-2 font-display text-[17px] font-semibold uppercase tracking-[-0.01em] text-text">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-[12.5px] text-muted">{s.sub}</p>
                    {next && (
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text/25">
                        ↓ {next.state.split(" / ")[0]}
                      </p>
                    )}
                  </div>

                  <p className="max-w-[54ch] text-[13px] leading-[1.7] text-muted md:pt-2 lg:self-start lg:text-[13.5px]">
                    {s.body}
                  </p>

                  <div className="hidden lg:block lg:pt-2 lg:text-right">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-text/30">
                      writes
                    </p>
                    <p className="mt-1.5 font-mono text-[12px] text-text/55 transition-colors duration-300 group-hover:text-accent-bright">
                      {s.output}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-24 border-t border-border py-20 sm:py-28"
        >
          <SectionHead title="Immutable snapshot · Executable checks · Evidence-linked findings" />
          <dl className="mt-12 divide-y divide-border border-y border-border">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8"
              >
                <dt className="font-mono text-[12px] uppercase tracking-[0.06em] text-text">
                  {c.title}
                </dt>
                <dd className="max-w-[62ch] text-[13.5px] leading-[1.65] text-muted">
                  {c.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Process */}
        <section
          id="process"
          className="scroll-mt-24 border-t border-border py-20 sm:py-28"
        >
          <SectionHead title="Every session walks the same state machine" />
          <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-3">
            {FLOW.map((state, i) => (
              <span key={state} className="flex items-center gap-2">
                <span className="rounded-[6px] border border-border bg-surface px-3 py-1.5 font-mono text-[11px] tracking-[0.03em] text-muted">
                  {state}
                </span>
                {i < FLOW.length - 1 && (
                  <span aria-hidden className="text-border">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-[70ch] text-[13px] leading-[1.65] text-muted">
            A failed visible check loops back to WORK_INITIAL. A failed hidden
            check opens WORK_REVISION → VERIFY_REVISION. INVALIDATED, EXPIRED, and
            CANCELLED are terminal from any state. Only one defense family exists:{" "}
            <span className="font-mono text-text">duplicate_delivery_v1</span>.
          </p>
        </section>

        {/* Docs */}
        <section
          id="docs"
          className="scroll-mt-24 border-t border-border py-20 sm:py-28"
        >
          <SectionHead title="Jump straight into the product surfaces" />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-border bg-border sm:grid-cols-2">
            {DOCS.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="flex items-center justify-between gap-4 bg-surface px-5 py-4 text-[13.5px] text-text transition-colors hover:bg-surface-raised"
                >
                  {d.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-border py-20 sm:py-28"
        >
          <SectionHead title="The project becomes the examination" />
          <p className="mt-8 max-w-[70ch] text-[15px] leading-[1.7] text-muted">
            Executable Project Defense introduces a validated condition inside an
            isolated copy of a submitted project, then reviews how the student
            diagnoses, changes, verifies, and defends it. The snapshot is
            immutable, the checks are executable, and every finding is linked to
            its evidence.
          </p>
          <p className="mt-6 font-mono text-[11px] text-muted">
            Platform v0.2.0 · Phase 2 Prototype
          </p>
        </section>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-8 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-mono uppercase tracking-[0.14em]">
            Executable Project Defense
          </span>
          <Link href="/dashboard" className="hover:text-text">
            Create defense →
          </Link>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <h2 className="max-w-[46ch] font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.01em] text-text text-pretty">
      {title}
    </h2>
  );
}
