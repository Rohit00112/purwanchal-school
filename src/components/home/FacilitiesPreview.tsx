import Image from "next/image";
import Link from "next/link";
import { Microscope, Monitor, BookOpen, Dumbbell, BusFront } from "lucide-react";
import { images } from "@/config/images";
import { SectionHeading } from "@/components/shared/SectionHeading";

const facilities = [
  {
    title: "Science laboratory",
    alt: "Illustrative photograph of a laboratory",
    image: images.scienceLab,
    icon: Microscope,
  },
  {
    title: "Computer lab",
    alt: "Illustrative photograph of a computer lab",
    image: images.computerLab,
    icon: Monitor,
  },
  {
    title: "Library",
    alt: "Illustrative photograph of a library",
    image: images.library,
    icon: BookOpen,
  },
  {
    title: "Sports ground",
    alt: "Illustrative photograph of a sports ground",
    image: images.sports,
    icon: Dumbbell,
  },
  {
    title: "School bus",
    alt: "Illustrative photograph of a bus",
    image: images.bus,
    icon: BusFront,
  },
];

export function FacilitiesPreview() {
  return (
    <section className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title="Facilities"
          description="Learning and campus spaces at Purwanchal."
          action={
            <Link href="/facilities" className="btn btn-outline">
              See all facilities
            </Link>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map(({ title, alt, image, icon: Icon }) => (
            <Link
              key={title}
              href="/facilities"
              className="relative flex min-h-52 flex-col justify-end overflow-hidden rounded-xl bg-brand-800"
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="img-cover object-center"
              />
              <div className="absolute inset-0 bg-brand-950/65" />
              <div className="relative p-5">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/15 text-sun-300">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-extrabold text-white">{title}</h3>
                <p className="mt-1 text-xs text-white/90">Illustrative photograph</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
