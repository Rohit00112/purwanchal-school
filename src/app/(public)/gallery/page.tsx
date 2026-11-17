import { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Photo & Media Gallery | Campus, Science Labs, Sports & Cultural Days",
  description:
    "Explore photo memories from Purwanchal Secondary Boarding School in Tarahara, Sunsari. Practical laboratories, sports events, cultural programs, and classroom moments.",
});

export default function GalleryPage() {
  return (
    <div className="w-full flex flex-col">
      <GalleryHero />
      <GalleryGrid />
      <AdmissionCTA />
    </div>
  );
}
