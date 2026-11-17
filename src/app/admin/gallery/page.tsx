import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { GalleryClient } from "@/components/admin/GalleryClient";

export const metadata = {
  title: "Campus Gallery CMS | Administrative Portal",
  description: "Manage campus photographs and event galleries for Purwanchal Secondary Boarding School.",
};

export default async function AdminGalleryPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let media: any[] = [];
  let categories: any[] = [];

  try {
    [media, categories] = await Promise.all([
      db.galleryMedia.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
      db.galleryCategory.findMany({
        orderBy: { sortOrder: "asc" },
      }),
    ]);
  } catch (error) {
    console.error("[Admin Gallery Fetch Error]", error);
  }

  return <GalleryClient initialMedia={media} categories={categories} />;
}
