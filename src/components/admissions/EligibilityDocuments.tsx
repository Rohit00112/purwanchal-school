import { Check, FileText, Award, Info } from "lucide-react";

const documents = [
  "Birth registration certificate issued by the ward office",
  "Character and transfer certificate from the previous school",
  "Verified copy of last year's marksheet or grade sheet",
  "Four recent passport-sized photographs of the student",
  "Photocopy of parent / guardian citizenship card",
  "For +2: SEE grade sheet and admit card",
];

const eligibility = [
  { level: "Pre-primary (Nursery – UKG)", text: "Age 3 for Nursery, 4 for LKG and 5 for UKG by Baishakh of the intake year." },
  { level: "Primary (Grades 1 – 5)", text: "Satisfactory completion of the previous grade with basic literacy and numeracy." },
  { level: "Lower secondary & secondary (6 – 9)", text: "Valid transfer certificate and marksheet; diagnostic test in English and Math." },
  { level: "Grade 10 transfer", text: "Subject to District Education Coordination Unit guidelines and registration checks." },
  { level: "Higher secondary (+2)", text: "SEE pass with the minimum GPA required under NEB admission norms." },
];

export function EligibilityDocuments() {
  return (
    <section className="bg-brand-50/40 py-20 sm:py-24 lg:py-28">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Who can <span className="font-editorial italic font-medium text-brand-600">apply</span>?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Admissions are offered based on seat availability and assessment performance, keeping
            the learning community fair, focused and well-supported.
          </p>

          <div className="mt-7 space-y-3">
            {eligibility.map((item) => (
              <div key={item.level} className="rounded-lg border border-line bg-white p-5">
                <h3 className="text-sm font-extrabold text-ink">{item.level}</h3>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-sun-200 bg-sun-50 p-6">
            <div className="flex items-center gap-2">
              <Award className="size-5 text-sun-600" aria-hidden="true" />
              <h3 className="text-sm font-extrabold text-brand-950">Scholarships available</h3>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-brand-900">
              Partial and full fee concessions for SEE toppers, high achievers, talented athletes
              and students who qualify under municipal scholarship guidelines. Ask at the office.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="h-full rounded-lg border border-line bg-white p-7 sm:p-9">
            <div className="flex items-center gap-3 border-b border-line pb-5">
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-extrabold text-ink">Documents checklist</h3>
            </div>
            <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-soft">
              Please bring the originals and one photocopy set when you submit the application form.
            </p>
            <ul className="mt-5 space-y-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-[0.83rem] leading-snug text-ink">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {doc}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-cream p-4 text-[0.75rem] leading-snug text-ink-soft">
              <Info className="mt-0.5 size-4 shrink-0 text-sun-600" aria-hidden="true" />
              Incomplete applications cannot be scheduled for placement assessments.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
