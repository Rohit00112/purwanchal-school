import Link from "next/link";
import { 
  Bell, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Clock, 
  ChevronRight
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const sampleNotices = [
  {
    title: "Admission Open for Academic Session 2081/2082 (Nursery to Grade 11)",
    category: "Admissions",
    date: "Falgun 20, 2080",
    badge: "Active",
    desc: "Application forms are available at the school administrative desk and online. Entrance evaluations are scheduled weekly."
  },
  {
    title: "SEE Examination Routine & Special Preparation Classes for Grade 10",
    category: "Academic",
    date: "Magh 28, 2080",
    badge: "Urgent",
    desc: "Special revision and mock exam sessions for SEE candidates will commence from Sunday. Full attendance is mandatory."
  },
  {
    title: "Second Terminal Assessment Results & Parent-Teacher Meeting (PTM)",
    category: "Notice",
    date: "Poush 15, 2080",
    badge: "General",
    desc: "Parents and guardians are cordially invited to review progress report cards and discuss student academic development."
  }
];

const sampleEvents = [
  {
    month: "CHAITRA",
    day: "12",
    title: "Annual Sports Week & Track Meet",
    time: "9:00 AM to 3:30 PM",
    venue: "School Main Sports Ground"
  },
  {
    month: "BAISHAKH",
    day: "04",
    title: "New Academic Session Orientation Day",
    time: "10:00 AM to 1:00 PM",
    venue: "School Assembly Hall"
  },
  {
    month: "JESTHA",
    day: "18",
    title: "Inter-House Science & IT Exhibition",
    time: "10:30 AM to 2:30 PM",
    venue: "Science & Computer Labs"
  }
];

export function LatestNewsEvents() {
  return (
    <section className="bg-slate-bg py-20 sm:py-24 lg:py-28 border-b border-line">
      <div className="shell">
        <SectionHeading
          badge="Notice Board & Calendar"
          title="Stay Updated with School Circulars & Activities"
          description="Official notifications, examination schedules, holiday circulars, and academic events from the Purwanchal school administration."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Official Notices (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <Bell className="size-5 text-brand-700" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  Latest School Notices
                </h3>
              </div>
              <Link
                href="/news"
                className="inline-flex min-h-[44px] items-center text-xs font-bold text-brand-700 hover:text-brand-900"
              >
                All Notices <ChevronRight className="size-4 ml-0.5" />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {sampleNotices.map((notice) => (
                <article
                  key={notice.title}
                  className="group rounded-xl border border-line bg-white p-5 transition-all duration-200 hover:border-brand-700 hover:shadow-xs"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-md bg-brand-50 px-2 py-0.5 font-bold uppercase tracking-wide text-brand-700">
                      {notice.category}
                    </span>
                    <span className="text-ink-faint">·</span>
                    <span className="text-ink-soft">{notice.date}</span>
                  </div>

                  <h4 className="mt-2.5 font-serif text-base font-bold text-ink group-hover:text-brand-700 transition-colors">
                    {notice.title}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    {notice.desc}
                  </p>

                  <div className="mt-3.5 border-t border-line/60 pt-2.5">
                    <Link
                      href="/news"
                      className="inline-flex min-h-[44px] items-center text-xs font-bold text-brand-700 group-hover:underline"
                    >
                      Read full circular <ArrowRight className="size-3.5 ml-1.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Upcoming Events Calendar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-sun-500" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  Upcoming Events
                </h3>
              </div>
              <Link
                href="/events"
                className="inline-flex min-h-[44px] items-center text-xs font-bold text-brand-700 hover:text-brand-900"
              >
                Full Calendar <ChevronRight className="size-4 ml-0.5" />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {sampleEvents.map((ev) => (
                <div
                  key={ev.title}
                  className="flex items-start gap-4 rounded-xl border border-line bg-white p-4 transition-all duration-200 hover:border-brand-300"
                >
                  {/* Date Badge */}
                  <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-900 text-white shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-sun-300">
                      {ev.month}
                    </span>
                    <span className="font-serif text-xl font-bold leading-tight">
                      {ev.day}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-bold text-ink">
                      {ev.title}
                    </h4>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
                      <Clock className="size-3 text-brand-600 shrink-0" aria-hidden="true" />
                      {ev.time}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {ev.venue}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Circular Hotline Box */}
            <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
              <h4 className="font-serif text-sm font-bold text-brand-900">
                Official SMS &amp; Mobile Notices
              </h4>
              <p className="mt-1 text-xs text-brand-800 leading-relaxed">
                Emergency closures and routine announcements are communicated directly to registered guardian phone numbers and through the Purwanchal mobile app.
              </p>
              <div className="mt-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center text-xs font-bold text-brand-700 hover:underline"
                >
                  Update your contact details with administration →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
