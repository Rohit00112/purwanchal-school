import Link from "next/link";
import { Phone, ArrowRight, ClipboardCheck, CalendarCheck, FileCheck, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const steps = [
  {
    num: "01",
    title: "Submit Enquiry",
    desc: "Complete the online admission enquiry form or visit the school administrative office."
  },
  {
    num: "02",
    title: "Campus Interaction",
    desc: "Tour the facilities and discuss curriculum and expectations with teachers."
  },
  {
    num: "03",
    title: "Placement Assessment",
    desc: "Age-appropriate diagnostic assessment to understand your child's learning stage."
  },
  {
    num: "04",
    title: "Confirm Enrollment",
    desc: "Complete documentation, transport registration, and obtain books and uniforms."
  }
];

export function AdmissionCTA() {
  return (
    <section className="bg-white py-20 sm:py-24 border-b border-line">
      <div className="shell">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative">
          {/* Subtle collegiate grid pattern */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sun-400/30 bg-sun-400/10 px-3.5 py-1 text-xs font-bold text-sun-300">
              New Academic Session Admissions
            </div>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
              Your Child's Journey Toward a Brighter Future Starts at Purwanchal.
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/80">
              Admissions are open for Nursery through Grade 9, as well as Grade 11 (+2 in Management,
              Computer Science, and Education). We welcome families to visit our Tarahara campus
              and discover our supportive learning community.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/admissions"
                className="btn btn-sun !px-7 !py-3.5 !text-sm !font-bold shadow-lg hover:scale-[1.02] transition-transform text-center"
              >
                Apply for Admission Now
                <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn btn-ghost-light !px-6 !py-3.5 !text-sm !font-semibold text-center"
              >
                <Phone className="size-4 mr-1.5 text-sun-400" aria-hidden="true" />
                Call Admissions: {siteConfig.phone}
              </a>
            </div>

            <p className="mt-4 text-xs text-white/60">
              Office Hours: {siteConfig.officeHours.days}, {siteConfig.officeHours.start} to {siteConfig.officeHours.end} · Location: Itahari-20, Tarahara
            </p>
          </div>

          {/* 4 Steps Roadmap */}
          <div className="relative z-10 mt-14 border-t border-white/15 pt-10">
            <p className="text-xs font-bold uppercase tracking-wider text-sun-300">
              Simple 4-Step Admission Process
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs"
                >
                  <span className="font-serif text-2xl font-bold text-sun-400">
                    {st.num}
                  </span>
                  <h3 className="mt-2 font-serif text-sm font-bold text-white">
                    {st.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
