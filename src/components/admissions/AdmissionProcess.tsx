import { FileText, ClipboardCheck, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem, Reveal } from "@/components/shared/Reveal";

const steps = [
  {
    n: "01",
    icon: FileText,
    title: "Enquire & Explore",
    subtitle: "Initial Inquiry",
    text: "Submit an online inquiry form, call the office, or visit our Tarahara campus to collect an informational prospectus."
  },
  {
    n: "02",
    icon: ClipboardCheck,
    title: "Submit Documents",
    subtitle: "Application Intake",
    text: "Submit the registration form along with birth registration certificate, previous school grade sheets, and photographs."
  },
  {
    n: "03",
    icon: Award,
    title: "Placement Assessment",
    subtitle: "Diagnostic Check",
    text: "A friendly, age-appropriate assessment in English, Mathematics, and Nepali to evaluate your child's placement level."
  },
  {
    n: "04",
    icon: Users,
    title: "Family Consultation",
    subtitle: "Academic Dialogue",
    text: "Meet with academic coordinators to discuss learning goals, stream options for +2, transport routes, and school values."
  },
  {
    n: "05",
    icon: CheckCircle2,
    title: "Enrollment & Welcome",
    subtitle: "Admission Finalized",
    text: "Complete admission formalities, receive the academic calendar and booklist, and join the Purwanchal school community."
  }
];

export function AdmissionProcess() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-line overflow-hidden">
      <div className="shell">
        <SectionHeading
          badge="Admissions Roadmap"
          title="A Structured, Transparent Five-Step Process"
          description="From your first inquiry to your child's first day of classes, our administration provides clear and supportive guidance at every step."
        />

        {/* Step Pathway Cards */}
        <div className="mt-14 relative">
          {/* Subtle connecting line across desktop headers */}
          <div 
            aria-hidden="true" 
            className="hidden lg:block absolute top-7 left-8 right-8 h-0.5 bg-slate-200 z-0" 
          />

          <StaggerContainer 
            className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 relative z-10" 
            staggerDelay={0.08}
          >
            {steps.map(({ n, icon: Icon, title, subtitle, text }) => (
              <StaggerItem key={n}>
                <div className="card-interactive group flex h-full flex-col justify-between rounded-xl border border-line bg-slate-bg p-6 transition-all duration-200 hover:border-brand-700 hover:bg-white hover:shadow-md">
                  <div>
                    {/* Step Header with Clean Number & Icon Alignment */}
                    <div className="flex items-center justify-between pb-4 border-b border-line/70">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-2xl font-bold text-brand-700 leading-none">
                          {n}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Step
                        </span>
                      </div>
                      
                      <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-200">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-sun-500">
                      {subtitle}
                    </p>

                    <h3 className="mt-1 font-serif text-base font-bold text-ink group-hover:text-brand-700 transition-colors">
                      {title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {text}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-[11px] font-semibold text-brand-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn requirements</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
