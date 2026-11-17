import { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { SchoolHistory } from "@/components/about/SchoolHistory";
import { VisionMission } from "@/components/about/VisionMission";
import { PrincipalMessage } from "@/components/about/PrincipalMessage";
import { LeadershipFaculty } from "@/components/about/LeadershipFaculty";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "About Us | History, Vision & Leadership",
  description:
    "Learn about Purwanchal Secondary Boarding School in Itahari-20, Tarahara. Established in 1994, our legacy spans three decades of dedicated academic excellence and moral leadership.",
});

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col">
      <AboutHero />
      <SchoolHistory />
      <VisionMission />
      <PrincipalMessage />
      <LeadershipFaculty />
      <AdmissionCTA />
    </div>
  );
}
