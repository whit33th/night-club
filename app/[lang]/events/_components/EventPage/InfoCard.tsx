"use client";

import { clubInfo } from "@/lib/data/club-info";
import { Dict } from "@/lib/get-dictionary-client";
import { formatTextWithLinks } from "@/lib/text-utils";

type ScrollAreaProps = {
  className?: string;
  children: React.ReactNode;
};

function ScrollArea({ className, children }: ScrollAreaProps) {
  return (
    <div className="relative">
      <div
        className={`max-h-48 overflow-y-auto ${className ? className : ""} [&::-webkit-scrollbar-thumb:active]:bg-white/40 [&::-webkit-scrollbar-thumb:hover]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar]:w-2`}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        style={{
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          isolation: "isolate",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)",
        }}
        onWheel={(e) => {
          const container = e.currentTarget;
          const atTop = container.scrollTop === 0;
          const atBottom =
            container.scrollTop >=
            container.scrollHeight - container.clientHeight;

          if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
            return;
          }

          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          const container = e.currentTarget;
          (
            container.style as React.CSSProperties & {
              webkitOverflowScrolling?: string;
            }
          ).webkitOverflowScrolling = "touch";
        }}
      >
        {children}
      </div>
    </div>
  );
}

type Artist = {
  name: string;
  role?: string;
};

type InfoCardProps = {
  title: string;
  subtitle?: string;
  artists?: Artist[];
  description?: string;
  dressCode?: string;
  minAge?: number;
  musicGenres?: string[];
  priceFrom?: number;
  currency?: string;
  dict: Dict;
};

export default function InfoCard({
  title,
  artists,
  description,
  dressCode,
  minAge,
  musicGenres,
  priceFrom,
  dict,
}: InfoCardProps) {
  const entryType =
    priceFrom === 0 || priceFrom === undefined
      ? dict.events.freeEntry
      : dict.events.paidEntry;

  const formatGenre = (genre: string) => {
    return genre
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const musicGenresText = musicGenres?.map(formatGenre).join(", ");

  return (
    <section className="w-full rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-900/15 p-6 shadow-xl backdrop-blur">
      <div className="flex h-full w-full flex-1 flex-col">
        <header className="mb-4">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl">
            {title}
          </h1>

          {/* Featured Artists Map */}
          {artists && artists.length > 0 && (
            <div className="mt-4">
              <h2 className="mb-2 text-lg font-bold text-neutral-200">
                {dict.events.featuredArtists}
              </h2>
              <ul className="flex flex-col gap-1">
                {artists.map((artist, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-300">
                      {artist.name}
                    </span>
                    {artist.role && (
                      <span className="text-xs text-neutral-400">
                        ({artist.role})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {description && (
            <>
              {/* On small screens, show as <details><summary>... */}
              <div className="block lg:hidden">
                <details className="group mb-1 mt-2">
                  <summary className="flex cursor-pointer select-none items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 underline">
                    #{dict.events.aboutThisEvent}
                  </summary>
                  <ScrollArea>
                    <div className="mt-2 max-w-prose font-medium text-neutral-300">
                      {formatTextWithLinks(description)}
                    </div>
                  </ScrollArea>
                </details>
              </div>
              {/* On large screens, just show description */}
              <div className="mb-1 mt-2 hidden lg:block">
                <ScrollArea>
                  <div className="mt-2 max-w-prose font-medium text-neutral-300">
                    {formatTextWithLinks(description)}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </header>

        <div className="mt-2 border-t border-neutral-200/40" />

        <div className="mt-6 flex">
          <dl className="flex w-full flex-col divide-y divide-neutral-200/40 rounded-lg border border-neutral-200/40">
            {/* Dress code */}
            {dressCode && (
              <div className="px-4 py-5 text-center">
                <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                  {dict.events.dressCode}
                </dt>
                <dd className="mt-1 text-sm">{dressCode}</dd>
              </div>
            )}

            {/* Age Limit */}
            <div className="px-4 py-5 text-center">
              <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                {dict.events.ageLimit}
              </dt>
              <dd className="mt-1 text-sm">
                {minAge ? `${minAge}+` : dict.events.noAgeRestrictions}
              </dd>
            </div>

            {/* Music */}
            {musicGenresText && (
              <div className="px-4 py-5 text-center">
                <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                  {dict.events.music}
                </dt>
                <dd className="mt-1 text-sm">{musicGenresText}</dd>
              </div>
            )}

            {/* Entry */}
            <div className="px-4 py-5 text-center">
              <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                {dict.events.entry}
              </dt>
              <dd className="mt-1 text-sm">{entryType}</dd>
            </div>

            {/* Bar - Static info since it's not in schema */}
            <div className="px-4 py-5 text-center">
              <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                {dict.events.bar}
              </dt>
              <dd className="mt-1 text-sm">
                {dict.events.barAvailable} ·{" "}
                {dict.events.cocktailsBeerSoftDrinks}
              </dd>
            </div>

            {/* Location - Static info since it's not in schema */}
            <div className="px-4 py-5 text-center">
              <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                {dict.events.location}
              </dt>
              <dd className="mt-1 text-sm">
                {`${clubInfo.address.street}, ${clubInfo.address.postalCode} ${clubInfo.address.city}`}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
