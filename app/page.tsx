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
        <section id="top" className="relative isolate overflow-hidden bg-black">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <BlackHole />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
          </div>

          <div className="mx-auto flex min-h-[680px] max-w-[1200px] items-center px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-[680px]">
            <p className="font-mono text-[12px] text-accent-bright">Executable Project Defense</p>
            <h1 className="mt-6 max-w-[12ch] text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white text-balance">
              Examine the work, not the explanation.
            </h1>
            <p className="mt-7 max-w-[60ch] text-[16px] leading-7 text-white/70 text-pretty">
              Introduce a validated condition inside an isolated copy of a submitted project. Review how the student diagnoses, changes, verifies, and defends it—with evidence attached to every finding.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects/new" className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-accent bg-accent px-5 text-[14px] font-medium text-accent-contrast transition-colors hover:border-accent-bright hover:bg-accent-bright">
                Import a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="inline-flex h-11 items-center rounded-[8px] border border-white/25 bg-white/5 px-5 text-[14px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                Open evaluator workspace
              </Link>
            </div>
            <p className="mt-8 font-mono text-[11px] leading-5 text-white/45">Immutable snapshot · Executable checks · Evidence-linked findings</p>
          </div>
          </div>
        </section>

        <LandingSections />
      </main>
    </div>
  );
}
