"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Camera,
  GitBranch,
  ListChecks,
  Loader2,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { Tabs } from "@/components/app/Tabs";
import { cn } from "@/lib/cn";

const KICKER = "font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/40";
const SUBMIT =
  "inline-flex h-10 shrink-0 items-center gap-2 rounded-[8px] border border-accent-bright/40 " +
  "bg-accent-bright/10 px-4 text-[13px] font-medium text-accent-bright transition-colors " +
  "hover:bg-accent-bright hover:text-accent-contrast disabled:opacity-45";
const INPUT =
  "h-11 w-full rounded-[8px] border border-white/12 bg-white/[0.03] px-3 text-[13px] text-text " +
  "outline-none transition-colors placeholder:text-white/30 focus:border-accent-bright/60";

const STEPS = [
  {
    icon: Camera,
    title: "Immutable snapshot",
    body: "The source is frozen on import. Your original submission is never touched.",
  },
  {
    icon: ListChecks,
    title: "Qualification pipeline",
    body: "Every project runs the same executable checks before it can host a defense.",
  },
  {
    icon: ShieldCheck,
    title: "Isolated workspace",
    body: "All work happens against the frozen copy inside a sandbox.",
  },
];

export function ImportProjectForm() {
  return (
    <div className="grid flex-1 grid-cols-1 gap-px border-t border-white/12 bg-white/12 lg:min-h-0 lg:grid-cols-12">
      <div className="flex flex-col justify-center bg-[#0b0b0b] p-6 sm:p-8 lg:col-span-8 lg:p-12">
        <Tabs
          tabs={[
            { id: "git", label: "Public repository", content: <GitTab /> },
            { id: "zip", label: "Archive", content: <ZipTab /> },
          ]}
        />
      </div>

      <aside className="grid grid-cols-1 gap-px bg-white/12 lg:col-span-4 lg:grid-rows-[auto_auto_1fr]">
        <div className="bg-[#0b0b0b] p-5 lg:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <div>
              <p className={KICKER}>Before you import</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-white/60">
                <span className="font-medium text-white">Use a project copy.</span>{" "}
                Remove production credentials, private keys, personal data, and
                secrets first.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0b0b0b] p-5 lg:p-6">
          <p className={KICKER}>What happens next</p>
          <ol className="mt-3 space-y-2.5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-2.5">
                <span className="mt-0.5 font-mono text-[11px] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="flex items-center gap-2 text-[12.5px] font-medium text-white">
                    <s.icon
                      className="h-3.5 w-3.5 text-accent-bright"
                      strokeWidth={1.75}
                    />
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-white/45">
                    {s.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-[#0b0b0b] p-5 lg:p-6">
          <p className={KICKER}>Accepted sources</p>
          <ul className="mt-2.5 space-y-2 text-[12.5px] text-white/55">
            <li className="flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5 text-white/30" /> Public HTTPS Git
              URL
            </li>
            <li className="flex items-center gap-2">
              <UploadCloud className="h-3.5 w-3.5 text-white/30" /> Single .zip
              archive of the tree
            </li>
          </ul>
        </div>
      </aside>
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
        setTimeout(
          () => router.push("/projects/arc-web-portal/qualification"),
          700,
        );
      }}
      className="max-w-[680px] space-y-6"
    >
      <Field
        label="Public HTTPS Git URL"
        hint="The server performs network and repository safety checks."
      >
        <div className="flex items-center rounded-[8px] border border-white/12 bg-white/[0.03] transition-colors focus-within:border-accent-bright/60">
          <GitBranch className="ml-3 h-4 w-4 shrink-0 text-white/40" />
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            placeholder="https://git.example.com/team/project.git"
            className="h-11 w-full bg-transparent px-3 text-[13px] text-text outline-none placeholder:text-white/30"
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "git-url-error" : undefined}
          />
        </div>
        {error && (
          <p id="git-url-error" className="text-[11.5px] text-danger">
            {error}
          </p>
        )}
      </Field>

      <Field
        label="Branch (optional)"
        hint="Leave blank to use the repository default branch."
      >
        <input
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="Repository default"
          className={cn(INPUT, "font-mono")}
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-5">
        <p className="text-[12px] text-white/40">
          The default branch is used when no branch is provided.
        </p>
        <button type="submit" disabled={busy} className={SUBMIT}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {busy ? "Importing…" : "Import project"}
        </button>
      </div>
    </form>
  );
}

function ZipTab() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!file) {
          setError("Choose a .zip archive before continuing.");
          return;
        }
        setError("");
        setBusy(true);
        setTimeout(
          () => router.push("/projects/arc-web-portal/qualification"),
          700,
        );
      }}
      className="max-w-[680px] space-y-6"
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
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed px-6 py-14 text-center transition-colors",
          drag
            ? "border-accent-bright/70 bg-accent-bright/10"
            : "border-white/15 bg-white/[0.03] hover:border-white/30",
        )}
      >
        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04]">
          <UploadCloud className="h-5 w-5 text-accent-bright" strokeWidth={1.75} />
        </span>
        {file ? (
          <span className="font-mono text-[13px] text-text">{file.name}</span>
        ) : (
          <>
            <span className="text-[13px] text-text">
              Drop a <span className="font-mono">.zip</span> archive here, or click
              to browse
            </span>
            <span className="text-[12px] text-white/45">
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
      {error && (
        <p role="alert" className="text-[11.5px] text-danger">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-5">
        <p className="text-[12px] text-white/40">
          {file
            ? `${file.name} · ${formatBytes(file.size)}`
            : "Select one complete project archive."}
        </p>
        <button type="submit" disabled={busy} className={SUBMIT}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {busy ? "Uploading…" : "Upload and inspect"}
        </button>
      </div>
    </form>
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
      <label className="block text-[12.5px] font-medium text-white/75">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11.5px] text-white/40">{hint}</p>}
    </div>
  );
}
