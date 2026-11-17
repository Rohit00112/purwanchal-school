import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/config/images";

export function GalleryHero() {
  return (
    <PageHero
      title={<>Moments of <span className="font-editorial italic font-medium text-sun-300">Learning & Discovery</span>.</>}
      description="A visual collection of classroom learning, science and computer laboratories, sports activities, and school life at Purwanchal."
      image={images.children}
      crumbs={[{ label: "Gallery" }]}
    />
  );
}
