import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewsClient } from "@/components/admin/NewsClient";

export const instant = false;

export const metadata = {
  title: "Notices & Circulars CMS | Administrative Portal",
  description: "Create, edit, and publish school notices and circulars for Purwanchal Secondary Boarding School.",
};

export default async function AdminNewsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let articles: any[] = [];
  let categories: any[] = [];

  try {
    [articles, categories] = await Promise.all([
      db.newsArticle.findMany({
        include: { category: true },
        orderBy: { publishedAt: "desc" },
      }),
      db.newsCategory.findMany({
        orderBy: { sortOrder: "asc" },
      }),
    ]);
  } catch (error) {
    console.error("[Admin News Fetch Error]", error);
  }

  return <NewsClient initialArticles={articles} categories={categories} />;
}
