import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { FacebookIcon } from "@/components/shared/SocialIcons";
import { siteConfig } from "@/config/site";
import { images } from "@/config/images";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Contact Us | Location, Phone & Office Hours",
  description: "Get in touch with Purwanchal Secondary Boarding School in Itahari-20, Tarahara, Sunsari. Phone, office hours, map directions and inquiry form.",
});

const details = [
  { icon: MapPin, label: "Campus address", value: siteConfig.address, note: "Itahari Sub-Metropolitan, Ward 20" },
  { icon: Phone, label: "Telephone", value: siteConfig.phone, note: "Sunday to Friday, office hours", href: `tel:${siteConfig.phone}` },
  { icon: Mail, label: "Email", value: siteConfig.email, note: "For admission and general enquiries", href: `mailto:${siteConfig.email}` },
  { icon: Clock, label: "Office hours", value: `${siteConfig.officeHours.start} – ${siteConfig.officeHours.end}`, note: siteConfig.officeHours.days },
];

export default function ContactPage() {
  return (
    <div className="bg-cream">
      <PageHero
        title={<>We&apos;d love to <span className="font-editorial italic font-medium text-sun-300">hear from you</span>.</>}
        description="Questions about admissions, academics or arranging a campus visit? Our team at the Tarahara office is ready to help."
        image={images.nepal}
        crumbs={[{ label: "Contact" }]}
      />

      <div className="shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Find us, call us, <span className="font-editorial italic font-medium text-brand-600">drop by</span>.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Visitors are welcome during office hours. For meetings with the principal or
              department heads, we recommend calling ahead.
            </p>

            <div className="mt-8 grid gap-3">
              {details.map(({ icon: Icon, label, value, note, href }) => {
                const content = (
                  <>
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-ink-faint">{label}</span>
                      <span className="mt-1 block break-words text-sm font-extrabold text-ink">{value}</span>
                      <span className="mt-0.5 block text-[0.75rem] text-ink-soft">{note}</span>
                    </span>
                  </>
                );

                return href ? (
                  <a key={label} href={href} className="flex min-h-14 items-start gap-4 rounded-lg border border-line bg-white p-5 underline-offset-4 hover:border-brand-600 hover:underline">
                    {content}
                  </a>
                ) : (
                  <div key={label} className="flex min-h-14 items-start gap-4 rounded-lg border border-line bg-white p-5">
                    {content}
                  </div>
                );
              })}
            </div>

            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-700 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800"
            >
              <FacebookIcon className="size-4" aria-hidden="true" /> Official Facebook page
            </a>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-lg border border-line bg-white p-7 sm:p-10">
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Write to the office</h2>
              <p className="mt-2 text-sm text-ink-soft">Fill in the form and our front office will reply promptly.</p>
              <div className="mt-8"><ContactForm /></div>
            </div>

            <div className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <p className="inline-flex items-center gap-2 text-sm font-extrabold text-ink">
                  <MapPin className="size-4 text-brand-600" aria-hidden="true" /> Our location in Tarahara
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 text-xs font-extrabold text-brand-700 underline-offset-4 hover:underline"
                >
                  <Navigation className="size-3.5" aria-hidden="true" /> Get directions
                </a>
              </div>
              <div className="aspect-[16/9] w-full border-t border-line bg-cream-deep">
                <iframe
                  title="Purwanchal Secondary Boarding School location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}&hl=en&z=15&output=embed`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 rounded-lg bg-brand-900 px-7 py-8 sm:flex-row sm:px-10">
          <div>
            <h3 className="text-xl font-extrabold text-white">Questions about admission?</h3>
            <p className="mt-1 text-sm text-white/80">Use the enquiry form to ask about grades, documents or arranging a visit.</p>
          </div>
          <Link href="/admissions#inquiry-form" className="btn btn-sun shrink-0">Admission enquiry form</Link>
        </div>
      </div>
    </div>
  );
}
