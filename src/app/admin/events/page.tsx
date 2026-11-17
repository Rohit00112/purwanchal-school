import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { EventsClient } from "@/components/admin/EventsClient";

export const metadata = {
  title: "Calendar & Events CMS | Administrative Portal",
  description: "Manage school events and academic calendar for Purwanchal Secondary Boarding School.",
};

export default async function AdminEventsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let events: any[] = [];
  try {
    events = await db.event.findMany({
      orderBy: { startDate: "desc" },
    });
  } catch (error) {
    console.error("[Admin Events Fetch Error]", error);
  }

  return <EventsClient initialEvents={events} />;
}
