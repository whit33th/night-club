import { Doc } from "@/convex/_generated/dataModel";
import EventCard from "./EventCard";
import EventSkeletonGrid from "./EventSkeletonGrid";

interface EventGridProps {
  isLoading: boolean;
  events: Doc<"events">[];
  hasEvents: boolean;
  onEventClick: () => void;
}

const EventGrid = ({
  isLoading,
  events,
  hasEvents,
  onEventClick,
}: EventGridProps) => {
  if (isLoading) {
    return <EventSkeletonGrid />;
  }

  if (!hasEvents) {
    return null;
  }

  return (
    <>
      {events.map((event) => (
        <EventCard key={event._id} event={event} onClose={onEventClick} />
      ))}
    </>
  );
};

export default EventGrid;
