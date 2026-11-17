import { SectionHeading } from "@/components/shared/SectionHeading";

const levels = [
  { label: "Early years", grades: "Nursery – UKG" },
  { label: "Primary", grades: "Grades 1 – 5" },
  { label: "Lower secondary", grades: "Grades 6 – 8" },
  { label: "Secondary (SEE)", grades: "Grades 9 – 10" },
  { label: "Higher secondary", grades: "+2" },
];

export function SchoolHistory() {
  return (
    <section id="history" className="scroll-mt-24 bg-cream py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title="Our beginning"
          description="Purwanchal Secondary Boarding School was founded in 1994 in Itahari-20, Tarahara, Sunsari."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600">Founded</p>
            <p className="mt-2 font-editorial text-4xl font-semibold text-ink">1994</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">Itahari-20, Tarahara, Sunsari.</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600">Academic levels</p>
            <ul className="mt-4 space-y-2.5">
              {levels.map(({ label, grades }) => (
                <li key={label} className="flex items-baseline justify-between gap-3 text-sm text-ink-soft">
                  <span>{label}</span>
                  <span className="font-semibold text-ink">{grades}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
