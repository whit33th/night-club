"use client";

import { useEffect, useMemo, useState } from "react";

type TopBarProps = {
  date?: string | Date;
};

export default function TopBar({ date = "2024-07-01T13:00:00" }: TopBarProps) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [now, setNow] = useState<number>(Date.now());
  const eventTimeMs = useMemo(() => new Date(date).getTime(), [date]);

  useEffect(() => {
    const eventDate = new Date(date);
    const locale = "en-US";

    setMonth(eventDate.toLocaleString(locale, { month: "short" }));
    setDay(eventDate.toLocaleString(locale, { day: "2-digit" }));
    setTime(
      eventDate.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    );
  }, [date]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const countdown = useMemo(() => {
    if (!eventTimeMs || Number.isNaN(eventTimeMs)) {
      return { state: "unknown" as const };
    }
    const diff = eventTimeMs - now;
    const sixHours = 6 * 60 * 60 * 1000;
    if (diff > 0) {
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return { state: "upcoming" as const, days, hours, minutes, seconds };
    }
    if (Math.abs(diff) < sixHours) {
      return { state: "live" as const };
    }
    const ago = Math.abs(diff);
    const hoursAgo = Math.floor(ago / 3600000);
    const minsAgo = Math.floor((ago % 3600000) / 60000);
    return { state: "ended" as const, hoursAgo, minsAgo };
  }, [eventTimeMs, now]);

  return (
    <section className="flex items-stretch justify-between gap-4">
      <div className="flex flex-none flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <p className="font-bold leading-none">{month}</p>
        <p className="text-2xl font-bold leading-none">{day}</p>
      </div>
      <div className="bg-primary drop-shadow-primary relative flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl drop-shadow-lg">
        {countdown.state === "upcoming" ? (
          <div className="z-10 flex flex-col items-center px-3 text-black">
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {[
                { label: "Days", value: countdown.days ?? 0 },
                { label: "Hours", value: countdown.hours ?? 0 },
                { label: "Min", value: countdown.minutes ?? 0 },
                { label: "Sec", value: countdown.seconds ?? 0 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg px-2 py-1.5 text-center backdrop-blur-sm md:px-4 md:py-2"
                >
                  <div className="text-base font-extrabold tabular-nums tracking-wider md:text-3xl">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.25em] opacity-70 md:text-xs">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : countdown.state === "live" ? (
          <div className="z-10 flex items-center gap-3 px-3 text-black">
            <span className="relative inline-flex h-3 w-3 animate-pulse rounded-full bg-black/60 ring-2 ring-black/30" />
            <p className="text-sm font-extrabold uppercase tracking-widest md:text-3xl">
              Live now
            </p>
          </div>
        ) : countdown.state === "ended" ? (
          <div className="z-10 flex flex-col items-center px-3 text-black">
            <p className="text-sm font-extrabold uppercase tracking-widest md:text-3xl">
              Event ended
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] opacity-75 md:text-xs">
              {`Ended ${countdown.hoursAgo ?? 0}h ${countdown.minsAgo ?? 0}m ago`}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-none flex-col justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
        <div className="text-xl font-bold leading-none">{time}</div>
        <p className="text-xs text-neutral-500">Doors open 13:00</p>
      </div>
      {/* Like button moved to InfoCard top-right */}
    </section>
  );
}
