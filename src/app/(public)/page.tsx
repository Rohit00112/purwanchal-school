import { HeroSection } from "@/components/home/HeroSection";
import { SchoolIntro } from "@/components/home/SchoolIntro";
import { AcademicPrograms } from "@/components/home/AcademicPrograms";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FacilitiesPreview } from "@/components/home/FacilitiesPreview";
import { LatestNewsEvents } from "@/components/home/LatestNewsEvents";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <SchoolIntro />
      <AcademicPrograms />
      <WhyChooseUs />
      <FacilitiesPreview />
      <LatestNewsEvents />
      <AchievementsSection />
      <GalleryPreview />
      <AdmissionCTA />
    </div>
  );
}
