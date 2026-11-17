import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { InquiriesClient } from "@/components/admin/InquiriesClient";

export const metadata = {
  title: "Admission Inquiries | Administrative Portal",
  description: "Manage admission inquiries and applications for Purwanchal Secondary Boarding School.",
};

export default async function AdminInquiriesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let inquiries: any[] = [];
  try {
    inquiries = await db.admissionInquiry.findMany({
      orderBy: { submittedAt: "desc" },
    });
  } catch (error) {
    console.error("[Admin Inquiries Fetch Error]", error);
  }

  return <InquiriesClient initialInquiries={inquiries} />;
}
