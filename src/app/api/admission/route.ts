import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { admissionInquirySchema } from "@/lib/validation/schemas";
import { sendEmail, admissionInquiryEmailTemplate } from "@/lib/email";

const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const maxRequests = 5;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submission attempts. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    const parseResult = admissionInquirySchema.safeParse(body);
    if (!parseResult.success) {
      const issues = parseResult.error.issues || [];
      const errorMsg = issues.map((i) => i.message).join(", ");
      return NextResponse.json(
        { success: false, error: errorMsg || "Invalid submission data" },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    const inquiry = await db.admissionInquiry.create({
      data: {
        parentName: data.parentName,
        studentName: data.studentName,
        contactNumber: data.contactNumber,
        email: data.email || null,
        currentSchool: data.currentSchool || null,
        applyingGrade: data.applyingGrade,
        academicYear: data.academicYear || `${new Date().getFullYear()} AD`,
        message: data.message || null,
        status: "NEW",
      },
    });

    try {
      await sendEmail({
        to: process.env.SCHOOL_EMAIL || "info@purwanchalsecondaryschool.com",
        subject: `[Admission Inquiry] New Application for ${data.applyingGrade}: ${data.studentName}`,
        html: admissionInquiryEmailTemplate({
          parentName: data.parentName,
          studentName: data.studentName,
          contactNumber: data.contactNumber,
          email: data.email || undefined,
          applyingGrade: data.applyingGrade,
          message: data.message || undefined,
        }),
      });
    } catch (emailErr) {
      console.error("[Email Notification Error]", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Your admission inquiry has been received. Our administration office will contact you promptly.",
      data: { id: inquiry.id },
    });
  } catch (error) {
    console.error("[Admission Inquiry API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: "An internal server error occurred while processing your inquiry. Please try again or call our office.",
      },
      { status: 500 }
    );
  }
}
