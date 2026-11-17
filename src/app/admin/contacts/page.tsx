import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ContactsClient } from "@/components/admin/ContactsClient";

export const instant = false;

export const metadata = {
  title: "Contact Messages | Administrative Portal",
  description: "Manage contact messages and general inquiries for Purwanchal Secondary Boarding School.",
};

export default async function AdminContactsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let messages: any[] = [];
  try {
    messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[Admin Contacts Fetch Error]", error);
  }

  return <ContactsClient initialMessages={messages} />;
}
