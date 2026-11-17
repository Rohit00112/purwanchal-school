"use client";

import * as React from "react";
import { 
  Bell, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  ExternalLink,
  CheckCircle,
  FileText,
  Star,
  Eye,
  Calendar
} from "lucide-react";
import { 
  createNewsArticle, 
  updateNewsArticle, 
  deleteNewsArticle,
  NewsFormData 
} from "@/server/actions/admin";
import { formatDateShort } from "@/lib/utils";
import { PublicationStatus } from "@prisma/client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  status: PublicationStatus;
  isFeatured: boolean;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  category: { id: string; name: string } | null;
  categoryId: string | null;
}

export function NewsClient({
  initialArticles,
  categories,
}: {
  initialArticles: ArticleItem[];
  categories: Category[];
}) {
  const [articles, setArticles] = React.useState<ArticleItem[]>(initialArticles);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingArticle, setEditingArticle] = React.useState<ArticleItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = React.useState("");
  const [formCategory, setFormCategory] = React.useState(categories[0]?.id || "");
  const [formExcerpt, setFormExcerpt] = React.useState("");
  const [formContent, setFormContent] = React.useState("");
  const [formImage, setFormImage] = React.useState("");
  const [formStatus, setFormStatus] = React.useState<PublicationStatus>(PublicationStatus.PUBLISHED);
  const [formFeatured, setFormFeatured] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  React.useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  const openCreateModal = () => {
    setEditingArticle(null);
    setFormTitle("");
    setFormCategory(categories[0]?.id || "");
    setFormExcerpt("");
    setFormContent("");
    setFormImage("");
    setFormStatus(PublicationStatus.PUBLISHED);
    setFormFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (article: ArticleItem) => {
    setEditingArticle(article);
    setFormTitle(article.title);
    setFormCategory(article.categoryId || categories[0]?.id || "");
    setFormExcerpt(article.excerpt || "");
    setFormContent(article.content);
    setFormImage(article.imageUrl || "");
    setFormStatus(article.status);
    setFormFeatured(article.isFeatured);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      alert("Please provide both a title and article content.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: NewsFormData = {
        title: formTitle,
        categoryId: formCategory || undefined,
        excerpt: formExcerpt || undefined,
        content: formContent,
        imageUrl: formImage || undefined,
        status: formStatus,
        isFeatured: formFeatured,
      };

      if (editingArticle) {
        const res = await updateNewsArticle(editingArticle.id, payload);
        setArticles((prev) =>
          prev.map((item) =>
            item.id === editingArticle.id
              ? {
                  ...item,
                  ...res.article,
                  category: categories.find((c) => c.id === formCategory) || null,
                }
              : item
          )
        );
        setActionSuccess("Notice updated successfully.");
      } else {
        const res = await createNewsArticle(payload);
        const newCat = categories.find((c) => c.id === formCategory) || null;
        setArticles((prev) => [{ ...res.article, category: newCat }, ...prev]);
        setActionSuccess("New notice published successfully.");
      }

      setIsModalOpen(false);
      setTimeout(() => setActionSuccess(null), 3500);
    } catch (err: any) {
      alert(err?.message || "Failed to save notice.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this notice? This will remove it from the school website.")) {
      return;
    }
    setIsSubmitting(true);
    try {
      await deleteNewsArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setActionSuccess("Notice deleted.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      alert("Failed to delete notice.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = React.useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        searchQuery === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.excerpt && art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "ALL" || art.categoryId === selectedCategory;

      const matchesStatus =
        selectedStatus === "ALL" || art.status === selectedStatus;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [articles, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
              Content Management System
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">Official Bulletin</span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
            School Notices &amp; Circulars
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Publish academic notices, examination routines, holiday declarations, and official announcements.
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
            <span>Publish New Notice</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl border border-line bg-white p-4 space-y-4 shadow-xs">
        <div className="grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notices by title, excerpt or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-line bg-slate-50/50 pl-9 pr-4 py-2 text-xs font-medium text-ink placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-line bg-slate-50/50 px-3 py-2 text-xs font-medium text-ink focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-line bg-slate-50/50 px-3 py-2 text-xs font-medium text-ink focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700"
            >
              <option value="ALL">All Statuses</option>
              <option value={PublicationStatus.PUBLISHED}>Published</option>
              <option value={PublicationStatus.DRAFT}>Draft</option>
              <option value={PublicationStatus.ARCHIVED}>Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="rounded-xl border border-line bg-white shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="size-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-ink">No notices found</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Get started by creating your first school notice or circular.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="btn btn-outline !min-h-9 !text-xs mt-4"
            >
              + Create First Notice
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line bg-slate-50/80 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Notice Title &amp; Category</th>
                  <th className="py-3 px-4">Publication Date</th>
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
                      <div className="flex items-center gap-2 mt-1">
                        <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                          {item.category?.name || "General Notice"}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          /news/{item.slug}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {formatDateShort(item.publishedAt || item.createdAt)}
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
                            href={`/news/${item.slug}`}
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
                          title="Delete notice"
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
                <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                  {editingArticle ? "Update Notice" : "New Notice Publication"}
                </span>
                <h2 className="mt-2 font-serif text-2xl font-bold text-ink">
                  {editingArticle ? "Edit School Notice" : "Publish Official Circular"}
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
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., SEE Board Examination Routine & Revision Classes for Grade 10"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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
                    Publication Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as PublicationStatus)}
                    className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                  >
                    <option value={PublicationStatus.PUBLISHED}>Published (Live immediately)</option>
                    <option value={PublicationStatus.DRAFT}>Draft (Internal only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Brief Summary / Excerpt (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="One or two sentences displayed on the homepage bulletin card..."
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Notice Content &amp; Details *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write the full notice body, instructions, dates, or guidelines..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full rounded-lg border border-line p-3 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700 font-sans leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Notice Banner Image URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://... or /images/..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="rounded border-line text-brand-700 focus:ring-brand-700 size-4"
                />
                <label htmlFor="featuredToggle" className="font-semibold text-slate-700 cursor-pointer">
                  Feature this announcement prominently on the homepage hero/bulletin
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
                  {isSubmitting ? "Saving..." : editingArticle ? "Save Changes" : "Publish Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
