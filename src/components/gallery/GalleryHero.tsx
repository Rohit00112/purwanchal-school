import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/config/images";

export function GalleryHero() {
  return (
    <PageHero
      title={<>Moments worth <span className="font-editorial italic font-medium text-sun-300">remembering</span>.</>}
      description="Browse the gallery below. The photographs are illustrative stock images until the school shares its own."
      image={images.children}
      crumbs={[{ label: "Gallery" }]}
    />
  );
}
