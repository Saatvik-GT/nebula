/**
 * Scaffolding fixtures for the non-dashboard surfaces. Every field maps to a
 * backing table in Frontend Spec PART D. No invented metrics or claims — only
 * the enums, ids, and states the spec defines.
 */
import type { SessionState, ValidationOutcome } from "@/lib/contracts/dashboard";

const now = Date.now();
const iso = (msAgo: number) => new Date(now - msAgo).toISOString();
const MIN = 60_000;
const HR = 60 * MIN;
const DAY = 24 * HR;

/* ---------- projects ---------- */

export type SourceKind = "git" | "zip";
export type QualificationStatus =
  | "pending"
  | "running"
  | "passed"
  | "failed";

export type Project = {
  id: string;
  displayName: string;
  sourceKind: SourceKind;
  createdAt: string;
  qualificationStatus: QualificationStatus;
  qualificationReason?: string;
  snapshotId?: string;
};

export const projects: Project[] = [
  {
    id: "demo-commerce",
    displayName: "demo-commerce",
    sourceKind: "git",
    createdAt: iso(5 * MIN),
    qualificationStatus: "running",
    snapshotId: "snap_demo",
  },
  {
    id: "arc-billing-svc",
    displayName: "arc-billing-svc",
    sourceKind: "git",
    createdAt: iso(3 * HR),
    qualificationStatus: "passed",
    snapshotId: "snap_arc_billing",
  },
  {
    id: "cloudbyte-inventory",
    displayName: "cloudbyte-inventory",
    sourceKind: "zip",
    createdAt: iso(1 * DAY),
    qualificationStatus: "passed",
    snapshotId: "snap_cb_inv",
  },
  {
    id: "invalid_repo",
    displayName: "legacy-import",
    sourceKind: "git",
    createdAt: iso(2 * DAY),
    qualificationStatus: "failed",
    qualificationReason: "baseline_tests_failed",
  },
  {
    id: "arc-web-portal",
    displayName: "arc-web-portal",
    sourceKind: "git",
    createdAt: iso(4 * DAY),
    qualificationStatus: "pending",
  },
];

export const qualificationSteps: {
  id: string;
  label: string;
  description: string;
}[] = [
  { id: "import", label: "Source import", description: "Clone or unpack the submitted source into an isolated workspace." },
  { id: "snapshot", label: "Snapshot", description: "Freeze the workspace into an immutable, content-addressed snapshot." },
  { id: "build", label: "Baseline build", description: "Install dependencies and build the project from a clean state." },
  { id: "baseline_tests", label: "Baseline tests", description: "Run the project's own test suite to confirm a green starting point." },
  { id: "atlas", label: "Atlas index", description: "Index modules and their dependency graph for the snapshot Atlas." },
];

/* ---------- snapshots ---------- */

export type Snapshot = {
  id: string;
  projectId: string;
  projectName: string;
  createdAt: string;
  moduleCount: number;
  digest: string;
};

export const snapshots: Snapshot[] = [
  { id: "snap_demo", projectId: "demo-commerce", projectName: "demo-commerce", createdAt: iso(4 * MIN), moduleCount: 34, digest: "sha256:7d2c1a…9f4b" },
  { id: "snap_arc_billing", projectId: "arc-billing-svc", projectName: "arc-billing-svc", createdAt: iso(3 * HR), moduleCount: 52, digest: "sha256:1a90cc…2e77" },
  { id: "snap_cb_inv", projectId: "cloudbyte-inventory", projectName: "cloudbyte-inventory", createdAt: iso(1 * DAY), moduleCount: 41, digest: "sha256:c1d72b…8a10" },
];

export type AtlasModule = {
  id: string;
  path: string;
  kind: "entry" | "module" | "test" | "config";
  loc: number;
  dependsOn: string[];
  inDefenseSurface: boolean;
};

