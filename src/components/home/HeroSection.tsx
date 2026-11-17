import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Award, GraduationCap, Sparkle } from "lucide-react";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";

const stats = [
  { value: "1994 AD", label: "Estd. 2051 BS", detail: "30+ years of academic service" },
  { value: "Nursery to 12", label: "Complete Schooling", detail: "Pre-primary to Higher Secondary" },
  { value: "3 Streams", label: "+2 Higher Secondary", detail: "Management, CS & Education" },
  { value: "100%", label: "Board Discipline", detail: "Dedicated guidance for SEE & NEB" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white">
      {/* Subtle academic background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
        aria-hidden="true"
      />

      <div className="shell relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        {/* Institutional affiliation banner */}
        <div className="mb-8 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/90 backdrop-blur-xs">
          <span className="flex size-2 rounded-full bg-sun-400" />
          <span className="font-semibold text-sun-300">Official Portal</span>
          <span className="text-white/40">|</span>
          <span>Affiliated with NEB Nepal</span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline">Itahari-20, Tarahara, Sunsari</span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] leading-[1.08]">
              Building Knowledge.
              <br />
              <span className="italic text-sun-300">Inspiring Futures</span> with Discipline & Character.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Purwanchal Secondary Boarding School provides a disciplined, nurturing, and modern academic
              environment from Nursery to Grade 12. Fostering curiosity, ethical values, and practical
              competence in Eastern Nepal since 1994.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link
                href="/admissions"
                className="btn btn-sun !px-6 !py-3.5 !text-sm !font-bold shadow-md hover:scale-[1.02] transition-transform"
              >
                Apply for Admission
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/academics"
                className="btn btn-ghost-light !px-6 !py-3.5 !text-sm !font-semibold hover:border-white"
              >
                Explore Academic Programs
              </Link>
            </div>

            {/* Quick contact strip */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-sun-400" aria-hidden="true" />
                Govt. Registered &amp; NEB Affiliated
              </span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1.5 transition-colors hover:text-sun-300"
              >
                <Phone className="size-3.5 text-sun-400" aria-hidden="true" />
                Office: {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Hero Visual Composition */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative collegiate border */}
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-2xl border-2 border-white/20 bg-brand-800 shadow-2xl sm:aspect-[4/4.2]">
                <Image
                  src={images.heroStudents}
                  alt="Students engaged in learning at Purwanchal Secondary Boarding School"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />

                {/* Floating institutional seal tag */}
                <div className="absolute top-4 right-4 rounded-xl border border-white/20 bg-brand-950/80 px-3 py-2 backdrop-blur-md">
                  <p className="font-serif text-xs font-bold text-sun-300">ESTD. 1994 AD</p>
                  <p className="text-[10px] text-white/70">30 Years of Excellence</p>
                </div>

                {/* Bottom caption banner */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-brand-900/90 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sun-400 text-brand-950 font-bold">
                      <GraduationCap className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-serif text-sm font-bold text-white">Nursery through Grade 12</p>
                      <p className="text-xs text-white/80">Management · Computer Science · Education</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Four Key Pillars Stats Strip */}
        <div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4 lg:gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xs transition-colors hover:border-sun-400/40"
            >
              <p className="font-serif text-2xl sm:text-3xl font-extrabold text-sun-300 tracking-tight">
                {item.value}
              </p>
              <p className="mt-1 font-semibold text-xs text-white uppercase tracking-wider">
                {item.label}
              </p>
              <p className="mt-0.5 text-xs text-white/70 leading-snug">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
