import { SectionHeading } from "@/components/shared/SectionHeading";
import { Award, BookOpen, Building2, Calendar, CheckCircle2 } from "lucide-react";

const milestones = [
  {
    year: "1994 AD / 2051 BS",
    title: "Foundation in Tarahara",
    desc: "Established with a founding cohort of students in Itahari-20, Tarahara, with a mission to bring quality, English-medium education and disciplined values to local families."
  },
  {
    year: "2004 AD",
    title: "Secondary Education & Lab Infrastructure",
    desc: "Expanded into comprehensive lower-secondary and secondary schooling (Grades 1 to 10), establishing fully equipped physics, chemistry, biology, and computer laboratories."
  },
  {
    year: "2015 AD",
    title: "Higher Secondary (+2) Affiliation",
    desc: "Accredited by the National Examination Board (NEB) to offer Higher Secondary programs (+2) with specialized tracks in Management, Computer Science, and Education."
  },
  {
    year: "Present Day",
    title: "Over Three Decades of Academic Trust",
    desc: "Now serving hundreds of pupils from Nursery through Grade 12 with a dedicated fleet of buses, modern ICT curricula, competitive sports programs, and a proud alumni network."
  }
];

export function SchoolHistory() {
  return (
    <section id="history" className="scroll-mt-24 bg-slate-bg py-20 sm:py-24 lg:py-28 border-b border-line">
      <div className="shell">
        <SectionHeading
          badge="Our Journey"
          title="Thirty Years of Educational Dedication in Koshi Province"
          description="From our founding in 1994 to our present status as a comprehensive institution from Nursery through Grade 12, Purwanchal Secondary Boarding School has remained committed to student-first learning."
        />

        {/* Timeline Stream */}
        <div className="mt-14 relative">
          {/* Vertical spine line for large screens */}
          <div 
            aria-hidden="true" 
            className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-brand-200" 
          />

          <div className="space-y-8 lg:space-y-12">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={item.year}
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content card */}
                  <div className="w-full lg:w-1/2">
                    <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs hover:border-brand-700 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-bold text-sun-500">
                          {item.year}
                        </span>
                        <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700">
                          Milestone
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-lg sm:text-xl font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-soft">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Marker center dot */}
                  <div className="hidden lg:flex size-9 shrink-0 items-center justify-center rounded-full border-4 border-white bg-brand-700 text-white shadow-md z-10">
                    <div className="size-2 rounded-full bg-sun-300" />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutional Statistics */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3 border-t border-line pt-10">
          <div className="rounded-xl border border-line bg-white p-6 text-center">
            <p className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-700">1994 AD</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink-faint">Year Founded (2051 BS)</p>
          </div>
          <div className="rounded-xl border border-line bg-white p-6 text-center">
            <p className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-700">Nursery to 12</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink-faint">Academic Levels</p>
          </div>
          <div className="rounded-xl border border-line bg-white p-6 text-center">
            <p className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-700">3 Streams</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink-faint">+2 Management, CS &amp; Education</p>
          </div>
        </div>
      </div>
    </section>
  );
}
