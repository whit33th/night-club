import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function EventsCard({
  poster,
  index,
}: {
  poster: {
    date: string;
    slug?: string;
    title: string;
    img: string;
    artists?: string[] | string;
    new?: boolean;
    entry?: string;
  };
  index: number;
}) {
  const date = new Date(poster.date);
  const month = date.toLocaleString(undefined, { month: "short" });
  const day = date.toLocaleString(undefined, { day: "2-digit" });
  return (
    <Link
      href={`/events/${poster.slug ?? poster.title}`}
      key={index}
      className="group relative flex flex-col p-5 transition"
    >
      <div className="absolute left-0 top-0 z-10 flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-neutral-900/25 shadow-xl backdrop-blur backdrop-hue-rotate-180">
        <p className="font-bold">{month}</p>
        <p className="text-3xl font-bold">{Number(day)}</p>
      </div>
      <div className="relative aspect-[9/12] h-full overflow-hidden p-4">
        <ViewTransition name={`event-${poster.slug}`}>
          <Image
            src={poster.img}
            alt={poster.title}
            width={500}
            height={500}
            className="group-hover:scale-103 absolute inset-0 rounded object-cover object-center transition-all duration-300 ease-in-out group-hover:opacity-80"
          />
        </ViewTransition>
        <figure className="pointer-events-none absolute inset-0 z-[1] rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="absolute bottom-0 left-0 z-10 flex min-h-16 w-full items-center justify-between gap-3 rounded-xl bg-neutral-900/25 px-4 backdrop-blur backdrop-hue-rotate-180">
        <div className="flex flex-col">
          <h1 className="font-bold">
            {(index + 1).toString().padStart(2, "0")}. {poster.title}
          </h1>
          <p className="text-xs text-neutral-400">
            {poster.artists
              ? Array.isArray(poster.artists)
                ? poster.artists.join(", ")
                : poster.artists
              : "Christopher Nolan, Hans Zimmer"}
          </p>
          {/* {poster.new && (
            <span className="ml-1 text-xs font-semibold text-green-600">
              New
            </span>
          )} */}
        </div>
        {/* <button className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 font-bold shadow">
          {poster.entry !== "free" && <Ticket width={18} height={18} />}
          <p className="text-sm">{poster.entry === "free" ? "Free" : "Buy"}</p>
        </button> */}
      </div>
    </Link>
  );
}
