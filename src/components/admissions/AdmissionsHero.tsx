import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/config/images";

export function AdmissionsHero() {
  return (
    <PageHero
      title={<>Your place in the <span className="font-editorial italic font-medium text-sun-300">Purwanchal</span> family starts here.</>}
      description="Nursery to Grade 12, with +2 streams in Management, Computer Science and Education."
      image={images.mountains}
      crumbs={[{ label: "Admissions" }]}
    >
      <a href="#inquiry-form" className="btn btn-sun">Admission enquiry form</a>
      <a href="/contact" className="btn btn-ghost-light">Contact details</a>
    </PageHero>
  );
}
