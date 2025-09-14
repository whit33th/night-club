import { Locale } from "./i18n-config";

export const localeMap = {
  en: "en-US",
  pl: "pl-PL",
};

export function formatDate(
  date: string | Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  };

  return dateObj.toLocaleDateString(localeMap[locale], defaultOptions);
}

export function formatTime(
  time: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));

  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...options,
  };

  return date.toLocaleTimeString(localeMap[locale], defaultOptions);
}

export function formatDateTime(
  date: string,
  time: string,
  locale: Locale,
): { date: string; time: string; full: string } {
  const formattedDate = formatDate(date, locale);
  const formattedTime = formatTime(time, locale);

  const dateTime = new Date(`${date}T${time}`);

  const fullDateTime = dateTime.toLocaleDateString(localeMap[locale], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    date: formattedDate,
    time: formattedTime,
    full: fullDateTime,
  };
}

export function isPastEvent(eventDate: string, startTime?: string): boolean {
  const warsawTime = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const currentWarsawDate = new Date(warsawTime);

  const eventDateTime = new Date(`${eventDate}T${startTime || "00:00"}:00`);

  return eventDateTime < currentWarsawDate;
}
