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

type InfoCardProps = {
  title: string;
  subtitle?: string;
};

export default function InfoCard({ title, subtitle }: InfoCardProps) {
  return (
    <section className="w-full rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-900/15 p-6 shadow-xl backdrop-blur">
      <div className="flex h-full w-full flex-1 flex-col">
        <header className="mb-4">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl">
            {title}
          </h1>
          {/* Featured Artists Map */}
          <div className="mt-4">
            <h2 className="mb-2 text-lg font-bold text-neutral-700 dark:text-neutral-200">
              Featured Artists
            </h2>
            {/* Replace the array below with your actual artists data */}
            <ul className="flex flex-col gap-2">
              {[
                { name: "DJ Pulse", role: "Headliner" },
                { name: "MC Flow", role: "Support" },
                { name: "Synthwave", role: "Live Set" },
              ].map((artist, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {artist.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    ({artist.role})
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {subtitle ? (
            <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
          ) : null}
          {/* On small screens, show as <details><summary>... */}
          <div className="block lg:hidden">
            <details className="group mb-1 mt-2">
              <summary className="flex cursor-pointer select-none items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 underline">
                #About this event
              </summary>
              <ScrollArea>
                <p className="mt-2 max-w-prose text-lg font-medium text-neutral-800 dark:text-neutral-100">
                  No frills, no filters—just a raw night of music and
                  connection. Local artists, real energy, and a crowd that’s
                  remember. No frills, no filters—just a raw night of music and
                  connection. Local artists, real energy, and a crowd that’s
                  here for the vibe, not the scene. Come as you are. Let’s make
                  it a night to remember.
                </p>
              </ScrollArea>
            </details>
          </div>
          {/* On large screens, just show h3 */}
          <div className="mb-1 mt-2 hidden lg:block">
            <ScrollArea>
              <p className="mt-2 max-w-prose text-lg font-medium text-neutral-800 dark:text-neutral-100">
                No frills, no filters—just a raw night of music and connection.
                Local artists, real energy, and a crowd that’s remember. No
                frills, no filters—just a raw night of music and connection.
                Local artists, real energy, and a crowd that’s here for the
                vibe, not the scene. Come as you are. Let’s make it a night to
                remember.
              </p>
            </ScrollArea>
          </div>
        </header>

        <div className="mt-2 border-t border-neutral-200/40" />

        <div className="mt-6 flex">
          <dl className="flex w-full flex-col divide-y divide-neutral-200/40 rounded-lg border border-neutral-200/40">
            {[
              {
                label: "Dress code",
                value: "Black & White",
              },
              {
                label: "Age Limit",
                value: "18+",
              },
              {
                label: "Music",
                value: "Techno, House, Electronic",
              },
              {
                label: "Entry",
                value: "Paid entry",
              },
              {
                label: "Bar",
                value: "Bar available · Cocktails, beer, soft drinks, snacks",
              },
              {
                label: "Location",
                value: "al. Niepodległości 36, 00-000 Poznań",
              },
            ].map(({ label, value }) => (
              <div className="px-4 py-5 text-center" key={label}>
                <dt className="text-[10px] uppercase tracking-widest text-neutral-500">
                  {label}
                </dt>
                <dd className="mt-1 text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
