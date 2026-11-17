import Link from "next/link";
import { 
  Award, 
  GraduationCap, 
  Trophy, 
  Globe2, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const milestones = [
  {
    icon: Award,
    stat: "1994 AD",
    title: "Established Institutional Heritage",
    desc: "Founded in 2051 BS as one of Tarahara's founding educational institutions, serving the educational needs of Itahari-20 and the greater Sunsari region."
  },
  {
    icon: GraduationCap,
    stat: "100%",
    title: "Dedicated Board Examination Mentorship",
    desc: "Rigorous academic preparation for the National Secondary Education Examination (SEE) and NEB +2 Board Exams, guiding students to top division outcomes."
  },
  {
    icon: Trophy,
    stat: "Podium",
    title: "Regional Inter-School Sports Meets",
    desc: "Active participation and top positions in district-level athletics, football tournaments, volleyball cups, and inter-school quiz championships."
  },
  {
    icon: Globe2,
    stat: "Alumni",
    title: "Graduates in Diverse Professional Fields",
    desc: "Our alumni community includes engineers, doctors, banking professionals, certified educators, business leaders, and civil servants contributing nationally and globally."
  }
];

export function AchievementsSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28 border-b border-line">
      <div className="shell">
        <SectionHeading
          badge="Institutional Record"
          title="Milestones Built on Three Decades of Dedication"
          description="Purwanchal Secondary Boarding School measures its success through the enduring character, academic discipline, and real-world accomplishments of its students."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-slate-bg p-6 transition-all duration-200 hover:border-brand-700 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-200">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="font-serif text-lg font-bold text-sun-500">
                      {item.stat}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-base font-bold text-ink group-hover:text-brand-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold text-brand-700 border-t border-line/60 pt-3">
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  Verified institutional history
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting statement */}
        <div className="mt-10 rounded-2xl bg-brand-50 border border-brand-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-serif text-base sm:text-lg font-bold text-brand-900">
              Committed to Continuing a Tradition of Excellence
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-brand-800 leading-relaxed">
              Every academic year, we refine our pedagogical approaches, upgrade science and computer lab resources, and expand sports facilities to better prepare each generation.
            </p>
          </div>
          <Link
            href="/about#history"
            className="btn btn-primary shrink-0 !text-xs sm:!text-sm"
          >
            Read Our Full Institutional History
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
