"use client";

import * as React from "react";
import Image from "next/image";
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  X, 
  ExternalLink,
  Star,
  Eye,
  CheckCircle,
  Filter
} from "lucide-react";
import { 
  createGalleryMedia, 
  deleteGalleryMedia, 
  GalleryFormData 
} from "@/server/actions/admin";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface GalleryCategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface MediaItem {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  categoryId: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  category: { id: string; name: string } | null;
}

export function GalleryClient({
  initialMedia,
  categories,
}: {
  initialMedia: MediaItem[];
  categories: GalleryCategoryItem[];
}) {
  const [mediaList, setMediaList] = React.useState<MediaItem[]>(initialMedia);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Form states
  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [formImageUrl, setFormImageUrl] = React.useState("");
  const [formCategory, setFormCategory] = React.useState(categories[0]?.id || "");
  const [formFeatured, setFormFeatured] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMediaList(initialMedia);
  }, [initialMedia]);

  const openAddModal = () => {
    setFormTitle("");
    setFormDescription("");
    setFormImageUrl("");
    setFormCategory(categories[0]?.id || "");
    setFormFeatured(false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImageUrl.trim()) {
      alert("Please provide an image URL.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: GalleryFormData = {
        title: formTitle || undefined,
        description: formDescription || undefined,
        imageUrl: formImageUrl,
        categoryId: formCategory || undefined,
        isFeatured: formFeatured,
        isPublished: true,
      };

      const res = await createGalleryMedia(payload);
      const cat = categories.find((c) => c.id === formCategory) || null;
      setMediaList((prev) => [{ ...res.media, category: cat }, ...prev]);
      setActionSuccess("Photo added to campus gallery.");
      setIsModalOpen(false);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: any) {
      alert(err?.message || "Failed to add image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this photo from the school gallery?")) {
      return;
    }
    setIsSubmitting(true);
    try {
      await deleteGalleryMedia(id);
      setMediaList((prev) => prev.filter((m) => m.id !== id));
      setActionSuccess("Photo deleted.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to delete photo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = React.useMemo(() => {
    if (selectedCategory === "ALL") return mediaList;
    return mediaList.filter((m) => m.categoryId === selectedCategory);
  }, [mediaList, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
              Media Archive
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">Visual Portfolio</span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
            Campus Photo Gallery
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Showcase classrooms, science &amp; computer laboratories, sporting events, and cultural celebrations.
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
            onClick={openAddModal}
            className="btn btn-primary !min-h-10 !text-xs !font-semibold inline-flex items-center gap-2"
          >
            <Plus className="size-4" />
            <span>Add Gallery Photo</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="rounded-xl border border-line bg-white p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === "ALL"
                ? "bg-brand-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>All Photos</span>
            <span className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
              selectedCategory === "ALL" ? "bg-white/20 text-white" : "bg-white text-slate-700"
            }`}>
              {mediaList.length}
            </span>
          </button>

          {categories.map((c) => {
            const count = mediaList.filter((m) => m.categoryId === c.id).length;
            const active = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-brand-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{c.name}</span>
                <span className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                  active ? "bg-white/20 text-white" : "bg-white text-slate-700"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Photo Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-line bg-white p-12 text-center shadow-xs">
          <ImageIcon className="size-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-serif text-base font-bold text-ink">No photos in this category</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Upload pictures of facilities, campus grounds, or recent school programs.
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="btn btn-outline !min-h-9 !text-xs mt-4"
          >
            + Add First Photo
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border border-line bg-white overflow-hidden shadow-xs hover:border-brand-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title || "Campus Gallery Photo"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={item.imageUrl.startsWith("http")}
                  />
                  {item.isFeatured && (
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded bg-sun-500 text-white px-2 py-0.5 text-[10px] font-bold shadow-sm">
                      <Star className="size-3 fill-white text-white" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                      {item.category?.name || "Campus"}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-sm font-bold text-ink line-clamp-1">
                    {item.title || "Purwanchal School Photo"}
                  </h3>

                  {item.description && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-line p-3 bg-slate-50/50 flex items-center justify-between">
                <a
                  href={item.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-brand-700 hover:underline inline-flex items-center gap-1"
                >
                  <Eye className="size-3" />
                  <span>View Full</span>
                </a>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleDelete(item.id)}
                  className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Photo"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                  Media Upload
                </span>
                <h2 className="mt-2 font-serif text-2xl font-bold text-ink">
                  Add Photo to Gallery
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
              <ImageUpload
                value={formImageUrl}
                onChange={setFormImageUrl}
                label="Photograph File"
                required
                description="Upload an authentic campus, lab, classroom or event photograph from your computer."
              />

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g., Computer Laboratory Session with Secondary Wing"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Category *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Description / Context (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Short explanation of the activity or facility shown..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredPhotoToggle"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="rounded border-line text-brand-700 focus:ring-brand-700 size-4"
                />
                <label htmlFor="featuredPhotoToggle" className="font-semibold text-slate-700 cursor-pointer">
                  Feature on website homepage gallery preview
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
                  {isSubmitting ? "Adding..." : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
