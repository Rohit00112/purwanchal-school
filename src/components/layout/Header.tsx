"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, MapPin, Clock, LockKeyhole } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our story", href: "/about#history", desc: "Our founding and what we believe" },
      { label: "Vision & mission", href: "/about#vision", desc: "Our approach to learning" },
      { label: "Faculty", href: "/about#team", desc: "Teaching and administration" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Academic divisions", href: "/academics", desc: "Nursery through Grade 12" },
      { label: "Higher secondary (+2)", href: "/academics#plus-two", desc: "Management, Computer Science and Education" },
      { label: "Academic calendar", href: "/academics#calendar", desc: "Terms and assessments" },
    ],
  },
  { label: "Facilities", href: "/facilities" },
  { label: "Admissions", href: "/admissions" },
  {
    label: "Notice board",
    href: "/news",
    children: [
      { label: "Latest notices", href: "/news", desc: "Circulars and announcements" },
      { label: "Events", href: "/events", desc: "School events and calendar" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!mobileOpen) {
      if (lastFocused.current) {
        lastFocused.current.focus();
        lastFocused.current = null;
      }
      return;
    }
    closeRef.current?.focus();
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = drawerRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [mobileOpen]);

  const openMobile = () => {
    lastFocused.current = document.activeElement as HTMLElement;
    setMobileOpen(true);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="hidden bg-brand-950 text-white/80 lg:block">
        <div className="shell flex min-h-11 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="inline-flex min-h-11 items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-3.5 text-sun-300" />
              {siteConfig.address}
            </span>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-sun-300">
              <Phone aria-hidden="true" className="size-3.5 text-sun-300" />
              {siteConfig.phone}
            </a>
            <span className="inline-flex min-h-11 items-center gap-1.5">
              <Clock aria-hidden="true" className="size-3.5 text-sun-300" />
              {siteConfig.officeHours.days}, {siteConfig.officeHours.start} to {siteConfig.officeHours.end}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/admissions" className="inline-flex min-h-11 items-center font-semibold text-sun-300 hover:underline">
              Admissions and enquiries
            </Link>
            <Link href="/admin/login" className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-sun-300">
              <LockKeyhole aria-hidden="true" className="size-3.5 text-sun-300" />
              Staff login
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-colors",
          scrolled ? "border-line bg-white" : "border-transparent bg-white"
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              if ("children" in item && item.children) {
                const panelId = `nav-${slug(item.label)}`;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onFocus={() => setOpenDropdown(item.label)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenDropdown(null);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      aria-controls={panelId}
                      className={cn(
                        "inline-flex h-11 items-center gap-1.5 px-3 text-[0.82rem] font-semibold transition-colors",
                        active ? "text-brand-700 font-bold border-b-2 border-brand-700" : "text-slate-700 hover:text-brand-700"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("size-3.5 transition-transform", openDropdown === item.label && "rotate-180")}
                      />
                    </button>

                    <div
                      id={panelId}
                      className={cn(
                        "absolute left-0 top-full w-[19rem] pt-3",
                        openDropdown === item.label ? "block" : "hidden"
                      )}
                    >
                      <div className="rounded-lg border border-line bg-white p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="flex min-h-11 items-start rounded-lg px-3 py-2 transition-colors hover:bg-brand-50"
                          >
                            <span>
                              <span className="block text-[0.82rem] font-bold text-ink">{child.label}</span>
                              <span className="mt-0.5 block text-xs leading-snug text-ink-soft">{child.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "inline-flex h-11 items-center px-3 text-[0.82rem] font-semibold transition-colors",
                    active ? "text-brand-700 font-bold border-b-2 border-brand-700" : "text-slate-700 hover:text-brand-700"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/admissions" 
              className="btn btn-primary hidden xl:inline-flex !min-h-11 !px-5 !text-xs !font-bold shadow-xs hover:bg-brand-800"
            >
              Apply for Admission
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => (mobileOpen ? setMobileOpen(false) : openMobile())}
              className="inline-flex xl:hidden size-11 items-center justify-center rounded-lg border border-line bg-white text-brand-900 hover:bg-slate-50"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            tabIndex={-1}
            className="absolute inset-0 bg-brand-950/70"
          />
          <div
            ref={drawerRef}
            id="mobile-navigation"
            className="absolute inset-x-0 top-[72px] bottom-0 z-10 overflow-y-auto rounded-t-lg bg-cream px-5 pb-10 pt-6 sm:px-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-bold text-brand-800">School menu</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-white"
                aria-label="Close navigation"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="grid gap-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-line py-1">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center rounded-lg px-2 text-base font-bold",
                      isActive(item.href) ? "text-brand-700" : "text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <div className="flex flex-wrap gap-2 pb-3 pl-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="inline-flex min-h-11 items-center rounded-lg bg-cream-deep px-3 py-2 text-xs font-semibold text-ink-soft"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-8 space-y-3">
              <Link href="/admissions" onClick={() => setMobileOpen(false)} className="btn btn-sun w-full">
                Admission enquiry form
              </Link>
              <div className="rounded-lg bg-brand-950 p-4 text-sm text-white/80">
                <p className="flex items-center gap-2 font-semibold text-white">
                  <Phone aria-hidden="true" className="size-4 text-sun-300" /> {siteConfig.phone}
                </p>
                <p className="mt-2 flex items-start gap-2 text-xs">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun-300" /> {siteConfig.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
