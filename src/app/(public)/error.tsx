"use client";

import Link from "next/link";

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-lg rounded-lg border border-line bg-white p-8 text-center">
        <h1 className="text-2xl font-extrabold text-ink">This page could not be loaded</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Something went wrong while preparing the page. Try again, or call the school office if the
          problem continues.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Go to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
