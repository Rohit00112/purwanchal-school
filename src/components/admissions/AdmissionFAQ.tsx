"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";

const faqs = [
  { q: "When does the new academic session begin?", a: "The session begins in Baishakh (mid-April). Applications open around Chaitra (March–April). Grade 11 admissions follow the publication of SEE results." },
  { q: "Which +2 streams do you offer?", a: "Three NEB-affiliated streams: Management, Computer Science and Education, each with subject options that lead to clear university pathways." },
  { q: "Is an entrance test required?", a: "Pre-primary admission is based on a friendly interaction. Grades 1–9 and 11 have short diagnostic assessments in English, Mathematics and Science to guide placement." },
  { q: "Do you provide school transportation?", a: "Yes. Our buses cover Itahari-20, Tarahara and surrounding neighbourhoods. Routes and pick-up points are confirmed at registration." },
  { q: "How will I track my child's progress?", a: "Through terminal report cards, parent–teacher meetings and our mobile portal, which delivers attendance, routines and homework updates to your phone." },
  { q: "Are scholarships available?", a: "Yes. Concessions for board toppers, SEE high achievers, talented athletes and students eligible under municipal scholarship guidelines." },
];

export function AdmissionFAQ() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="shell max-w-4xl">
        <SectionHeading
          align="center"
          title={<>Questions? We&apos;ve got <span className="font-editorial italic font-medium text-brand-600">answers</span>.</>}
          description="The things parents ask us most often about admissions and campus life."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className={cn("rounded-lg border bg-white", isOpen ? "border-brand-300" : "border-line")}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-sm font-extrabold text-ink sm:text-base">{faq.q}</span>
                  <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full", isOpen ? "rotate-45 bg-brand-600 text-white" : "bg-brand-50 text-brand-700")}>
                    <Plus className="size-4" aria-hidden="true" />
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  hidden={!isOpen}
                  className="border-t border-line px-6 py-5 text-sm leading-relaxed text-ink-soft"
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