export const atlasModules: Record<string, AtlasModule[]> = {
  snap_demo: [
    { id: "m_app", path: "src/app.ts", kind: "entry", loc: 92, dependsOn: ["m_router", "m_orders"], inDefenseSurface: false },
    { id: "m_router", path: "src/router.ts", kind: "module", loc: 140, dependsOn: ["m_orders", "m_delivery"], inDefenseSurface: false },
    { id: "m_orders", path: "src/orders/index.ts", kind: "module", loc: 210, dependsOn: ["m_delivery", "m_db"], inDefenseSurface: true },
    { id: "m_delivery", path: "src/orders/delivery.ts", kind: "module", loc: 168, dependsOn: ["m_db"], inDefenseSurface: true },
    { id: "m_db", path: "src/db/client.ts", kind: "module", loc: 74, dependsOn: [], inDefenseSurface: false },
    { id: "m_delivery_test", path: "test/delivery.spec.ts", kind: "test", loc: 120, dependsOn: ["m_delivery"], inDefenseSurface: true },
    { id: "m_cfg", path: "config/build.json", kind: "config", loc: 18, dependsOn: [], inDefenseSurface: false },
  ],
};

/* ---------- defense surfaces + challenges ---------- */

export type SurfaceStatus = "proposed" | "approved" | "rejected";
export type ChallengeStatus =
  | "draft"
  | "validating"
  | "validated"
  | "approved"
  | "rejected"
  | "invalidated";

export type GateStatus = ValidationOutcome;
export type ValidationGate = {
  gate: string;
  label: string;
  status: GateStatus;
  reasonCode?: string;
};

export type Challenge = {
  id: string;
  family: "duplicate_delivery_v1";
  projectName: string;
  snapshotId: string;
  status: ChallengeStatus;
  validationRunId: string;
  createdAt: string;
  studentPrompt: string;
  surfaceRank: number;
  gates: ValidationGate[];
};

const standardGates = (
  overrides: Record<string, Partial<ValidationGate>> = {},
): ValidationGate[] => {
  const base: ValidationGate[] = [
    { gate: "repo_valid", label: "Repository valid", status: "passed" },
    { gate: "baseline_green", label: "Baseline suite green", status: "passed" },
    { gate: "condition_reproduces", label: "Condition reproduces", status: "passed" },
    { gate: "visible_checks_compile", label: "Visible checks compile", status: "passed" },
    { gate: "hidden_checks_compile", label: "Hidden checks compile", status: "passed" },
    { gate: "single_fault_isolation", label: "Single-fault isolation", status: "passed" },
  ];
  return base.map((g) => ({ ...g, ...(overrides[g.gate] ?? {}) }));
};

export const challenges: Challenge[] = [
  {
    id: "8f3a2",
    family: "duplicate_delivery_v1",
    projectName: "demo-commerce",
    snapshotId: "snap_demo",
    status: "validated",
    validationRunId: "vr_8f3a2",
    createdAt: iso(20 * MIN),
    studentPrompt:
      "Orders placed within the same session are occasionally dispatched to the delivery queue twice. Diagnose the cause, correct it, and verify that a single order produces exactly one delivery.",
    surfaceRank: 1,
    gates: standardGates(),
  },
  {
    id: "a7b91",
    family: "duplicate_delivery_v1",
    projectName: "arc-billing-svc",
    snapshotId: "snap_arc_billing",
    status: "validating",
    validationRunId: "vr_a7b91",
    createdAt: iso(6 * MIN),
    studentPrompt:
      "A retried request can enqueue a second delivery for an order that was already fulfilled. Identify where idempotency is lost and restore it.",
    surfaceRank: 1,
    gates: standardGates({
      hidden_checks_compile: { status: "in_progress" },
      single_fault_isolation: { status: "not_run" },
    }),
  },
  {
    id: "c1d72",
    family: "duplicate_delivery_v1",
    projectName: "cloudbyte-inventory",
    snapshotId: "snap_cb_inv",
    status: "approved",
    validationRunId: "vr_c1d72",
    createdAt: iso(12 * MIN),
    studentPrompt:
      "Concurrent stock reservations can both succeed for the last unit, creating a duplicate delivery. Make the reservation path safe under contention.",
    surfaceRank: 2,
    gates: standardGates(),
  },
  {
    id: "invalid_repo",
    family: "duplicate_delivery_v1",
    projectName: "legacy-import",
    snapshotId: "snap_demo",
    status: "rejected",
    validationRunId: "vr_invalid_repo",
    createdAt: iso(18 * MIN),
    studentPrompt: "—",
    surfaceRank: 3,
    gates: standardGates({
      repo_valid: { status: "passed" },
      baseline_green: { status: "failed", reasonCode: "baseline_tests_failed" },
      condition_reproduces: { status: "not_run" },
      visible_checks_compile: { status: "not_run" },
      hidden_checks_compile: { status: "not_run" },
      single_fault_isolation: { status: "not_run" },
    }),
  },
];

