import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { db } from "@/lib/db";
import { EventCard } from "@/components/news/EventCard";
import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";
import { generatePageMeta } from "@/lib/seo";

// This page reads live events from the database, so it renders per request.
export const instant = false;

export const metadata: Metadata = generatePageMeta({
  title: "School Events & Calendar",
  description: "Published school events and the academic calendar at Purwanchal Secondary Boarding School, Itahari-20, Tarahara.",
});

export default async function EventsPage() {
  let events: {
    slug: string;
    title: string;
    description?: string | null;
    location?: string | null;
    startDate: Date;
  }[] = [];
  let unavailable = false;

  try {
    const dbEvents = await db.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { startDate: "asc" },
    });
    events = dbEvents;
  } catch {
    unavailable = true;
  }

  return (
    <div className="bg-cream">
      <PageHero
        title={<>School <span className="font-editorial italic font-medium text-sun-300">events</span>.</>}
        description="Dates published by the school for examinations, activities and celebrations."
        image={images.assembly}
        crumbs={[{ label: "Events" }]}
      />

      <div className="shell py-16 sm:py-20">
        {unavailable ? (
          <div className="rounded-lg border border-line bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-ink">The events calendar is unavailable right now</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Please try again later, or call the school office on {siteConfig.phone}.
            </p>
            <a href={`tel:${siteConfig.phone}`} className="btn btn-primary mt-5">
              Call the office
            </a>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-line bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-ink">No events have been published yet</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Upcoming dates will appear here when the school publishes them. The term outline is on the academic calendar page.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/academics#calendar" className="btn btn-primary">Academic calendar</Link>
              <Link href="/contact" className="btn btn-outline">Contact details</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-soft">
                <CalendarDays aria-hidden="true" className="size-4 text-brand-700" />
                {events.length} upcoming {events.length === 1 ? "event" : "events"}
              </p>
              <Link href="/contact" className="inline-flex min-h-11 items-center text-sm font-bold text-brand-700 hover:underline">
                Plan a campus visit
              </Link>
            </div>

            <div className="mx-auto max-w-5xl space-y-4">
              {events.map((event) => (
                <EventCard
                  key={event.slug}
                  slug={event.slug}
                  title={event.title}
                  description={event.description}
                  location={event.location}
                  startDate={event.startDate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
