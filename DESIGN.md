# Design System — Executable Project Defense

Quiet evaluator workspace with a focused dark defense environment. One
mineral-blue identity family, semantic status colors, borders before shadows. The system
is grounded in the authoritative Final V1 frontend specification and optimized
for the canonical evaluator-to-student proof path.

## Tokens

Defined on `:root` in `app/globals.css`, mirrored into Tailwind v4 `@theme` as
`--color-*`, `--radius-*`.

| Token | Value | Role |
|---|---|---|
| `--page` | `#f3f5f6` | evaluator canvas |
| `--surface` | `#fbfcfd` | primary content and panels |
| `--surface-raised` | `#e9eef1` | selected, hover, and inset regions |
| `--text` | `#172126` | primary text |
| `--muted` | `#626e74` | secondary text, labels, axis ticks |
| `--border` | `#d5dde1` | dividers, panel edges, control outlines |
| `--accent` | `#285f78` | filled primary buttons, active-nav fill, avatars |
| `--accent-bright` | `#347b99` | focus ring, active navigation, links |
| `--accent-contrast` | `#ffffff` | content on filled accent controls |
| `--success` | `#347052` | passed / healthy |
| `--warning` | `#a86719` | in-progress only |
| `--danger` | `#b5423b` | failed / terminal states only |

Radii: `--radius-control: 8px` (buttons, inputs, pills-square), `--radius-panel:
12px` (panels, tiles). The outer app shell uses `16px`; the landing frame `20px`.
Spacing unit is `8px` (Tailwind default scale, used as-is).

The `.defense-workspace` scope switches these neutral tokens to the prescribed
dark workspace palette (`#10171b`, `#161f24`, `#2c3940`, `#e6ecef`) without
changing component semantics. Amber and red are **only** for in-progress and
failed/terminal. No decorative colour.

## Type

- **Sans** (`--font-sans`): system UI stack — `ui-sans-serif, system-ui,
  -apple-system, "Segoe UI", Roboto, …`. All UI text.
- **Mono** (`--font-mono`): `ui-monospace, "SF Mono", "Cascadia Code",
  "JetBrains Mono", "Segoe UI Mono", Menlo, Consolas`. IDs, digests, family
  names, file paths, state enums, eyebrow tags, code, terminal, `⌘K`. Ligatures
  disabled on `code/kbd/pre/samp/.font-mono`.
- Body letter-spacing `-0.011em`. Display (landing H1) `clamp(3rem, 6vw,
  5.25rem)`, weight 600, tracking `-0.04em`, leading `0.98`, balanced within a
  12-character measure.
- Section headings `clamp(1.5rem, 3vw, 2.1rem)` / 600 / `-0.02em`.
- Page titles (`PageHeader`) 24px / 600. Panel titles 13.5px / 600. Body 13px.
  Metadata / captions 11–12px muted. Data uses `.tnum` (tabular figures).
- No kicker/eyebrow above section headings anywhere except the landing hero's
  spec-mandated mono eyebrow.

## Surfaces & elevation

Borders do the work. `Panel` = `rounded-[12px] border border-border
bg-surface`. Nested emphasis is `bg-surface-raised` + border, never a second
shadow layer. The landing page uses the same flat cool-neutral canvas and
border vocabulary as the evaluator shell; it has no separate atmospheric theme.

Shell: full-height evaluator canvas with a `232px` tonal sidebar (`hidden
lg:block`, drawer below `lg`), a `h-14` utility bar, and a scrolling `<main>`
capped at `max-w-[1360px]`. There is no decorative outer frame. The session
workspace bleeds full-width with negative margins and owns its dark token scope.

## Components

- **Button** (`components/ui/Button.tsx`): `primary` (accent fill, accent-bright
  border, blue glow), `outline` (border only, raised on hover), `ghost`. Sizes
  sm/md/lg, radius 8px, focus ring `--accent-bright`.
- **Panel / PanelHeader** (`components/ui/Panel.tsx`): title + optional "View
  All" link (accent-bright, 12px).
- **Pill / badges** (`components/ui/badges.tsx`): tones `neutral | active |
  success | warning | danger`; `mono` variant for enums. `SessionStateBadge`
  renders the **exact** `SessionState` string, uppercase mono, toned by
  category. `OutcomePill` maps `passed→success, in_progress→warning,
  failed→danger, not_run→neutral`. `StatusDot` (optional pulse) with a colour +
  3px halo ring.
- **DataList** (`components/app/DataList.tsx`): the one table pattern for every
  list route — uppercase 11px mono-tracked headers, `divide-y` rows, per-row
  `Link`, trailing chevron, `overflow-x-auto` wrapper, empty state.
- **PageHeader**: breadcrumbs (chevron-joined) + title + description + actions.
- **Tabs**: segmented control in a `rounded-[10px]` bordered track, active tab
  `bg-surface-raised` with inset highlight.
- **Stat summary**: four linked values in one horizontal region with simple
  dividers. All metrics have equal weight; there is no decorative sparkline or
  arbitrary highlighted metric.
- **ValidationOverviewChart**: Recharts stacked bars via a custom shape —
  rounded-top clip, segments stacked passed→in_progress→failed→not_run,
  `not_run` filled with a 45° hatch `<pattern>`, floating value pill above the
  peak bucket. No gridlines, no Y axis, muted X ticks. Day/Week dropdown.
- **Timelines**: qualification steps and System Activity use a left rail
  (`w-px bg-border`) with node circles; states pass (check) / running (spinner)
  / failed (x) / pending (dashed).
- **Icons**: Lucide only, `strokeWidth` 1.75 for nav/decor, 2 for status.
- **Editor**: Monaco with a custom `epd-dark` theme (page-black background,
  accent-bright cursor/selection). **Graph**: `@xyflow/react` `colorMode="dark"`,
  depth-laid-out top→bottom, defense-surface nodes ringed accent-bright.

## Motion

120–200ms, `cubic-bezier(0.22, 1, 0.36, 1)`. Motion communicates state; the
landing and evaluator surfaces use simple color transitions. `StatusDot` may
pulse for live activity. `prefers-reduced-motion` clamps all animation and
transition to ~0ms globally.

## Browser surfaces

Themed in `globals.css`: selection (`accent-bright` wash), custom scrollbars
(border thumb, page track, accent-bright on hover), `:focus-visible` ring in
`--accent-bright` with 2px offset, placeholder colour, `color-scheme: dark`.

## Data & routing

Dashboard data flows `api.getDashboard()` → `DashboardDto`
(`lib/contracts/dashboard.ts`); scaffolding fixture in `lib/api/mock/`. Other
surfaces read `lib/api/mock/resources.ts`. Point `NEXT_PUBLIC_EPD_API_BASE` at a
backend to switch transport with no component change. Every nav item and every
rendered figure maps to a Frontend Spec Part D table; nothing is invented.