/* ---------- sessions ---------- */

export type Session = {
  id: string;
  displayLabel: string;
  groupOrProjectLabel: string;
  challengeId: string;
  state: SessionState;
  createdAt: string;
  deadlineAt: string;
};

export const sessions: Session[] = [
  { id: "DEF-2024-018", displayLabel: "Session #DEF-2024-018", groupOrProjectLabel: "Arc Company", challengeId: "8f3a2", state: "DEFEND", createdAt: iso(2 * HR), deadlineAt: iso(-90 * MIN) },
  { id: "DEF-2024-017", displayLabel: "Session #DEF-2024-017", groupOrProjectLabel: "Arc Company", challengeId: "a7b91", state: "WORK_REVISION", createdAt: iso(3 * HR), deadlineAt: iso(-60 * MIN) },
  { id: "DEF-2024-016", displayLabel: "Session #DEF-2024-016", groupOrProjectLabel: "CloudByte Team", challengeId: "c1d72", state: "DEFEND", createdAt: iso(5 * HR), deadlineAt: iso(-30 * MIN) },
  { id: "DEF-2024-015", displayLabel: "Session #DEF-2024-015", groupOrProjectLabel: "CloudByte Team", challengeId: "c1d72", state: "SUBMITTED", createdAt: iso(1 * DAY), deadlineAt: iso(2 * HR) },
  { id: "DEF-2024-014", displayLabel: "Session #DEF-2024-014", groupOrProjectLabel: "Arc Company", challengeId: "8f3a2", state: "REPORTED", createdAt: iso(2 * DAY), deadlineAt: iso(1 * DAY) },
  { id: "DEF-2024-013", displayLabel: "Session #DEF-2024-013", groupOrProjectLabel: "CloudByte Team", challengeId: "c1d72", state: "SUBMITTED_INCOMPLETE", createdAt: iso(3 * DAY), deadlineAt: iso(2 * DAY) },
];

export const sessionFiles: { path: string; language: string; body: string }[] = [
  {
    path: "src/orders/delivery.ts",
    language: "typescript",
    body: `import { db } from "../db/client";
import { queue } from "../infra/queue";

// Enqueue a delivery for a confirmed order.
export async function enqueueDelivery(orderId: string) {
  const order = await db.orders.find(orderId);
  if (!order || order.status !== "confirmed") return;

  // BUG: no idempotency guard — a retried call enqueues twice.
  await queue.publish("delivery.requested", {
    orderId: order.id,
    address: order.shippingAddress,
  });

  await db.orders.update(orderId, { status: "dispatched" });
}
`,
  },
  {
    path: "src/orders/index.ts",
    language: "typescript",
    body: `import { enqueueDelivery } from "./delivery";

export async function confirmOrder(orderId: string) {
  await enqueueDelivery(orderId);
}
`,
  },
  {
    path: "test/delivery.spec.ts",
    language: "typescript",
    body: `import { test, expect } from "../test/harness";
import { enqueueDelivery } from "../src/orders/delivery";

test("a confirmed order enqueues exactly one delivery", async () => {
  await enqueueDelivery("order_1");
  await enqueueDelivery("order_1"); // retry
  expect(queue.published("delivery.requested")).toHaveLength(1);
});
`,
  },
];

/* ---------- check runs / report ---------- */

export type CheckSuite = "visible" | "hidden_stress" | "regression";
export type CheckRun = {
  id: string;
  suite: CheckSuite;
  name: string;
  result: "pass" | "fail" | "skipped";
  receiptUri: string;
  durationMs: number;
};

export const checkRuns: CheckRun[] = [
  { id: "ck_1", suite: "visible", name: "single order → one delivery", result: "pass", receiptUri: "receipt://ck_1", durationMs: 412 },
  { id: "ck_2", suite: "visible", name: "retry is idempotent", result: "pass", receiptUri: "receipt://ck_2", durationMs: 388 },
  { id: "ck_3", suite: "hidden_stress", name: "200 concurrent confirmations", result: "pass", receiptUri: "receipt://ck_3", durationMs: 5230 },
  { id: "ck_4", suite: "hidden_stress", name: "queue redelivery under partition", result: "pass", receiptUri: "receipt://ck_4", durationMs: 4110 },
  { id: "ck_5", suite: "regression", name: "baseline order suite", result: "pass", receiptUri: "receipt://ck_5", durationMs: 1902 },
];

