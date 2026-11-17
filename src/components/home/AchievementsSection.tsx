import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";

const levels = [
  "Nursery to UKG",
  "Grades 1 to 5",
  "Grades 6 to 8",
  "Grades 9 to 10 (SEE)",
  "Grades 11 to 12 (+2)",
];

export function AchievementsSection() {
  return (
    <section className="bg-brand-50/40 py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title="Academic structure"
          description="Five levels from Nursery to Grade 12, with three Higher Secondary streams: Management, Computer Science and Education."
        />

        <ul className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <li
              key={level}
              className="rounded-lg border border-line bg-white px-5 py-4 text-sm font-semibold text-ink"
            >
              {level}
            </li>
          ))}
        </ul>

        <Link
          href="/academics"
          className="mt-8 inline-flex min-h-11 items-center text-sm font-extrabold text-brand-700 hover:text-brand-800"
        >
          See academic programmes
        </Link>
      </div>
    </section>
  );
}
