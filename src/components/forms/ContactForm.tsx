"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Info, Send } from "lucide-react";
import { contactFormSchema, type ContactFormInput } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactFormInput) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Failed to send message.");
      setSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-brand-200 bg-brand-50 p-10 text-center">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-brand-600 text-white">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-extrabold text-brand-950">Message sent. Thank you.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
          The front office has your message and will use the details you provided to respond.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSuccess(false)}>Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-busy={submitting}>
      {error && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-error-border bg-error-soft p-4 text-sm text-error">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {error}
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {submitting ? "Sending your message" : ""}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name <span className="text-error">*</span></Label>
          <Input id="fullName" placeholder="Your name" {...register("fullName")} className={errors.fullName ? "border-error" : ""} />
          {errors.fullName && <p className="text-xs text-error">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email address <span className="text-error">*</span></Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} className={errors.email ? "border-error" : ""} />
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" type="tel" placeholder="9800000000" {...register("phone")} className={errors.phone ? "border-error" : ""} />
          {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject <span className="text-error">*</span></Label>
          <Input id="subject" placeholder="What is this about?" {...register("subject")} className={errors.subject ? "border-error" : ""} />
          {errors.subject && <p className="text-xs text-error">{errors.subject.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message <span className="text-error">*</span></Label>
        <Textarea id="message" rows={5} placeholder="Tell us how we can help…" {...register("message")} className={errors.message ? "border-error" : ""} />
        {errors.message && <p className="text-xs text-error">{errors.message.message}</p>}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-5 sm:flex-row sm:items-center">
        <p className="flex items-start gap-2 text-xs leading-snug text-ink-soft">
          <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
          We use these details to respond to your enquiry. Do not send sensitive documents through this form.
        </p>
        <Button type="submit" variant="accent" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? "Sending…" : <>Send message <Send aria-hidden="true" /></>}
        </Button>
      </div>
    </form>
  );
}
