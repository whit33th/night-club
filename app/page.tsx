import Hero from "@/components/Containers/Hero/Hero";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import EventsGridSSR from "@/components/Containers/EventsGridSSR";

export default async function HomePage() {
  // Preload upcoming events data on the server with limit
  const preloadedEvents = await preloadQuery(api.admin.listUpcomingEvents, {
    limit: 12,
  });

  return (
    <>
      <Hero />
      <EventsGridSSR preloaded={preloadedEvents} />
    </>
  );
}
