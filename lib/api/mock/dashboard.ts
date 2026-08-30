import type { DashboardDto } from "@/lib/contracts/dashboard";

/**
 * Scaffolding fixture. Satisfies DashboardDto exactly — it is served through the
 * typed API client, never imported directly by a component. Swap for a real
 * transport by pointing the client at the backend; the shape does not change.
 *
 * Every field below maps to a backing resource in Frontend Spec PART D:
 *   stats.total_projects      -> count(projects)
 *   stats.active_sessions     -> count(defense_sessions where state is non-terminal)
 *   stats.challenges_created  -> count(challenges)
 *   stats.reports_generated   -> count(reports)
 *   validationOverview        -> validation_runs.status bucketed by day
 *   recentValidations         -> validation_runs + validation_gates.reason_code
 *   recentSessions            -> defense_sessions.state / deadline_at
 *   quickActions              -> gated on defense_surfaces.status etc.
 *   infraHealth               -> jobs.kind / jobs.state (worker + health telemetry)
 *   systemActivity            -> evidence_events.event_type / actor / occurred_at
 *   systemReminder            -> a real scheduled evaluator review (omitted if none)
 */

const now = Date.now();
const minutesAgo = (m: number) => new Date(now - m * 60_000).toISOString();
const hoursAgo = (h: number) => new Date(now - h * 3_600_000).toISOString();

const today = new Date(now);
const at = (h: number, min: number) => {
  const d = new Date(today);
  d.setHours(h, min, 0, 0);
  return d.toISOString();
};

