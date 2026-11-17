import Image from "next/image";
import { images } from "@/config/images";
import { SectionHeading } from "@/components/shared/SectionHeading";

const levels = [
  {
    id: "ecd",
    tag: "Early years",
    title: "Pre-Primary",
    grades: "Nursery – UKG",
    text: "A gentle start where young learners build language, number sense and confidence through stories, songs and hands-on activities.",
    points: ["Phonics and early reading", "Sensory and motor activities", "Social skills and routines"],
    image: images.kidsLearning,
    alt: "Illustrative photograph of young children learning",
  },
  {
    id: "primary",
    tag: "Foundations",
    title: "Primary School",
    grades: "Grades 1 – 5",
    text: "Strong habits in reading, writing and mathematics, supported by environmental studies, languages and introductions to computing.",
    points: ["English and Nepali literacy", "Mathematics and general science", "Art, music and physical education"],
    image: images.heroClassroom,
    alt: "Illustrative photograph of a classroom",
  },
  {
    id: "lower-secondary",
    tag: "Exploration",
    title: "Lower Secondary",
    grades: "Grades 6 – 8",
    text: "Learners move into analytical thinking with practical science, social sciences and computer work.",
    points: ["Science with practical work", "Computer applications", "Projects and field work"],
    image: images.microscope,
    alt: "Illustrative photograph of a microscope",
  },
  {
    id: "secondary",
    tag: "Board preparation",
    title: "Secondary / SEE",
    grades: "Grades 9 – 10",
    text: "Systematic preparation for the Secondary Education Examination, with regular assessments and guidance.",
    points: ["Curriculum for Grades 9 and 10", "Regular class assessments", "Preparation for SEE"],
    image: images.study,
    alt: "Illustrative photograph of a student studying",
  },
];

export function ProgramLevelsList() {
  return (
    <section className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title={<>Every stage, <span className="font-editorial italic font-medium text-brand-600">thoughtfully designed</span>.</>}
          description="Five academic levels, from the early years through SEE and +2."
        />

        <div className="mt-14 space-y-6">
          {levels.map((level, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={level.id}
                id={level.id}
                className="grid scroll-mt-32 rounded-lg border border-line bg-white lg:grid-cols-12"
              >
                <div className={`relative min-h-[220px] overflow-hidden lg:col-span-5 ${reversed ? "lg:order-2 lg:rounded-r-lg" : "lg:rounded-l-lg"}`}>
                  <Image
                    src={level.image}
                    alt={level.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="img-cover object-center"
                  />
                  <span className="absolute left-5 top-5 rounded bg-white/95 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-brand-700">
                    {level.tag}
                  </span>
                  <span className="absolute bottom-4 left-5 rounded bg-white/95 px-2 py-1 text-[0.65rem] font-semibold text-ink">
                    Illustrative photograph
                  </span>
                </div>

                <div className={`p-7 sm:p-9 lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
                  <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-600">{level.grades}</span>
                  <h3 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">{level.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{level.text}</p>
                  <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-ink-soft">
                    {level.points.map((point) => (
                      <li key={point}>{point}</li>
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
