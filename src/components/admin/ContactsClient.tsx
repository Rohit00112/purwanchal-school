"use client";

import * as React from "react";
import { 
  Mail, 
  Search, 
  Phone, 
  Trash2, 
  X, 
  ExternalLink,
  CheckCircle,
  MessageSquare,
  Clock,
  Send,
  Archive
} from "lucide-react";
import { updateContactStatus, deleteContactMessage } from "@/server/actions/admin";
import { formatDateShort } from "@/lib/utils";
import { MessageStatus } from "@prisma/client";

interface ContactItem {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: MessageStatus;
  adminNote: string | null;
  repliedAt?: Date | string | null;
  createdAt: Date | string;
}

export function ContactsClient({ initialMessages }: { initialMessages: ContactItem[] }) {
  const [messages, setMessages] = React.useState<ContactItem[]>(initialMessages);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("ALL");
  const [activeModalMessage, setActiveModalMessage] = React.useState<ContactItem | null>(null);
  const [noteInput, setNoteInput] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  React.useEffect(() => {
    if (activeModalMessage) {
      setNoteInput(activeModalMessage.adminNote || "");
    }
  }, [activeModalMessage]);

  const counts = React.useMemo(() => {
    return {
      ALL: messages.length,
      UNREAD: messages.filter((m) => m.status === MessageStatus.UNREAD).length,
      READ: messages.filter((m) => m.status === MessageStatus.READ).length,
      REPLIED: messages.filter((m) => m.status === MessageStatus.REPLIED).length,
      ARCHIVED: messages.filter((m) => m.status === MessageStatus.ARCHIVED).length,
    };
  }, [messages]);

  const filtered = React.useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        searchQuery === "" ||
        msg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (msg.phone && msg.phone.includes(searchQuery)) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "ALL" || msg.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [messages, searchQuery, selectedStatus]);

  const handleStatusChange = async (id: string, newStatus: MessageStatus) => {
    setIsUpdating(true);
    try {
      await updateContactStatus(id, newStatus);
      setMessages((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (activeModalMessage?.id === id) {
        setActiveModalMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      setActionSuccess("Message status updated.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNote = async () => {
    if (!activeModalMessage) return;
    setIsUpdating(true);
    try {
      await updateContactStatus(activeModalMessage.id, activeModalMessage.status, noteInput);
      setMessages((prev) =>
        prev.map((item) =>
          item.id === activeModalMessage.id ? { ...item, adminNote: noteInput } : item
        )
      );
      setActiveModalMessage((prev) => (prev ? { ...prev, adminNote: noteInput } : null));
      setActionSuccess("Note saved successfully.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to save note.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this contact message?")) {
      return;
    }
    setIsUpdating(true);
    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((item) => item.id !== id));
      if (activeModalMessage?.id === id) {
        setActiveModalMessage(null);
      }
      setActionSuccess("Message deleted.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to delete message.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.UNREAD:
        return <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Unread</span>;
      case MessageStatus.READ:
        return <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Read</span>;
      case MessageStatus.REPLIED:
        return <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Replied</span>;
      case MessageStatus.ARCHIVED:
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
            <span className="rounded bg-sun-50 px-2 py-0.5 text-xs font-bold text-sun-600">
              Communication Desk
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">
              Public Portal Submissions
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
            Contact Messages &amp; Inquiries
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Review and respond to messages submitted by parents, visitors, and alumni through the contact page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {actionSuccess && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg animate-pulse">
              ✓ {actionSuccess}
            </span>
          )}
          <a
            href="/contact"
            target="_blank"
            className="btn btn-outline !min-h-10 !text-xs !font-semibold"
          >
            <span>Public Contact Page</span>
            <ExternalLink className="size-3.5 ml-1" />
          </a>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="rounded-xl border border-line bg-white p-4 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-3">
          {(["ALL", "UNREAD", "READ", "REPLIED", "ARCHIVED"] as const).map((st) => {
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
                <span>{st === "ALL" ? "All Messages" : st}</span>
                <span className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                  active ? "bg-white/20 text-white" : "bg-white text-slate-700"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by sender name, subject, message text, email, or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-line bg-slate-50/50 pl-9 pr-4 py-2 text-xs font-medium text-ink placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="rounded-xl border border-line bg-white shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="size-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-ink">No contact messages found</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              There are no messages matching your search or current status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line bg-slate-50/80 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Sender &amp; Contact</th>
                  <th className="py-3 px-4">Subject &amp; Message Snippet</th>
                  <th className="py-3 px-4">Date Received</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-serif text-sm font-bold text-ink">
                        {item.fullName}
                      </div>
                      <div className="mt-0.5 text-slate-500">
                        <a href={`mailto:${item.email}`} className="text-brand-700 hover:underline">
                          {item.email}
                        </a>
                        {item.phone && (
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {item.phone}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-semibold text-slate-800 line-clamp-1">
                        {item.subject}
                      </div>
                      <div className="text-slate-500 line-clamp-1 mt-0.5 text-[11px]">
                        {item.message}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {formatDateShort(item.createdAt)}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveModalMessage(item)}
                          className="rounded border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-brand-700 hover:bg-brand-50 transition-colors"
                        >
                          Read Message
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Message"
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

      {/* Message View Modal */}
      {activeModalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-sun-50 px-2 py-0.5 text-xs font-bold text-sun-600">
                    Contact Message
                  </span>
                  {getStatusBadge(activeModalMessage.status)}
                </div>
                <h2 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-ink">
                  {activeModalMessage.subject}
                </h2>
                <p className="text-xs text-slate-500">
                  From <strong className="text-slate-800">{activeModalMessage.fullName}</strong> · Received on {formatDateShort(activeModalMessage.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalMessage(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6 text-xs">
              {/* Contact Information Bar */}
              <div className="grid gap-4 sm:grid-cols-2 rounded-xl bg-slate-50 p-4 border border-line">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Email Address
                  </span>
                  <a href={`mailto:${activeModalMessage.email}`} className="mt-1 font-semibold text-sm text-brand-700 hover:underline block">
                    {activeModalMessage.email}
                  </a>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Contact Phone
                  </span>
                  <p className="mt-1 font-semibold text-sm text-ink font-mono">
                    {activeModalMessage.phone || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Message Content
                </span>
                <div className="rounded-lg border border-line bg-white p-4 text-slate-800 leading-relaxed text-sm whitespace-pre-wrap">
                  {activeModalMessage.message}
                </div>
              </div>

              {/* Internal Administration Note */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Administrative Follow-Up Notes
                  </span>
                  <span className="text-[11px] text-slate-400">Internal use only</span>
                </div>
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="e.g., Replied via email regarding bus route timings on Monday."
                  className="w-full rounded-lg border border-line p-3 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={handleSaveNote}
                    className="btn btn-primary !min-h-8 !px-3 !py-1 !text-xs"
                  >
                    Save Follow-Up Note
                  </button>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="border-t border-line pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${activeModalMessage.email}?subject=Re: ${encodeURIComponent(activeModalMessage.subject)}`}
                    className="btn btn-primary !min-h-9 !text-xs inline-flex items-center gap-1.5"
                  >
                    <Send className="size-3.5" />
                    <span>Send Reply Email</span>
                  </a>

                  <button
                    type="button"
                    disabled={isUpdating || activeModalMessage.status === MessageStatus.REPLIED}
                    onClick={() => handleStatusChange(activeModalMessage.id, MessageStatus.REPLIED)}
                    className="btn btn-outline !min-h-9 !text-xs"
                  >
                    Mark as Replied
                  </button>

                  <button
                    type="button"
                    disabled={isUpdating || activeModalMessage.status === MessageStatus.ARCHIVED}
                    onClick={() => handleStatusChange(activeModalMessage.id, MessageStatus.ARCHIVED)}
                    className="btn btn-ghost !min-h-9 !text-xs text-slate-500"
                  >
                    Archive
                  </button>
                </div>

                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleDelete(activeModalMessage.id)}
                  className="btn btn-ghost !min-h-9 !text-xs text-red-600 hover:bg-red-50"
                >
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
