import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsClient } from "@/components/admin/SettingsClient";

export const metadata = {
  title: "School Profile & Settings | Administrative Portal",
  description: "Configure school contact details, official parameters, and administrative preferences.",
};

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let profile = null;
  try {
    profile = await db.schoolProfile.findFirst();
  } catch (error) {
    console.error("[Admin Settings Fetch Error]", error);
  }

  return <SettingsClient initialProfile={profile} currentUser={session.user} />;
}
