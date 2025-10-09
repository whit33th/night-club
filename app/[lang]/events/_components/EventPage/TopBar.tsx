"use client";

import { formatTime, localeMap } from "@/lib/date-utils";
import { Dict } from "@/lib/get-dictionary-client";
import { Locale } from "@/lib/i18n-config";
import { useCallback, useEffect, useMemo, useState } from "react";

type TopBarProps = {
  date: string;
  startAt: string;
  doorsAt?: string;
  dict: Dict;
  locale: Locale;
};

type CountdownState =
  | { state: "unknown" }
  | {
      state: "upcoming";
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }
  | { state: "live" }
  | { state: "ended"; daysAgo: number; hoursAgo: number; minsAgo: number };

export default function TopBar({
  date,
  startAt,
  doorsAt,
  dict,
  locale,
}: TopBarProps) {
  const eventDateTime = startAt ? `${date}T${startAt}:00` : date;
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [countdown, setCountdown] = useState<CountdownState>({
    state: "unknown",
  });

  const eventTimeMs = useMemo(
    () => new Date(eventDateTime).getTime(),
    [eventDateTime],
  );

  const calculateCountdown = useCallback(
    (currentTime: number): CountdownState => {
      if (!eventTimeMs || Number.isNaN(eventTimeMs)) {
        return { state: "unknown" };
      }
      const diff = eventTimeMs - currentTime;
      const sixHours = 6 * 60 * 60 * 1000;

      if (diff > 0) {
        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { state: "upcoming", days, hours, minutes, seconds };
      }

      if (Math.abs(diff) < sixHours) {
        return { state: "live" };
      }

      const ago = Math.abs(diff);
      const daysAgo = Math.floor(ago / 86400000);
      const hoursAgo = Math.floor((ago % 86400000) / 3600000);
      const minsAgo = Math.floor((ago % 3600000) / 60000);
      return { state: "ended", daysAgo, hoursAgo, minsAgo };
    },
    [eventTimeMs],
  );

  useEffect(() => {
    const eventDate = new Date(eventDateTime);

    const monthName = eventDate.toLocaleDateString(localeMap[locale], {
      month: "short",
    });
    setMonth(monthName.charAt(0).toUpperCase() + monthName.slice(1));
    setDay(eventDate.toLocaleDateString(localeMap[locale], { day: "numeric" }));
    setTime(formatTime(startAt, locale));

    setCountdown(calculateCountdown(Date.now()));
  }, [eventDateTime, calculateCountdown, locale, startAt]);

  useEffect(() => {
    let startTime = Date.now();

    const updateCountdown = () => {
      const currentTime = startTime + 1000;
      startTime = currentTime;

      setCountdown((prevCountdown) => {
        const newCountdown = calculateCountdown(currentTime);

        if (prevCountdown.state !== newCountdown.state) {
          return newCountdown;
        }

        if (
          prevCountdown.state === "upcoming" &&
          newCountdown.state === "upcoming"
        ) {
          if (
            prevCountdown.days !== newCountdown.days ||
            prevCountdown.hours !== newCountdown.hours ||
            prevCountdown.minutes !== newCountdown.minutes ||
            prevCountdown.seconds !== newCountdown.seconds
          ) {
            return newCountdown;
          }
        }

        return prevCountdown;
      });
    };

    const id = setInterval(updateCountdown, 1000);
    return () => clearInterval(id);
  }, [calculateCountdown]);

  return (
    <section className="flex items-stretch justify-between gap-4">
      <div className="flex flex-none flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <p className="font-bold leading-none">{month}</p>
        <p className="text-2xl font-bold leading-none">{day}</p>
      </div>
      <div className="bg-primary drop-shadow-primary relative flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl drop-shadow-lg">
        {countdown.state === "upcoming" ? (
          <div className="z-10 flex flex-col items-center text-black">
            <div className="grid grid-cols-4 gap-2 px-2 md:gap-4">
              {[
                {
                  label: dict.events.days,
                  value: countdown.days ?? 0,
                },
                {
                  label: dict.events.hours,
                  value: countdown.hours ?? 0,
                },
                {
                  label: dict.events.min,
                  value: countdown.minutes ?? 0,
                },
                {
                  label: dict.events.sec,
                  value: countdown.seconds ?? 0,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg py-1.5 text-center md:px-4 md:py-2"
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
              {dict.events.liveNow}
            </p>
          </div>
        ) : countdown.state === "ended" ? (
          <div className="z-10 flex flex-col items-center px-3 text-black">
            <p className="text-sm font-extrabold uppercase tracking-widest md:text-3xl">
              {dict.events.eventEnded}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-none flex-col justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
        {!doorsAt && (
          <p className="text-xs text-neutral-500">{dict.events.startsAt}</p>
        )}

        <div className="text-xl font-bold leading-none">{time}</div>

        {doorsAt && (
          <p className="text-xs text-neutral-500">
            {dict.events.doorsOpen} {doorsAt}
          </p>
        )}
      </div>
    </section>
  );
}
