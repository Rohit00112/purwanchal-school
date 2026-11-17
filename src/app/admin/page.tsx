import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function AdminRootPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let counts: { enquiries: number; messages: number; notices: number; events: number } | null = null;
  try {
    const [enquiries, messages, notices, events] = await Promise.all([
      db.admissionInquiry.count(),
      db.contactMessage.count(),
      db.newsArticle.count(),
      db.event.count(),
    ]);
    counts = { enquiries, messages, notices, events };
  } catch {
    counts = null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Administration</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Signed in as {session.user.name || session.user.email || "administrator"}.
        </p>
      </div>

      <section aria-labelledby="admin-overview">
        <h2 id="admin-overview" className="text-lg font-bold text-ink">Stored records</h2>
        {counts ? (
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Admission enquiries", value: counts.enquiries },
              { label: "Contact messages", value: counts.messages },
              { label: "Notices", value: counts.notices },
              { label: "Events", value: counts.events },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-line bg-white p-4">
                <dt className="text-xs font-semibold text-ink-soft">{item.label}</dt>
                <dd className="mt-1 text-2xl font-extrabold text-brand-800">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-4 rounded-lg border border-line bg-white p-4 text-sm text-ink-soft">
            Record counts are unavailable right now.
          </p>
        )}
      </section>

      <section aria-labelledby="admin-available">
        <h2 id="admin-available" className="text-lg font-bold text-ink">Available pages</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "Public website", href: "/" },
            { label: "Notices", href: "/news" },
            { label: "Events", href: "/events" },
            { label: "Gallery", href: "/gallery" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-lg border border-line-strong bg-white px-4 text-sm font-semibold text-brand-800 hover:border-brand-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">
          Screens for editing enquiries, messages, notices, events, gallery media and settings are not
          available yet.
        </p>
      </section>
    </div>
  );
}
