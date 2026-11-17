import Image from "next/image";
import { Check } from "lucide-react";
import { images } from "@/config/images";
import { SectionHeading } from "@/components/shared/SectionHeading";

const levels = [
  {
    id: "ecd",
    tag: "Early Years",
    title: "Pre-Primary Education",
    grades: "Nursery to UKG",
    text: "A warm and stimulating start where young learners build phonetics, number sense, vocabulary, and social confidence through guided play, storytelling, and motor activities.",
    points: ["Phonics and early English-Nepali reading habits", "Sensory, creative arts, and fine-motor activities", "Cooperative social habits, sharing, and hygiene routines"],
    image: images.kidsLearning,
    alt: "Young children learning in a classroom",
  },
  {
    id: "primary",
    tag: "Foundations",
    title: "Primary School",
    grades: "Grades 1 to 5",
    text: "Building strong fluency in English and Nepali, solid arithmetic grounding, basic environmental science, and creative exploration in art and physical movement.",
    points: ["Structured literacy in English and Nepali", "Foundational mathematics and introductory science", "Regular handwriting, drawing, and physical education"],
    image: images.heroClassroom,
    alt: "Primary school students engaged in classroom discussion",
  },
  {
    id: "lower-secondary",
    tag: "Analytical Exploration",
    title: "Lower Secondary",
    grades: "Grades 6 to 8",
    text: "Transitioning toward deeper analytical thinking, laboratory-based science explorations, social studies, and practical computing skills.",
    points: ["Integrated science with hands-on lab sessions", "Computer literacy, basic typing, and office tools", "Group research projects and public speaking sessions"],
    image: images.microscope,
    alt: "Student using microscope in science laboratory",
  },
  {
    id: "secondary",
    tag: "National Board Preparation",
    title: "Secondary School (SEE)",
    grades: "Grades 9 to 10",
    text: "Rigorous academic preparation for the National Secondary Education Examination (SEE) with focused syllabus coverage, question-solving clinics, and mock board tests.",
    points: ["Full coverage of the national SEE curriculum", "Dedicated science practical examinations in laboratory", "Intensive revision cycles and individual counseling"],
    image: images.study,
    alt: "Secondary students preparing for board exams",
  },
];

export function ProgramLevelsList() {
  return (
    <section className="bg-slate-bg py-20 sm:py-24 lg:py-28 border-b border-line">
      <div className="shell">
        <SectionHeading
          badge="Academic Progression"
          title={<>Every Stage, <span className="font-serif italic text-brand-700">Thoughtfully Designed</span>.</>}
          description="A progressive learning structure from Nursery to Grade 10, preparing students for competitive higher education."
        />

        <div className="mt-14 space-y-8">
          {levels.map((level, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={level.id}
                id={level.id}
                className="grid scroll-mt-32 overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition-all duration-200 hover:border-brand-700 hover:shadow-md lg:grid-cols-12"
              >
                <div className={`relative min-h-[260px] overflow-hidden bg-brand-900 lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
                  <Image
                    src={level.image}
                    alt={level.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-brand-900/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sun-300 backdrop-blur-xs">
                    {level.tag}
                  </span>
                </div>

                <div className={`flex flex-col justify-center p-7 sm:p-9 lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">
                    {level.grades}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
                    {level.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-soft">
                    {level.text}
                  </p>
                  <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-ink-soft">
                    {level.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check className="size-4 text-brand-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
