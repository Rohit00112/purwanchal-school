import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactFormSchema } from "@/lib/validation/schemas";
import { sendEmail, contactMessageEmailTemplate } from "@/lib/email";

const contactRateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const maxRequests = 5;

  const timestamps = contactRateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  contactRateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages submitted from this connection. Please wait a few minutes.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    const parseResult = contactFormSchema.safeParse(body);
    if (!parseResult.success) {
      const issues = parseResult.error.issues || [];
      const errorMsg = issues.map((i) => i.message).join(", ");
      return NextResponse.json(
        { success: false, error: errorMsg || "Invalid submission data" },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    const message = await db.contactMessage.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        status: "UNREAD",
      },
    });

    try {
      await sendEmail({
        to: process.env.SCHOOL_EMAIL || "info@purwanchalsecondaryschool.com",
        subject: `[Website Contact] ${data.subject}: from ${data.fullName}`,
        html: contactMessageEmailTemplate({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || undefined,
          subject: data.subject,
          message: data.message,
        }),
      });
    } catch (emailErr) {
      console.error("[Contact Email Notification Error]", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us. Your message has been delivered to school administration.",
      data: { id: message.id },
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: "An internal server error occurred while sending your message. Please reach us via telephone.",
      },
      { status: 500 }
    );
  }
}
