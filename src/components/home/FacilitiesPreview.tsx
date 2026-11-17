import Image from "next/image";
import Link from "next/link";
import { 
  Microscope, 
  Monitor, 
  BookOpen, 
  Dumbbell, 
  BusFront, 
  GraduationCap, 
  ArrowRight 
} from "lucide-react";
import { images } from "@/config/images";
import { SectionHeading } from "@/components/shared/SectionHeading";

const facilities = [
  {
    title: "Science Laboratory",
    desc: "Equipped for practical experiments in physics, chemistry, and biology with standard safety apparatus.",
    image: images.scienceLab,
    icon: Microscope,
  },
  {
    title: "Computer Laboratory",
    desc: "Networked computer terminals providing digital literacy, typing, office tools, and programming practice.",
    image: images.computerLab,
    icon: Monitor,
  },
  {
    title: "Comprehensive Library",
    desc: "Diverse collection of reference books, encyclopedias, literature, and quiet individual study cubicles.",
    image: images.library,
    icon: BookOpen,
  },
  {
    title: "Sports & Athletics Ground",
    desc: "Spacious outdoor grounds for football, volleyball, badminton, morning drill, and annual athletic meets.",
    image: images.sports,
    icon: Dumbbell,
  },
  {
    title: "Safe Transport Fleet",
    desc: "Dedicated school buses managed by experienced drivers covering designated routes in Tarahara and Itahari.",
    image: images.bus,
    icon: BusFront,
  },
  {
    title: "Ergonomic Classrooms",
    desc: "Bright, airy learning spaces with quality benching, blackboard/whiteboard fixtures, and focused acoustics.",
    image: images.heroStudents,
    icon: GraduationCap,
  },
];

export function FacilitiesPreview() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28 border-b border-line">
      <div className="shell">
        <SectionHeading
          badge="Campus Environment"
          title="Infrastructure Designed for Safe & Active Learning"
          description="A supportive school environment where academic study, scientific exploration, and physical health are supported by modern campus facilities."
          action={
            <Link href="/facilities" className="btn btn-outline !text-sm">
              Explore All Facilities
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-700 hover:shadow-lg"
              >
                {/* Photo frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-900">
                  <Image
                    src={fac.image}
                    alt={fac.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-3 left-4 flex size-10 items-center justify-center rounded-lg bg-white text-brand-700 shadow-md">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink group-hover:text-brand-700 transition-colors">
                      {fac.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                      {fac.desc}
                    </p>
                  </div>

                  <Link
                    href="/facilities"
                    className="mt-4 inline-flex min-h-[44px] items-center text-xs font-bold text-brand-700 hover:text-brand-900 group-hover:underline"
                  >
                    View facility details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
