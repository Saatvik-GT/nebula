import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Below-the-fold content, collapsed into one flush mosaic that stretches nearly
 * edge to edge. Deep, near-black tiles — each keeps a faint hue in its figure
 * and hairlines only. Every number restates a fact already in the Frontend
 * Spec: four real states, the eleven-state machine, the single defense family,
 * the capability strip, the platform version, and the real product routes.
 */

const STAGES = ["Isolate", "Inject", "Evaluate", "Defend"];

const CAPABILITIES = [
  "Immutable snapshot",
  "Executable checks",
  "Evidence-linked findings",
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

const TILE =
  "relative flex flex-col justify-between p-6 lg:p-8 min-h-[190px] text-white " +
  "transition-transform duration-300 hover:-translate-y-0.5";
const NUM =
  "font-sans font-extrabold leading-[0.82] tracking-[-0.045em] text-[clamp(3.25rem,7vw,6rem)]";
const KICKER = "font-mono text-[10.5px] uppercase tracking-[0.22em]";

export function LandingSections() {
  return (
    <div className="relative z-10 border-t border-white/10 bg-black">
      <section id="how-it-works" className="w-full scroll-mt-24 py-12 sm:py-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 px-4 sm:px-6">
          <p className={`${KICKER} text-white/40`}>The defense, at a glance</p>
          <p className={`${KICKER} text-white/25`}>Platform v0.2.0 · Phase 2</p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border-y border-white/12 bg-white/12 lg:h-[82vh] lg:min-h-[640px] lg:grid-cols-12 lg:grid-rows-[1.6fr_1.15fr_0.55fr]">
          {/* T1 — four real states */}
          <article className={`${TILE} bg-[#0d0d0d] lg:col-span-4`}>
            <div>
              <div className="flex items-start gap-4">
                <p className={NUM}>
                  4
                </p>
                <p className={`${KICKER} mt-2 text-white/45`}>
                  Session
                  <br />
                  states
                </p>
              </div>
              <p className="mt-4 max-w-[28ch] text-[13px] leading-snug text-white/70">
                Real state-machine stages the defense walks — nothing inferred.
              </p>
            </div>
            <ol className="space-y-1.5 font-mono text-[12px]">
              {STAGES.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-3 border-t border-white/12 pt-1.5"
                >
                  <span className="text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </article>

          {/* T2 — the state machine */}
          <article className={`${TILE} bg-[#101010] lg:col-span-4`}>
            <div className="flex items-start gap-4">
              <p className={NUM}>
                11
              </p>
              <p className={`${KICKER} mt-2 text-white/45`}>
                States in
                <br />
                the machine
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-[11px] leading-relaxed text-white/70">
                CREATED → BRIEFING → MAP → WORK_INITIAL → VERIFY_INITIAL → STRESS →
                WORK_REVISION → VERIFY_REVISION → DEFEND → SUBMITTED → REPORTED
              </p>
              <p className="text-[12px] leading-snug text-white/45">
                Failed checks loop back; INVALIDATED, EXPIRED and CANCELLED are
                terminal from any state.
              </p>
            </div>
          </article>

          {/* T3 — event-horizon / identity */}
          <article className={`${TILE} overflow-hidden bg-[#0b0b0b] lg:col-span-4`}>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 80% at 60% 45%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%), radial-gradient(closest-side at 60% 45%, rgba(0,0,0,0) 40%, rgba(255,255,255,0.14) 46%, rgba(0,0,0,0) 62%)",
              }}
            />
            <div className="relative flex items-start justify-between">
              <p className="font-display text-[22px] uppercase tracking-[0.02em]">
                Defense
              </p>
              <Link
                href="/dashboard"
                aria-label="Open evaluator dashboard"
                className="group grid h-8 w-8 place-items-center rounded-full border border-white/25"
              >
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="relative">
              <p className="flex items-center gap-2 text-[13px] text-white/80">
                <span className="text-white/40">✦</span> Evidence-linked · 5.0
              </p>
              <p className="mt-2 max-w-[26ch] text-[12px] leading-snug text-white/45">
                Examine the work, not the explanation.
              </p>
            </div>
          </article>

          {/* T4 — single defense family */}
          <article className={`${TILE} bg-[#111111] lg:col-span-5`}>
            <p className={`${KICKER} text-white/45`}>Defense family</p>
            <div className="flex items-end gap-5">
              <p className={NUM}>
                1
              </p>
              <p className="mb-2 font-mono text-[13px] text-white/85">
                duplicate_delivery_v1
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="max-w-[34ch] text-[12px] leading-snug text-white/50">
                One validated condition, compiled and activated inside the frozen
                snapshot after its gates pass.
              </p>
              <span className="shrink-0 font-mono text-[11px] font-semibold text-white/60">
                #Executable_Defense
              </span>
            </div>
          </article>

          {/* T5 — capability strip */}
          <article className={`${TILE} bg-[#0d0d0d] lg:col-span-3`}>
            <p className={`${KICKER} text-white/45`}>What holds it up</p>
            <ul className="space-y-2.5">
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  className="font-display text-[15px] uppercase leading-tight tracking-[-0.01em]"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-[16px] tracking-[0.3em] text-white/25">•••</p>
          </article>

          {/* T6 — identity / call to action */}
          <article className={`${TILE} bg-[#101010] lg:col-span-4`}>
            <p className={`${KICKER} text-white/45`}>Executable Project Defense</p>
            <p className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold uppercase leading-none text-white">
              Defense
              <sup className="ml-0.5 text-[0.5em]">+</sup>
            </p>
            <div>
              <p className="font-mono text-[11px] text-white/55">
                Immutable snapshot · Executable checks
              </p>
              <Link
                href="/dashboard"
                className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold underline-offset-4 hover:underline"
              >
                Create defense →
              </Link>
            </div>
          </article>

          {/* T7 — product surfaces strip */}
          <article
            id="docs"
            className="relative flex flex-col gap-4 bg-[#0b0b0b] p-6 lg:col-span-12 lg:flex-row lg:items-center lg:gap-8 lg:p-7"
          >
            <p className={`${KICKER} shrink-0 text-white/35`}>Product surfaces</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {DOCS.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="group inline-flex items-center gap-1 text-[12.5px] text-white/65 transition-colors hover:text-white"
                  >
                    {d.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* hidden anchors kept so existing nav links still resolve */}
        <span id="features" className="sr-only" />
        <span id="process" className="sr-only" />
        <span id="about" className="sr-only" />
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1720px] flex-col gap-2 px-5 py-8 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