export const reportFindings: {
  id: string;
  title: string;
  severity: "info" | "minor" | "major";
  evidence: string;
  body: string;
}[] = [
  {
    id: "f_1",
    title: "Root cause correctly identified",
    severity: "info",
    evidence: "diff:src/orders/delivery.ts · ck_2",
    body: "The student located the missing idempotency guard in enqueueDelivery and described the retry path that triggered the duplicate.",
  },
  {
    id: "f_2",
    title: "Fix holds under hidden stress",
    severity: "info",
    evidence: "ck_3 · ck_4",
    body: "The dedupe key on (orderId) survives 200 concurrent confirmations and a simulated queue partition without emitting a second delivery.",
  },
  {
    id: "f_3",
    title: "Explanation omits the queue-redelivery vector",
    severity: "minor",
    evidence: "defense transcript §2",
    body: "The written defense covers client retries but does not mention broker-side redelivery, which the hidden suite also exercises.",
  },
];

export const diffHunks: {
  file: string;
  lines: { kind: "ctx" | "add" | "del"; text: string }[];
}[] = [
  {
    file: "src/orders/delivery.ts",
    lines: [
      { kind: "ctx", text: "  const order = await db.orders.find(orderId);" },
      { kind: "ctx", text: '  if (!order || order.status !== "confirmed") return;' },
      { kind: "add", text: "  const claimed = await db.deliveryClaims.insertIfAbsent(orderId);" },
      { kind: "add", text: "  if (!claimed) return; // delivery already enqueued for this order" },
      { kind: "ctx", text: '  await queue.publish("delivery.requested", {' },
      { kind: "ctx", text: "    orderId: order.id," },
    ],
  },
];

/* ---------- reports ---------- */

export type Report = {
  id: string;
  sessionId: string;
  groupOrProjectLabel: string;
  reportVersion: string;
  factsDigest: string;
  createdAt: string;
};

export const reports: Report[] = [
  { id: "report_7d2c1", sessionId: "DEF-2024-014", groupOrProjectLabel: "Arc Company", reportVersion: "v3", factsDigest: "sha256:7d2c1a…9f4b", createdAt: iso(1 * HR) },
  { id: "report_1a90c", sessionId: "DEF-2024-012", groupOrProjectLabel: "CloudByte Team", reportVersion: "v2", factsDigest: "sha256:1a90cc…2e77", createdAt: iso(1 * DAY) },
  { id: "report_c1d72", sessionId: "DEF-2024-009", groupOrProjectLabel: "Arc Company", reportVersion: "v1", factsDigest: "sha256:c1d72b…8a10", createdAt: iso(3 * DAY) },
];

/* ---------- evidence events / audit ---------- */

export type EvidenceEvent = {
  id: string;
  eventType: string;
  actor: string;
  target: string;
  occurredAt: string;
};

export const evidenceEvents: EvidenceEvent[] = [
  { id: "ev_101", eventType: "project.imported", actor: "aditya.prashar", target: "demo-commerce", occurredAt: iso(5 * MIN) },
  { id: "ev_100", eventType: "challenge.approved", actor: "aditya.prashar", target: "challenge_8f3a2", occurredAt: iso(15 * MIN) },
  { id: "ev_099", eventType: "session.started", actor: "system", target: "DEF-2024-018", occurredAt: iso(25 * MIN) },
  { id: "ev_098", eventType: "check_run.recorded", actor: "worker-03", target: "ck_4 (hidden_stress)", occurredAt: iso(40 * MIN) },
  { id: "ev_097", eventType: "report.generated", actor: "system", target: "report_7d2c1", occurredAt: iso(1 * HR) },
  { id: "ev_096", eventType: "validation_run.failed", actor: "worker-01", target: "vr_invalid_repo", occurredAt: iso(80 * MIN) },
  { id: "ev_095", eventType: "surface.approved", actor: "aditya.prashar", target: "demo-commerce · rank 1", occurredAt: iso(2 * HR) },
];

