import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/Logo";
import { FacebookIcon } from "@/components/shared/SocialIcons";
import { CurrentYear } from "@/components/shared/CurrentYear";

const quickLinks = [
  { label: "About the school", href: "/about" },
  { label: "Academic programmes", href: "/academics" },
  { label: "Campus & facilities", href: "/facilities" },
  { label: "Admissions", href: "/admissions" },
  { label: "Notice board", href: "/news" },
  { label: "Events calendar", href: "/events" },
  { label: "Photo gallery", href: "/gallery" },
  { label: "Contact details", href: "/contact" },
];

const levels = [
  { label: "Pre-primary (Nursery to UKG)", href: "/academics#ecd" },
  { label: "Primary (Grades 1 to 5)", href: "/academics#primary" },
  { label: "Lower secondary (Grades 6 to 8)", href: "/academics#lower-secondary" },
  { label: "Secondary / SEE (Grades 9 to 10)", href: "/academics#secondary" },
  { label: "Higher secondary (+2)", href: "/academics#plus-two" },
];

const linkClass = "inline-flex min-h-11 items-center text-[0.82rem] text-white/80 hover:text-white hover:underline underline-offset-4";

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="shell pt-14 sm:pt-16">
        <div className="rounded-lg border border-white/15 bg-brand-900 p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Visit the campus in Itahari-20, Tarahara.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                See the classrooms, laboratories and sports ground, and ask the questions that matter
                to your family. Call ahead during office hours to arrange a visit.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href="/admissions" className="btn btn-sun">
                Admission enquiry form
              </Link>
              <Link href="/contact" className="btn btn-ghost-light">
                Contact details
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="shell grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm text-[0.82rem] leading-relaxed text-white/80">
            Purwanchal Secondary Boarding School in Itahari-20, Tarahara, Sunsari. Teaching Nursery
            through Grade 12, including three +2 streams, since 1994.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-white/25 text-white/80 hover:border-sun-300 hover:text-sun-300"
              aria-label="School Facebook page"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-white/25 text-white/80 hover:border-sun-300 hover:text-sun-300"
              aria-label="Call the school"
            >
              <Phone className="size-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-white/25 text-white/80 hover:border-sun-300 hover:text-sun-300"
              aria-label="Email the school"
            >
              <Mail className="size-4" />
            </a>
          </div>

          <div className="mt-7 rounded-lg border border-white/15 p-4">
            <p className="text-sm font-bold text-white">School app</p>
            <p className="mt-1.5 text-xs leading-relaxed text-white/80">
              The Purwanchal School app is available on Google Play.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.ingrails.purwanchal_school"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center text-xs font-bold text-sun-300 hover:underline"
            >
              Open the Play store listing
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun-300">Pages</h3>
          <ul className="mt-4 space-y-1">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun-300">Programmes</h3>
          <ul className="mt-4 space-y-1">
            {levels.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun-300">Find us</h3>
          <ul className="mt-4 space-y-4 text-[0.82rem] text-white/80">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun-300" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun-300" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white hover:underline">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun-300" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white hover:underline">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun-300" />
              <span>
                {siteConfig.officeHours.days}
                <br />
                {siteConfig.officeHours.start} to {siteConfig.officeHours.end}
              </span>
            </li>
          </ul>
          <Link href="/admin/login" className="mt-6 inline-flex min-h-11 items-center text-xs font-semibold text-white/80 hover:text-sun-300 hover:underline">
            Staff and admin login
          </Link>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-white/80 sm:flex-row sm:text-left">
          <p>© <CurrentYear /> {siteConfig.name}. All rights reserved.</p>
          <p>Established 1994 · Itahari-20, Tarahara, Sunsari, Nepal</p>
        </div>
      </div>
    </footer>
  );
}
