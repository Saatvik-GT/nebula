"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  ChevronRight,
  FileCode2,
  FlaskConical,
  Folder,
  MessageSquareText,
  Play,
  SendHorizonal,
  TerminalSquare,
} from "lucide-react";
import { SessionStateBadge } from "@/components/ui/badges";
import type { SessionState } from "@/lib/contracts/dashboard";
import { cn } from "@/lib/cn";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-[12px] text-muted">
      Loading editor…
    </div>
  ),
});

type WsFile = { path: string; language: string; body: string };

const TERMINAL_LINES = [
  "$ npm run test:visible",
  "",
  "  visible/delivery.spec.ts",
  "  ✓ a confirmed order enqueues exactly one delivery (412ms)",
  "  ✗ retry is idempotent (388ms)",
  "    expected 1 published 'delivery.requested', received 2",
  "",
  "  1 passing  1 failing",
  "$ ",
];

const VISIBLE_CHECKS = [
  { name: "Baseline", result: "pass" as const },
  { name: "Sequential duplicate", result: "pass" as const },
];

const ASSISTANT_LOG = [
  {
    q: "Where is delivery enqueued for a confirmed order?",
    a: "src/orders/delivery.ts — enqueueDelivery() publishes to the delivery.requested topic. src/orders/index.ts calls it from confirmOrder().",
  },
  {
    q: "Does anything dedupe by orderId today?",
    a: "No. There is no deliveryClaims table or guard; a second call with the same orderId publishes again before the status flips to \"dispatched\".",
  },
];

const STAGES = [
  { key: "map", label: "Map the condition" },
  { key: "work", label: "Change and verify" },
  { key: "stress", label: "Adapt under overlap" },
  { key: "defend", label: "Explain and submit" },
];

const STAGE_INDEX: Partial<Record<SessionState, number>> = {
  CREATED: 0,
  BRIEFING: 0,
  MAP: 0,
  WORK_INITIAL: 1,
  VERIFY_INITIAL: 1,
  STRESS: 2,
  WORK_REVISION: 2,
  VERIFY_REVISION: 2,
  DEFEND: 3,
  SUBMITTED: 4,
  REPORTED: 4,
};