export const mockDashboard: DashboardDto = {
  schemaVersion: "1",
  stats: [
    {
      id: "total_projects",
      label: "Total Projects",
      value: 24,
      deltaValue: 8,
      deltaPeriodLabel: "from last month",
      linkHref: "/projects",
    },
    {
      id: "active_sessions",
      label: "Active Sessions",
      value: 12,
      deltaValue: 4,
      deltaPeriodLabel: "from last month",
      linkHref: "/sessions",
    },
    {
      id: "challenges_created",
      label: "Challenges Created",
      value: 16,
      deltaValue: 5,
      deltaPeriodLabel: "from last month",
      linkHref: "/challenges",
    },
    {
      id: "reports_generated",
      label: "Reports Generated",
      value: 9,
      deltaValue: 3,
      deltaPeriodLabel: "from last month",
      linkHref: "/reports",
    },
  ],
  validationOverview: {
    window: "week",
    buckets: [
      { bucketLabel: "S", counts: { passed: 0, in_progress: 0, failed: 0, not_run: 3 } },
      { bucketLabel: "M", counts: { passed: 7, in_progress: 1, failed: 0, not_run: 0 } },
      { bucketLabel: "T", counts: { passed: 3, in_progress: 4, failed: 1, not_run: 0 } },
      { bucketLabel: "W", counts: { passed: 9, in_progress: 2, failed: 1, not_run: 0 } },
      { bucketLabel: "T", counts: { passed: 5, in_progress: 4, failed: 0, not_run: 1 } },
      { bucketLabel: "F", counts: { passed: 0, in_progress: 0, failed: 0, not_run: 2 } },
    ],
  },
  recentValidations: [
    {
      validationRunId: "vr_8f3a2",
      challengeId: "8f3a2",
      family: "duplicate_delivery_v1",
      label: "duplicate_delivery_v1 – challenge_8f3a2",
      status: "passed",
      detailHref: "/challenges/8f3a2",
      updatedAt: minutesAgo(2),
    },
    {
      validationRunId: "vr_a7b91",
      challengeId: "a7b91",
      family: "duplicate_delivery_v1",
      label: "duplicate_delivery_v1 – challenge_a7b91",
      status: "in_progress",
      detailHref: "/challenges/a7b91",
      updatedAt: minutesAgo(6),
      reasonCode: "hidden_stress_suite_running",
    },
    {
      validationRunId: "vr_c1d72",
      challengeId: "c1d72",
      family: "duplicate_delivery_v1",
      label: "duplicate_delivery_v1 – challenge_c1d72",
      status: "passed",
      detailHref: "/challenges/c1d72",
      updatedAt: minutesAgo(12),
    },
    {
      validationRunId: "vr_invalid_repo",
      challengeId: "invalid_repo",
      family: "duplicate_delivery_v1",
      label: "challenge_invalid_repo",
      status: "failed",
      detailHref: "/challenges/invalid_repo",
      updatedAt: minutesAgo(18),
      reasonCode: "baseline_tests_failed",
    },
  ],
  recentSessions: [
    {
      sessionId: "DEF-2024-018",
      displayLabel: "Session #DEF-2024-018",
      groupOrProjectLabel: "Arc Company",
      state: "DEFEND",
      detailHref: "/sessions/DEF-2024-018",
      updatedAt: minutesAgo(10),
    },
    {
      sessionId: "DEF-2024-017",
      displayLabel: "Session #DEF-2024-017",
      groupOrProjectLabel: "Arc Company",
      state: "WORK_REVISION",
      detailHref: "/sessions/DEF-2024-017",
      updatedAt: minutesAgo(25),
    },
    {
      sessionId: "DEF-2024-016",
      displayLabel: "Session #DEF-2024-016",
      groupOrProjectLabel: "CloudByte Team",
      state: "DEFEND",
      detailHref: "/sessions/DEF-2024-016",
      updatedAt: hoursAgo(1),
    },
    {
      sessionId: "DEF-2024-015",
      displayLabel: "Session #DEF-2024-015",
      groupOrProjectLabel: "CloudByte Team",
      state: "SUBMITTED",
      detailHref: "/sessions/DEF-2024-015",
      updatedAt: hoursAgo(2),
    },
  ],
  quickActions: [
    {
      id: "import_project",
      label: "Import Project",
      sublabel: "Import Git URL or ZIP",
      href: "/projects/new",
      enabled: true,
    },
    {
      id: "create_challenge",
      label: "Create Challenge",
      sublabel: "From approved surface",
      href: "/challenges",
      enabled: true,
    },
    {
      id: "start_session",
      label: "Start New Session",
      sublabel: "Create defense session",
      href: "/sessions",
      enabled: true,
    },
    {
      id: "view_reports",
      label: "View Reports",
      sublabel: "Browse generated reports",
      href: "/reports",
      enabled: true,
    },
    {
      id: "run_validation",
      label: "Run Validation",
      sublabel: "Run backend validations",
      href: "/validation",
      enabled: true,
    },
  ],
  infraHealth: {
    detailHref: "/workers",
    components: [
      { id: "api", label: "API Service", status: "healthy" },
      { id: "worker", label: "Worker Service", status: "healthy" },
      {
        id: "sandbox_pool",
        label: "Sandbox Pool",
        status: "healthy",
        detail: "8 / 10 Available",
      },
      { id: "database", label: "Database", status: "healthy" },
      { id: "artifact_store", label: "Artifact Store", status: "healthy" },
    ],
  },
  systemActivity: [
    {
      id: "ev_1",
      label: "New project imported",
      sublabel: "demo-commerce",
      occurredAt: minutesAgo(5),
    },
    {
      id: "ev_2",
      label: "Challenge approved",
      sublabel: "challenge_8f3a2",
      occurredAt: minutesAgo(15),
    },
    {
      id: "ev_3",
      label: "Session started",
      sublabel: "DEF-2024-018",
      occurredAt: minutesAgo(25),
    },
    {
      id: "ev_4",
      label: "Report generated",
      sublabel: "report_7d2c1",
      occurredAt: hoursAgo(1),
    },
  ],
  systemReminder: {
    title: "Evaluator Review Meeting",
    subtitle: "With Arc Company",
    startsAt: at(14, 0),
    endsAt: at(16, 0),
    joinHref: "#",
  },
};
