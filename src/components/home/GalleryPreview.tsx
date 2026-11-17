import Image from "next/image";
import Link from "next/link";
import { images } from "@/config/images";
import { SectionHeading } from "@/components/shared/SectionHeading";

const photos = [
  { src: images.library, title: "Library", alt: "Illustrative photograph of a library" },
  { src: images.microscope, title: "Science laboratory", alt: "Illustrative photograph of a microscope" },
  { src: images.books, title: "Books", alt: "Illustrative photograph of books" },
  { src: images.computerLab, title: "Computer lab", alt: "Illustrative photograph of a computer lab" },
];

export function GalleryPreview() {
  return (
    <section className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title="Gallery"
          description="Illustrative photographs of learning spaces."
          action={
            <Link href="/gallery" className="btn btn-outline">
              View gallery
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {photos.map((photo) => (
            <Link
              key={photo.title}
              href="/gallery"
              className="relative block aspect-square overflow-hidden rounded-xl bg-brand-800"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="img-cover object-center"
              />
              <div className="absolute inset-0 bg-brand-950/60" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-sm font-extrabold text-white">{photo.title}</h3>
                <p className="mt-1 text-xs text-white/90">Illustrative photograph</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
