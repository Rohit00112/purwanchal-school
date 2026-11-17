"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { InquiryStatus, MessageStatus, PublicationStatus } from "@prisma/client";
import slugify from "slugify";

// ─── Authentication Guard ───────────────────────────────────────────────────

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: Please sign in to the administrative portal.");
  }
  return session.user;
}

// ─── Admission Inquiries Actions ────────────────────────────────────────────

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  adminNotes?: string
) {
  await requireAdmin();

  const data: { status: InquiryStatus; adminNotes?: string; reviewedAt?: Date } = {
    status,
  };
  if (adminNotes !== undefined) {
    data.adminNotes = adminNotes;
  }
  if (status !== InquiryStatus.NEW) {
    data.reviewedAt = new Date();
  }

  const updated = await db.admissionInquiry.update({
    where: { id },
    data,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  return { success: true, inquiry: updated };
}

export async function deleteInquiry(id: string) {
  await requireAdmin();

  await db.admissionInquiry.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  return { success: true };
}

// ─── Contact Messages Actions ───────────────────────────────────────────────

export async function updateContactStatus(
  id: string,
  status: MessageStatus,
  adminNote?: string
) {
  await requireAdmin();

  const data: { status: MessageStatus; adminNote?: string; repliedAt?: Date } = {
    status,
  };
  if (adminNote !== undefined) {
    data.adminNote = adminNote;
  }
  if (status === MessageStatus.REPLIED) {
    data.repliedAt = new Date();
  }

  const updated = await db.contactMessage.update({
    where: { id },
    data,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/contacts");
  return { success: true, message: updated };
}

export async function deleteContactMessage(id: string) {
  await requireAdmin();

  await db.contactMessage.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/contacts");
  return { success: true };
}

// ─── News & Notices Actions ─────────────────────────────────────────────────

export interface NewsFormData {
  title: string;
  categoryId?: string;
  excerpt?: string;
  content: string;
  imageUrl?: string;
  status: PublicationStatus;
  isFeatured?: boolean;
}

export async function createNewsArticle(data: NewsFormData) {
  const user = await requireAdmin();

  const baseSlug = slugify(data.title, { lower: true, strict: true }) || "notice";
  let slug = baseSlug;
  let counter = 1;

  while (await db.newsArticle.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const created = await db.newsArticle.create({
    data: {
      title: data.title.trim(),
      slug,
      excerpt: data.excerpt?.trim() || null,
      content: data.content.trim(),
      imageUrl: data.imageUrl?.trim() || null,
      categoryId: data.categoryId || null,
      authorId: user.id,
      status: data.status,
      isFeatured: !!data.isFeatured,
      publishedAt: data.status === PublicationStatus.PUBLISHED ? new Date() : null,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  return { success: true, article: created };
}

export async function updateNewsArticle(id: string, data: Partial<NewsFormData>) {
  await requireAdmin();

  const existing = await db.newsArticle.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("News article not found.");
  }

  const updateData: any = {};
  if (data.title !== undefined) updateData.title = data.title.trim();
  if (data.excerpt !== undefined) updateData.excerpt = data.excerpt?.trim() || null;
  if (data.content !== undefined) updateData.content = data.content.trim();
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl?.trim() || null;
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId || null;
  if (data.isFeatured !== undefined) updateData.isFeatured = !!data.isFeatured;
  if (data.status !== undefined) {
    updateData.status = data.status;
    if (data.status === PublicationStatus.PUBLISHED && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  const updated = await db.newsArticle.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/news");
  revalidatePath(`/news/${existing.slug}`);
  revalidatePath("/news");
  revalidatePath("/");
  return { success: true, article: updated };
}

export async function deleteNewsArticle(id: string) {
  await requireAdmin();

  await db.newsArticle.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  return { success: true };
}

// ─── Events & Calendar Actions ──────────────────────────────────────────────

export interface EventFormData {
  title: string;
  description?: string;
  content?: string;
  location?: string;
  startDate: string; // ISO date string
  endDate?: string;
  imageUrl?: string;
  status: PublicationStatus;
  isFeatured?: boolean;
}

export async function createEvent(data: EventFormData) {
  const user = await requireAdmin();

  const baseSlug = slugify(data.title, { lower: true, strict: true }) || "event";
  let slug = baseSlug;
  let counter = 1;

  while (await db.event.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const created = await db.event.create({
    data: {
      title: data.title.trim(),
      slug,
      description: data.description?.trim() || null,
      content: data.content?.trim() || null,
      location: data.location?.trim() || null,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      imageUrl: data.imageUrl?.trim() || null,
      status: data.status,
      isFeatured: !!data.isFeatured,
      authorId: user.id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true, event: created };
}

export async function updateEvent(id: string, data: Partial<EventFormData>) {
  await requireAdmin();

  const existing = await db.event.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Event not found.");
  }

  const updateData: any = {};
  if (data.title !== undefined) updateData.title = data.title.trim();
  if (data.description !== undefined) updateData.description = data.description?.trim() || null;
  if (data.content !== undefined) updateData.content = data.content?.trim() || null;
  if (data.location !== undefined) updateData.location = data.location?.trim() || null;
  if (data.startDate !== undefined) updateData.startDate = new Date(data.startDate);
  if (data.endDate !== undefined) updateData.endDate = data.endDate ? new Date(data.endDate) : null;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl?.trim() || null;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.isFeatured !== undefined) updateData.isFeatured = !!data.isFeatured;

  const updated = await db.event.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath(`/events/${existing.slug}`);
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true, event: updated };
}

export async function deleteEvent(id: string) {
  await requireAdmin();

  await db.event.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true };
}

// ─── Gallery Media Actions ──────────────────────────────────────────────────

export interface GalleryFormData {
  title?: string;
  description?: string;
  imageUrl: string;
  categoryId?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
}

export async function createGalleryMedia(data: GalleryFormData) {
  await requireAdmin();

  const created = await db.galleryMedia.create({
    data: {
      title: data.title?.trim() || null,
      description: data.description?.trim() || null,
      imageUrl: data.imageUrl.trim(),
      categoryId: data.categoryId || null,
      isFeatured: !!data.isFeatured,
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true, media: created };
}

export async function deleteGalleryMedia(id: string) {
  await requireAdmin();

  await db.galleryMedia.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

// ─── School Settings Actions ────────────────────────────────────────────────

export interface SchoolProfileFormData {
  name: string;
  nameNepali?: string;
  tagline?: string;
  description?: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  facebookUrl?: string;
  officeHoursStart?: string;
  officeHoursEnd?: string;
}

export async function updateSchoolProfile(data: SchoolProfileFormData) {
  await requireAdmin();

  const existingProfile = await db.schoolProfile.findFirst();

  let profile;
  if (existingProfile) {
    profile = await db.schoolProfile.update({
      where: { id: existingProfile.id },
      data: {
        name: data.name.trim(),
        nameNepali: data.nameNepali?.trim() || null,
        tagline: data.tagline?.trim() || null,
        description: data.description?.trim() || null,
        address: data.address.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        website: data.website?.trim() || null,
        facebookUrl: data.facebookUrl?.trim() || null,
        officeHoursStart: data.officeHoursStart?.trim() || null,
        officeHoursEnd: data.officeHoursEnd?.trim() || null,
      },
    });
  } else {
    profile = await db.schoolProfile.create({
      data: {
        name: data.name.trim(),
        nameNepali: data.nameNepali?.trim() || null,
        tagline: data.tagline?.trim() || null,
        description: data.description?.trim() || null,
        address: data.address.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        website: data.website?.trim() || null,
        facebookUrl: data.facebookUrl?.trim() || null,
        officeHoursStart: data.officeHoursStart?.trim() || null,
        officeHoursEnd: data.officeHoursEnd?.trim() || null,
      },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true, profile };
}
