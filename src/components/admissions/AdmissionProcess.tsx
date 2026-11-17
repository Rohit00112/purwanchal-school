import { FileText, ClipboardCheck, Award, UserCheck, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const steps = [
  { n: "01", icon: FileText, title: "Enquire & explore", text: "Send an online enquiry or drop by the Tarahara campus to collect a prospectus." },
  { n: "02", icon: ClipboardCheck, title: "Submit documents", text: "Complete the form with previous marksheets, transfer certificate and photos." },
  { n: "03", icon: Award, title: "Friendly assessment", text: "A short, age-appropriate check in English, Math and Nepali for placement." },
  { n: "04", icon: UserCheck, title: "Family conversation", text: "Meet our coordinators, discuss goals and confirm the right programme." },
  { n: "05", icon: CheckCircle2, title: "Welcome aboard", text: "Finish formalities, collect your booklist and join the Purwanchal family." },
];

export function AdmissionProcess() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title={<>A simple, <span className="font-editorial italic font-medium text-brand-600">supportive</span> process.</>}
          description="Five clear steps from your first question to the first day of school."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {steps.map(({ n, icon: Icon, title, text }) => (
            <div key={n} className="h-full rounded-lg border border-line bg-cream/50 p-6">
              <span className="text-xs font-bold tracking-wide text-brand-600">Step {n}</span>
              <span className="mt-3 inline-flex size-11 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-sm font-extrabold text-ink">{title}</h3>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
