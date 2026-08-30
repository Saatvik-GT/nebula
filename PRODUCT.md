# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + React + TypeScript, Tailwind CSS v4, Recharts (dashboard
validation chart only), Lucide icons, Monaco Editor (session workspace), React
Flow / @xyflow/react (snapshot Atlas graph). Delegated to this stack by the
build brief (Nebula/PROJECT_FRONTEND_SPEC.md, Part E). No Redux, no second
component framework, no animation framework beyond CSS transitions.

## Users

Primary user: an **evaluator** running executable project defenses. They import
a student's submitted project, review the compiled challenge and its validation
gates, watch the session progress through the state machine, and read the
evidence-linked report. A secondary actor (the **student**) works inside the
`/sessions/:id` workspace, but every screen in this build is the evaluator's
view.

## Product Purpose

Executable Project Defense turns a submitted project into the examination. It
introduces a validated condition inside an isolated, immutable copy of the
project, then reviews how the student diagnoses, changes, verifies, and defends
it. Success is a defensible verdict where every finding is linked to a check
run, a diff, or a receipt — nothing entered by hand.

## Positioning

The examined artifact is the exam. A frozen snapshot, executable visible and
hidden check suites, and an append-only evidence trail — rather than a rubric
applied to a static submission.

## Operating Context

- Session state machine (authoritative): CREATED → BRIEFING → MAP →
  WORK_INITIAL → VERIFY_INITIAL → STRESS → WORK_REVISION → VERIFY_REVISION →
  DEFEND → SUBMITTED → REPORTED. Terminal from any state: INVALIDATED, EXPIRED,
  CANCELLED. A failed visible check loops to WORK_INITIAL; a failed hidden check
  opens WORK_REVISION → VERIFY_REVISION. `SUBMITTED_INCOMPLETE` when the
  deadline lapses before submission.
- One defense family only: `duplicate_delivery_v1`.
- Qualification pipeline before a project can host a defense: source import →
  snapshot → baseline build → baseline tests → Atlas index.
- Backing resources (Part D): projects, project_snapshots, defense_surfaces,
  challenges, validation_runs, validation_gates, defense_sessions,
  evidence_events, check_runs, reports, jobs.

## Capabilities and Constraints

- Surfaces built: landing `/`; evaluator dashboard `/dashboard`; list views for
  projects, atlas, challenges, sessions, reports, evidence, validation, workers,
  settings, audit; and the seven detail routes from Part B §3
  (`/projects/new`, `/projects/:id/qualification`, `/snapshots/:id/atlas`,
  `/challenges/:id`, `/sessions/:id/brief`, `/sessions/:id`,
  `/sessions/:id/report`).
- No backend in this build. Dashboard data is served through a typed API client
  (`lib/api/client.ts`) against the `DashboardDto` contract
  (`lib/contracts/dashboard.ts`); a fixture module satisfies the schema. Other
  surfaces read from `lib/api/mock/resources.ts`, every field mapped to a Part D
  table.
- Session-state badges must render the exact `SessionState` string — never a
  shortened or renamed label.
- No invented routes, nav items, stats, DTO fields, or product copy beyond the
  spec. No pricing, testimonials, partner logos, or self-serve signup.

## Brand Commitments

- Name: **Executable Project Defense** (app shell wordmark: "Defense").
- Dark shell everywhere — no light-mode variant in this build.
- Single accent-green family for primary actions, active nav, healthy/passed
  status, and progress. Amber and red are reserved strictly for
  in-progress and failed — never decorative.
- Borders before shadows. Exactly one soft ambient radial glow is permitted,
  behind the landing hero only.
- System sans for UI text; system monospace for tags, IDs, digests, and
  technical strings.
- Reference comps: `Nebula/landingpage.png` (landing), `Nebula/dashboard.png`
  (dashboard). The build matches their structure and mood.

## Evidence on Hand

- `Nebula/PROJECT_FRONTEND_SPEC.md` — the final, self-contained build brief
  (tokens, pages, component contracts in Part C, backing resources in Part D).
- Two reference images (landing, dashboard).
- No real backend, users, metrics, or customer data. All dashboard figures,
  session ids, challenge ids, and evidence events in this build are
  scaffolding fixtures that satisfy the contract types; replace with a real
  transport by pointing `NEXT_PUBLIC_EPD_API_BASE` at the backend.

## Product Principles

1. Nothing on screen is fabricated: every tile, row, and badge maps to a real
   Part D table/state, or it is not shown.
2. Outcome state always pairs colour with text or icon; the accent-green family
   carries identity, amber/red carry only in-progress/failed.
3. The lifecycle is the information architecture — landing nodes, dashboard
   panels, and session badges all speak the same state-machine vocabulary.
4. Evidence-first: reports, activity feeds, and audit logs are views onto one
   append-only evidence trail, never separate feeds.
5. Keyboard-accessible controls with a visible `--accent-bright` focus ring;
   motion 120–200ms and `prefers-reduced-motion` respected.

## Accessibility & Inclusion

Every control keyboard accessible with a visible focus ring in
`--accent-bright`. Body/placeholder text meets WCAG AA contrast on the dark
surfaces. Outcome states never rely on colour alone.
