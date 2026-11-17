import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";

const levels = [
  { title: "Early Childhood", grades: "Nursery to UKG" },
  { title: "Primary", grades: "Grades 1 to 5" },
  { title: "Lower Secondary", grades: "Grades 6 to 8" },
  { title: "Secondary / SEE", grades: "Grades 9 to 10" },
];

const streams = ["Management", "Computer Science", "Education"];

export function AcademicPrograms() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title="Academic programmes"
          description="Five levels from Nursery to Grade 12. Higher Secondary (+2) offers three streams."
          action={
            <Link
              href="/academics"
              className="inline-flex min-h-11 items-center text-sm font-extrabold text-brand-700 hover:text-brand-800"
            >
              See academic programmes
            </Link>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((level) => (
            <Link
              key={level.title}
              href="/academics"
              className="flex min-h-28 flex-col justify-between rounded-xl border border-line bg-cream p-5 hover:border-brand-600"
            >
              <span className="text-base font-extrabold text-ink">{level.title}</span>
              <span className="mt-2 text-sm text-ink-soft">{level.grades}</span>
            </Link>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-line bg-brand-50 p-6">
          <h3 className="text-lg font-extrabold text-ink">Higher Secondary (+2), Grades 11 to 12</h3>
          <p className="mt-2 text-sm text-ink-soft">Three streams: {streams.join(", ")}.</p>
          <Link
            href="/academics#plus-two"
            className="mt-4 inline-flex min-h-11 items-center text-sm font-extrabold text-brand-700 hover:text-brand-800"
          >
            Read about +2 programmes
          </Link>
        </div>
      </div>
    </section>
  );
}
