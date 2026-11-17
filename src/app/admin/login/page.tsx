import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Administrative Staff Login | Purwanchal Secondary Boarding School",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-ivory">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <div className="text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic hover:text-navy transition-colors"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            <span>Back to public website</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-sm border border-border-subtle p-8 sm:p-10 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-sm bg-navy text-gold flex items-center justify-center mx-auto border border-gold/40 shadow-xs">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="font-heading font-extrabold text-xl text-navy">
              Staff Administrative Portal
            </h1>
            <p className="text-xs text-muted">
              Purwanchal Secondary Boarding School, Itahari-20, Tarahara
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
