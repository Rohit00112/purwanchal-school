import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Laptop, Trophy, Users, CheckCircle } from "lucide-react";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";

const pillars = [
  {
    icon: BookOpen,
    title: "Rigorous Academic Foundation",
    description: "Structured learning from Nursery to Grade 10 following the national curriculum with focus on English fluency, mathematical acumen, and scientific curiosity."
  },
  {
    icon: Laptop,
    title: "+2 Higher Secondary Specialization",
    description: "Affiliated with the National Examination Board (NEB) offering career-focused streams in Management, Computer Science, and Education."
  },
  {
    icon: Users,
    title: "Dedicated Faculty & Pastoral Care",
    description: "Experienced educators who provide close individual attention, structured character building, and regular parent-teacher collaboration."
  },
  {
    icon: Trophy,
    title: "Holistic Student Development",
    description: "Extracurricular exposure in athletics, football, volleyball, debate, quiz competitions, arts, and cultural celebrations."
  }
];

export function SchoolIntro() {
  return (
    <section className="bg-slate-bg py-16 sm:py-20 lg:py-24 border-b border-line">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left: Authentic Classroom Image with Clean Frame */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
              <div className="relative aspect-[4/3.8] w-full overflow-hidden bg-slate-100">
                <Image
                  src={images.heroClassroom}
                  alt="Classroom learning environment at Purwanchal Secondary Boarding School"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="border-t border-line bg-white p-4">
                <p className="font-serif text-sm font-bold text-ink">
                  Interactive Learning Environment
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Small class sizes with dedicated teacher supervision from Nursery through Grade 12
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Four Pillars */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Institutional Profile
            </p>

            <h2 className="mt-2.5 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink leading-tight">
              Nurturing Character, Intellect and Resilience in Every Student.
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
              Purwanchal Secondary Boarding School is an established educational institution in Itahari-20,
              Tarahara, Sunsari. Founded in 1994 AD, the school has spent three decades nurturing disciplined,
              capable, and values-driven young minds who excel academically and contribute meaningfully to society.
            </p>

            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
              From the formative early childhood years to competitive Secondary Education Examinations (SEE) and
              specialized Higher Secondary (+2) education, we balance academic rigor with moral guidance,
              hands-on science and computer laboratory work, and supportive student mentorship.
            </p>

            {/* Four Pillars */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-line bg-white p-4 transition-colors hover:border-brand-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                      <h3 className="font-serif text-sm font-bold text-ink">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="btn btn-primary !px-5 !py-3 !text-xs sm:!text-sm !font-bold"
              >
                Learn More About Our School
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline !px-5 !py-3 !text-xs sm:!text-sm !font-semibold"
              >
                Schedule a Campus Visit
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
