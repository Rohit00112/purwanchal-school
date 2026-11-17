import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  Users, 
  Mail, 
  Bell, 
  Calendar, 
  ExternalLink, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Phone,
  FileText
} from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDateShort } from "@/lib/utils";

export const instant = false;

export default async function AdminRootPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let counts = { enquiries: 0, messages: 0, notices: 0, events: 0 };
  let recentInquiries: any[] = [];
  let recentMessages: any[] = [];
  let dbAvailable = true;

  try {
    const [
      enquiriesCount, 
      messagesCount, 
      noticesCount, 
      eventsCount,
      inquiriesList,
      messagesList
    ] = await Promise.all([
      db.admissionInquiry.count(),
      db.contactMessage.count(),
      db.newsArticle.count(),
      db.event.count(),
      db.admissionInquiry.findMany({
        take: 5,
        orderBy: { submittedAt: "desc" },
      }),
      db.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    counts = { 
      enquiries: enquiriesCount, 
      messages: messagesCount, 
      notices: noticesCount, 
      events: eventsCount 
    };
    recentInquiries = inquiriesList;
    recentMessages = messagesList;
  } catch {
    dbAvailable = false;
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                Administration Portal
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">
                Academic Session 2081/2082
              </span>
            </div>
            <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
              Welcome, {session.user.name || "Administrator"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Purwanchal Secondary Boarding School · Itahari-20, Tarahara, Sunsari
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="btn btn-outline !min-h-10 !text-xs !font-semibold"
            >
              <span>View Public Website</span>
              <ExternalLink className="size-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Primary Metric Stat Cards */}
      <section aria-labelledby="overview-stats">
        <div className="flex items-center justify-between mb-4">
          <h2 id="overview-stats" className="font-serif text-lg font-bold text-ink">
            Overview &amp; School Activity
          </h2>
          <span className="text-xs text-slate-500">Live Database Counters</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/inquiries" className="card-interactive block rounded-xl border border-line bg-white p-5 shadow-xs hover:border-brand-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Admission Inquiries
              </span>
              <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Users className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-serif text-3xl font-bold text-ink">
              {counts.enquiries}
            </p>
            <p className="mt-1 text-xs text-brand-700 font-medium flex items-center justify-between">
              <span>View &amp; manage applicants</span>
              <ArrowRight className="size-3" />
            </p>
          </Link>

          <Link href="/admin/contacts" className="card-interactive block rounded-xl border border-line bg-white p-5 shadow-xs hover:border-sun-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact Messages
              </span>
              <div className="flex size-9 items-center justify-center rounded-lg bg-sun-50 text-sun-600">
                <Mail className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-serif text-3xl font-bold text-ink">
              {counts.messages}
            </p>
            <p className="mt-1 text-xs text-sun-600 font-medium flex items-center justify-between">
              <span>Review inbox messages</span>
              <ArrowRight className="size-3" />
            </p>
          </Link>

          <Link href="/admin/news" className="card-interactive block rounded-xl border border-line bg-white p-5 shadow-xs hover:border-brand-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Notices
              </span>
              <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Bell className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-serif text-3xl font-bold text-ink">
              {counts.notices}
            </p>
            <p className="mt-1 text-xs text-brand-700 font-medium flex items-center justify-between">
              <span>Manage bulletins &amp; circulars</span>
              <ArrowRight className="size-3" />
            </p>
          </Link>

          <Link href="/admin/events" className="card-interactive block rounded-xl border border-line bg-white p-5 shadow-xs hover:border-sun-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Calendar Events
              </span>
              <div className="flex size-9 items-center justify-center rounded-lg bg-sun-50 text-sun-600">
                <Calendar className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-serif text-3xl font-bold text-ink">
              {counts.events}
            </p>
            <p className="mt-1 text-xs text-sun-600 font-medium flex items-center justify-between">
              <span>Organize school schedule</span>
              <ArrowRight className="size-3" />
            </p>
          </Link>
        </div>
      </section>

      {/* Grid: Recent Admission Inquiries & Messages */}
      <div className="grid gap-8 lg:grid-cols-12">
        
        {/* Left Column: Recent Admission Inquiries (7 cols) */}
        <section id="inquiries" className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink">
                Recent Admission Inquiries
              </h2>
              <p className="text-xs text-slate-500">
                Submissions from the public admission enquiry form
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-brand-700 hover:underline"
            >
              Manage Inquiries ({counts.enquiries}) →
            </Link>
          </div>

          <div className="rounded-xl border border-line bg-white overflow-hidden shadow-xs">
            {recentInquiries.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="size-8 text-slate-300 mx-auto mb-2" />
                <p className="font-serif text-sm font-bold text-ink">No inquiries submitted yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  When parents submit the online admission inquiry, details appear here in real-time.
                </p>
                <Link
                  href="/admissions#inquiry-form"
                  target="_blank"
                  className="btn btn-outline !min-h-9 !text-xs mt-4 inline-flex"
                >
                  Submit a test inquiry
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="p-4 hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm font-bold text-ink">
                            {inq.studentName}
                          </span>
                          <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                            {inq.applyingGrade}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Parent: <strong className="text-slate-700">{inq.parentName}</strong> · Phone: {inq.contactNumber}
                        </p>
                        {inq.message && (
                          <p className="mt-1.5 text-xs text-slate-600 line-clamp-1 italic">
                            &ldquo;{inq.message}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-slate-400 block">
                          {formatDateShort(inq.submittedAt)}
                        </span>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-sun-600 bg-sun-50 px-1.5 py-0.5 rounded">
                          {inq.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Recent Messages (5 cols) */}
        <section id="messages" className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink">
                Contact Messages
              </h2>
              <p className="text-xs text-slate-500">
                Inquiries from website contact page
              </p>
            </div>
            <Link
              href="/admin/contacts"
              className="text-xs font-bold text-sun-600 hover:underline"
            >
              Manage Messages ({counts.messages}) →
            </Link>
          </div>

          <div className="rounded-xl border border-line bg-white overflow-hidden shadow-xs">
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="size-8 text-slate-300 mx-auto mb-2" />
                <p className="font-serif text-sm font-bold text-ink">No contact messages yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  General inquiries sent via the contact page will appear here.
                </p>
                <Link
                  href="/contact"
                  target="_blank"
                  className="btn btn-outline !min-h-9 !text-xs mt-4 inline-flex"
                >
                  Test contact form
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="p-4 hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-serif text-sm font-bold text-ink">
                        {msg.fullName}
                      </p>
                      <span className="text-[11px] text-slate-400 shrink-0">
                        {formatDateShort(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-brand-700 mt-0.5">
                      {msg.subject}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                      {msg.message}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                      <span>{msg.email}</span>
                      {msg.phone && <span>· {msg.phone}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
