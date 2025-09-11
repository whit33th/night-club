import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

export const useSidebarEvents = () => {
  const eventsData = useQuery(api.admin.listEvents);

  const upcomingEvents = eventsData
    ? eventsData
        .filter((event: Doc<"events">) => {
          const eventDate = new Date(event.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return eventDate > today;
        })
        .sort(
          (a: Doc<"events">, b: Doc<"events">) =>
            new Date(a.date).getTime() - new Date(b.date).getTime(),
        )
        .slice(0, 5)
    : [];

  const allEvents = eventsData
    ? eventsData
        .sort(
          (a: Doc<"events">, b: Doc<"events">) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        .slice(0, 5)
    : [];

  const eventsToShow = upcomingEvents.length > 0 ? upcomingEvents : allEvents;

  return {
    isLoading: eventsData === undefined,
    eventsToShow,
    hasEvents: eventsToShow.length > 0,
  };
};
