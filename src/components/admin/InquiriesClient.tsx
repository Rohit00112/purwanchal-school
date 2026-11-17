"use client";

import * as React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Building, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Trash2, 
  X, 
  ExternalLink,
  ChevronRight,
  FileText,
  UserCheck
} from "lucide-react";
import { updateInquiryStatus, deleteInquiry } from "@/server/actions/admin";
import { formatDateShort } from "@/lib/utils";
import { adToBs } from "@/lib/utils/nepaliDate";
import { InquiryStatus } from "@prisma/client";

interface InquiryItem {
  id: string;
  parentName: string;
  studentName: string;
  contactNumber: string;
  email: string | null;
  currentSchool: string | null;
  applyingGrade: string;
  academicYear: string | null;
  message: string | null;
  status: InquiryStatus;
  adminNotes: string | null;
  submittedAt: Date | string;
  reviewedAt?: Date | string | null;
}

export function InquiriesClient({ initialInquiries }: { initialInquiries: InquiryItem[] }) {
  const [inquiries, setInquiries] = React.useState<InquiryItem[]>(initialInquiries);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("ALL");
  const [selectedGrade, setSelectedGrade] = React.useState<string>("ALL");
  const [activeModalInquiry, setActiveModalInquiry] = React.useState<InquiryItem | null>(null);
  const [notesInput, setNotesInput] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  // Sync state when props change
  React.useEffect(() => {
    setInquiries(initialInquiries);
  }, [initialInquiries]);

  // When opening modal, populate internal notes
  React.useEffect(() => {
    if (activeModalInquiry) {
      setNotesInput(activeModalInquiry.adminNotes || "");
    }
  }, [activeModalInquiry]);

  // Status counts for tab counters
  const counts = React.useMemo(() => {
    return {
      ALL: inquiries.length,
      NEW: inquiries.filter((i) => i.status === InquiryStatus.NEW).length,
      REVIEWED: inquiries.filter((i) => i.status === InquiryStatus.REVIEWED).length,
      CONTACTED: inquiries.filter((i) => i.status === InquiryStatus.CONTACTED).length,
      ENROLLED: inquiries.filter((i) => i.status === InquiryStatus.ENROLLED).length,
      ARCHIVED: inquiries.filter((i) => i.status === InquiryStatus.ARCHIVED).length,
    };
  }, [inquiries]);

  // Unique grades for dropdown
  const uniqueGrades = React.useMemo(() => {
    const set = new Set(inquiries.map((i) => i.applyingGrade));
    return Array.from(set).sort();
  }, [inquiries]);

  // Filtered inquiries
  const filtered = React.useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        searchQuery === "" ||
        inq.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.contactNumber.includes(searchQuery) ||
        (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        inq.applyingGrade.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "ALL" || inq.status === selectedStatus;

      const matchesGrade =
        selectedGrade === "ALL" || inq.applyingGrade === selectedGrade;

      return matchesSearch && matchesStatus && matchesGrade;
    });
  }, [inquiries, searchQuery, selectedStatus, selectedGrade]);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setIsUpdating(true);
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (activeModalInquiry?.id === id) {
        setActiveModalInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      setActionSuccess("Status updated successfully.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeModalInquiry) return;
    setIsUpdating(true);
    try {
      await updateInquiryStatus(activeModalInquiry.id, activeModalInquiry.status, notesInput);
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === activeModalInquiry.id ? { ...item, adminNotes: notesInput } : item
        )
      );
      setActiveModalInquiry((prev) => (prev ? { ...prev, adminNotes: notesInput } : null));
      setActionSuccess("Internal notes saved.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to save notes.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this admission record?")) {
      return;
    }
    setIsUpdating(true);
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (activeModalInquiry?.id === id) {
        setActiveModalInquiry(null);
      }
      setActionSuccess("Inquiry deleted.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to delete record.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case InquiryStatus.NEW:
        return <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">New Applicant</span>;
      case InquiryStatus.REVIEWED:
        return <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Reviewed</span>;
      case InquiryStatus.CONTACTED:
        return <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Contacted</span>;
      case InquiryStatus.ENROLLED:
        return <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Enrolled</span>;
      case InquiryStatus.ARCHIVED:
        return <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Archived</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
              Admissions Desk
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">
              Academic Session 2081/2082
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
            Admission Inquiries &amp; Applicants
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Review online application submissions, schedule diagnostic assessments, and track enrollment status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {actionSuccess && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg animate-pulse">
              ✓ {actionSuccess}
            </span>
          )}
          <a
            href="/admissions"
            target="_blank"
            className="btn btn-outline !min-h-10 !text-xs !font-semibold"
          >
            <span>Public Admission Form</span>
            <ExternalLink className="size-3.5 ml-1" />
          </a>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="rounded-xl border border-line bg-white p-4 space-y-4 shadow-xs">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-3">
          {(["ALL", "NEW", "REVIEWED", "CONTACTED", "ENROLLED", "ARCHIVED"] as const).map((st) => {
            const count = counts[st];
            const active = selectedStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-brand-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{st === "ALL" ? "All Inquiries" : st}</span>
                <span className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                  active ? "bg-white/20 text-white" : "bg-white text-slate-700"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Grade Filter */}
        <div className="grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name, parent name, contact phone, or grade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-line bg-slate-50/50 pl-9 pr-4 py-2 text-xs font-medium text-ink placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full rounded-lg border border-line bg-slate-50/50 px-3 py-2 text-xs font-medium text-ink focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700"
            >
              <option value="ALL">All Grades &amp; Streams</option>
              {uniqueGrades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      <div className="rounded-xl border border-line bg-white shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="size-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-ink">No admission inquiries match criteria</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords or clearing status and grade filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line bg-slate-50/80 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Student &amp; Target Grade</th>
                  <th className="py-3 px-4">Parent / Contact</th>
                  <th className="py-3 px-4">Submission Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-serif text-sm font-bold text-ink">
                        {item.studentName}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
                          {item.applyingGrade}
                        </span>
                        {item.currentSchool && (
                          <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                            from {item.currentSchool}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">
                        {item.parentName}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-slate-500">
                        <a href={`tel:${item.contactNumber}`} className="hover:text-brand-700 font-mono text-[11px]">
                          {item.contactNumber}
                        </a>
                        {item.email && (
                          <span className="text-slate-300">·</span>
                        )}
                        {item.email && (
                          <a href={`mailto:${item.email}`} className="hover:text-brand-700 truncate max-w-[140px]">
                            {item.email}
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">
                        {adToBs(item.submittedAt).formattedNepali}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        AD: {formatDateShort(item.submittedAt)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <select
                          disabled={isUpdating}
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as InquiryStatus)}
                          className="rounded border border-line bg-white px-2 py-1 text-[11px] font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-brand-700"
                        >
                          <option value="NEW">New</option>
                          <option value="REVIEWED">Reviewed</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="ENROLLED">Enrolled</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => setActiveModalInquiry(item)}
                          className="rounded border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-brand-700 hover:bg-brand-50 transition-colors"
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Slide-over / Modal */}
      {activeModalInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                    Applicant Dossier
                  </span>
                  {getStatusBadge(activeModalInquiry.status)}
                </div>
                <h2 className="mt-2 font-serif text-2xl font-bold text-ink">
                  {activeModalInquiry.studentName}
                </h2>
                <p className="text-xs text-slate-500">
                  Applied for <strong className="text-slate-800">{activeModalInquiry.applyingGrade}</strong> · Submitted on {formatDateShort(activeModalInquiry.submittedAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalInquiry(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6 text-xs">
              {/* Key Details Grid */}
              <div className="grid gap-4 sm:grid-cols-2 rounded-xl bg-slate-50 p-4 border border-line">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Parent / Guardian
                  </span>
                  <p className="mt-1 font-semibold text-sm text-ink">{activeModalInquiry.parentName}</p>
                  <p className="mt-0.5 text-slate-600">
                    Phone: <a href={`tel:${activeModalInquiry.contactNumber}`} className="font-mono text-brand-700 font-bold hover:underline">{activeModalInquiry.contactNumber}</a>
                  </p>
                  {activeModalInquiry.email && (
                    <p className="text-slate-600">
                      Email: <a href={`mailto:${activeModalInquiry.email}`} className="text-brand-700 hover:underline">{activeModalInquiry.email}</a>
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Academic Background
                  </span>
                  <p className="mt-1 font-semibold text-sm text-ink">
                    Target: {activeModalInquiry.applyingGrade}
                  </p>
                  <p className="mt-0.5 text-slate-600">
                    Current/Previous School: {activeModalInquiry.currentSchool || "Not specified"}
                  </p>
                  <p className="text-slate-600">
                    Session: {activeModalInquiry.academicYear || "2081/2082"}
                  </p>
                </div>
              </div>

              {/* Inquiry Message */}
              {activeModalInquiry.message && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Parent&apos;s Inquiry Notes
                  </span>
                  <div className="rounded-lg border border-line bg-white p-3.5 text-slate-700 leading-relaxed italic">
                    &ldquo;{activeModalInquiry.message}&rdquo;
                  </div>
                </div>
              )}

              {/* Internal Administration Notes */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Internal Faculty &amp; Admission Notes
                  </span>
                  <span className="text-[11px] text-slate-400">Only visible to school administration</span>
                </div>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g., Parent called on Sunday. Diagnostic test scheduled for Tuesday at 10:00 AM. Marksheet reviewed."
                  className="w-full rounded-lg border border-line p-3 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={handleSaveNotes}
                    className="btn btn-primary !min-h-8 !px-3 !py-1 !text-xs"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {/* Quick Status Action Controls */}
              <div className="border-t border-line pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Update Enrollment Stage
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isUpdating || activeModalInquiry.status === InquiryStatus.CONTACTED}
                    onClick={() => handleStatusChange(activeModalInquiry.id, InquiryStatus.CONTACTED)}
                    className="btn btn-outline !min-h-9 !text-xs"
                  >
                    Mark Contacted
                  </button>
                  <button
                    type="button"
                    disabled={isUpdating || activeModalInquiry.status === InquiryStatus.ENROLLED}
                    onClick={() => handleStatusChange(activeModalInquiry.id, InquiryStatus.ENROLLED)}
                    className="btn btn-primary !min-h-9 !text-xs !bg-emerald-700 hover:!bg-emerald-800"
                  >
                    Confirm Enrolled
                  </button>
                  <button
                    type="button"
                    disabled={isUpdating || activeModalInquiry.status === InquiryStatus.ARCHIVED}
                    onClick={() => handleStatusChange(activeModalInquiry.id, InquiryStatus.ARCHIVED)}
                    className="btn btn-ghost !min-h-9 !text-xs text-slate-500"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
