import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface NewsCardProps {
  slug: string;
  title: string;
  excerpt?: string | null;
  categoryName?: string;
  publishedAt?: Date | null;
  isFeatured?: boolean;
  image?: string | null;
}

export function NewsCard({
  slug,
  title,
  excerpt,
  categoryName = "Notice",
  publishedAt,
  isFeatured = false,
  image,
}: NewsCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-white">
      {image && (
        <Link
          href={`/news/${slug}`}
          className={`relative block overflow-hidden rounded-t-lg bg-brand-100 ${isFeatured ? "aspect-[16/9]" : "aspect-[16/10]"}`}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="img-cover object-center"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex min-h-7 items-center rounded-md bg-brand-50 px-2.5 text-xs font-bold text-brand-800">
            {categoryName}
          </span>
          {publishedAt && (
            <span className="inline-flex min-h-7 items-center gap-1.5 text-xs font-semibold text-ink-soft">
              <CalendarDays aria-hidden="true" className="size-3.5" />
              {formatDateShort(publishedAt)}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-extrabold leading-snug text-ink">
          <Link href={`/news/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        {excerpt && <p className="mt-2 flex-1 text-[0.83rem] leading-relaxed text-ink-soft">{excerpt}</p>}
        <Link href={`/news/${slug}`} className="mt-5 inline-flex min-h-11 items-center text-xs font-bold text-brand-700 hover:underline">
          Read notice
        </Link>
      </div>
    </article>
  );
}
