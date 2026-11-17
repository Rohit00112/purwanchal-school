import Link from "next/link";
import { BriefcaseBusiness, Laptop, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const streams = [
  {
    icon: BriefcaseBusiness,
    title: "Management",
    text: "Business, commerce and accounting foundations.",
    subjects: ["Accountancy", "Economics", "Business Studies"],
  },
  {
    icon: Laptop,
    title: "Computer Science",
    text: "Programming, systems and web technology.",
    subjects: ["Computer Science", "Mathematics", "Physics / Business", "Economics"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    text: "Teaching methods, child development and classroom practice.",
    subjects: ["Foundations of Education", "Child Development", "English / Nepali / Maths Education"],
  },
];

export function PlusTwoDetail() {
  return (
    <section id="plus-two" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title={<>Find your direction with <span className="font-editorial italic font-medium text-brand-600">+2</span>.</>}
          description="Three +2 streams: Management, Computer Science and Education."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {streams.map(({ icon: Icon, title, text, subjects }) => (
            <div key={title} className="flex h-full flex-col rounded-lg border border-line bg-white">
              <div className="rounded-t-lg bg-brand-900 p-6 text-white">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-sun-300 text-brand-950">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">{text}</p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-600">Key subjects</p>
                <ul className="mt-3 space-y-2">
                  {subjects.map((subject) => (
                    <li key={subject} className="flex items-start gap-2 text-sm text-ink-soft">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sun-400" aria-hidden="true" /> {subject}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-lg bg-brand-900 px-7 py-7 sm:flex-row sm:px-10">
          <div>
            <h3 className="text-xl font-extrabold text-white">Ask about +2 admissions</h3>
            <p className="mt-1 text-sm text-white/80">Use the enquiry form to ask about streams, subjects and intake.</p>
          </div>
          <Link href="/admissions#inquiry-form" className="btn btn-sun shrink-0">
            Admission enquiry form
          </Link>
        </div>
      </div>
    </section>
  );
}
