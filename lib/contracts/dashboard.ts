// packages/contracts/src/dashboard.ts
// Canonical DTO shapes for the evaluator dashboard (Frontend Spec — PART C).
// Components never hard-code dashboard data; it is always fetched against these
// shapes via the typed API client.

export type StatTileId =
  | "total_projects"
  | "active_sessions"
  | "challenges_created"
  | "reports_generated";

export type StatTileDto = {
  id: StatTileId;
  label: string;
  value: number;
  deltaValue: number;
  deltaPeriodLabel: string;
  linkHref: string;
};

export type ValidationOutcome = "passed" | "in_progress" | "failed" | "not_run";

export type ValidationOverviewBucketDto = {
  bucketLabel: string;
  counts: Record<ValidationOutcome, number>;
};

export type ValidationOverviewDto = {
  window: "day" | "week";
  buckets: ValidationOverviewBucketDto[];
};

export type RecentValidationRowDto = {
  validationRunId: string;
  challengeId: string;
  family: "duplicate_delivery_v1";
  label: string;
  status: ValidationOutcome;
  detailHref: string;
  updatedAt: string;
  reasonCode?: string;
};

export type SessionState =
  | "CREATED"
  | "BRIEFING"
  | "MAP"
  | "WORK_INITIAL"
  | "VERIFY_INITIAL"
  | "STRESS"
  | "WORK_REVISION"
  | "VERIFY_REVISION"
  | "DEFEND"
  | "SUBMITTED"
  | "REPORTED"
  | "SUBMITTED_INCOMPLETE"
  | "INVALIDATED"
  | "EXPIRED"
  | "CANCELLED";

export type RecentSessionRowDto = {
  sessionId: string;
  displayLabel: string;
  groupOrProjectLabel: string;
  state: SessionState;
  detailHref: string;
  updatedAt: string;
};

export type QuickActionId =
  | "import_project"
  | "create_challenge"
  | "start_session"
  | "view_reports"
  | "run_validation";

export type QuickActionDto = {
  id: QuickActionId;
  label: string;
  sublabel: string;
  href: string;
  enabled: boolean;
  disabledReason?: string;
};

export type HealthStatus = "healthy" | "degraded" | "down";

export type InfraHealthComponentDto = {
  id: "api" | "worker" | "sandbox_pool" | "database" | "artifact_store";
  label: string;
  status: HealthStatus;
  detail?: string;
};

export type InfraHealthDto = {
  components: InfraHealthComponentDto[];
  detailHref: string;
};

export type SystemActivityRowDto = {
  id: string;
  label: string;
  sublabel: string;
  occurredAt: string;
};

export type DashboardDto = {
  schemaVersion: "1";
  stats: StatTileDto[];
  validationOverview: ValidationOverviewDto;
  recentValidations: RecentValidationRowDto[];
  recentSessions: RecentSessionRowDto[];
  quickActions: QuickActionDto[];
  infraHealth: InfraHealthDto;
  systemActivity: SystemActivityRowDto[];
  systemReminder?: {
    title: string;
    subtitle: string;
    startsAt: string;
    endsAt: string;
    joinHref?: string;
  };
};
