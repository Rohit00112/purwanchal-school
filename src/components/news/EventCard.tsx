import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface EventCardProps {
  slug: string;
  title: string;
  description?: string | null;
  location?: string | null;
  startDate: Date;
}

export function EventCard({ slug, title, description, location, startDate }: EventCardProps) {
  const date = new Date(startDate);

  return (
    <article className="grid gap-5 rounded-lg border border-line bg-white p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
      <div className="flex items-center gap-4 sm:flex-col sm:gap-0">
        <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-900 text-white sm:size-[4.5rem]">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-sun-300">
            {date.toLocaleDateString("en-US", { month: "short" })}
          </span>
          <span className="text-2xl font-extrabold leading-none">{date.getDate()}</span>
        </div>
        <span className="text-xs font-semibold text-ink-soft sm:mt-2 sm:text-center">
          {date.toLocaleDateString("en-US", { year: "numeric" })}
        </span>
      </div>

      <div className="min-w-0">
        <h3 className="text-lg font-extrabold leading-snug text-ink">
          <Link href={`/events/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        {description && <p className="mt-1.5 text-[0.83rem] leading-relaxed text-ink-soft">{description}</p>}
        {location && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
            <MapPin aria-hidden="true" className="size-3.5 text-brand-700" /> {location}
          </p>
        )}
        <Link
          href={`/events/${slug}`}
          className="mt-3 inline-flex min-h-11 items-center text-xs font-bold text-brand-700 hover:underline"
        >
          View event details
        </Link>
      </div>
    </article>
  );
}

export function formatEventDate(date: Date) {
  return formatDateShort(date);
}
