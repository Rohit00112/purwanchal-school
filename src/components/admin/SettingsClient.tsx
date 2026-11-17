"use client";

import * as React from "react";
import { 
  Building2, 
  Save, 
  CheckCircle, 
  Server, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Database
} from "lucide-react";
import { updateSchoolProfile, SchoolProfileFormData } from "@/server/actions/admin";

interface ProfileData {
  name: string;
  nameNepali: string | null;
  tagline: string | null;
  description: string | null;
  address: string;
  phone: string;
  email: string | null;
  website: string | null;
  facebookUrl: string | null;
  officeHoursStart: string | null;
  officeHoursEnd: string | null;
}

export function SettingsClient({
  initialProfile,
  currentUser,
}: {
  initialProfile: ProfileData | null;
  currentUser?: { name?: string | null; email?: string | null; role?: string | null };
}) {
  const [formData, setFormData] = React.useState<SchoolProfileFormData>({
    name: initialProfile?.name || "Purwanchal Secondary Boarding School",
    nameNepali: initialProfile?.nameNepali || "पूर्वाञ्चल माध्यमिक आवासीय विद्यालय",
    tagline: initialProfile?.tagline || "Building Knowledge. Inspiring Futures with Discipline & Character.",
    description: initialProfile?.description || "Providing disciplined, high-standard education from Nursery to Grade 12 in Itahari-20, Tarahara, Sunsari.",
    address: initialProfile?.address || "Itahari-20, Tarahara, Sunsari, Koshi Province, Nepal",
    phone: initialProfile?.phone || "+977-25-475403",
    email: initialProfile?.email || "info@purwanchalschool.edu.np",
    website: initialProfile?.website || "https://purwanchalschool.edu.np",
    facebookUrl: initialProfile?.facebookUrl || "https://www.facebook.com/purwanchalschool",
    officeHoursStart: initialProfile?.officeHoursStart || "9:00 AM",
    officeHoursEnd: initialProfile?.officeHoursEnd || "4:30 PM",
  });

  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSchoolProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch {
      alert("Failed to save profile settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
              Institutional Profile
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">Global Configuration</span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
            School Profile &amp; Settings
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Configure official school credentials, contact information, office hours, and system parameters.
          </p>
        </div>

        {saveSuccess && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 animate-pulse">
            <CheckCircle className="size-4" />
            <span>Settings saved successfully</span>
          </span>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Form Column (8 cols) */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs space-y-6 text-xs">
            <h2 className="font-serif text-lg font-bold text-ink border-b border-line pb-3">
              Official Institutional Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  School Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  School Name (Nepali)
                </label>
                <input
                  type="text"
                  value={formData.nameNepali || ""}
                  onChange={(e) => setFormData({ ...formData, nameNepali: e.target.value })}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700 font-serif"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Institutional Tagline
              </label>
              <input
                type="text"
                value={formData.tagline || ""}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                About / Institutional Summary
              </label>
              <textarea
                rows={3}
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700 leading-relaxed"
              />
            </div>

            <h2 className="font-serif text-lg font-bold text-ink border-b border-line pb-3 pt-4">
              Contact &amp; Campus Location
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Official Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink font-mono focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Campus Physical Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Office Hours (Start)
                </label>
                <input
                  type="text"
                  value={formData.officeHoursStart || ""}
                  onChange={(e) => setFormData({ ...formData, officeHoursStart: e.target.value })}
                  placeholder="e.g., 9:00 AM"
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Office Hours (End)
                </label>
                <input
                  type="text"
                  value={formData.officeHoursEnd || ""}
                  onChange={(e) => setFormData({ ...formData, officeHoursEnd: e.target.value })}
                  placeholder="e.g., 4:30 PM"
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Official Website URL
                </label>
                <input
                  type="text"
                  value={formData.website || ""}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="text"
                  value={formData.facebookUrl || ""}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>
            </div>

            <div className="border-t border-line pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary !min-h-10 !px-6 !text-xs !font-semibold inline-flex items-center gap-2"
              >
                <Save className="size-4" />
                <span>{isSaving ? "Saving Settings..." : "Save Settings"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* System & Diagnostics Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 text-ink font-serif font-bold text-sm">
              <Server className="size-4 text-brand-700" />
              <span>Infrastructure &amp; Database</span>
            </div>

            <div className="divide-y divide-line">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Database Engine</span>
                <span className="font-mono font-bold text-slate-700">PostgreSQL 16</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Container Mode</span>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  Docker Active
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">ORM Layer</span>
                <span className="font-mono text-slate-700">Prisma 6.19</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Application Framework</span>
                <span className="font-mono text-slate-700">Next.js 16.4</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Active Academic Year</span>
                <span className="font-bold text-brand-700">2081 / 2082 BS</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 text-ink font-serif font-bold text-sm">
              <ShieldCheck className="size-4 text-emerald-700" />
              <span>Current Session Security</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-50 border border-line">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Logged In As
                </span>
                <p className="mt-0.5 font-bold text-ink">
                  {currentUser?.name || "School Administration"}
                </p>
                <p className="text-slate-500 text-[11px] font-mono">
                  {currentUser?.email || "admin@purwanchalschool.edu.np"}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-line">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Security Privilege
                </span>
                <p className="mt-0.5 font-bold text-sun-600">
                  {currentUser?.role || "SUPER_ADMIN"}
                </p>
                <p className="text-slate-500 text-[11px]">
                  Full access to all administrative modules, publication workflows, and admission records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
