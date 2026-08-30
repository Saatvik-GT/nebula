import type { Metadata } from "next";
import "./globals.css";

/**
 * DIRECTION CONTRACT — kept as a real HTML comment in the emitted markup so it
 * survives the production build and can be audited.
 */
const DIRECTION_CONTRACT = `<!--
DIRECTION CONTRACT — Executable Project Defense (dark instrument shell)
THESIS: A defense console, not a marketing site. The lifecycle IS the layout;
  refuses the SaaS hero-with-screenshot and the gradient card grid.
OWN-WORLD: near-black #0a0b0a ground, one accent-green family (#2f4b3c /
  #4a7a5e), borders before shadows, one ambient radial glow behind the landing
  headline only. System sans for UI, system mono for IDs/tags/digests. 8px
  control radius, 12px panel radius.
STORY: evaluator understands the project becomes the exam, sees the four real
  state-machine stages (Isolate/Inject/Evaluate/Defend), acts via "Create
  defense" and the dashboard's real flows.
FIRST VIEWPORT: landing — centered mono eyebrow, oversized two-line H1 with
  "examination." in muted green, three-line body, filled green CTA with glow,
  mono capability strip; peripheral lifecycle nodes at the four corners joined
  by faint traces; thin animated signal lines under the CTA.
FORM: instrument panel / lifecycle diagram. Spec-pinned world (Nebula
  PROJECT_FRONTEND_SPEC.md + two reference comps). Seed: brief-pinned.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, DESIGN.md, and every shipping raster carrying its
  provenance.
-->`;

export const metadata: Metadata = {
  title: "Executable Project Defense",
  description:
    "Introduce a validated condition inside an isolated copy of a submitted project, then review how the student diagnoses, changes, verifies, and defends it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