/* ---------- validation runs ---------- */

export type ValidationRun = {
  id: string;
  challengeId: string;
  family: "duplicate_delivery_v1";
  status: ValidationOutcome;
  startedAt: string;
  gatesPassed: number;
  gatesTotal: number;
  reasonCode?: string;
};

export const validationRuns: ValidationRun[] = challenges.map((c) => {
  const total = c.gates.length;
  const passed = c.gates.filter((g) => g.status === "passed").length;
  const failed = c.gates.find((g) => g.status === "failed");
  const running = c.gates.some((g) => g.status === "in_progress");
  const status: ValidationOutcome = failed
    ? "failed"
    : running
      ? "in_progress"
      : passed === total
        ? "passed"
        : "not_run";
  return {
    id: c.validationRunId,
    challengeId: c.id,
    family: c.family,
    status,
    startedAt: c.createdAt,
    gatesPassed: passed,
    gatesTotal: total,
    reasonCode: failed?.reasonCode,
  };
});

/* ---------- jobs / workers ---------- */

export type Job = {
  id: string;
  kind: "snapshot" | "validation" | "check_run" | "report" | "atlas_index";
  state: "queued" | "running" | "succeeded" | "failed";
  worker: string;
  updatedAt: string;
};

export const jobs: Job[] = [
  { id: "job_5001", kind: "validation", state: "running", worker: "worker-01", updatedAt: iso(2 * MIN) },
  { id: "job_5000", kind: "check_run", state: "running", worker: "worker-03", updatedAt: iso(4 * MIN) },
  { id: "job_4999", kind: "snapshot", state: "succeeded", worker: "worker-02", updatedAt: iso(9 * MIN) },
  { id: "job_4998", kind: "atlas_index", state: "succeeded", worker: "worker-02", updatedAt: iso(12 * MIN) },
  { id: "job_4997", kind: "report", state: "succeeded", worker: "worker-04", updatedAt: iso(1 * HR) },
  { id: "job_4996", kind: "validation", state: "failed", worker: "worker-01", updatedAt: iso(80 * MIN) },
];

export const workerPool = {
  components: [
    { id: "api", label: "API Service", status: "healthy" as const, detail: "p95 42ms" },
    { id: "worker", label: "Worker Service", status: "healthy" as const, detail: "4 / 4 online" },
    { id: "sandbox_pool", label: "Sandbox Pool", status: "healthy" as const, detail: "8 / 10 Available" },
    { id: "database", label: "Database", status: "healthy" as const, detail: "replication current" },
    { id: "artifact_store", label: "Artifact Store", status: "healthy" as const, detail: "63% capacity" },
  ],
};

/* ---------- lookups (always resolve — no dead ends) ---------- */

export const getSnapshot = (id: string) => snapshots.find((s) => s.id === id);
export const getReportForSession = (sessionId: string) =>
  reports.find((r) => r.sessionId === sessionId);

/** Resolve a project by id, synthesising a plausible record for unknown ids. */
export function getProject(id: string): Project {
  const hit = projects.find((p) => p.id === id);
  if (hit) return hit;
  return {
    id,
    displayName: id,
    sourceKind: "git",
    createdAt: iso(30 * MIN),
    qualificationStatus: "pending",
    snapshotId: `snap_${id.replace(/-/g, "_")}`,
  };
}

export function getChallenge(id: string): Challenge {
  const hit = challenges.find((c) => c.id === id);
  if (hit) return hit;
  return {
    id,
    family: "duplicate_delivery_v1",
    projectName: "demo-commerce",
    snapshotId: "snap_demo",
    status: "validated",
    validationRunId: `vr_${id}`,
    createdAt: iso(20 * MIN),
    studentPrompt:
      "A retried request can enqueue a second delivery for an order that was already fulfilled. Diagnose where idempotency is lost and restore it.",
    surfaceRank: 1,
    gates: standardGates(),
  };
}

export function getSession(id: string): Session {
  const hit = sessions.find((s) => s.id === id);
  if (hit) return hit;
  return {
    id,
    displayLabel: `Session #${id}`,
    groupOrProjectLabel: "Arc Company",
    challengeId: "8f3a2",
    state: "DEFEND",
    createdAt: iso(2 * HR),
    deadlineAt: iso(-90 * MIN),
  };
}
