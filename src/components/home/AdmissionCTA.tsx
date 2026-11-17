import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";

export function AdmissionCTA() {
  return (
    <section className="bg-cream pb-20 pt-4 sm:pb-24">
      <div className="shell">
        <div className="grid items-center gap-10 rounded-xl bg-brand-900 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-7">
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl">
              Admission enquiries
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Nursery to Grade 12, with three +2 streams. Call the office or send an enquiry.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Office hours: {siteConfig.officeHours.days}, {siteConfig.officeHours.start} to {siteConfig.officeHours.end}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/admissions" className="btn btn-sun">
                Admission enquiry form
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="btn btn-ghost-light">
                <Phone className="size-4" aria-hidden="true" /> Call {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-800">
              <Image
                src={images.books}
                alt="Illustrative photograph of books"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="img-cover object-center"
              />
            </div>
            <p className="mt-3 text-xs text-ink-faint">Illustrative photograph.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
