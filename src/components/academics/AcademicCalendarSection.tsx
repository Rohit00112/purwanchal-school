import { CalendarDays, ClipboardCheck, PartyPopper } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const terms = [
  {
    icon: CalendarDays,
    title: "First Term",
    period: "Baisakh to Ashadh",
    months: "April to July",
    items: ["Session begins & orientation", "Unit tests and class assessments", "First terminal examination"],
  },
  {
    icon: ClipboardCheck,
    title: "Second Term",
    period: "Shrawan to Ashwin",
    months: "July to October",
    items: ["Mid-term evaluations", "Parent-teacher meetings", "Second terminal examination"],
  },
  {
    icon: PartyPopper,
    title: "Final Term",
    period: "Kartik to Falgun",
    months: "October to February",
    items: ["Pre-board mock tests", "Annual & cultural programmes", "Final / SEE board examinations"],
  },
];

export function AcademicCalendarSection() {
  return (
    <section id="calendar" className="scroll-mt-24 bg-brand-50/40 py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title={<>The year, <span className="font-editorial italic font-medium text-brand-600">at a glance</span>.</>}
          description="A steady rhythm of learning, assessment and celebration across three terms."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {terms.map(({ icon: Icon, title, period, months, items }, i) => (
            <div key={title} className="h-full rounded-lg border border-line bg-white p-7">
              <div className="flex items-start justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-editorial text-2xl font-semibold text-line-strong">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-ink">{title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-600">{period}</p>
              <p className="text-xs text-ink-faint">{months}</p>
              <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sun-400" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
