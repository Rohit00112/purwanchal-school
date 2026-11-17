import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Laptop, Trophy, Users, CheckCircle2 } from "lucide-react";
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
    <section className="bg-slate-bg py-20 sm:py-24 lg:py-28 border-b border-line">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Photographic Storytelling */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/4.8] overflow-hidden rounded-2xl border border-line bg-white shadow-xl sm:aspect-[4/4.2]">
                <Image
                  src={images.campusWide}
                  alt="Purwanchal Secondary Boarding School Campus in Tarahara, Itahari"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-brand-900/90 p-4 text-white backdrop-blur-md">
                  <p className="font-serif text-sm font-bold text-sun-300">
                    Itahari-20, Tarahara, Sunsari
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    Established 1994 AD (2051 BS) · Koshi Province, Nepal
                  </p>
                </div>
              </div>

              {/* Decorative accent card */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 rounded-xl border border-line bg-white p-4 shadow-lg max-w-[210px]">
                <p className="text-2xl font-bold font-serif text-brand-700">30+ Years</p>
                <p className="text-xs text-ink-soft leading-tight mt-1">
                  Of educational trust and service in Eastern Nepal.
                </p>
              </div>
            </div>
          </div>

          {/* Right Narrative Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
              Institutional Profile
            </div>

            <h2 className="mt-4 font-serif text-2xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-ink leading-[1.15]">
              Nurturing Character, Intellect and Resilience in Every Student.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              Purwanchal Secondary Boarding School is an established educational institution in Itahari-20,
              Tarahara, Sunsari. Founded in 1994 AD, the school has spent three decades nurturing disciplined,
              capable, and values-driven young minds who excel academically and contribute meaningfully to society.
            </p>

            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              From the formative early childhood years to competitive Secondary Education Examinations (SEE) and
              specialized Higher Secondary (+2) education, we balance academic rigor with moral guidance,
              hands-on science and computer laboratory work, and supportive student mentorship.
            </p>

            {/* Four Pillars Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-line bg-white p-4 transition-all hover:border-brand-300 hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                      <h3 className="font-serif text-sm font-bold text-ink">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="btn btn-primary !px-5 !py-3 !text-sm !font-bold"
              >
                Learn More About Our School
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline !px-5 !py-3 !text-sm !font-semibold"
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
