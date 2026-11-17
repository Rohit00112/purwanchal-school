import Image from "next/image";
import {
  Microscope, Monitor, BookOpen, Dumbbell, Bus, Coffee, Music, Building2,
} from "lucide-react";
import { images } from "@/config/images";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ALL_FACILITIES = [
  {
    title: "Science Laboratory",
    category: "Experimental learning",
    icon: Microscope,
    image: images.scienceLab,
    alt: "Illustrative photograph of a science laboratory",
    description: "A space used for practical science work as part of the school curriculum.",
    detail: "Ask the school about the equipment available and how practical classes are timetabled.",
  },
  {
    title: "Computer Laboratory",
    category: "Information technology",
    icon: Monitor,
    image: images.computerLab,
    alt: "Illustrative photograph of a computer laboratory",
    description: "Computers that support teaching and learning across the academic levels.",
    detail: "Ask the school about access, software and supervised use.",
  },
  {
    title: "Library & Reading Room",
    category: "Literacy & reference",
    icon: BookOpen,
    image: images.library,
    alt: "Illustrative photograph of a library",
    description: "A reading and reference space for students.",
    detail: "Ask the school about the collection and borrowing arrangements.",
  },
  {
    title: "Classrooms",
    category: "Core instruction",
    icon: Building2,
    image: images.heroClassroom,
    alt: "Illustrative photograph of a classroom",
    description: "Teaching takes place in classrooms organised by level and subject.",
    detail: "Ask the school about class sizes and the learning environment.",
  },
  {
    title: "Sports & Athletics",
    category: "Physical fitness",
    icon: Dumbbell,
    image: images.sports,
    alt: "Illustrative photograph of a sports ground",
    description: "Physical education and sports activities are part of school life.",
    detail: "Ask the school about the sports offered and how students take part.",
  },
  {
    title: "Transportation",
    category: "Commute & logistics",
    icon: Bus,
    image: images.bus,
    alt: "Illustrative photograph of a bus",
    description: "The school can advise families about transport options to and from campus.",
    detail: "Ask the school about routes, timings and supervision.",
  },
  {
    title: "Canteen & Meals",
    category: "Nutrition & dining",
    icon: Coffee,
    image: images.children,
    alt: "Illustrative photograph of children",
    description: "The school can advise families about meals and refreshments during school hours.",
    detail: "Ask the school about what is available and any arrangements for food and water.",
  },
  {
    title: "Music, Dance & Cultural Arts",
    category: "Creative expression",
    icon: Music,
    image: images.culture,
    alt: "Illustrative photograph of a cultural performance",
    description: "Music, dance and cultural activities form part of school life.",
    detail: "Ask the school about how students take part in cultural programmes.",
  },
];

export function FacilityDetailGrid() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title={<>Everything a growing mind <span className="font-editorial italic font-medium text-brand-600">needs</span>.</>}
          description="General information about campus facilities. Contact the school for current details."
        />

        <div className="mt-14 space-y-6">
          {ALL_FACILITIES.map((facility, idx) => {
            const Icon = facility.icon;
            const reversed = idx % 2 === 1;

            return (
              <div
                key={facility.title}
                className="grid scroll-mt-24 rounded-lg border border-line bg-cream lg:grid-cols-12"
              >
                <div className={`relative min-h-[240px] overflow-hidden lg:col-span-5 ${reversed ? "lg:order-2 lg:rounded-r-lg" : "lg:rounded-l-lg"}`}>
                  <Image
                    src={facility.image}
                    alt={facility.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="img-cover object-center"
                  />
                  <span className="absolute left-5 top-5 rounded bg-white/95 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-700">
                    {facility.category}
                  </span>
                  <span className="absolute bottom-4 left-5 rounded bg-white/95 px-2 py-1 text-[0.65rem] font-semibold text-ink">
                    Illustrative photograph
                  </span>
                </div>

                <div className={`p-7 sm:p-9 lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-extrabold text-ink sm:text-2xl">{facility.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{facility.description}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{facility.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
