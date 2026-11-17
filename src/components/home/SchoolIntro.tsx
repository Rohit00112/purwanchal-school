import Image from "next/image";
import Link from "next/link";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";

const facts = [
  { label: "Established", value: String(siteConfig.establishedYear) },
  { label: "Levels", value: "Nursery to Grade 12" },
  { label: "Address", value: siteConfig.address },
  {
    label: "Office hours",
    value: `${siteConfig.officeHours.days}, ${siteConfig.officeHours.start} to ${siteConfig.officeHours.end}`,
  },
];

export function SchoolIntro() {
  return (
    <section className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="relative aspect-[5/5.5] overflow-hidden rounded-xl bg-brand-100 img-fallback sm:aspect-[5/4.6]">
            <Image
              src={images.campusWide}
              alt="Illustrative photograph of a school building"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="img-cover object-center"
            />
          </div>
          <p className="mt-3 text-xs text-ink-faint">Illustrative photograph.</p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold leading-[1.15] text-ink sm:text-4xl lg:text-[2.7rem]">
            About Purwanchal Secondary Boarding School
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
            Founded in 1994 in Itahari-20, Tarahara, Sunsari, the school teaches children from Nursery
            through Grade 12 across five academic levels.
          </p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
            Higher Secondary students choose from three streams: Management, Computer Science and Education.
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-faint">{fact.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="mt-8 inline-flex min-h-11 items-center text-sm font-extrabold text-brand-700 hover:text-brand-800"
          >
            Read about our school
          </Link>
        </div>
      </div>
    </section>
  );
}
