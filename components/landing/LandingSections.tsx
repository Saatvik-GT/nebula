import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  FlaskConical,
  Link2,
  Lock,
  MessageSquareText,
  Terminal,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

/**
 * Below-the-fold anchor sections for the single landing page. Every item here
 * restates a fact already defined in the Frontend Spec (PART B/D) — the four
 * real state-machine stages, the capability strip, the session flow, and the
 * real product routes. No invented marketing copy, metrics, or testimonials.
 *
 * Visual language: an asymmetric bento of bordered boxes on true black that
 * lift and brighten under the pointer, with rotated frame decorations drifting
 * between them.
 */

type Accent = "blue" | "amber";

const STAGES: {
  name: string;
  sub: string;
  body: string;
  state: string;
  output: string;
  icon: LucideIcon;
  accent: Accent;
  offset: string;
}[] = [
  {
    name: "Isolate",
    sub: "Project snapshot",
    body: "A read-only snapshot of the submitted project is captured. The original is never touched; every defense runs against the immutable copy.",
    state: "MAP",
    output: "snapshot.tar",
    icon: Camera,
    accent: "blue",
    offset: "lg:mt-0",
  },
  {
    name: "Inject",
    sub: "Validated condition",
    body: "A challenge from the duplicate_delivery_v1 family is compiled and activated inside the snapshot after its validation gates pass.",
    state: "WORK_INITIAL",
    output: "challenge.lock",
    icon: FlaskConical,
    accent: "amber",
    offset: "lg:mt-8",
  },
  {
    name: "Evaluate",
    sub: "Evidence-first",
    body: "Sequential and overlapping-delivery checks run in an isolated sandbox. Each run writes a receipt; results drive the session forward or back into revision.",
    state: "VERIFY_INITIAL / STRESS",
    output: "4 receipts",
    icon: Waypoints,
    accent: "blue",
    offset: "lg:mt-5",
  },
  {
    name: "Defend",
    sub: "In context",
    body: "In the DEFEND stage the student explains the diagnosis and the change in the project's own context. The report is assembled from linked evidence.",
    state: "DEFEND",
    output: "report.pdf",
    icon: MessageSquareText,
    accent: "amber",
    offset: "lg:mt-14",
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

const CAPABILITIES: {
  title: string;
  body: string;
  icon: LucideIcon;
  accent: Accent;
  offset: string;
}[] = [
  {
    title: "Immutable snapshot",
    body: "The examined project is frozen at submission. Diagnosis, edits, and verification all happen against a copy that cannot drift.",
    icon: Lock,
    accent: "blue",
    offset: "lg:mt-0",
  },
  {
    title: "Executable checks",
    body: "Findings come from executable sequential and overlap checks rather than a static rubric or inferred confidence score.",
    icon: Terminal,
    accent: "amber",
    offset: "lg:mt-8",
  },
  {
    title: "Evidence-linked findings",
    body: "Every line in the report points back to a check run, a diff, or a receipt. Nothing in the verdict is unsourced.",
    icon: Link2,
    accent: "blue",
    offset: "lg:mt-3",
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

const accentChip: Record<Accent, string> = {
  blue: "bg-accent-bright/15 text-accent-bright ring-1 ring-inset ring-accent-bright/30",
  amber: "bg-[#d29542]/15 text-[#e0a85c] ring-1 ring-inset ring-[#d29542]/30",
};

/** Shared bento surface: sharp-cornered, hairline-framed, lifts under the pointer. */
const BOX =
  "relative flex flex-col rounded-[5px] border border-white/10 bg-white/[0.015] " +
  "transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out " +
  "hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.04] " +
  "hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]";

function Diamond({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute hidden rotate-45 border border-white/10 transition-transform duration-700 ease-out lg:block ${className}`}
    />
  );
}

export function LandingSections() {
  return (
    <div className="relative z-10 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* How it works — lifecycle bento */}
        <section
          id="how-it-works"
          className="group/sec scroll-mt-24 py-16 sm:py-24"
        >
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Lifecycle / four states
          </p>
          <h2 className="mx-auto mt-5 max-w-[22ch] text-center font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold uppercase leading-[1.08] tracking-[-0.01em] text-text text-pretty">
            The defense lifecycle is four real states of the session
          </h2>

          <div className="relative mt-16">
            <Diamond className="left-[-2.5rem] top-24 h-14 w-14 group-hover/sec:-translate-y-3 group-hover/sec:translate-x-2" />
            <Diamond className="right-[-2.5rem] bottom-8 h-20 w-20 group-hover/sec:translate-y-3 group-hover/sec:-translate-x-2" />
            <Diamond className="left-1/2 top-[-2rem] h-9 w-9 group-hover/sec:translate-y-2" />

            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:gap-5">
              {STAGES.map((s, i) => {
                const next = STAGES[i + 1];
                const Icon = s.icon;
                return (
                  <li key={s.name} className={`${BOX} ${s.offset} group p-5`}>
                    <div className="flex items-center justify-between">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-[4px] ${accentChip[s.accent]}`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-[26px] leading-none tabular-nums text-text/12 transition-colors duration-300 group-hover:text-text/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {s.state}
                    </p>
                    <h3 className="mt-2 font-display text-[18px] font-semibold uppercase tracking-[-0.01em] text-text">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-[12.5px] text-muted">{s.sub}</p>

                    <p className="mt-4 flex-1 text-[12.5px] leading-[1.6] text-muted">
                      {s.body}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-text/30">
                        writes
                      </span>
                      <span className="font-mono text-[11.5px] text-text/60 transition-colors duration-300 group-hover:text-accent-bright">
                        {s.output}
                      </span>
                    </div>

                    {next && (
                      <span
                        aria-hidden
                        className="absolute -right-3.5 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[13px] text-white/20 lg:block"
                      >
                        →
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Capabilities bento */}
        <section
          id="features"
          className="group/sec scroll-mt-24 border-t border-white/10 py-16 sm:py-24"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            What holds it up
          </p>
          <h2 className="mt-5 max-w-[28ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold uppercase leading-[1.1] tracking-[-0.01em] text-text text-pretty">
            Immutable snapshot · Executable checks · Evidence-linked findings
          </h2>

          <div className="relative mt-14">
            <Diamond className="right-[10%] top-[-2.5rem] h-12 w-12 group-hover/sec:translate-y-3" />
            <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
              {CAPABILITIES.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className={`${BOX} ${c.offset} group p-6`}>
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-[4px] ${accentChip[c.accent]}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-8 font-mono text-[12px] uppercase tracking-[0.08em] text-text">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.65] text-muted">
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process — state machine in one wide frame */}
        <section
          id="process"
          className="scroll-mt-24 border-t border-white/10 py-16 sm:py-24"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            State machine
          </p>
          <h2 className="mt-5 max-w-[28ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold uppercase leading-[1.1] tracking-[-0.01em] text-text text-pretty">
            Every session walks the same state machine
          </h2>

          <div className="mt-12 rounded-[5px] border border-white/10 bg-white/[0.015] p-5 sm:p-7">
            <div className="flex snap-x gap-2 overflow-x-auto pb-1">
              {FLOW.map((state, i) => (
                <span key={state} className="flex shrink-0 items-center gap-2">
                  <span className="rounded-[4px] border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] tracking-[0.03em] text-muted transition-colors hover:border-accent-bright/40 hover:text-text">
                    {state}
                  </span>
                  {i < FLOW.length - 1 && (
                    <span aria-hidden className="text-white/20">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-[74ch] text-[13px] leading-[1.7] text-muted">
              A failed visible check loops back to WORK_INITIAL. A failed hidden
              check opens WORK_REVISION → VERIFY_REVISION. INVALIDATED, EXPIRED,
              and CANCELLED are terminal from any state. Only one defense family
              exists:{" "}
              <span className="font-mono text-text">duplicate_delivery_v1</span>.
            </p>
          </div>
        </section>

        {/* Docs — surfaces bento */}
        <section
          id="docs"
          className="scroll-mt-24 border-t border-white/10 py-16 sm:py-24"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Jump in
          </p>
          <h2 className="mt-5 max-w-[24ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold uppercase leading-[1.1] tracking-[-0.01em] text-text text-pretty">
            Jump straight into the product surfaces
          </h2>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DOCS.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className={`${BOX} group h-full p-5`}>
                  <ArrowUpRight className="h-4 w-4 self-end text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-bright" />
                  <span className="mt-8 text-[13.5px] text-text">{d.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-white/10 py-16 sm:py-24"
        >
          <div className="grid gap-6 rounded-[5px] border border-white/10 bg-white/[0.015] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-[24ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold uppercase leading-[1.1] tracking-[-0.01em] text-text text-pretty">
                The project becomes the examination
              </h2>
              <p className="mt-6 max-w-[72ch] text-[14px] leading-[1.75] text-muted">
                Executable Project Defense introduces a validated condition inside
                an isolated copy of a submitted project, then reviews how the
                student diagnoses, changes, verifies, and defends it. The snapshot
                is immutable, the checks are executable, and every finding is
                linked to its evidence.
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-text/35">
                Platform v0.2.0 · Phase 2 Prototype
              </p>
            </div>
            <Link
              href="/projects/new"
              className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-[5px] bg-white px-5 text-[13.5px] font-medium text-black transition-colors hover:bg-white/85"
            >
              Import a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-8 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-mono uppercase tracking-[0.18em]">
            Executable Project Defense
          </span>
          <Link href="/dashboard" className="transition-colors hover:text-text">
            Create defense →
          </Link>
        </div>
      </footer>
    </div>
  );
}
