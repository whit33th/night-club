import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { notFound } from "next/navigation";
import EventPageClient from "./EventPageClient";
import { extractIdFromSlug } from "@/lib/slugUtils";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/i18n-config";
import JsonLd from "./_JSON-LD/json-ld";

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;

  const eventId = extractIdFromSlug(slug);

  try {
    const [preloadedEvent, preloadedUpcomingEvents, dict] = await Promise.all([
      preloadQuery(api.admin.getEvent, {
        id: eventId as Id<"events">,
      }),
      preloadQuery(api.admin.listUpcomingEvents, {}),
      getDictionary(lang as Locale),
    ]);

    const event = preloadedQueryResult(preloadedEvent);

    if (!event) {
      notFound();
    }

    return (
      <>
        <JsonLd event={event} locale={lang as Locale} />

        <EventPageClient
          preloadedEvent={preloadedEvent}
          preloadedUpcomingEvents={preloadedUpcomingEvents}
          dict={dict}
          locale={lang as Locale}
        />
      </>
    );
  } catch {
    notFound();
  }
}
