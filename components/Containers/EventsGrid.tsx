import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { mockEvents } from "../data/events";
import EventsCard from "./Cards/EventsCard";

export default function EventsGrid() {
  return (
    <section className="mt-4">
      <div className="hidden items-center justify-end xl:flex">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm uppercase tracking-wide text-white/80 hover:text-white"
        >
          More Events
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
        {mockEvents.slice(0, 6).map((poster, index) => (
          <EventsCard key={index} poster={poster} index={index} />
        ))}
      </div>
      <div className="mt-2 flex justify-center xl:hidden">
        <Link
          href="/events"
          className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur transition-colors"
        >
          More Events
        </Link>
      </div>
    </section>
  );
}
