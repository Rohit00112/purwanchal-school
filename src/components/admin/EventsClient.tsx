"use client";

import * as React from "react";
import { 
  Calendar as CalendarIcon, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  ExternalLink,
  MapPin,
  Clock,
  Star,
  Eye
} from "lucide-react";
import { 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  EventFormData 
} from "@/server/actions/admin";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { formatDateShort } from "@/lib/utils";
import { PublicationStatus } from "@prisma/client";

interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  imageUrl: string | null;
  location: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  status: PublicationStatus;
  isFeatured: boolean;
  createdAt: Date | string;
}

export function EventsClient({ initialEvents }: { initialEvents: EventItem[] }) {
  const [events, setEvents] = React.useState<EventItem[]>(initialEvents);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingEvent, setEditingEvent] = React.useState<EventItem | null>(null);

  // Form states
  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [formContent, setFormContent] = React.useState("");
  const [formLocation, setFormLocation] = React.useState("");
  const [formStartDate, setFormStartDate] = React.useState("");
  const [formEndDate, setFormEndDate] = React.useState("");
  const [formImage, setFormImage] = React.useState("");
  const [formStatus, setFormStatus] = React.useState<PublicationStatus>(PublicationStatus.PUBLISHED);
  const [formFeatured, setFormFeatured] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  React.useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormTitle("");
    setFormDescription("");
    setFormContent("");
    setFormLocation("Purwanchal Secondary Boarding School Campus, Tarahara");
    // Default to tomorrow 10:00 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormStartDate(tomorrow.toISOString().split("T")[0]);
    setFormEndDate("");
    setFormImage("");
    setFormStatus(PublicationStatus.PUBLISHED);
    setFormFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (event: EventItem) => {
    setEditingEvent(event);
    setFormTitle(event.title);
    setFormDescription(event.description || "");
    setFormContent(event.content || "");
    setFormLocation(event.location || "");
    setFormStartDate(new Date(event.startDate).toISOString().split("T")[0]);
    setFormEndDate(event.endDate ? new Date(event.endDate).toISOString().split("T")[0] : "");
    setFormImage(event.imageUrl || "");
    setFormStatus(event.status);
    setFormFeatured(event.isFeatured);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formStartDate) {
      alert("Please provide an event title and start date.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: EventFormData = {
        title: formTitle,
        description: formDescription || undefined,
        content: formContent || undefined,
        location: formLocation || undefined,
        startDate: formStartDate,
        endDate: formEndDate || undefined,
        imageUrl: formImage || undefined,
        status: formStatus,
        isFeatured: formFeatured,
      };

      if (editingEvent) {
        const res = await updateEvent(editingEvent.id, payload);
        setEvents((prev) =>
          prev.map((item) => (item.id === editingEvent.id ? { ...item, ...res.event } : item))
        );
        setActionSuccess("Event updated successfully.");
      } else {
        const res = await createEvent(payload);
        setEvents((prev) => [res.event, ...prev]);
        setActionSuccess("New event scheduled successfully.");
      }

      setIsModalOpen(false);
      setTimeout(() => setActionSuccess(null), 3500);
    } catch (err: any) {
      alert(err?.message || "Failed to save event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this event from the school calendar?")) {
      return;
    }
    setIsSubmitting(true);
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setActionSuccess("Event deleted.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to delete event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = React.useMemo(() => {
    return events.filter((ev) => {
      const matchesSearch =
        searchQuery === "" ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.description && ev.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.location && ev.location.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === "ALL" || ev.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [events, searchQuery, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-sun-50 px-2 py-0.5 text-xs font-bold text-sun-600">
              Academic Calendar
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">School Activities</span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
            Calendar &amp; Events Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Schedule school celebrations, academic exhibitions, parent-teacher meetings, and sports tournaments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {actionSuccess && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg animate-pulse">
              ✓ {actionSuccess}
            </span>
          )}
          <button
            type="button"
            onClick={openCreateModal}
            className="btn btn-primary !min-h-10 !text-xs !font-semibold inline-flex items-center gap-2"
          >
            <Plus className="size-4" />
            <span>Schedule New Event</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl border border-line bg-white p-4 space-y-4 shadow-xs">
        <div className="grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search events by title, description or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-line bg-slate-50/50 pl-9 pr-4 py-2 text-xs font-medium text-ink placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-line bg-slate-50/50 px-3 py-2 text-xs font-medium text-ink focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700"
            >
              <option value="ALL">All Statuses</option>
              <option value={PublicationStatus.PUBLISHED}>Published Events</option>
              <option value={PublicationStatus.DRAFT}>Draft Events</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="rounded-xl border border-line bg-white shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarIcon className="size-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-ink">No school events found</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Schedule academic milestones, examinations, or extracurricular activities.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="btn btn-outline !min-h-9 !text-xs mt-4"
            >
              + Schedule First Event
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line bg-slate-50/80 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Event &amp; Venue</th>
                  <th className="py-3 px-4">Date &amp; Schedule</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-serif text-sm font-bold text-ink line-clamp-1">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-[11px]">
                        <MapPin className="size-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.location || "Tarahara Campus"}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">
                        {formatDateShort(item.startDate)}
                      </div>
                      {item.endDate && (
                        <div className="text-[10px] text-slate-400">
                          through {formatDateShort(item.endDate)}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.status === PublicationStatus.PUBLISHED ? (
                        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                          Published
                        </span>
                      ) : (
                        <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.isFeatured ? (
                        <span className="inline-flex items-center gap-1 rounded bg-sun-50 px-2 py-0.5 text-[11px] font-bold text-sun-600 border border-sun-200">
                          <Star className="size-3 fill-sun-500 text-sun-500" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {item.status === PublicationStatus.PUBLISHED && (
                          <a
                            href={`/events/${item.slug}`}
                            target="_blank"
                            className="p-1.5 rounded text-slate-400 hover:text-brand-700 hover:bg-slate-100 transition-colors"
                            title="Preview on live website"
                          >
                            <Eye className="size-3.5" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="rounded border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center gap-1"
                        >
                          <Edit className="size-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete event"
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="rounded bg-sun-50 px-2 py-0.5 text-xs font-bold text-sun-600">
                  {editingEvent ? "Update Event" : "Schedule New Event"}
                </span>
                <h2 className="mt-2 font-serif text-2xl font-bold text-ink">
                  {editingEvent ? "Edit Event Details" : "Create Calendar Entry"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Annual Sports Week & Athletic Meet 2081"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Venue / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Main School Sports Arena, Tarahara"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Brief Overview / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary for calendar cards..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Full Event Details &amp; Guidelines (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Full schedule, participating grades, equipment guidelines..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full rounded-lg border border-line p-3 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <ImageUpload
                value={formImage}
                onChange={setFormImage}
                label="Event Promotional Banner (Optional)"
                description="Upload an athletic meet poster, exhibition photo, or celebration banner from your computer."
              />

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Publication Status
                </label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as PublicationStatus)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                >
                  <option value={PublicationStatus.PUBLISHED}>Published (Visible on site)</option>
                  <option value={PublicationStatus.DRAFT}>Draft (Internal preparation)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredEventToggle"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="rounded border-line text-brand-700 focus:ring-brand-700 size-4"
                />
                <label htmlFor="featuredEventToggle" className="font-semibold text-slate-700 cursor-pointer">
                  Feature this event prominently on the website homepage
                </label>
              </div>

              <div className="border-t border-line pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost !min-h-9 !text-xs text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary !min-h-9 !text-xs font-semibold"
                >
                  {isSubmitting ? "Saving..." : editingEvent ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
