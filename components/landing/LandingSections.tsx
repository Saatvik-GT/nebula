import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  FlaskConical,
  MessageSquareText,
  Waypoints,
} from "lucide-react";

/**
 * Below-the-fold anchor sections for the single landing page. Every item here
 * restates a fact already defined in the Frontend Spec (PART B/D) — the four
 * real state-machine stages, the capability strip, the session flow, and the
 * real product routes. No invented marketing copy, metrics, or testimonials.
 */

const STAGES = [
  {
    icon: Camera,
    name: "Isolate",
    sub: "Project snapshot",
    body: "A read-only snapshot of the submitted project is captured. The original is never touched; every defense runs against the immutable copy.",
    state: "MAP",
  },
  {
    icon: FlaskConical,
    name: "Inject",
    sub: "Validated condition",
    body: "A challenge from the duplicate_delivery_v1 family is compiled and activated inside the snapshot after its validation gates pass.",
    state: "WORK_INITIAL",
  },
  {
    icon: Waypoints,
    name: "Evaluate",
    sub: "Evidence-first",
    body: "Sequential and overlapping-delivery checks run in an isolated sandbox. Each run writes a receipt; results drive the session forward or back into revision.",
    state: "VERIFY_INITIAL / STRESS",
  },
  {
    icon: MessageSquareText,
    name: "Defend",
    sub: "In context",
    body: "In the DEFEND stage the student explains the diagnosis and the change in the project's own context. The report is assembled from linked evidence.",
    state: "DEFEND",
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
        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
          <SectionHead title="The defense lifecycle is four real states of the session" />
          <ol className="mt-12 grid gap-y-10 border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((s, i) => (
              <li key={s.name} className="relative py-6 sm:pr-8 lg:border-r lg:border-border lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-surface">
                    <s.icon className="h-4 w-4 text-accent-bright" strokeWidth={1.75} />
                  </span>
                </div>
                <p className="mt-5 font-mono text-[11px] text-muted">
                  Stage {i + 1} — {s.state}
                </p>
                <h3 className="mt-1.5 text-[16px] font-semibold text-text">
                  {s.name}
                </h3>
                <p className="text-[12.5px] text-muted">{s.sub}</p>
                <p className="mt-3 max-w-[38ch] text-[13px] leading-[1.6] text-muted">
                  {s.body}
                </p>
              </li>
            ))}
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
