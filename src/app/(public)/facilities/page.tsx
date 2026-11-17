import { Metadata } from "next";
import { FacilitiesHero } from "@/components/facilities/FacilitiesHero";
import { FacilityDetailGrid } from "@/components/facilities/FacilityDetailGrid";
import { CampusVisitCTA } from "@/components/facilities/CampusVisitCTA";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Campus & Facilities | Science Labs, Computer Lab, Library & Sports",
  description:
    "Explore the campus and learning infrastructure at Purwanchal Secondary Boarding School in Tarahara, Sunsari. Practical science labs, modern IT laboratory, sports grounds, and school transportation.",
});

export default function FacilitiesPage() {
  return (
    <div className="w-full flex flex-col">
      <FacilitiesHero />
      <FacilityDetailGrid />
      <CampusVisitCTA />
      <AdmissionCTA />
    </div>
  );
}
