"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, GitBranch, Loader2, UploadCloud } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { Tabs } from "@/components/app/Tabs";
import { cn } from "@/lib/cn";

export function ImportProjectForm() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 rounded-[10px] border border-warning/30 bg-[color-mix(in_oklab,var(--warning)_7%,var(--surface))] p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <p className="text-[12.5px] leading-[1.55] text-muted">
          <span className="font-medium text-text">Use a project copy.</span>{" "}
          Remove production credentials, private keys, personal data, and secrets before import.
        </p>
      </div>
      <Tabs
        tabs={[
          { id: "git", label: "Public repository", content: <GitTab /> },
          { id: "zip", label: "Archive", content: <ZipTab /> },
        ]}
      />
    </div>
  );
}

function GitTab() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [ref, setRef] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <Panel className="p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            const parsed = new URL(url);
            if (parsed.protocol !== "https:") throw new Error();
          } catch {
            setError("Enter a valid public HTTPS Git URL.");
            return;
          }
          setError("");
          setBusy(true);
          setTimeout(() => router.push("/projects/arc-web-portal/qualification"), 700);
        }}
        className="space-y-5"
      >
        <Field label="Public HTTPS Git URL" hint="The server performs network and repository safety checks.">
          <div className="flex items-center rounded-[8px] border border-border bg-surface focus-within:border-accent-bright/60">
            <GitBranch className="ml-3 h-4 w-4 shrink-0 text-muted" />
            <input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              placeholder="https://git.example.com/team/project.git"
              className="h-10 w-full bg-transparent px-3 text-[13px] text-text outline-none placeholder:text-muted"
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "git-url-error" : undefined}
            />
          </div>
          {error && <p id="git-url-error" className="text-[11.5px] text-danger">{error}</p>}
        </Field>

        <Field label="Branch (optional)" hint="Leave blank to use the repository default branch.">
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="Repository default"
            className="h-10 w-full rounded-[8px] border border-border bg-surface px-3 font-mono text-[13px] text-text outline-none focus:border-accent-bright/60"
          />
        </Field>

        <div className="flex items-center justify-between border-t border-border pt-5">
          <p className="text-[12px] text-muted">
            The default branch is used when no branch is provided.
          </p>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[8px] border border-accent bg-accent px-4 text-[13px] font-medium text-accent-contrast transition-colors hover:bg-accent-bright disabled:opacity-45"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? "Importing…" : "Import project"}
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
  const [error, setError] = useState("");

  return (
    <Panel className="p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!file) {
            setError("Choose a .zip archive before continuing.");
            return;
          }
          setError("");
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
            if (f?.name.toLowerCase().endsWith(".zip")) {
              setFile(f);
              setError("");
            } else {
              setError("Only .zip project archives are supported.");
            }
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
            onChange={(e) => {
              const next = e.target.files?.[0] ?? null;
              setFile(next);
              setError("");
            }}
          />
        </label>
        {error && <p role="alert" className="text-[11.5px] text-danger">{error}</p>}

        <div className="flex items-center justify-between border-t border-border pt-5">
          <p className="text-[12px] text-muted">
            {file ? `${file.name} · ${formatBytes(file.size)}` : "Select one complete project archive."}
          </p>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[8px] border border-accent bg-accent px-4 text-[13px] font-medium text-accent-contrast transition-colors hover:bg-accent-bright disabled:opacity-45"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? "Uploading…" : "Upload and inspect"}
          </button>
        </div>
      </form>
    </Panel>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
