import { Resend } from "resend";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Email] Skipping email send: RESEND_API_KEY not configured");
    console.log(`[Email] To: ${to} | Subject: ${subject}`);
    return { success: true, skipped: true };
  }

  try {
    // Instantiate lazily: constructing Resend with an empty API key throws at
    // module load, which breaks `next build` when the key isn't configured.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: `Purwanchal School <${process.env.SCHOOL_EMAIL || "noreply@purwanchalsecondaryschool.com"}>`,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("[Email] Send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("[Email] Exception:", err);
    return { success: false, error: err };
  }
}

export function admissionInquiryEmailTemplate(data: {
  parentName: string;
  studentName: string;
  contactNumber: string;
  email?: string;
  applyingGrade: string;
  message?: string;
}) {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #142D4E; margin-bottom: 24px;">New Admission Inquiry</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Parent/Guardian</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.parentName}</td></tr>
        <tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Student Name</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.studentName}</td></tr>
        <tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Contact</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.contactNumber}</td></tr>
        ${data.email ? `<tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Email</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.email}</td></tr>` : ""}
        <tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Applying Grade</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.applyingGrade}</td></tr>
      </table>
      ${data.message ? `<div style="margin-top: 24px; padding: 16px; background: #F8F7F3; border-radius: 4px;"><p style="color: #697586; margin: 0 0 8px;">Message:</p><p style="margin: 0; color: #202833;">${data.message}</p></div>` : ""}
      <p style="margin-top: 24px; color: #697586; font-size: 13px;">This inquiry was submitted via the school website.</p>
    </div>
  `;
}

export function contactMessageEmailTemplate(data: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #142D4E; margin-bottom: 24px;">New Contact Message</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Name</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.fullName}</td></tr>
        <tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Email</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.email}</td></tr>
        ${data.phone ? `<tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Phone</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.phone}</td></tr>` : ""}
        <tr><td style="padding: 8px 16px; color: #697586; border-bottom: 1px solid #E7E6E1;">Subject</td><td style="padding: 8px 16px; border-bottom: 1px solid #E7E6E1;">${data.subject}</td></tr>
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #F8F7F3; border-radius: 4px;">
        <p style="color: #697586; margin: 0 0 8px;">Message:</p>
        <p style="margin: 0; color: #202833;">${data.message}</p>
      </div>
      <p style="margin-top: 24px; color: #697586; font-size: 13px;">Reply directly to this email or through the admin dashboard.</p>
    </div>
  `;
}
