import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// Notice content comes from the database, so this route renders per request.
export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  try {
    return await db.newsArticle.findUnique({ where: { slug }, include: { category: true } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  return {
    title: article ? `${article.title} | News & Notices` : "Notice not found | News & Notices",
    description: article?.excerpt || "School notice from Purwanchal Secondary Boarding School.",
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <div className="bg-cream py-12 sm:py-16">
      <div className="shell max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
          <Link href="/" className="inline-flex min-h-11 items-center hover:text-brand-700 hover:underline">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/news" className="inline-flex min-h-11 items-center hover:text-brand-700 hover:underline">News & notices</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="inline-flex min-h-11 max-w-[16rem] items-center truncate font-semibold text-brand-800">{article.title}</span>
        </nav>

        <Link href="/news" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-700 hover:underline">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to all notices
        </Link>

        <article className="rounded-lg border border-line bg-white">
          {article.imageUrl && (
            <div className="relative aspect-[21/9] rounded-t-lg bg-brand-100">
              <Image
                src={article.imageUrl}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="img-cover rounded-t-lg object-center"
              />
            </div>
          )}

          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex min-h-7 items-center gap-1.5 rounded-md bg-brand-50 px-2.5 font-bold text-brand-800">
                <Tag aria-hidden="true" className="size-3" /> {article.category?.name || "Notice"}
              </span>
              {article.publishedAt && (
                <span className="inline-flex min-h-7 items-center gap-1.5 text-ink-soft">
                  <CalendarDays aria-hidden="true" className="size-3.5" />
                  {formatDate(article.publishedAt)}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-2xl font-extrabold leading-snug text-ink sm:text-4xl">{article.title}</h1>

            {article.excerpt && (
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{article.excerpt}</p>
            )}

            <div className="mt-8 whitespace-pre-line text-[0.95rem] leading-[1.9] text-ink-soft">
              {article.content}
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
              <p className="text-xs text-ink-soft">Questions about this notice? Contact the school office.</p>
              <Link href="/contact" className="inline-flex min-h-11 items-center text-xs font-bold text-brand-700 hover:underline">
                Contact details
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
