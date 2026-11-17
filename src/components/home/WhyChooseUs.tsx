import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface Detail {
  label: string;
  value: string;
  href?: string;
}

const details: Detail[] = [
  { label: "Address", value: siteConfig.address },
  {
    label: "Office hours",
    value: `${siteConfig.officeHours.days}, ${siteConfig.officeHours.start} to ${siteConfig.officeHours.end}`,
  },
  { label: "Location", value: `${siteConfig.coordinates.lat}, ${siteConfig.coordinates.lng}` },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand-950 py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          light
          title="Visit and contact"
          description="School details for Purwanchal Secondary Boarding School."
        />

        <dl className="mt-12 grid gap-x-10 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-xs font-bold uppercase tracking-wide text-white/60">{detail.label}</dt>
              <dd className="mt-2 text-sm font-semibold text-white/90">
                {detail.href ? (
                  <a href={detail.href} className="inline-flex min-h-11 items-center hover:text-white">
                    {detail.value}
                  </a>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href={`tel:${siteConfig.phone}`} className="btn btn-sun">
            Call the school office
          </a>
          <a href={siteConfig.facebook} className="btn btn-ghost-light">
            Purwanchal on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
