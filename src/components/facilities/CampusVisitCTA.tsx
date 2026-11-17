import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CampusVisitCTA() {
  return (
    <section className="bg-cream py-10 sm:py-14">
      <div className="shell">
        <div className="rounded-lg bg-brand-900 p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Come walk the campus.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80">
                Arrange a visit to see the classrooms, meet the school office and ask about admissions.
              </p>
              <Link href="/contact" className="btn btn-sun mt-7">
                Plan a campus visit
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:col-span-6">
              {[
                { icon: MapPin, label: "Find us", value: "Itahari-20, Tarahara, Sunsari" },
                { icon: Phone, label: "Call ahead", value: siteConfig.phone },
                { icon: Clock, label: "Office hours", value: `${siteConfig.officeHours.start} – ${siteConfig.officeHours.end}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg border border-white/20 p-5">
                  <Icon className="size-5 text-sun-300" aria-hidden="true" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-white/80">{label}</p>
                  <p className="mt-1 text-sm font-bold leading-snug text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
