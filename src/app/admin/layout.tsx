import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Admin routes read the session cookie and render per request.
export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-cream text-ink">
      {session?.user && <AdminSidebar user={session.user} />}
      <div className={`flex min-w-0 flex-1 flex-col ${session?.user ? "lg:pl-64" : ""}`}>
        <main className="flex-1 p-6 pt-20 sm:p-8 sm:pt-20 lg:p-10 lg:pt-20">{children}</main>
      </div>
    </div>
  );
}
