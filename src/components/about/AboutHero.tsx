import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/config/images";

export function AboutHero() {
  return (
    <PageHero
      title={<>Rooted in Tarahara. <span className="font-editorial italic font-medium text-sun-300">Learning for every stage.</span></>}
      description="Founded in 1994 in Itahari-20, Tarahara, Purwanchal School teaches five academic levels from Nursery through +2."
      image={images.campusWide}
      crumbs={[{ label: "About us" }]}
    />
  );
}
