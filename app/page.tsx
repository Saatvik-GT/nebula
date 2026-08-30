import { ArrowDown, ArrowRight, Camera, FlaskConical, Play, Shield, Waypoints } from "lucide-react";
import { TopNav } from "@/components/landing/TopNav";
import { AmbientGlow } from "@/components/landing/AmbientGlow";
import { HeroTraces } from "@/components/landing/HeroTraces";
import { SignalLines } from "@/components/landing/SignalLines";
import { LifecycleNode } from "@/components/landing/LifecycleNode";
import { LandingSections } from "@/components/landing/LandingSections";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-[20px] border border-border bg-page">
        <section
          id="top"
          className="relative flex min-h-[calc(100vh-28px)] flex-col overflow-hidden"
        >
          <AmbientGlow />
          <HeroTraces />
          <TopNav />

          {/* Peripheral lifecycle nodes — map to real state-machine stages */}
          <LifecycleNode
            icon={Camera}
            label="Isolate"
            sublabel="Project snapshot"
            className="left-[5.5%] top-[26%]"
          />
          <LifecycleNode
            icon={FlaskConical}
            label="Inject"
            sublabel="Validated condition"
            className="left-[5.5%] bottom-[24%]"
          />
          <LifecycleNode
            icon={Waypoints}
            label="Evaluate"
            sublabel="Evidence-first"
            align="right"
            className="right-[5.5%] top-[26%]"
          />
          <LifecycleNode
            icon={Shield}
            label="Defend"
            sublabel="In context"
            align="right"
            className="right-[5.5%] bottom-[26%]"
          />

          <div className="relative z-20 mx-auto flex w-full max-w-[1000px] flex-1 flex-col items-center justify-center px-5 pb-28 pt-32 text-center sm:pt-24">
            <a
              href="#how-it-works"
              aria-label="See how it works"
              className="mb-10 grid h-14 w-14 place-items-center rounded-full border border-border bg-surface/70 backdrop-blur-md transition-colors hover:border-accent-bright/60 hover:bg-surface-raised"
            >
              <Play className="h-[15px] w-[15px] translate-x-[1px] fill-text text-text" />
            </a>

            <span className="epd-reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 font-mono text-[12.5px] text-muted backdrop-blur-md">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent-bright"
                style={{ boxShadow: "0 0 8px var(--accent-bright)" }}
              />
              Executable project defense
            </span>

            <h1
              className="epd-reveal mt-8 text-[clamp(2.9rem,8.2vw,6rem)] font-semibold leading-[0.99] tracking-[-0.04em] text-text"
              style={{ animationDelay: "60ms" }}
            >
              <span className="block">The project becomes</span>
              <span className="block text-[color-mix(in_oklab,var(--accent-bright)_56%,var(--muted))]">
                the examination.
              </span>
            </h1>

            <p
              className="epd-reveal mt-8 max-w-[40rem] text-[16.5px] leading-[1.62] text-muted"
              style={{ animationDelay: "120ms" }}
            >
              Introduce a validated condition inside an isolated copy of a
              submitted project, then review how the student diagnoses, changes,
              verifies, and defends it.
            </p>

            <a
              href="/dashboard"
              className="epd-reveal group mt-11 inline-flex h-[56px] items-center gap-3 rounded-[11px] border border-accent-bright px-8 text-[15px] font-medium text-text transition-[background-color,border-color,box-shadow] hover:border-[color-mix(in_oklab,var(--accent-bright)_70%,white)]"
              style={{
                animationDelay: "180ms",
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--accent) 70%, var(--page)) 0%, color-mix(in oklab, var(--accent) 46%, var(--page)) 100%)",
                boxShadow:
                  "0 0 0 1px color-mix(in oklab, var(--accent-bright) 30%, transparent), 0 0 22px -2px color-mix(in oklab, var(--accent-bright) 35%, transparent), 0 1px 0 rgba(255,255,255,0.08) inset, 0 26px 64px -20px rgba(74,122,94,0.8)",
              }}
            >
              Create defense
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>

            <p
              className="epd-reveal mt-10 font-mono text-[12px] tracking-[0.01em] text-muted"
              style={{ animationDelay: "240ms" }}
            >
              Immutable snapshot &nbsp;·&nbsp; Executable checks &nbsp;·&nbsp;
              Evidence-linked findings
            </p>
          </div>

          <SignalLines />

          {/* bottom-left: scroll affordance */}
          <div className="absolute bottom-6 left-5 z-20 hidden items-center gap-3 sm:left-8 sm:flex">
            <a
              href="#how-it-works"
              aria-label="Scroll to how it works"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-text transition-colors hover:border-accent-bright/60 hover:bg-surface-raised"
            >
              <ArrowDown className="h-4 w-4" />
            </a>
            <span className="rounded-full border border-border bg-surface-raised px-3 py-1.5 font-mono text-[11px] text-muted">
              02/03 · Scroll down
            </span>
          </div>

          {/* bottom-right: lifecycle progress */}
          <div className="absolute bottom-8 right-6 z-20 hidden flex-col items-end gap-2 sm:right-8 sm:flex">
            <span className="text-[11px] tracking-[0.02em] text-muted">
              Defense lifecycle
            </span>
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="h-[3px] w-10 rounded-full bg-accent-bright" />
              <span className="h-[3px] w-10 rounded-full bg-border" />
              <span className="h-[3px] w-10 rounded-full bg-border" />
              <span className="h-[3px] w-10 rounded-full bg-border" />
            </span>
          </div>
        </section>

        <LandingSections />
      </div>
    </div>
  );
}
