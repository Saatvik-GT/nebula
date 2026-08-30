/** "2 min ago", "1 hr ago", "3 days ago" — matches the dashboard reference copy. */
export function relativeTime(iso: string, from: number = Date.now()): string {
  const diffMs = from - new Date(iso).getTime();
  const sec = Math.max(0, Math.floor(diffMs / 1000));
  if (sec < 45) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${Math.max(1, min)} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day === 1 ? "" : "s"} ago`;
  const wk = Math.floor(day / 7);
  return `${wk} wk${wk === 1 ? "" : "s"} ago`;
}

/** "5m ago" / "15m ago" / "1h ago" — the terser System Activity variant. */
export function relativeTimeShort(iso: string, from: number = Date.now()): string {
  const diffMs = from - new Date(iso).getTime();
  const min = Math.max(1, Math.floor(diffMs / 60000));
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

export function timeRange(startIso: string, endIso: string): string {
  const fmt = (iso: string) =>
    new Date(iso)
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  return `${fmt(startIso)} – ${fmt(endIso)}`;
}

export function isToday(iso: string, from: number = Date.now()): boolean {
  const d = new Date(iso);
  const n = new Date(from);
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}

export function signed(n: number): string {
  return n > 0 ? `+${n}` : `${n}`;
}
