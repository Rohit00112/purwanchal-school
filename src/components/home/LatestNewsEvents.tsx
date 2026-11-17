import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function LatestNewsEvents() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title="Notices and events"
          description="School announcements will be published here."
        />

        <div className="mt-10 rounded-xl border border-line bg-cream p-8">
          <p className="text-base leading-relaxed text-ink-soft">
            Notices and events will appear here when they are published.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/news" className="btn btn-outline">
              Read notices
            </Link>
            <Link href="/events" className="btn btn-outline">
              See events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
