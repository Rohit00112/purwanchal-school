import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Phone } from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// Event content comes from the database, so this route renders per request.
export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string) {
  try {
    return await db.event.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  return {
    title: event ? `${event.title} | Events Calendar` : "Event not found | Events Calendar",
    description: event?.description || "School event from Purwanchal Secondary Boarding School.",
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  return (
    <div className="bg-cream py-12 sm:py-16">
      <div className="shell max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
          <Link href="/" className="inline-flex min-h-11 items-center hover:text-brand-700 hover:underline">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/events" className="inline-flex min-h-11 items-center hover:text-brand-700 hover:underline">Events</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="inline-flex min-h-11 max-w-[16rem] items-center truncate font-semibold text-brand-800">{event.title}</span>
        </nav>

        <Link href="/events" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-700 hover:underline">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to events calendar
        </Link>

        <article className="rounded-lg border border-line bg-white">
          <div className="rounded-t-lg bg-brand-900 px-7 py-10 sm:px-10 sm:py-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white/10 px-4 font-bold text-sun-300">
                <CalendarDays aria-hidden="true" className="size-4" /> {formatDate(event.startDate)}
              </span>
              {event.location && (
                <span className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white/10 px-4">
                  <MapPin aria-hidden="true" className="size-4 text-sun-300" /> {event.location}
                </span>
              )}
            </div>
            <h1 className="mt-6 text-2xl font-extrabold leading-snug text-white sm:text-4xl">{event.title}</h1>
          </div>

          <div className="p-7 sm:p-10">
            {event.description && (
              <p className="text-base leading-relaxed text-ink-soft">{event.description}</p>
            )}
            {event.content && (
              <div className="mt-6 whitespace-pre-line text-[0.95rem] leading-[1.9] text-ink-soft">
                {event.content}
              </div>
            )}

            <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-lg bg-cream p-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-extrabold text-ink">Questions about this event?</h2>
                <p className="mt-1 text-sm text-ink-soft">The office is open {siteConfig.officeHours.days.toLowerCase()}.</p>
              </div>
              <a href={`tel:${siteConfig.phone}`} className="btn btn-sun shrink-0">
                <Phone aria-hidden="true" className="size-4" /> {siteConfig.phone}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
