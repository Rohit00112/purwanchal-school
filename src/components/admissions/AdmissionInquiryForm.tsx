"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Info, Send } from "lucide-react";
import {
  admissionInquirySchema,
  type AdmissionInquiryInput,
} from "@/lib/validation/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

// Stable value for prerendering; the server route fills in the current year if omitted.
const ACADEMIC_YEAR = "2026 AD";

const gradeOptions = [
  { group: "Early years", options: ["Nursery", "LKG", "UKG"] },
  { group: "Primary", options: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"] },
  { group: "Lower secondary", options: ["Grade 6", "Grade 7", "Grade 8"] },
  { group: "Secondary", options: ["Grade 9", "Grade 10 (Transfer)"] },
  {
    group: "Higher secondary (+2)",
    options: ["Grade 11 (Management)", "Grade 11 (Computer Science)", "Grade 11 (Education)", "Grade 12 (Transfer)"],
  },
];

export function AdmissionInquiryForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionInquiryInput>({
    resolver: zodResolver(admissionInquirySchema),
    defaultValues: {
      parentName: "",
      studentName: "",
      contactNumber: "",
      email: "",
      currentSchool: "",
      applyingGrade: "",
      academicYear: ACADEMIC_YEAR,
      message: "",
    },
  });

  const onSubmit = async (values: AdmissionInquiryInput) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Failed to submit inquiry.");
      setSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry-form" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          title={<>Tell us a little about <span className="font-editorial italic font-medium text-brand-600">your child</span>.</>}
          description="Tell us the grade you are applying for and we will use the number you provide to respond."
        />

        <div className="mx-auto mt-12 max-w-4xl rounded-lg border border-line bg-cream/40 p-7 sm:p-10">
          {success ? (
            <div role="status" aria-live="polite" className="rounded-lg border border-brand-200 bg-brand-50 p-10 text-center">
              <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-brand-600 text-white">
                <CheckCircle2 className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-brand-950">Inquiry received. Thank you.</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                The Tarahara office has your details and will use the number you provided to respond to your enquiry.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setSuccess(false)}>Submit another inquiry</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-busy={submitting}>
              {error && (
                <div role="alert" className="flex items-start gap-3 rounded-lg border border-error-border bg-error-soft p-4 text-sm text-error">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {error}
                </div>
              )}
              <p className="sr-only" role="status" aria-live="polite">
                {submitting ? "Submitting your inquiry" : ""}
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent / guardian name <span className="text-error">*</span></Label>
                  <Input id="parentName" placeholder="As on your citizenship document" {...register("parentName")} className={errors.parentName ? "border-error" : ""} />
                  {errors.parentName && <p className="text-xs text-error">{errors.parentName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student&apos;s full name <span className="text-error">*</span></Label>
                  <Input id="studentName" placeholder="As on your birth registration certificate" {...register("studentName")} className={errors.studentName ? "border-error" : ""} />
                  {errors.studentName && <p className="text-xs text-error">{errors.studentName.message}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Phone number <span className="text-error">*</span></Label>
                  <Input id="contactNumber" type="tel" placeholder="9800000000" {...register("contactNumber")} className={errors.contactNumber ? "border-error" : ""} />
                  {errors.contactNumber && <p className="text-xs text-error">{errors.contactNumber.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address <span className="text-ink-soft">(optional)</span></Label>
                  <Input id="email" type="email" placeholder="parent@example.com" {...register("email")} className={errors.email ? "border-error" : ""} />
                  {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="applyingGrade">Applying grade <span className="text-error">*</span></Label>
                  <select
                    id="applyingGrade"
                    {...register("applyingGrade")}
                    className={cn(
                      "flex h-11 w-full rounded-lg border border-line-strong bg-white px-4 text-sm text-ink hover:border-brand-400",
                      errors.applyingGrade && "border-error"
                    )}
                  >
                    <option value="">Select a grade…</option>
                    {gradeOptions.map((group) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.options.map((option) => <option key={option} value={option}>{option}</option>)}
                      </optgroup>
                    ))}
                  </select>
                  {errors.applyingGrade && <p className="text-xs text-error">{errors.applyingGrade.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic session</Label>
                  <Input id="academicYear" placeholder={ACADEMIC_YEAR} {...register("academicYear")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSchool">Current / previous school <span className="text-ink-soft">(if applicable)</span></Label>
                <Input id="currentSchool" placeholder="School name and location" {...register("currentSchool")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Anything else we should know? <span className="text-ink-soft">(optional)</span></Label>
                <Textarea id="message" rows={3} placeholder="Bus routes, subject choices, learning needs…" {...register("message")} className={errors.message ? "border-error" : ""} />
                {errors.message && <p className="text-xs text-error">{errors.message.message}</p>}
              </div>

              <div className="flex flex-col items-start justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
                <p className="flex items-start gap-2 text-xs leading-snug text-ink-soft">
                  <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                  We use these details to respond to your enquiry. Do not send sensitive documents through this form.
                </p>
                <Button type="submit" variant="accent" size="lg" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? "Submitting…" : <>Submit inquiry <Send aria-hidden="true" /></>}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
