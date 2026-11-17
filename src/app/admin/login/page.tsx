import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Administrative Staff Portal | Purwanchal Secondary Boarding School",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-bg">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span>Return to public website</span>
          </Link>
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <Lock className="size-3" aria-hidden="true" />
            256-bit SSL
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-line p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-3">
            {/* Official School Emblem */}
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-50 border border-slate-200 p-2 shadow-xs">
              <Image
                src="/logo/logo-web.png"
                alt="Purwanchal Secondary Boarding School"
                width={52}
                height={52}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-ink">
                Administrative Portal
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Purwanchal Secondary Boarding School · Tarahara
              </p>
            </div>
          </div>

          <div className="border-t border-line/70 pt-6">
            <LoginForm />
          </div>

          <div className="border-t border-line/60 pt-4 text-center">
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="size-3.5 text-brand-700" aria-hidden="true" />
              Authorized faculty and administrative personnel only
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}. Itahari-20, Sunsari, Nepal.
        </p>
      </div>
    </div>
  );
}
