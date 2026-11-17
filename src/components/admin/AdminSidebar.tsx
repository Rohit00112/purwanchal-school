"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserCheck, 
  Mail, 
  Bell, 
  Calendar, 
  Image as ImageIcon,
  Settings,
  ExternalLink, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_MODULES = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Admissions & Inquiries", href: "/admin/inquiries", icon: UserCheck },
  { label: "Contact Inquiries", href: "/admin/contacts", icon: Mail },
  { label: "Notices & Circulars", href: "/admin/news", icon: Bell },
  { label: "Calendar & Events", href: "/admin/events", icon: Calendar },
  { label: "Campus Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "School Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ user }: { user?: { name?: string | null; role?: string | null; email?: string | null } }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const asideRef = React.useRef<HTMLElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);

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
      const root = asideRef.current;
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onTab);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onTab);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const toggle = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    } else {
      lastFocused.current = document.activeElement as HTMLElement;
      setMobileOpen(true);
    }
  };

  return (
    <>
      {/* Mobile Top Navigation Trigger */}
      <div className="fixed left-4 top-3 z-50 lg:hidden">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-950 text-white shadow-md border border-white/10"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="admin-sidebar"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <aside
        ref={asideRef}
        id="admin-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-white/10 bg-brand-950 text-white transition-transform duration-200 lg:translate-x-0 shadow-xl",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Header Brand */}
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="size-10 rounded-full bg-white p-1 border border-white/20 shrink-0">
                <Image
                  src="/logo/logo-web.png"
                  alt="School Crest"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-sm tracking-tight text-white block">
                  PURWANCHAL
                </span>
                <span className="text-[10px] font-semibold text-sun-300 uppercase tracking-wider block">
                  Executive CMS Portal
                </span>
              </div>
            </Link>

            <button
              ref={closeRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close admin navigation"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-6">
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                Operations &amp; Content
              </p>
              <nav className="space-y-1" aria-label="Admin Navigation">
                {NAV_MODULES.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex min-h-[42px] items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all",
                        isActive
                          ? "bg-brand-700 text-white shadow-xs font-bold"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn("size-4 shrink-0", isActive ? "text-sun-300" : "text-white/60")} aria-hidden="true" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={cn("size-3 shrink-0 transition-transform", isActive ? "text-sun-300 translate-x-0.5" : "text-white/20")} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Institutional Information */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs">
              <div className="flex items-center gap-2 text-sun-300 font-bold">
                <ShieldCheck className="size-4" />
                <span>Verified Portal</span>
              </div>
              <p className="mt-1.5 text-[11px] text-white/70 leading-relaxed">
                School administration node: Itahari-20, Tarahara. All activity logged for security.
              </p>
            </div>
          </div>
        </div>

        {/* User Session Footer */}
        <div className="border-t border-white/10 bg-brand-950/80 p-4 space-y-3">
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-serif font-bold text-sm text-white">
                {user?.name || user?.email?.split("@")[0] || "Administrator"}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-sun-300 font-semibold">
                {user?.role || "Staff Admin"}
              </span>
            </div>
            
            <Link
              href="/"
              target="_blank"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              title="Open Public School Website"
            >
              <ExternalLink className="size-4" />
            </Link>
          </div>

          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin navigation"
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}
    </>
  );
}
