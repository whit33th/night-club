import Link from "next/link";
import SocialLinks from "./SocialLinks";
import EventGrid from "./EventGrid";
import { useSidebarEvents } from "../_hooks/useSidebarEvents";
import { Dict } from "@/lib/get-dictionary-client";

interface SidebarFooterProps {
  onClose: () => void;
  dict: Dict;
}

const SidebarFooter = ({ onClose, dict }: SidebarFooterProps) => {
  const { isLoading, eventsToShow, hasEvents } = useSidebarEvents();

  return (
    <div className="absolute inset-x-0 bottom-0 space-y-3 border-t border-white/10 px-4 pb-6 pt-4">
      <SocialLinks dict={dict} />

      <div className="custom-hide-5 grid grid-cols-4 gap-2 md:grid-cols-5">
        <EventGrid
          isLoading={isLoading}
          events={eventsToShow}
          hasEvents={hasEvents}
          onEventClick={onClose}
        />
      </div>

      <Link
        href="/events"
        onClick={onClose}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.02] px-3 py-2 text-center text-xs font-semibold tracking-wide text-white/90 transition hover:border-white/30 hover:bg-white/[0.06]"
      >
        {dict.events.allEvents}
      </Link>
    </div>
  );
};

export default SidebarFooter;
