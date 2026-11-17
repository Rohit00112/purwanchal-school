import Link from "next/link";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/shared/Reveal";

const steps = [
  {
    num: "01",
    title: "Submit Enquiry",
    desc: "Complete the online admission enquiry form or visit the school administrative office in Tarahara."
  },
  {
    num: "02",
    title: "Campus Interaction",
    desc: "Tour the facilities and discuss the academic curriculum and expectations with teachers."
  },
  {
    num: "03",
    title: "Placement Assessment",
    desc: "Age-appropriate diagnostic assessment to understand your child's learning stage and subject readiness."
  },
  {
    num: "04",
    title: "Confirm Enrollment",
    desc: "Complete documentation, transport registration, and obtain academic books and uniforms."
  }
];

export function AdmissionCTA() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-line overflow-hidden">
      <div className="shell">
        <Reveal delay={0.1} y={15} className="overflow-hidden rounded-2xl bg-brand-900 p-8 sm:p-12 lg:p-14 text-white">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-sun-300">
              New Academic Session Admissions
            </p>

            <h2 className="mt-2.5 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Begin Your Child&apos;s Educational Journey at Purwanchal.
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/85">
              Admissions are open for Nursery through Grade 9, as well as Grade 11 (+2 in Management,
              Computer Science, and Education). We welcome families to visit our Tarahara campus
              and discover our supportive learning community.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/admissions"
                className="btn btn-sun group !px-6 !py-3.5 !text-xs sm:!text-sm !font-bold text-center"
              >
                Apply for Admission
                <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn btn-ghost-light !px-6 !py-3.5 !text-xs sm:!text-sm !font-semibold text-center"
              >
                <Phone className="size-4 mr-1.5 text-sun-400" aria-hidden="true" />
                Call Admissions: {siteConfig.phone}
              </a>
            </div>

            <p className="mt-4 text-xs text-white/70">
              Office Hours: {siteConfig.officeHours.days}, {siteConfig.officeHours.start} to {siteConfig.officeHours.end} · Location: Itahari-20, Tarahara
            </p>
          </div>

          {/* 4 Steps Roadmap with Staggered Entrance */}
          <div className="mt-12 border-t border-white/15 pt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-sun-300">
              Step-by-Step Admission Process
            </p>
            <StaggerContainer className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.07}>
              {steps.map((st) => (
                <StaggerItem key={st.num}>
                  <div className="rounded-lg border border-white/15 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10">
                    <span className="font-serif text-xl font-bold text-sun-300">
                      {st.num}
                    </span>
                    <h3 className="mt-1.5 font-serif text-sm font-bold text-white">
                      {st.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/75">
                      {st.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