export function SessionWorkspace({
  sessionId,
  groupLabel,
  state,
  files,
  deadlineLabel,
}: {
  sessionId: string;
  groupLabel: string;
  state: SessionState;
  files: WsFile[];
  deadlineLabel: string;
}) {
  const [activePath, setActivePath] = useState(files[0]?.path ?? "");
  const [panelTab, setPanelTab] = useState<"terminal" | "tests" | "assistant">(
    "terminal",
  );
  const [ask, setAsk] = useState("");
  const [connected, setConnected] = useState(true);
  const active = files.find((f) => f.path === activePath) ?? files[0];
  const currentStage = STAGE_INDEX[state] ?? 0;
  const editingAllowed = state === "WORK_INITIAL" || state === "WORK_REVISION";

  const tree = useMemo(() => buildTree(files.map((f) => f.path)), [files]);

  useEffect(() => {
    const sync = () => setConnected(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-page p-6 text-center lg:hidden">
        <div className="max-w-[420px]">
          <h1 className="text-[18px] font-semibold text-text">A wider screen is required</h1>
          <p className="mt-2 text-[13px] leading-[1.6] text-muted">
            The defense workspace keeps the project tree, editor, and defense rail visible together. Reopen this session at 1024px or wider.
          </p>
        </div>
      </div>
      <div className="defense-workspace hidden h-screen flex-col lg:flex">
      {/* workspace header */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2 text-[12.5px]">
          <span className="font-medium text-text">Session {sessionId}</span>
          <span className="text-border">/</span>
          <span className="truncate text-muted">{groupLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[11px] text-muted sm:inline">
            deadline {deadlineLabel}
          </span>
          <SessionStateBadge state={state} />
        </div>
      </div>
      {!connected && (
        <div role="status" className="border-b border-warning/40 bg-[color-mix(in_oklab,var(--warning)_12%,var(--surface))] px-4 py-2 text-[11.5px] text-text">
          Connection interrupted. Your server-recorded work is preserved.
        </div>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[220px_1fr_260px]">
        {/* file tree */}
        <aside className="hidden min-h-0 flex-col overflow-y-auto border-r border-border bg-surface lg:flex">
          <p className="px-3 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
            Snapshot
          </p>
          <FileTree
            nodes={tree}
            activePath={activePath}
            onSelect={setActivePath}
          />
        </aside>

        {/* editor + panel */}
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex items-center gap-1 border-b border-border bg-surface px-2">
            {files.map((f) => (
              <button
                key={f.path}
                onClick={() => setActivePath(f.path)}
                className={cn(
                  "border-b-2 px-3 py-2 font-mono text-[11.5px] transition-colors",
                  f.path === activePath
                    ? "border-accent-bright text-text"
                    : "border-transparent text-muted hover:text-text",
                )}
              >
                {f.path.split("/").pop()}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1">
            <MonacoEditor
              key={active?.path}
              height="100%"
              language={active?.language}
              value={active?.body}
              theme="epd-dark"
              beforeMount={(monaco) => {
                monaco.editor.defineTheme("epd-dark", {
                  base: "vs-dark",
                  inherit: true,
                  rules: [],
                  colors: {
                    "editor.background": "#0d1316",
                    "editor.foreground": "#e6ecef",
                    "editorLineNumber.foreground": "#526169",
                    "editorGutter.background": "#0d1316",
                    "editor.selectionBackground": "#285f7866",
                    "editor.lineHighlightBackground": "#16212699",
                    "editorCursor.foreground": "#4b8da8",
                  },
                });
              }}
              options={{
                readOnly: !editingAllowed,
                minimap: { enabled: false },
                fontSize: 12.5,
                fontFamily: "var(--font-mono)",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                padding: { top: 12 },
                renderLineHighlight: "line",
                automaticLayout: true,
              }}
            />
          </div>

          {/* bottom panel */}
          <div className="flex h-[220px] shrink-0 flex-col border-t border-border bg-surface">
            <div className="flex items-center gap-1 border-b border-border px-2">
              {(
                [
                  { id: "terminal", label: "Terminal", Icon: TerminalSquare },
                  { id: "tests", label: "Tests", Icon: FlaskConical },
                  { id: "assistant", label: "Assistant", Icon: MessageSquareText },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPanelTab(t.id)}
                  className={cn(
                    "flex items-center gap-1.5 border-b-2 px-3 py-2 text-[12px] transition-colors",
                    panelTab === t.id
                      ? "border-accent-bright text-text"
                      : "border-transparent text-muted hover:text-text",
                  )}
                >
                  <t.Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {panelTab === "terminal" && (
                <pre className="font-mono text-[11.5px] leading-[1.6] text-muted">
                  {TERMINAL_LINES.map((l, i) => (
                    <div
                      key={i}
                      className={cn(
                        l.startsWith("  ✓") && "text-success",
                        l.startsWith("  ✗") && "text-danger",
                        l.startsWith("$") && "text-text",
                      )}
                    >
                      {l || " "}
                    </div>
                  ))}
                </pre>
              )}

              {panelTab === "tests" && (
                <div>
                  <button className="mb-3 inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-border px-3 text-[12px] font-medium text-text hover:bg-surface-raised">
                    <Play className="h-3.5 w-3.5" strokeWidth={2} />
                    Run defense checks
                  </button>
                  <ul className="space-y-1.5">
                    {VISIBLE_CHECKS.map((c) => (
                      <li
                        key={c.name}
                        className="flex items-center gap-2 font-mono text-[11.5px]"
                      >
                        <span
                          className={
                            c.result === "pass" ? "text-success" : "text-danger"
                          }
                        >
                          {c.result === "pass" ? "✓" : "✗"}
                        </span>
                        <span className="text-text">{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {panelTab === "assistant" && (
                <div className="space-y-3">
                  {ASSISTANT_LOG.map((m, i) => (
                    <div key={i} className="border-l border-border pl-3">
                      <p className="text-[11.5px] font-medium text-text">
                        {m.q}
                      </p>
                      <p className="mt-1 text-[11.5px] leading-[1.55] text-muted">
                        {m.a}
                      </p>
                    </div>
                  ))}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAsk("");
                    }}
                    className="flex items-center gap-2 pt-1"
                  >
                    <input
                      value={ask}
                      onChange={(e) => setAsk(e.target.value)}
                      placeholder="Ask about this snapshot…"
                      className="h-8 flex-1 rounded-[8px] border border-border bg-page px-3 text-[12px] text-text outline-none focus:border-accent-bright/60"
                    />
                    <button
                      type="submit"
                      aria-label="Send"
                      className="grid h-8 w-8 place-items-center rounded-[8px] border border-border text-muted hover:text-text"
                    >
                      <SendHorizonal className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* defense rail */}
        <aside className="hidden min-h-0 flex-col overflow-y-auto border-l border-border bg-surface p-4 lg:flex">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[12px] font-semibold text-text">Defense</h2>
            <span className="font-mono text-[10px] text-muted">{currentStage + 1} / 4</span>
          </div>
          <ol className="mt-3 space-y-2.5">
            {STAGES.map((s, index) => {
              const done = index < currentStage;
              const activeStage = index === currentStage;
              return (
              <li key={s.key} className="flex items-start gap-2.5 text-[12px]">
                <span
                  className={cn(
                    "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px]",
                    done
                      ? "border-success/50 bg-[color-mix(in_oklab,var(--success)_20%,transparent)] text-success"
                      : activeStage
                        ? "border-accent-bright text-accent-bright"
                        : "border-border text-muted",
                  )}
                >
                  {done ? "✓" : activeStage ? "•" : ""}
                </span>
                <span className={done || activeStage ? "text-text" : "text-muted"}>
                  {s.label}
                </span>
              </li>
              );
            })}
          </ol>

          <StageAction state={state} />
        </aside>
      </div>
      </div>
    </>
  );
}

function StageAction({ state }: { state: SessionState }) {
  if (state === "MAP") {
    return (
      <form className="mt-5 space-y-3" onSubmit={(event) => event.preventDefault()}>
        <label className="block text-[11px] text-muted">
          Where would you investigate?
          <input required className="mt-1.5 h-9 w-full rounded-[8px] border border-border bg-page px-3 text-[12px] text-text outline-none focus:border-accent-bright" />
        </label>
        <label className="block text-[11px] text-muted">
          What do you think is happening?
          <textarea required rows={4} className="mt-1.5 w-full resize-none rounded-[8px] border border-border bg-page px-3 py-2 text-[12px] text-text outline-none focus:border-accent-bright" />
        </label>
        <button className="inline-flex h-9 w-full items-center justify-center rounded-[8px] border border-accent bg-accent text-[12.5px] font-medium text-accent-contrast hover:bg-accent-bright">
          Submit hypothesis and begin
        </button>
      </form>
    );
  }

  if (state === "VERIFY_INITIAL" || state === "VERIFY_REVISION") {
    return <p className="mt-5 rounded-[8px] border border-border bg-page p-3 text-[11.5px] leading-[1.55] text-muted">Checks are running. Editing and repeated requests are temporarily disabled.</p>;
  }

  if (state === "STRESS") {
    return <p className="mt-5 rounded-[8px] border border-warning/35 bg-page p-3 text-[11.5px] leading-[1.55] text-muted">The sequential duplicate case passes; processing remains unsafe when duplicate deliveries overlap.</p>;
  }

  if (state === "DEFEND") {
    return (
      <form className="mt-5 space-y-3" onSubmit={(event) => event.preventDefault()}>
        <p className="text-[11.5px] leading-[1.55] text-muted">Explain why the change prevents duplicate delivery when confirmations overlap, and name the boundary that now owns idempotency.</p>
        <textarea aria-label="Final defense answer" rows={7} className="w-full resize-none rounded-[8px] border border-border bg-page px-3 py-2 text-[12px] text-text outline-none focus:border-accent-bright" />
        <button className="inline-flex h-9 w-full items-center justify-center rounded-[8px] border border-accent bg-accent text-[12.5px] font-medium text-accent-contrast hover:bg-accent-bright">Submit final defense</button>
      </form>
    );
  }

  return (
    <div className="mt-5 space-y-2">
      <button className="inline-flex h-9 w-full items-center justify-center rounded-[8px] border border-accent bg-accent text-[12.5px] font-medium text-accent-contrast hover:bg-accent-bright">Run defense checks</button>
      <p className="text-[11px] leading-[1.5] text-muted">2 verification requests remain. Saved edits and check receipts are recorded for evaluator review.</p>
    </div>
  );
}

/* ---------- file tree ---------- */

type TreeNode = { name: string; path: string; children: TreeNode[] };

function buildTree(paths: string[]): TreeNode[] {
  const root: TreeNode = { name: "", path: "", children: [] };
  for (const p of paths) {
    const parts = p.split("/");
    let cur = root;
    parts.forEach((part, i) => {
      const path = parts.slice(0, i + 1).join("/");
      let next = cur.children.find((c) => c.name === part);
      if (!next) {
        next = { name: part, path, children: [] };
        cur.children.push(next);
      }
      cur = next;
    });
  }
  return root.children;
}

function FileTree({
  nodes,
  activePath,
  onSelect,
  depth = 0,
}: {
  nodes: TreeNode[];
  activePath: string;
  onSelect: (p: string) => void;
  depth?: number;
}) {
  return (
    <ul className="text-[12px]">
      {nodes.map((n) => {
        const isDir = n.children.length > 0;
        return (
          <li key={n.path}>
            {isDir ? (
              <>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 text-muted"
                  style={{ paddingLeft: 12 + depth * 12 }}
                >
                  <ChevronRight className="h-3 w-3" />
                  <Folder className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {n.name}
                </div>
                <FileTree
                  nodes={n.children}
                  activePath={activePath}
                  onSelect={onSelect}
                  depth={depth + 1}
                />
              </>
            ) : (
              <button
                onClick={() => onSelect(n.path)}
                style={{ paddingLeft: 12 + depth * 12 }}
                className={cn(
                  "flex w-full items-center gap-1.5 py-1.5 pr-3 text-left font-mono transition-colors",
                  n.path === activePath
                    ? "bg-surface-raised text-text"
                    : "text-muted hover:text-text",
                )}
              >
                <FileCode2 className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{n.name}</span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
