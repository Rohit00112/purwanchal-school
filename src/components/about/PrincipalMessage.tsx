import { SectionHeading } from "@/components/shared/SectionHeading";

export function PrincipalMessage() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          title="How we approach learning"
          description="Purwanchal School teaches five academic levels, from Nursery–UKG through Grades 9–10 SEE and +2."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 text-[0.95rem] leading-relaxed text-ink-soft lg:col-span-7">
            <p>
              The academic calendar sets out three terms of class assessments, terminal examinations
              and parent–teacher meetings. Teaching follows the curriculum for each level, from the
              early years through the secondary and higher-secondary stages.
            </p>
            <p>
              Subjects are organised by level so that students build foundations first and then move
              into more specialised study. Families are kept informed about progress and school
              activities through the meetings listed in the calendar.
            </p>
          </div>

          <div className="rounded-lg border border-line bg-cream p-7 lg:col-span-5">
            <h3 className="text-lg font-extrabold text-ink">Leadership and faculty</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Names and profiles of the school&apos;s leadership and faculty will be published here
              when the school supplies them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
