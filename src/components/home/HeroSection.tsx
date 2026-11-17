import Image from "next/image";
import Link from "next/link";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";

const facts = [
  { value: String(siteConfig.establishedYear), label: "Established" },
  { value: "N–12", label: "Academic levels" },
  { value: "3", label: "+2 streams" },
];

export function HeroSection() {
  return (
    <section className="bg-brand-950">
      <div className="shell grid items-center gap-12 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-20">
        <div className="lg:col-span-6 xl:col-span-7">
          <h1 className="text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.6rem]">
            Purwanchal Secondary Boarding School
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            In Itahari-20, Tarahara, Sunsari, since 1994. Five academic levels from Nursery to Grade 12,
            with three Higher Secondary streams.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Office hours: {siteConfig.officeHours.days}, {siteConfig.officeHours.start} to {siteConfig.officeHours.end}.
            Call {siteConfig.phone}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/admissions" className="btn btn-sun">
              Admission enquiry form
            </Link>
            <Link href="/about" className="btn btn-ghost-light">
              Read about our school
            </Link>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-7">
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="text-2xl font-extrabold text-sun-300 sm:text-3xl">{fact.value}</p>
                <p className="mt-1 text-xs leading-snug text-white/70">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-5">
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-xl bg-brand-800 sm:aspect-[4/4]">
            <Image
              src={images.heroStudents}
              alt="Illustrative photograph of students in a classroom"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="img-cover object-center"
            />
            <p className="absolute bottom-4 left-4 right-4 rounded-lg bg-brand-950/80 px-3 py-2 text-xs leading-snug text-white/80">
              Since 1994, Itahari-20, Tarahara Sunsari. Illustrative photograph.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
