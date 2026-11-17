import Image from "next/image";
import Link from "next/link";
import { Quote, CheckCircle, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { images } from "@/config/images";

export function PrincipalMessage() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28 border-b border-line">
      <div className="shell">
        <SectionHeading
          badge="Leadership Perspective"
          title="Educational Philosophy & Institutional Commitment"
          description="A message from the school leadership on our continuing dedication to academic discipline, moral character, and student development."
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Photo / Portrait Block */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative aspect-[4/4.8] overflow-hidden rounded-2xl border-2 border-line bg-brand-900 shadow-xl">
                <Image
                  src={images.heroStudents}
                  alt="Students and educators at Purwanchal Secondary Boarding School"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-serif text-lg font-bold text-sun-300">
                    Purwanchal Secondary Boarding School
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    School Leadership &amp; Academic Committee · Itahari-20, Tarahara
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Letter / Editorial Content */}
          <div className="lg:col-span-7">
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 mb-6">
              <Quote className="size-6" aria-hidden="true" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-snug">
              &ldquo;Education is not merely the transmission of facts, but the cultivation of character, curiosity, and civic responsibility.&rdquo;
            </h3>

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-ink-soft">
              <p>
                When Purwanchal Secondary Boarding School was founded in 1994, our goal was simple yet profound:
                to establish an educational sanctuary in Tarahara where children from diverse backgrounds could
                receive high-quality, English-medium schooling grounded in discipline and mutual respect.
              </p>
              <p>
                Over thirty years, education has evolved rapidly with computing technology and changing global
                competencies. We have met this challenge by equipping modern computer laboratories, expanding
                hands-on science experiments, and introducing three specialized Higher Secondary (+2) streams
                in Management, Computer Science, and Education.
              </p>
              <p>
                Yet, our core belief remains steadfast: academic success must always walk hand in hand with moral
                integrity, humility, and care for community. We invite every parent and guardian to partner with
                us in this rewarding journey of raising confident, thoughtful individuals.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 border-t border-line pt-6 text-xs text-ink-soft">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-brand-700 shrink-0" aria-hidden="true" />
                <span>Three continuous terms with structured parent-teacher dialogues</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-brand-700 shrink-0" aria-hidden="true" />
                <span>Dedicated counseling and remedial assistance for board candidates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-brand-700 shrink-0" aria-hidden="true" />
                <span>Bilingual emphasis across English and Nepali cultural heritage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-brand-700 shrink-0" aria-hidden="true" />
                <span>Zero tolerance for bullying and comprehensive pastoral care</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/admissions" className="btn btn-primary !text-sm">
                Inquire for Admission
              </Link>
              <Link href="/contact" className="btn btn-outline !text-sm">
                Schedule a Meeting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
