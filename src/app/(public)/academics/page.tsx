import { Metadata } from "next";
import { AcademicsHero } from "@/components/academics/AcademicsHero";
import { ProgramLevelsList } from "@/components/academics/ProgramLevelsList";
import { PlusTwoDetail } from "@/components/academics/PlusTwoDetail";
import { AcademicCalendarSection } from "@/components/academics/AcademicCalendarSection";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Academic Programs | ECD to Grade 12 (+2 Management, CS, Education)",
  description:
    "Explore academic curriculums at Purwanchal Secondary Boarding School in Tarahara, Sunsari. ECD, Primary, Lower Secondary, Secondary SEE, and +2 Higher Secondary programs.",
});

export default function AcademicsPage() {
  return (
    <div className="w-full flex flex-col">
      <AcademicsHero />
      <ProgramLevelsList />
      <PlusTwoDetail />
      <AcademicCalendarSection />
      <AdmissionCTA />
    </div>
  );
}
