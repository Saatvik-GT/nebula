# UI/UX Hardening ExecPlan

Status: complete

## Objective

Make the complete evaluator-to-student journey intuitive, restrained, and
recordable at 1440×900 while remaining usable at 1024×768. Preserve the typed
mock boundary and authoritative product semantics from
`../bytebuilt/EXECUTABLE_PROJECT_DEFENSE_FINAL_V1/FRONTEND_SPEC.md`.

## Constraints

- Do not invent routes, resources, metrics, or backend transitions.
- The evaluator shell is light; the defense workspace is dark.
- Never expose hidden verifier names, source, or expected failures to students.
- The client may demonstrate interaction state, but must not imply a successful
  server mutation that does not exist.
- Below 1024px, the defense workspace must show an unsupported-width notice.
- No new dependencies.

## Milestones

1. **Shell and orientation**
   - Reduce navigation emphasis to the canonical evaluator workflow.
   - Remove non-functional global controls.
   - Keep system destinations available but visually secondary.

2. **Canonical evaluator flow**
   - Refine import, qualification, Atlas, challenge review, and report hierarchy.
   - Make next actions, receipts, failure reasons, and disabled states explicit.
   - Add route-level loading and not-found handling where the current fixture
     boundary can represent it truthfully.

3. **Student flow**
   - Clarify briefing disclosure and consent.
   - Make workspace layout and controls derive from `SessionState`.
   - Remove hidden-suite leakage and add disconnected/narrow-width treatments.

4. **Quality pass**
   - Verify keyboard focus, semantics, contrast, reduced motion, and responsive
     behavior.
   - Run `npm run lint`, `npm run build`, and browser checks for the canonical
     path at 1440×900 and 1024×768.

## Acceptance

- The canonical path can be followed without guessing the next action.
- Every visible status is paired with text or an icon.
- No obviously dead control remains in the global shell.
- Student surfaces do not render the phrase “hidden test” or “hidden suite.”
- Workspace content does not compress below 1024px.
- Lint and production build pass.

## Progress

- [x] Product and visual direction reconciled with Final V1.
- [x] Evaluator shell converted to light mode; workspace scoped dark.
- [x] Dashboard hierarchy simplified.
- [x] Shell and orientation hardening.
- [x] Canonical evaluator flow hardening.
- [x] Student flow hardening.
- [x] State, accessibility, responsive, and end-to-end verification.
