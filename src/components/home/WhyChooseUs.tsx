import Link from "next/link";
import { 
  Award, 
  FlaskConical, 
  Users2, 
  ShieldCheck, 
  Trophy, 
  BusFront,
  ArrowRight
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/shared/Reveal";

const reasons = [
  {
    icon: Award,
    title: "30 Years of Proven Institutional Trust",
    description: "Serving the community of Itahari-20, Tarahara since 1994 AD (2051 BS), graduating hundreds of students who now thrive in diverse professions across Nepal and abroad."
  },
  {
    icon: FlaskConical,
    title: "Hands-on Science & Modern Computing Labs",
    description: "Theory is reinforced through practical laboratory sessions. Students engage directly in science experiments and modern computing curriculum."
  },
  {
    icon: Users2,
    title: "Dedicated & Accessible Educators",
    description: "Our teachers understand each student's learning pace, offering remedial classes for board exam candidates and proactive parent-teacher communication."
  },
  {
    icon: ShieldCheck,
    title: "Value-Based Academic Discipline",
    description: "We cultivate personal accountability, mutual respect, punctuality, and civic integrity as essential companions to academic achievement."
  },
  {
    icon: Trophy,
    title: "Vibrant Sports & Co-Curricular Culture",
    description: "Regular inter-house tournaments in football, volleyball, badminton, and athletics, alongside public speaking, quiz bowls, and cultural arts."
  },
  {
    icon: BusFront,
    title: "Reliable & Safe Transportation",
    description: "Dedicated school buses covering major routes across Tarahara, Itahari, and neighboring Sunsari localities, ensuring safe daily commuting."
  }
];

export function WhyChooseUs() {
  return (
    <section className="bg-slate-bg py-16 sm:py-20 lg:py-24 border-b border-line overflow-hidden">
      <div className="shell">
        <SectionHeading
          badge="Educational Distinctives"
          title="Why Families Trust Purwanchal Secondary Boarding School"
          description="We provide a balanced educational journey where academic excellence, moral integrity, and practical skills prepare students for the challenges of tomorrow."
        />

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.07}>
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="card-interactive group h-full rounded-xl border border-line bg-white p-7 hover:border-brand-700">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-200">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 font-serif text-lg font-bold text-ink group-hover:text-brand-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Action bar with subtle entrance */}
        <Reveal delay={0.2} y={15} className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl border border-line bg-white p-6 sm:p-8 shadow-xs">
          <div>
            <h4 className="font-serif text-lg font-bold text-ink">
              Experience Our School Campus Firsthand
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Visit our facilities, interact with educators, and learn how we can support your child's education.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/admissions" className="btn btn-primary group !text-xs sm:!text-sm">
              Admission Inquiry
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn btn-outline !text-xs sm:!text-sm">
              Contact Office
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
