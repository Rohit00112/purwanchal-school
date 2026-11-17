import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/config/images";

export function AcademicsHero() {
  return (
    <PageHero
      title={<>A clear path from <span className="font-editorial italic font-medium text-sun-300">Nursery to +2</span>.</>}
      description="Five academic levels from Nursery–UKG through Grades 9–10 SEE, followed by three +2 streams."
      image={images.lecture}
      crumbs={[{ label: "Academics" }]}
    />
  );
}
