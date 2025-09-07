"use client";

type ScrollAreaProps = {
  className?: string;
  children: React.ReactNode;
};

function ScrollArea({ className, children }: ScrollAreaProps) {
  return (
    <div className="relative">
      <div className={`max-h-48 overflow-y-auto ${className ? className : ""}`}>
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
};

export default function InfoCard({
  title,
  artists,
  description,
  dressCode,
  minAge,
  musicGenres,
  priceFrom,
  currency = "PLN",
}: InfoCardProps) {
  // Determine entry type based onpriceFrom
  const entryType =
    priceFrom === 0 || priceFrom === undefined ? "Free entry" : "Paid entry";

  // Format music genres - convert kebab-case to readable format
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
                Featured Artists
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
                    #About this event
                  </summary>
                  <ScrollArea>
                    <p className="mt-2 max-w-prose text-lg font-medium text-neutral-300">
                      {description}
                    </p>
                  </ScrollArea>
                </details>
              </div>
              {/* On large screens, just show description */}
              <div className="mb-1 mt-2 hidden lg:block">
                <ScrollArea>
                  <p className="mt-2 max-w-prose text-lg font-medium text-neutral-300">
                    {description}
                  </p>
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
                  Dress code
                </dt>
                <dd className="mt-1 text-sm">{dressCode}</dd>
              </div>
            )}

            {/* Age Limit */}
            <div className="px-4 py-5 text-center">
              <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                Age Limit
              </dt>
              <dd className="mt-1 text-sm">
                {minAge ? `${minAge}+` : "Без ограничений"}
              </dd>
            </div>

            {/* Music */}
            {musicGenresText && (
              <div className="px-4 py-5 text-center">
                <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                  Music
                </dt>
                <dd className="mt-1 text-sm">{musicGenresText}</dd>
              </div>
            )}

            {/* Entry */}
            <div className="px-4 py-5 text-center">
              <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                Entry
              </dt>
              <dd className="mt-1 text-sm">{entryType}</dd>
            </div>

            {/* Bar - Static info since it's not in schema */}
            <div className="px-4 py-5 text-center">
              <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                Bar
              </dt>
              <dd className="mt-1 text-sm">
                Bar available · Cocktails, beer, soft drinks, snacks
              </dd>
            </div>

            {/* Location - Static info since it's not in schema */}
            <div className="px-4 py-5 text-center">
              <dt className="text-[10px] uppercase tracking-widest text-neutral-400">
                Location
              </dt>
              <dd className="mt-1 text-sm">
                al. Niepodległości 36, 00-000 Poznań
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
