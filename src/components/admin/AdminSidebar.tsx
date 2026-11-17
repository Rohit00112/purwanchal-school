"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ExternalLink, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Public website", href: "/", icon: ExternalLink },
];

const PLANNED = [
  "Admission enquiries",
  "Contact messages",
  "Notices and events",
  "Gallery media",
  "Website settings",
];

export function AdminSidebar({ user }: { user?: { name?: string | null; role?: string | null } }) {
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
      <div className="fixed left-4 top-3 z-50 lg:hidden">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-950 text-white"
          aria-label={mobileOpen ? "Close admin navigation" : "Open admin navigation"}
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
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-brand-800 bg-brand-950 text-white transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/15 p-5">
            <div>
              <span className="block text-sm font-extrabold tracking-tight text-white">PURWANCHAL</span>
              <span className="mt-0.5 block text-[0.65rem] font-bold uppercase tracking-wider text-sun-300">
                CMS administration
              </span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
              aria-label="Close admin navigation"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="space-y-1 p-4" aria-label="Admin navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/admin" ? pathname === "/admin" : false;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold",
                    isActive ? "bg-brand-700 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0 text-sun-300" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="px-5 py-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-sun-300">Planned screens</p>
            <ul className="mt-2 space-y-1 text-xs text-white/80">
              {PLANNED.map((item) => (
                <li key={item} className="flex min-h-11 items-center">{item}</li>
              ))}
            </ul>
            <p className="mt-2 text-[0.7rem] leading-relaxed text-white/80">
              Management screens are not available yet.
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-white/15 bg-brand-950 p-4">
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-semibold text-white">{user?.name || "Administrator"}</span>
              <span className="text-[0.65rem] uppercase tracking-wider text-sun-300">
                {user?.role || "Admin"}
              </span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="View public website in a new tab"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              <LogOut aria-hidden="true" className="size-4" />
              <span>Sign out</span>
            </button>
          </form>
        </div>
      </aside>

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
