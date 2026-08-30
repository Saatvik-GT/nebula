"use client";

import { useMemo, useState } from "react";
import {
  Background,
  Controls,
  Position,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FileCode2, FlaskConical, Settings2, Rocket } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/badges";
import type { AtlasModule, Snapshot } from "@/lib/api/mock/resources";
import { cn } from "@/lib/cn";

const kindIcon = {
  entry: Rocket,
  module: FileCode2,
  test: FlaskConical,
  config: Settings2,
} as const;

export function SnapshotAtlas({
  snapshot,
  modules,
}: {
  snapshot: Snapshot;
  modules: AtlasModule[];
}) {
  const [selectedId, setSelectedId] = useState(modules[0]?.id ?? "");
  const selected = modules.find((m) => m.id === selectedId) ?? modules[0];

  const { nodes, edges } = useMemo(() => {
    const depth = new Map<string, number>();
    const compute = (id: string, seen = new Set<string>()): number => {
      if (depth.has(id)) return depth.get(id)!;
      if (seen.has(id)) return 0;
      seen.add(id);
      const m = modules.find((x) => x.id === id);
      const d = !m || m.dependsOn.length === 0
        ? 0
        : 1 + Math.max(...m.dependsOn.map((dep) => compute(dep, seen)));
      depth.set(id, d);
      return d;
    };
    modules.forEach((m) => compute(m.id));

    const byDepth = new Map<number, number>();
    const nodes: Node[] = modules.map((m) => {
      const d = depth.get(m.id) ?? 0;
      const row = byDepth.get(d) ?? 0;
      byDepth.set(d, row + 1);
      return {
        id: m.id,
        position: { x: row * 190 + 20, y: d * 130 + 20 },
        data: { label: m.path.split("/").pop() ?? m.path },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: {
          borderRadius: 8,
          border: `1px solid ${m.inDefenseSurface ? "var(--accent-bright)" : "var(--border)"}`,
          background: m.id === selectedId ? "var(--surface-raised)" : "var(--surface)",
          color: "var(--text)",
          fontSize: 12,
          fontFamily: "var(--font-mono)",
          padding: "8px 12px",
          width: 168,
          boxShadow: m.inDefenseSurface
            ? "0 0 0 3px color-mix(in oklab, var(--accent-bright) 16%, transparent)"
            : "none",
        },
      };
    });

    const edges: Edge[] = modules.flatMap((m) =>
      m.dependsOn.map((dep) => ({
        id: `${m.id}-${dep}`,
        source: dep,
        target: m.id,
        style: { stroke: "var(--border)", strokeWidth: 1.5 },
      })),
    );

    return { nodes, edges };
  }, [modules, selectedId]);

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr_300px]">
      {/* module list */}
      <Panel className="flex max-h-[560px] flex-col overflow-hidden">
        <div className="border-b border-border px-4 py-3 text-[12px] font-semibold text-text">
          Modules <span className="text-muted">· {modules.length}</span>
        </div>
        <ul className="flex-1 overflow-y-auto p-2">
          {modules.map((m) => {
            const Icon = kindIcon[m.kind];
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(m.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-colors",
                    m.id === selectedId
                      ? "bg-surface-raised"
                      : "hover:bg-surface-raised/60",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      m.inDefenseSurface ? "text-accent-bright" : "text-muted",
                    )}
                    strokeWidth={1.75}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-mono text-[12px] text-text">
                      {m.path.split("/").pop()}
                    </span>
                    <span className="block truncate text-[10.5px] text-muted">
                      {m.path}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>

      {/* graph */}
      <Panel className="h-[460px] overflow-hidden lg:h-[560px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          colorMode="dark"
          fitView
          fitViewOptions={{ padding: 0.25, minZoom: 0.5, maxZoom: 1.1 }}
          minZoom={0.4}
          proOptions={{ hideAttribution: true }}
          onNodeClick={(_, n) => setSelectedId(n.id)}
          nodesDraggable={false}
          nodesConnectable={false}
        >
          <Background color="var(--border)" gap={20} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </Panel>

      {/* detail */}
      <Panel className="max-h-[560px] overflow-y-auto p-5">
        {selected && (
          <>
            <p className="font-mono text-[11px] text-muted">{snapshot.id}</p>
            <h3 className="mt-1 break-all font-mono text-[13.5px] font-medium text-text">
              {selected.path}
            </h3>
            <div className="mt-4 space-y-3 text-[12.5px]">
              <DetailRow label="Kind">
                <span className="font-mono text-text">{selected.kind}</span>
              </DetailRow>
              <DetailRow label="Lines">
                <span className="tnum text-text">{selected.loc}</span>
              </DetailRow>
              <DetailRow label="Depends on">
                <span className="text-text">
                  {selected.dependsOn.length
                    ? selected.dependsOn
                        .map((d) => modules.find((m) => m.id === d)?.path.split("/").pop())
                        .join(", ")
                    : "—"}
                </span>
              </DetailRow>
              <DetailRow label="Defense surface">
                {selected.inDefenseSurface ? (
                  <Pill tone="active">In surface</Pill>
                ) : (
                  <Pill tone="neutral">Excluded</Pill>
                )}
              </DetailRow>
            </div>
          </>
        )}
      </Panel>
    </div>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0">
      <span className="text-muted">{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
}
