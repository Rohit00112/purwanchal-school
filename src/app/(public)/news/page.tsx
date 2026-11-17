import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { NewsCard } from "@/components/news/NewsCard";
import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/config/images";
import { siteConfig } from "@/config/site";
import { generatePageMeta } from "@/lib/seo";

// This page reads live notices from the database, so it renders per request.
export const instant = false;

export const metadata: Metadata = generatePageMeta({
  title: "News & School Notices",
  description: "Circulars, examination routines and announcements from Purwanchal Secondary Boarding School, Itahari-20, Tarahara.",
});

interface Article {
  slug: string;
  title: string;
  excerpt: string | null;
  categoryName: string;
  publishedAt: Date | null;
  isFeatured: boolean;
  image?: string | null;
}

export default async function NewsPage() {
  let articles: Article[] = [];
  let unavailable = false;

  try {
    const dbArticles = await db.newsArticle.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
    });
    articles = dbArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      categoryName: a.category?.name || "Notice",
      publishedAt: a.publishedAt,
      isFeatured: a.isFeatured,
      image: a.imageUrl,
    }));
  } catch {
    unavailable = true;
  }

  const featured = articles.find((article) => article.isFeatured);
  const rest = articles.filter((article) => article.slug !== featured?.slug);

  return (
    <div className="bg-cream">
      <PageHero
        title={<>News &amp; <span className="font-editorial italic font-medium text-sun-300">notices</span>.</>}
        description="Circulars, routines and announcements published by the school."
        image={images.lecture}
        crumbs={[{ label: "News & notices" }]}
      />

      <div className="shell py-16 sm:py-20">
        {unavailable ? (
          <div className="rounded-lg border border-line bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-ink">Notices are unavailable right now</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Please try again later, or call the school office on {siteConfig.phone}.
            </p>
            <a href={`tel:${siteConfig.phone}`} className="btn btn-primary mt-5">
              Call the office
            </a>
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-lg border border-line bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-ink">No notices have been published yet</h2>
            <p className="mt-2 text-sm text-ink-soft">
              New circulars and announcements will appear here when the school publishes them.
            </p>
            <Link href="/contact" className="btn btn-primary mt-5">
              Contact details
            </Link>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-8">
                <NewsCard {...featured} isFeatured />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <NewsCard key={article.slug} {...article} />
                ))}
              </div>
            )}
            <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-lg border border-line bg-white p-6 sm:flex-row sm:items-center">
              <p className="text-sm text-ink-soft">
                Need a specific circular? Ask at the school office during opening hours.
              </p>
              <Link href="/contact" className="inline-flex min-h-11 items-center text-sm font-bold text-brand-700 hover:underline">
                Contact details
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
