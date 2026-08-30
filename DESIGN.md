# Design System — Executable Project Defense

Derived from the shipped build (not intentions). Dark instrument shell, one
accent-green family, borders before shadows. Matches the two reference comps
(`Nebula/landingpage.png`, `Nebula/dashboard.png`).

## Tokens

Defined on `:root` in `app/globals.css`, mirrored into Tailwind v4 `@theme` as
`--color-*`, `--radius-*`.

| Token | Value | Role |
|---|---|---|
| `--page` | `#0a0b0a` | app background (behind the rounded shell) |
| `--surface` | `#111311` | panels, sidebar, cards |
| `--surface-raised` | `#161916` | inset blocks, hover, active nav, code strips |
| `--text` | `#f5f7f5` | primary text |
| `--muted` | `#8a908a` | secondary text, labels, axis ticks |
| `--border` | `#262a26` | every divider, panel edge, control outline |
| `--accent` | `#2f4b3c` | filled primary buttons, active-nav fill, avatars |
| `--accent-bright` | `#4a7a5e` | focus ring, active-nav bar/icon, links, "in surface" |
| `--success` | `#4a7a5e` | passed / healthy |
| `--warning` | `#c98a3a` | in-progress only |
| `--danger` | `#c94a3a` | failed / terminal states only |

Radii: `--radius-control: 8px` (buttons, inputs, pills-square), `--radius-panel:
12px` (panels, tiles). The outer app shell uses `16px`; the landing frame `20px`.
Spacing unit is `8px` (Tailwind default scale, used as-is).

Amber and red are **only** for in-progress and failed/terminal. The green
family carries all brand, action, active, and healthy meaning. No decorative
colour anywhere.

## Type

- **Sans** (`--font-sans`): system UI stack — `ui-sans-serif, system-ui,
  -apple-system, "Segoe UI", Roboto, …`. All UI text.
- **Mono** (`--font-mono`): `ui-monospace, "SF Mono", "Cascadia Code",
  "JetBrains Mono", "Segoe UI Mono", Menlo, Consolas`. IDs, digests, family
  names, file paths, state enums, eyebrow tags, code, terminal, `⌘K`. Ligatures
  disabled on `code/kbd/pre/samp/.font-mono`.
- Body letter-spacing `-0.011em`. Display (landing H1) `clamp(2.9rem, 8.2vw,
  6rem)`, weight 600, tracking `-0.04em`, leading `0.99`, two hard-broken lines
  with "the examination." in `color-mix(accent-bright 56%, muted)`.
- Section headings `clamp(1.5rem, 3vw, 2.1rem)` / 600 / `-0.02em`.
- Page titles (`PageHeader`) 24px / 600. Panel titles 13.5px / 600. Body 13px.
  Metadata / captions 11–12px muted. Data uses `.tnum` (tabular figures).
- No kicker/eyebrow above section headings anywhere except the landing hero's
  spec-mandated mono eyebrow.

## Surfaces & elevation

Borders do the work. `Panel` = `rounded-[12px] border border-border
bg-surface`. Nested emphasis is `bg-surface-raised` + border, never a second
shadow layer. The only shadows in the system: primary-button inset highlight +
soft green drop, dropdown menus, and the landing CTA's green glow. The single
ambient radial glow lives behind the landing hero only (`AmbientGlow`).

Shell: pure-black gutter (`p-2 sm:p-3`) around a `rounded-[16px]` bordered frame
holding a `260px` sidebar (`hidden lg:block`, drawer below `lg`), a `h-16`
topbar, and a scrolling `<main>` capped at `max-w-[1440px]`. The session
workspace bleeds full-width with negative margins.

## Components

- **Button** (`components/ui/Button.tsx`): `primary` (accent fill, accent-bright
  border, green glow), `outline` (border only, raised on hover), `ghost`. Sizes
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
- **StatTile**: label + link-out arrow, 34px tabular value, delta row (green
  up-arrow / red down-arrow + signed value + period). Lead tile is `highlighted`
  (accent-bright border, tinted ground, decorative area sparkline).
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

120–200ms, `cubic-bezier(0.22, 1, 0.36, 1)`. Named moments only: landing
hero `epd-reveal` fade-up stagger, `AmbientGlow` 16s drift, `SignalLines`
rising traces, one dashed accent trace on the hero connectors, `StatusDot`
pulse. `prefers-reduced-motion` clamps all animation/transition to ~0ms
globally.

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
