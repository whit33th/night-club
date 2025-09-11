import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { notFound } from "next/navigation";
import EventPageClient from "./EventPageClient";
import { extractIdFromSlug } from "@/lib/slugUtils";

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Extract event ID from slug (last part after last hyphen)
  const eventId = extractIdFromSlug(slug);

  try {
    const preloadedEvent = await preloadQuery(api.admin.getEvent, {
      id: eventId as Id<"events">,
    });

    const preloadedUpcomingEvents = await preloadQuery(
      api.admin.listUpcomingEvents,
      {},
    );

    const event = preloadedQueryResult(preloadedEvent);

    if (!event) {
      notFound();
    }

    return (
      <EventPageClient
        preloadedEvent={preloadedEvent}
        preloadedUpcomingEvents={preloadedUpcomingEvents}
      />
    );
  } catch {
    notFound();
  }
}
