import { localeMap } from "@/lib/date-utils";
import { Locale } from "@/lib/i18n-config";

export function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);

  return d.toLocaleDateString(localeMap[locale], {
    month: "2-digit",
    day: "2-digit",
  });
}
