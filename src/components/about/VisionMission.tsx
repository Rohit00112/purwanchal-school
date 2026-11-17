import { Eye, Target, Compass, Heart, BookOpen, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const objectives = [
  { icon: BookOpen, title: "Academic strength", text: "A planned curriculum from the early years onward." },
  { icon: Compass, title: "Practical inquiry", text: "Practical work that turns concepts into understanding." },
  { icon: Heart, title: "Moral grounding", text: "Honesty, discipline and respect as daily practice." },
  { icon: Users, title: "Whole-child growth", text: "Activities alongside classroom learning." },
];

const beliefs = [
  {
    icon: Eye,
    label: "Our vision",
    title: "Confident, compassionate learners.",
    text: "We envision a school where every child is known, challenged and inspired. Excellence is matched by empathy and respect for our shared heritage.",
    card: "bg-brand-900 text-white",
    body: "text-white/80",
    iconStyle: "bg-sun-300 text-brand-950",
  },
  {
    icon: Target,
    label: "Our mission",
    title: "Accessible, value-led education.",
    text: "Through dedicated teaching, practical facilities and close family partnership, we help each student build strong habits of lifelong learning.",
    card: "bg-sun-300 text-brand-950",
    body: "text-brand-950/80",
    iconStyle: "bg-brand-900 text-sun-300",
  },
];

export function VisionMission() {
  return (
    <section id="vision" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title={<>What we believe, <span className="font-editorial italic font-medium text-brand-600">what we build</span>.</>}
          description="A clear vision and a practical mission guide the work of the school."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {beliefs.map((item) => (
            <div key={item.label} className={`h-full rounded-lg p-8 sm:p-10 ${item.card}`}>
              <span className={`inline-flex size-11 items-center justify-center rounded-lg ${item.iconStyle}`}>
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <p className={`mt-6 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] ${item.body}`}>{item.label}</p>
              <h3 className="mt-2 max-w-lg text-2xl font-extrabold leading-snug sm:text-[1.7rem]">{item.title}</h3>
              <p className={`mt-4 max-w-xl text-sm leading-relaxed ${item.body}`}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {objectives.map(({ icon: Icon, title, text }) => (
            <div key={title} className="h-full rounded-lg border border-line bg-cream p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h4 className="mt-4 text-sm font-extrabold text-ink">{title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
