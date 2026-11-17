export default function Loading() {
  return (
    <div className="bg-cream">
      <div className="h-72 bg-brand-950" aria-hidden="true" />
      <div className="shell py-16" role="status" aria-live="polite">
        <p className="text-sm font-semibold text-ink-soft">Loading page…</p>
        <div className="mt-6 space-y-4">
          <div className="h-5 w-2/5 rounded bg-cream-deep" />
          <div className="h-4 w-3/4 rounded bg-cream-deep" />
          <div className="h-4 w-1/2 rounded bg-cream-deep" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-40 rounded-lg border border-line bg-white" />
            <div className="h-40 rounded-lg border border-line bg-white" />
            <div className="h-40 rounded-lg border border-line bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
