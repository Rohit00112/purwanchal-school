import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Laptop, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/shared/Reveal";

const academicLevels = [
  {
    tag: "Early Years",
    level: "Early Childhood (ECD)",
    grades: "Nursery, LKG & UKG",
    desc: "A warm, child-centered environment focused on sensory learning, phonetics, foundational vocabulary, numbers, and cooperative play habits.",
    features: ["Activity-based learning", "Phonics and reading corners", "Careful supervision"]
  },
  {
    tag: "Foundation",
    level: "Primary School",
    grades: "Grades 1 to 5",
    desc: "Developing solid comprehension in English, Nepali, mathematics, and environmental science with structured classroom habits and curiosity.",
    features: ["Bilingual literacy", "Introductory computer basics", "Moral and health education"]
  },
  {
    tag: "Middle Years",
    level: "Lower Secondary",
    grades: "Grades 6 to 8",
    desc: "Expanding conceptual thinking in science, mathematics, social studies, and computing with regular assessments and project assignments.",
    features: ["Hands-on lab experiments", "Language and debate sessions", "Physical education & sports"]
  },
  {
    tag: "Board Preparation",
    level: "Secondary School (SEE)",
    grades: "Grades 9 & 10",
    desc: "Targeted curriculum for the National Secondary Education Examination (SEE) with focused subject mastery, practice exams, and doubt-clearing clinics.",
    features: ["SEE test series & routines", "Comprehensive lab practicals", "Career guidance counseling"]
  }
];

const plusTwoStreams = [
  {
    name: "Management",
    focus: "Business Studies, Accountancy, Economics, Business Mathematics, and Marketing.",
    outcome: "Prepares students for BBA, BBS, Chartered Accountancy (CA), and leadership careers."
  },
  {
    name: "Computer Science",
    focus: "Computer Science, Programming Fundamentals, Digital Logic, Mathematics, and Physics/Accountancy.",
    outcome: "Direct pathway to BCA, BSc CSIT, Software Engineering, and IT professions."
  },
  {
    name: "Education",
    focus: "Educational Pedagogy, Child Psychology, Instructional Planning, and Language Education.",
    outcome: "Equips future teachers, school administrators, and social education professionals."
  }
];

export function AcademicPrograms() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-line overflow-hidden">
      <div className="shell">
        <SectionHeading
          badge="Curriculum & Pathways"
          title="Structured Academic Programs from Nursery to Grade 12"
          description="A progressive educational framework affiliated with the National Examination Board (NEB) Nepal, designed to foster academic rigor and practical readiness at every stage."
          action={
            <Link
              href="/academics"
              className="btn btn-outline group !text-xs sm:!text-sm"
            >
              View Full Academic Details
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          }
        />

        {/* 4 Core Schooling Levels with Cascading Reveal */}
        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.07}>
          {academicLevels.map((lvl) => (
            <StaggerItem key={lvl.level}>
              <div className="card-interactive flex h-full flex-col justify-between rounded-xl border border-line bg-slate-bg p-6 hover:border-brand-700 hover:bg-white">
                <div>
                  <span className="inline-block rounded bg-brand-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-700">
                    {lvl.tag}
                  </span>

                  <h3 className="mt-3 font-serif text-lg font-bold text-ink">
                    {lvl.level}
                  </h3>
                  <p className="text-xs font-semibold text-sun-500 uppercase tracking-wide mt-0.5">
                    {lvl.grades}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {lvl.desc}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-line/80 pt-3 text-[11px] text-slate-600">
                    {lvl.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check className="size-3 text-brand-600 shrink-0" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/academics"
                  className="mt-6 inline-flex min-h-[44px] items-center text-xs font-bold text-brand-700 hover:underline"
                >
                  Learn more about {lvl.level} →
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Higher Secondary (+2) Featured Block */}
        <Reveal delay={0.2} y={20} className="mt-10 overflow-hidden rounded-xl border border-brand-800 bg-brand-900 p-7 text-white sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-sun-300">
                National Examination Board (NEB) Affiliated
              </span>
              <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Higher Secondary (+2) Education: Grades 11 &amp; 12
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Purwanchal Higher Secondary School offers three proven academic streams designed to equip
                students for university entrance examinations and professional career pathways.
              </p>
            </div>

            <Link
              href="/academics#plus-two"
              className="btn btn-sun shrink-0 !px-6 !py-3.5 !text-xs sm:!text-sm !font-bold self-start lg:self-center"
            >
              Explore +2 Programs &amp; Streams
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-white/15 pt-6">
            {plusTwoStreams.map((stream) => (
              <div
                key={stream.name}
                className="rounded-lg border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-sun-300">
                    +2 {stream.name}
                  </h4>
                  <span className="text-[11px] font-semibold text-white/60">NEB Nepal</span>
                </div>
                <p className="mt-2 text-xs text-white/80 leading-relaxed">
                  <strong className="text-white">Key Subjects: </strong>
                  {stream.focus}
                </p>
                <p className="mt-2 text-[11px] text-white/60 italic leading-snug">
                  {stream.outcome}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
