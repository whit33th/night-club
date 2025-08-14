import EventsGrid from "@/components/Containers/EventsGrid";
import Hero from "@/components/Containers/Hero/Hero";
import { mockEvents } from "@/components/data/events";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventsGrid events={mockEvents} />
    </>
  );
}
