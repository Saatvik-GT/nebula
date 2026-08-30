"use client";

import { useMemo, useState } from "react";
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
  { name: "single order → one delivery", result: "pass" as const },
  { name: "retry is idempotent", result: "fail" as const },
  { name: "unrelated orders unaffected", result: "pass" as const },
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

const STAGES: { key: string; label: string; done: boolean }[] = [
  { key: "diagnose", label: "Diagnose the condition", done: true },
  { key: "change", label: "Apply the change", done: true },
  { key: "verify", label: "Pass visible + hidden checks", done: false },
  { key: "defend", label: "Explain and submit", done: false },
];

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
  const active = files.find((f) => f.path === activePath) ?? files[0];

  const tree = useMemo(() => buildTree(files.map((f) => f.path)), [files]);

  return (
    <div className="-m-4 flex h-[calc(100vh-132px)] flex-col sm:-m-6 sm:h-[calc(100vh-148px)]">
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
                    "editor.background": "#0a0b0a",
                    "editor.foreground": "#f5f7f5",
                    "editorLineNumber.foreground": "#4a504a",
                    "editorGutter.background": "#0a0b0a",
                    "editor.selectionBackground": "#2f4b3c66",
                    "editor.lineHighlightBackground": "#11131199",
                    "editorCursor.foreground": "#4a7a5e",
                  },
                });
              }}
              options={{
                readOnly: false,
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
                    Run visible checks
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
          <h2 className="text-[12px] font-semibold text-text">Defense</h2>
          <ol className="mt-3 space-y-2.5">
            {STAGES.map((s) => (
              <li key={s.key} className="flex items-start gap-2.5 text-[12px]">
                <span
                  className={cn(
                    "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px]",
                    s.done
                      ? "border-success/50 bg-[color-mix(in_oklab,var(--success)_20%,transparent)] text-success"
                      : "border-border text-muted",
                  )}
                >
                  {s.done ? "✓" : ""}
                </span>
                <span className={s.done ? "text-text" : "text-muted"}>
                  {s.label}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-5 space-y-2">
            <button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-accent-bright/55 bg-accent text-[12.5px] font-medium text-text hover:bg-accent-bright/85">
              Run verification
            </button>
            <button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-border text-[12.5px] font-medium text-text hover:bg-surface-raised">
              Submit for report
            </button>
          </div>

          <p className="mt-4 text-[11px] leading-[1.5] text-muted">
            Verification runs the visible suite, then the hidden stress suite. A
            hidden failure opens WORK_REVISION.
          </p>
        </aside>
      </div>
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
