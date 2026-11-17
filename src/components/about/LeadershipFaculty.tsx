import Link from "next/link";
import { GraduationCap, FlaskConical, Calculator, Languages, Palette, HeartPulse } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const departments = [
  { icon: GraduationCap, title: "Administration", text: "School leadership and day-to-day coordination." },
  { icon: Languages, title: "Languages", text: "English and Nepali literacy, expression and reading." },
  { icon: Calculator, title: "Mathematics", text: "Number sense, problem-solving and logic." },
  { icon: FlaskConical, title: "Science & IT", text: "Practical investigations and computer use." },
  { icon: Palette, title: "Arts & Humanities", text: "Social studies, creative arts and music." },
  { icon: HeartPulse, title: "Physical Education", text: "Fitness, teamwork and healthy habits." },
];

export function LeadershipFaculty() {
  return (
    <section id="team" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title={<>The people behind <span className="font-editorial italic font-medium text-brand-600">the teaching</span>.</>}
          description="Subject areas across the school's academic levels."
          action={
            <Link href="/contact" className="inline-flex min-h-11 items-center text-sm font-extrabold text-brand-700 underline underline-offset-4">
              Meet us on campus
            </Link>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map(({ icon: Icon, title, text }) => (
            <div key={title} className="h-full rounded-lg border border-line bg-cream p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-extrabold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-lg bg-brand-900 px-7 py-7 sm:flex-row sm:px-10">
          <div>
            <h3 className="text-xl font-extrabold text-white">Visit the campus</h3>
            <p className="mt-1 text-sm text-white/80">Arrange a visit to see the campus and speak with the school office.</p>
          </div>
          <Link href="/contact" className="btn btn-sun shrink-0">
            Plan a campus visit
          </Link>
        </div>
      </div>
    </section>
  );
}
