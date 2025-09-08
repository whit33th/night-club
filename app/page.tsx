import Hero from "@/components/Containers/Hero/Hero";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import ConvexEventsGridSSR from "@/components/Containers/ConvexEventsGridSSR";

export default async function HomePage() {
  // Preload events data on the server
  const preloadedEvents = await preloadQuery(api.admin.listEvents, {});

  return (
    <>
      <Hero />
      <ConvexEventsGridSSR preloaded={preloadedEvents} />
    </>
  );
}
