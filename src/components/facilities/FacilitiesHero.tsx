import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/config/images";

export function FacilitiesHero() {
  return (
    <PageHero
      title={<>Spaces that invite <span className="font-editorial italic font-medium text-sun-300">curiosity</span>.</>}
      description="Read about the spaces that support classroom teaching, practical work and activities at our Tarahara campus."
      image={images.library}
      crumbs={[{ label: "Facilities" }]}
    />
  );
}
