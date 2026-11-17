import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs">
        <div className="h-4 w-32 bg-slate-200 rounded mb-3" />
        <div className="h-8 w-64 bg-slate-200 rounded mb-2" />
        <div className="h-4 w-96 max-w-full bg-slate-100 rounded" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-line bg-white p-5 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-slate-200 rounded" />
              <div className="size-8 rounded-lg bg-slate-100" />
            </div>
            <div className="h-7 w-12 bg-slate-200 rounded" />
            <div className="h-3 w-32 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      {/* Table / List Skeleton */}
      <div className="rounded-xl border border-line bg-white p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-line pb-4">
          <div className="h-5 w-40 bg-slate-200 rounded" />
          <div className="h-8 w-28 bg-slate-100 rounded-lg" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <div className="space-y-1.5">
                <div className="h-4 w-48 bg-slate-200 rounded" />
                <div className="h-3 w-32 bg-slate-100 rounded" />
              </div>
              <div className="h-6 w-20 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
