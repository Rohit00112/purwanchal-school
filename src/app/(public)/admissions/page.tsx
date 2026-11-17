import { Metadata } from "next";
import { AdmissionsHero } from "@/components/admissions/AdmissionsHero";
import { AdmissionProcess } from "@/components/admissions/AdmissionProcess";
import { EligibilityDocuments } from "@/components/admissions/EligibilityDocuments";
import { AdmissionInquiryForm } from "@/components/admissions/AdmissionInquiryForm";
import { AdmissionFAQ } from "@/components/admissions/AdmissionFAQ";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Admissions | Entry Procedure, Eligibility & Online Inquiry",
  description:
    "Apply for admission at Purwanchal Secondary Boarding School in Itahari-20, Tarahara. Grades Nursery through 10, and +2 Management, Computer Science, and Education. Complete our online inquiry form.",
});

export default function AdmissionsPage() {
  return (
    <div className="w-full flex flex-col">
      <AdmissionsHero />
      <AdmissionProcess />
      <EligibilityDocuments />
      <AdmissionInquiryForm />
      <AdmissionFAQ />
    </div>
  );
}
