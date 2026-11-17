import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, MapPin, CheckCircle } from "lucide-react";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";

const credentials = [
  {
    title: "Established 1994 AD",
    sub: "2051 Bikram Sambat",
    desc: "30+ years of dedicated service in Sunsari"
  },
  {
    title: "Nursery to Grade 12",
    sub: "Complete Schooling",
    desc: "From Early Childhood to Higher Secondary"
  },
  {
    title: "+2 Specialized Streams",
    sub: "NEB Affiliated",
    desc: "Management, Computer Science & Education"
  },
  {
    title: "Tarahara, Itahari-20",
    sub: "Koshi Province",
    desc: "Safe campus with extensive bus coverage"
  }
];

export function HeroSection() {
  return (
    <section className="bg-white border-b border-line">
      {/* Main Hero Split */}
      <div className="shell pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Institutional Story & Identity */}
          <div className="lg:col-span-7">
            {/* Authentic Institutional Header Tag */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
              <span>Estd. 1994 AD / 2051 BS</span>
              <span className="text-slate-300">·</span>
              <span>Itahari-20, Tarahara, Sunsari</span>
              <span className="text-slate-300">·</span>
              <span>NEB Nepal</span>
            </div>

            {/* Clear Editorial Headline without AI italic gimmicks */}
            <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] leading-[1.12]">
              Purwanchal Secondary Boarding School
            </h1>

            <p className="mt-3 font-serif text-lg sm:text-xl text-brand-700 font-medium">
              Building Knowledge, Inspiring Character and Academic Discipline.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              For three decades, Purwanchal has provided children in Eastern Nepal with a disciplined,
              caring, and academically rigorous environment. Teaching Nursery through Grade 10 SEE preparation,
              and Higher Secondary (+2) in Management, Computer Science, and Education.
            </p>

            {/* Direct Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/admissions"
                className="btn btn-primary !px-6 !py-3.5 !text-sm !font-bold shadow-xs"
              >
                Apply for Admission
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/academics"
                className="btn btn-outline !px-6 !py-3.5 !text-sm !font-semibold"
              >
                Explore Academic Programs
              </Link>
            </div>

            {/* Quick Contact & Office Hours */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 border-t border-slate-100 pt-5 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="size-4 text-brand-700" aria-hidden="true" />
                Affiliated with National Examination Board (NEB)
              </span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1.5 font-semibold text-brand-700 hover:underline"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                Office: {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Right Column: Grounded Campus Photograph (No Floating Glass Cards) */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-line bg-slate-bg shadow-sm">
              <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-slate-100 sm:aspect-[4/3.4]">
                <Image
                  src={images.campusWide}
                  alt="Purwanchal Secondary Boarding School Campus in Tarahara, Itahari-20, Sunsari"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Clean, authentic caption strip below the image (not floating on top) */}
              <div className="border-t border-line bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-sm font-bold text-ink">
                      Purwanchal Main Campus
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Itahari-20, Tarahara, Sunsari, Koshi Province
                    </p>
                  </div>
                  <span className="rounded bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700 shrink-0">
                    Estd. 1994
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Horizontal Institutional Credentials Strip (Clean & Tabular, NOT floating bento cards) */}
      <div className="border-t border-line bg-slate-bg">
        <div className="shell py-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:divide-x lg:divide-line">
            {credentials.map((item, idx) => (
              <div
                key={item.title}
                className={idx > 0 ? "lg:pl-6" : ""}
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
                  {item.sub}
                </p>
                <p className="mt-1 font-serif text-base font-bold text-ink sm:text-lg">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
