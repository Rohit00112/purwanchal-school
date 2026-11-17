import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Eye } from "lucide-react";
import { images } from "@/config/images";
import { SectionHeading } from "@/components/shared/SectionHeading";

const galleryHighlights = [
  {
    src: images.campusWide,
    title: "School Campus Grounds",
    category: "Campus",
    caption: "Main entrance and academic block in Tarahara, Itahari-20",
    span: "col-span-1 sm:col-span-2 aspect-[16/9]"
  },
  {
    src: images.scienceLab,
    title: "Science Practical Lab",
    category: "Academics",
    caption: "Apparatus for physics, chemistry, and biology demonstrations",
    span: "col-span-1 aspect-[4/3]"
  },
  {
    src: images.computerLab,
    title: "Computer Laboratory",
    category: "Technology",
    caption: "Modern computing lab for ICT and programming classes",
    span: "col-span-1 aspect-[4/3]"
  },
  {
    src: images.library,
    title: "School Library",
    category: "Learning",
    caption: "Quiet reading desks and broad reference book collection",
    span: "col-span-1 aspect-[4/3]"
  },
  {
    src: images.sports,
    title: "Sports & Physical Activities",
    category: "Athletics",
    caption: "Outdoor sports ground for team tournaments and fitness",
    span: "col-span-1 aspect-[4/3]"
  },
  {
    src: images.bus,
    title: "Transportation Service",
    category: "Facilities",
    caption: "Safe daily school bus transport across Sunsari routes",
    span: "col-span-1 sm:col-span-2 aspect-[16/9]"
  }
];

export function GalleryPreview() {
  return (
    <section className="bg-slate-bg py-20 sm:py-24 lg:py-28 border-b border-line">
      <div className="shell">
        <SectionHeading
          badge="Campus Life in Pictures"
          title="Moments of Learning, Discovery & Community"
          description="A glimpse into daily academic sessions, laboratory work, sports activities, and school grounds at Purwanchal Secondary Boarding School."
          action={
            <Link href="/gallery" className="btn btn-outline !text-sm">
              <Camera className="size-4" aria-hidden="true" />
              View Full Gallery
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryHighlights.map((item) => (
            <Link
              key={item.title}
              href="/gallery"
              className={`group relative overflow-hidden rounded-2xl border border-line bg-brand-900 shadow-xs transition-all duration-300 hover:shadow-lg ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="rounded-md bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              {/* View Indicator */}
              <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-xs">
                <Eye className="size-4" aria-hidden="true" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-white/80 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
