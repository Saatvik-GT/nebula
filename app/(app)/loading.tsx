export default function AppLoading() {
  return (
    <div aria-label="Loading page" role="status" className="animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="h-6 w-44 rounded-[6px] bg-surface-raised" />
        <div className="h-3 w-80 max-w-full rounded-[4px] bg-surface-raised" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="h-48 rounded-[12px] border border-border bg-surface lg:col-span-2" />
        <div className="h-48 rounded-[12px] border border-border bg-surface" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
