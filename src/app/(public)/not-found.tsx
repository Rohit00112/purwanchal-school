import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-lg rounded-lg border border-line bg-white p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-700">404</p>
        <h1 className="mt-3 text-2xl font-extrabold text-ink">We could not find that page</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          The notice or event may have been removed, or the address may be misspelled. Browse the
          pages below instead.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Go to home page</Link>
          <Link href="/news" className="btn btn-outline">News & notices</Link>
          <Link href="/events" className="btn btn-outline">Events</Link>
        </div>
      </div>
    </div>
  );
}
