import Link from "next/link";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { siteConfig } from "@/config/site";
import { ExternalLink, ShieldAlert, Clock, Bell } from "lucide-react";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-slate-bg text-ink">
      {session?.user && <AdminSidebar user={session.user} />}
      
      <div className={`flex min-w-0 flex-1 flex-col ${session?.user ? "lg:pl-64" : ""}`}>
        {/* Top Executive Header Bar */}
        {session?.user && (
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-white/90 px-6 backdrop-blur-md sm:px-8">
            <div className="flex items-center gap-3 pl-12 lg:pl-0">
              <span className="font-serif font-bold text-base text-ink">
                Administrative Control Panel
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="hidden sm:inline text-xs text-slate-500 font-medium">
                {siteConfig.address}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 border-r border-line pr-4">
                <Clock className="size-3.5 text-brand-700" />
                <span>Office: 9:00 AM – 4:30 PM</span>
              </div>

              <Link
                href="/"
                target="_blank"
                className="btn btn-outline !min-h-[38px] !px-3.5 !py-1.5 !text-xs !font-semibold"
              >
                <span>Live Website</span>
                <ExternalLink className="size-3.5 ml-1" />
              </Link>
            </div>
          </header>
        )}

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
