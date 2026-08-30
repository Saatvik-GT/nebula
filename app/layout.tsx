import type { Metadata } from "next";
import "./globals.css";

/**
 * DIRECTION CONTRACT — kept as a real HTML comment in the emitted markup so it
 * survives the production build and can be audited.
 */
const DIRECTION_CONTRACT = `<!--
DIRECTION CONTRACT — Executable Project Defense
THESIS: A defense console, not a marketing site. The lifecycle IS the layout;
  refuses the SaaS hero-with-screenshot and the gradient card grid.
OWN-WORLD: quiet light evaluator shell, focused dark defense workspace, one
  mineral-blue identity family, and borders before shadows. Green is reserved
  for passed/healthy state. System sans for UI,
  system mono for IDs/tags/digests. 8px control radius, 12px panel radius.
STORY: evaluator understands the project becomes the exam, sees the four real
  state-machine stages (Isolate/Inject/Evaluate/Defend), acts via "Create
  defense" and the dashboard's real flows.
FIRST VIEWPORT: landing — direct left-aligned proposition, paired import and
  workspace actions, and a compact evidence-flow preview using real session
  states. The same cool-neutral surfaces and mineral-blue identity continue
  directly into the evaluator shell.
FORM: evaluator workspace / evidence ledger. Spec-pinned world (Nebula
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
