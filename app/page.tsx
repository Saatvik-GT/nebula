import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopNav } from "@/components/landing/TopNav";
import { LandingSections } from "@/components/landing/LandingSections";
import { BlackHole } from "@/components/landing/black-hole/BlackHole";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-page text-text">
      <TopNav />
      <main>
        <section
          id="top"
          className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-black"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <BlackHole />
            {/* Only the zones that carry text are darkened; the black hole stays crisp everywhere else. */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>

          {/* Editorial index tick — deliberately off the reading axis */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-6 top-1/2 hidden origin-left -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.5em] text-white/25 xl:block"
          >
            01 — Executable Defense
          </span>

          {/* Top rail */}
          <div className="epd-reveal mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 pt-6 sm:px-10">
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent-bright"
                style={{ animation: "epd-pulse-dot 2.4s ease-in-out infinite" }}
              />
              Executable Project Defense
            </p>
            <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/35 sm:block">
              Live model · geodesic bake
            </p>
          </div>

          <div className="flex-1" />

          {/* Bottom-anchored editorial block */}
          <div className="mx-auto w-full max-w-[1280px] px-5 pb-10 sm:px-10 sm:pb-14">
            <div className="relative h-px w-full overflow-hidden bg-white/12">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent-bright/70 to-transparent"
                style={{ animation: "epd-rule-sweep 6s ease-in-out infinite" }}
              />
            </div>

            <div className="mt-7 grid gap-x-10 gap-y-8 lg:grid-cols-12">
              <h1 className="epd-reveal font-display text-[clamp(1.7rem,3.6vw,3rem)] font-semibold uppercase leading-[1.04] tracking-[-0.01em] text-white lg:col-span-7">
                Examine the work,
                <br />
                <span className="text-white/55">not</span> the explanation.
              </h1>

              <div
                className="epd-reveal flex flex-col gap-5 lg:col-span-5 lg:items-end lg:text-right"
                style={{ animationDelay: "80ms" }}
              >
                <p className="max-w-[46ch] text-[13.5px] leading-[1.65] text-white/65">
                  A validated condition is introduced inside an isolated copy of a submitted
                  project — then you review how the student diagnoses, changes, verifies, and
                  defends it, with evidence on every finding.
                </p>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link
                    href="/projects/new"
                    className="group inline-flex h-11 items-center gap-2 rounded-[8px] bg-white px-5 text-[13.5px] font-medium text-black transition-colors hover:bg-white/85"
                  >
                    Import a project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex h-11 items-center rounded-[8px] border border-white/20 px-5 text-[13.5px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
                  >
                    Open evaluator workspace
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-9 font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/35">
              Immutable snapshot &nbsp;·&nbsp; Executable checks &nbsp;·&nbsp; Evidence-linked findings
            </p>
          </div>
        </section>

        <LandingSections />
      </main>
    </div>
  );
}
