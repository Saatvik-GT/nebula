"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, Loader2, UploadCloud } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { Tabs } from "@/components/app/Tabs";
import { cn } from "@/lib/cn";

export function ImportProjectForm() {
  return (
    <Tabs
      tabs={[
        { id: "git", label: "Git URL", content: <GitTab /> },
        { id: "zip", label: "ZIP upload", content: <ZipTab /> },
      ]}
    />
  );
}

function GitTab() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [ref, setRef] = useState("main");
  const [busy, setBusy] = useState(false);

  return (
    <Panel className="p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBusy(true);
          setTimeout(() => router.push("/projects/arc-web-portal/qualification"), 700);
        }}
        className="space-y-5"
      >
        <Field label="Repository URL" hint="HTTPS clone URL of the submitted repository.">
          <div className="flex items-center rounded-[8px] border border-border bg-surface focus-within:border-accent-bright/60">
            <GitBranch className="ml-3 h-4 w-4 shrink-0 text-muted" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://git.example.com/team/project.git"
              className="h-10 w-full bg-transparent px-3 text-[13px] text-text outline-none placeholder:text-muted"
              autoComplete="off"
            />
          </div>
        </Field>

        <Field label="Ref" hint="Branch, tag, or commit to snapshot.">
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="h-10 w-full rounded-[8px] border border-border bg-surface px-3 font-mono text-[13px] text-text outline-none focus:border-accent-bright/60"
          />
        </Field>

        <div className="flex items-center justify-between border-t border-border pt-5">
          <p className="text-[12px] text-muted">
            The repository is cloned into an isolated sandbox and frozen to an
            immutable snapshot.
          </p>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[8px] border border-accent-bright/55 bg-accent px-4 text-[13px] font-medium text-text transition-colors hover:bg-accent-bright/85 disabled:opacity-45"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? "Importing…" : "Import repository"}
          </button>
        </div>
      </form>
    </Panel>
  );
}

function ZipTab() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <Panel className="p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBusy(true);
          setTimeout(() => router.push("/projects/arc-web-portal/qualification"), 700);
        }}
        className="space-y-5"
      >
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) setFile(f);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed px-6 py-12 text-center transition-colors",
            drag
              ? "border-accent-bright/70 bg-[color-mix(in_oklab,var(--accent)_18%,transparent)]"
              : "border-border bg-surface hover:border-[color-mix(in_oklab,var(--border)_50%,var(--muted))]",
          )}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-raised">
            <UploadCloud className="h-5 w-5 text-accent-bright" strokeWidth={1.75} />
          </span>
          {file ? (
            <span className="font-mono text-[13px] text-text">{file.name}</span>
          ) : (
            <>
              <span className="text-[13px] text-text">
                Drop a <span className="font-mono">.zip</span> archive here, or
                click to browse
              </span>
              <span className="text-[12px] text-muted">
                A single archive of the full project tree.
              </span>
            </>
          )}
          <input
            type="file"
            accept=".zip,application/zip"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="flex items-center justify-between border-t border-border pt-5">
          <p className="text-[12px] text-muted">
            The archive is unpacked in a sandbox and frozen to an immutable
            snapshot.
          </p>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[8px] border border-accent-bright/55 bg-accent px-4 text-[13px] font-medium text-text transition-colors hover:bg-accent-bright/85 disabled:opacity-45"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? "Uploading…" : "Upload archive"}
          </button>
        </div>
      </form>
    </Panel>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12.5px] font-medium text-text">{label}</label>
      {children}
      {hint && <p className="text-[11.5px] text-muted">{hint}</p>}
    </div>
  );
}
