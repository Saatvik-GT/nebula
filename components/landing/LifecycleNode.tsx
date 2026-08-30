import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Peripheral lifecycle marker. Each maps to a real stage of the defense session
 * state machine (Frontend Spec PART D) — no invented lifecycle names:
 *   Isolate  -> snapshot created
 *   Inject   -> challenge compiled / activated
 *   Evaluate -> verification run (visible / hidden checks)
 *   Defend   -> DEFEND stage / final explanation
 */
export function LifecycleNode({
  icon: Icon,
  label,
  sublabel,
  className,
  align = "left",
}: {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  className?: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "absolute z-10 hidden items-center gap-3 lg:flex",
        align === "right" && "flex-row-reverse text-right",
        className,
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-surface/80 backdrop-blur-sm">
        <Icon className="h-4 w-4 text-accent-bright" strokeWidth={1.75} />
      </span>
      <span className="leading-tight">
        <span className="flex items-center gap-1.5 text-[13.5px] font-medium text-text">
          <span
            aria-hidden
            className="inline-block h-1 w-1 rounded-full bg-accent-bright"
          />
          {label}
        </span>
        <span className="mt-0.5 block text-[11px] text-muted">{sublabel}</span>
      </span>
    </div>
  );
}
